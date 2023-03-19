const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}))

app.get("/",function(req,res){
res.sendFile(__dirname+"/index.html")
});

app.post("/",function(req,res){
    // console.log(req.body.cityName);
    const query = req.body.cityName;
const apiKey = "d97c45e7c47039bcd9df2998e72fa829";
const units = "metric";
const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+units+"&appid="+apiKey;

https.get(url,function(response){
console.log(response.statusCode);
response.on('data',function(data){
const weatherdata = JSON.parse(data);
const temp = weatherdata.main.temp;
const weatherdescription = weatherdata.weather[0].description;
const icon = weatherdata.weather[0].icon;
const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
// const object = {
//     name: "Xypher",
//     program: "Python"
// }

console.log(temp);
console.log(weatherdescription);
res.write("<p>The weather is currently "+weatherdescription +"</p>")
res.write("<h1>The temperature in "+query+" is "+temp +" degrees Celcius</h1>");
res.write("<img src="+imageURL+">")
res.send();
// console.log(JSON.stringify(object)); 

});
});
// res.send("Server is up and running.");
});


app.listen(3000,function(){
console.log("Server is running on port 3000.");
});