const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const app = express();


app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb+srv://Xypher:Rosalina07@cluster0.q7zfgm6.mongodb.net/todolistDB');
}
const itemSchema = new mongoose.Schema({
    name: {
      type:String,
      required: [true,"Please check your data entry, no name specified!"]
    }
    });
const Item = mongoose.model('Item', itemSchema);

const item1 = new Item({
name: "Welcome to your todolist!"
});
const item2 = new Item({
name: "Hit the + button to add a new item."
});
const item3 = new Item({
name: "<-- Hit this to delete an item."
});
const defaultItems = [item1,item2,item3];
const listSchema = {
name: String,
items: [itemSchema]
}
const List = mongoose.model("List",listSchema);
app.get("/:customListName",function(req,res) {
   const customListName = _.capitalize(req.params.customListName);
   List.findOne({name: customListName},function(err,foundList) {
    if (!err){
        if(!foundList){
            
            const list = new List({
                name: customListName,
                items: defaultItems
               });
               list.save();
               res.redirect("/"+customListName)
        }
        else{
            res.render("list",{listTitle: foundList.name,newListItems:foundList.items})
        }
    }
   });
 
});


app.get("/",(req,res) => {

    Item.find({},function(err, foundItems){
        if(foundItems.length === 0){
            Item.insertMany(defaultItems, function(err){
                if(err){
                  console.log(err);
                }
                else
                {
                  console.log("Successfully added an item.");
                }
                });
                res.redirect("/");
        }
        else{
            res.render("list",{listTitle: "Today",newListItems: foundItems});
      }
      
    });
        
        
    
    });

app.post("/",function(req,res){
    let itemName = req.body.newItem;
    const listName = req.body.list;
    const item = new Item({
        name: itemName
        });
        if (listName === "Today"){
            item.save();
            res.redirect("/");
        }
        else{
            List.findOne({name: listName},function(err,foundList) {
                foundList.items.push(item);
                foundList.save();
                res.redirect("/"+listName);       
            });
        }

});

app.post("/delete",function(req,res){
    const checkedItemId = req.body.checkbox;
    const listName = req.body.listName;

    if (listName === "Today"){
        Item.findByIdAndRemove(checkedItemId,function(err) {
            if(!err){
                console.log("Item Deleted.");
                res.redirect("/");
            }
            else{
                console.log(err);
            }
        });
    }
    else{
        List.findOneAndUpdate({name: listName},{$pull: {items: {_id: checkedItemId}}},function(err,foundList) {
            if(!err){
                res.redirect("/"+listName);
            }
        });
    }
    
});


app.listen(process.env.PORT || 3000,() => {
    console.log("Server is running on port 3000.");
    });