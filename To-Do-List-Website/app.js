const express = require("express");
const bodyParser = require('body-parser');
const date = require(__dirname + "/date.js");
const app = express();

let items = [];
let workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  let day = date.getDate(); // try getDay()
  res.render("list", {
    listTitle: day,
    items: items
  })
});

app.post("/", function(req, res) {
  let item = req.body.newItem;
  if (req.body.list === "Work List") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    items: workItems
  });
});

app.listen(3000, function() {
  console.log("Started Server on port 3000");
});
