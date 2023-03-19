const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wikiDB');
}

const articleSchema = new mongoose.Schema({
  title: String,
  content: String
  });

const Article = mongoose.model("Article", articleSchema);

app.get("/articles",function(req,res) {
  Article.find(function(err,foundArticles){
    // console.log(foundArticles);
    if(!err){
      res.send(foundArticles);
    }
    else{
      res.send(err);
    }
    
  }); 
});
app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});