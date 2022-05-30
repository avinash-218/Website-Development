const express = require('express');
const app = express();

app.get("/",function(request,response)
{
  response.send("hello world");
});

app.get("/contact", function(request, response)
{
  response.send("Contact me @ravinash218@gmauil.com");
});

app.get("/about",function(request, response)
{
  response.send("Hi, I am Avinash R. I am a Back-End Developer and An AI / ML Engineer");
});

app.use(express.static("public"));

app.listen(3000, function()
{
  console.log("Server started at port 3000");
});
