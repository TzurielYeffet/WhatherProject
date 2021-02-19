/*
* SECTION 20
*/

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
// native node module
const https = require("https");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){
  const query = req.body.cityName;
  const apiKey= "a07d977e9443df824aa14bb8f5bf6d23" ;
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid="+ apiKey +"&units="+units+"";

  https.get(url, function(response) {
    // console.log(response.statusCode);
    response.on("data", function(data) {
      const wheatherData = JSON.parse(data);
      const temp = wheatherData.main.temp;
      const icon = wheatherData.weather[0].icon;
      var inmageURL= "http://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<h1>Tempersture is: " + temp + "</h1>");
      res.write("<img src = "+inmageURL+">");



     res.send();

    })
  })
})
app.listen(3000, function() {
  console.log("Welcom!");
});
