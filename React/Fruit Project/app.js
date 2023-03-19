const mongoose = require('mongoose');

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
}


const fruitSchema = new mongoose.Schema({
name: {
  type:String,
  required: [true,"Please check your data entry, no name specified!"]
},
rating: {type: Number,
min: 1,
max:10},
review: String
});
const productSchema = new mongoose.Schema({
  _id:Number,
  item:String,
  stocks: Number
  });
const Fruit = mongoose.model('Fruit', fruitSchema);
const Product = mongoose.model('Product', productSchema);

const fruit = new Fruit({
name: "Grapes",
rating: 10,
review: "Delicious"
});
fruit.save();

const product = new Product({
_id:3,
item: fruit,
stocks: 100
});
product.save();
// const kiwi = new Fruit({
//   name: "Kiwi",
//   rating: 3,
//   review: "Delicious"
//   });
//   const orange = new Fruit({
//     name: "orange",
//     rating: 4,
//     review: "Delicious"
//     });
//     const banana = new Fruit({
//       name: "banana",
//       rating: 10,
//       review: "Delicious"
//       });


// Fruit.insertMany([kiwi,orange,banana],function(err){
// if(err){
//   console.log(err);
// }
// else
// {
//   console.log("Success.");
// }
// });
Fruit.find(function(err, fruits){
  if(err){
    console.log(err);
  }
  else
  {
    // mongoose.connection.close(function() { 
    //   process.exit(0); 
    // });
    // console.log(fruits);
    fruits.forEach(function(fruit){
      console.log(fruit.name);
    });

  }
 
});

// Fruit.updateOne({_id:"63e515c9b6e038c0ac915ee3"},
// {name:"Peach"},function(err){
//   if (err){
//     console.log(err);
//   }
//   else{
//     console.log("Updated!");
//   }
  
// });

// Fruit.deleteOne({name:"Peach"},function(err){
//   if (err){
//     console.log(err);
//   }
//   else{
//     console.log("Deleted!");
//   }
  
// });


// const kittySchema = new mongoose.Schema({
//   name: String
// });

// const Kitten = mongoose.model('Kitten', kittySchema);
// const silence = new Kitten({ name: 'Silence' });
// silence.save();
// console.log(silence.name); // 'Silence'
// const fluffy = new Kitten({ name: 'fluffy' });
// fluffy.save();

// Fruit.deleteMany({name:"Grapes"},function(err){
//     if (err){
//     console.log(err);
//   }
//   else{
//     console.log("Deleted Many!");
//   }
// });