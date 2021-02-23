//jshint esversion:6

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app=express();
app.use(bodyParser.urlencoded({extended: true}));//Necassary code for parsing the body of post request.

app.get("/",function(req,res) {
  res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res) {
  console.log("Post request recieved.");
  console.log("City entered by user:"+req.body.cityInput);
  const cityName = req.body.cityInput;
  const apiKey = "22cf02bf2eee6b64379e16ebcb36b74e";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid="+ apiKey + "&units=" + unit;
  https.get(url, function(response) {
    console.log(response.statusCode);
    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      console.log(weatherData);
      const weatherDescription = weatherData.weather[0].description;
      const temperature = weatherData.main.temp;
      const visibility = weatherData.visibility;
      const city = weatherData.name;
      const nation = weatherData.sys.country;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<h1>The temperature in " + cityName + " is "+temperature+" degrees Celsius.</h1>");
      res.write("<h1>The weather is currently "+weatherDescription+".</h1>");
      res.write("<h2>Visibility is "+visibility+".</h2>");
      res.write("<h2>Location:"+city+"</h2>");
      res.write("<h2>Country:"+nation+"</h2>");
      res.write("<img src=" + imageURL + ">");
      res.send();
    });
  });
  // // res.send("Server is up and running.");
});
app.listen(3000, function() {
  console.log("Server is running on port 3000.");
});
