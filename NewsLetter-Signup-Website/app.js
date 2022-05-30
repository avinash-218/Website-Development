const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express()

app.use(express.static("public")) //for static pages
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post("/", function(req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  var data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  };

  const jsonData = JSON.stringify(data); //convert to json stringify format

  const url = "https://us1.api.mailchimp.com/3.0/lists/xxxxxxx"

  const options = {
    method: "POST",
    auth: "avinash218:xxxxxxxxxxxxxxxxxxxxxxxxxxx-xxx"
  }

  const request = https.request(url, options, function(response) //pass to other site
    {
      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html")
      } else {
        res.sendFile(__dirname + "/failure.html")
      }
      response.on("data", function(data) {})
    });
  request.write(jsonData);
  request.end();

});

app.post("/failure", function(req, res) {
  res.redirect("/");
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
})

app.listen(3000, function() {
  console.log("Server is running on the port 3000");
});
