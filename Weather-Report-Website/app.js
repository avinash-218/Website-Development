const express = require('express');
const https = require('https'); //native
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res) {
  var city = req.body.cityName;
  city = city.toLowerCase();
  city = city[0].toUpperCase() + city.substr(1, city.length);
  const key = "xxxxxxxxxxxxxxxxxxxxx";
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + key + "&units=" + units;

  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp;
      const desc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imgURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<h1>" + city + " Weather Report</h1>")
      res.write("<h3>Temperature -" + temp + " degrees celcius</h3>");
      res.write("<h3>Weather - " + desc + "</h3>");
      res.write("<img src='" + imgURL + "' alt='image'>");
      res.send();
    })
  })

});


app.listen(3000, function() {
  console.log("Server is running on port 3000");
});
