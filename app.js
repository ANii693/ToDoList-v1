const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+"/date.js");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
const items = [];
const wrokItem = [];
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  let day = date.getDate();
  res.render("list", { listTitle: day, newAddedItems: items });
});

app.post("/", function (req, res) {
  const item = req.body.newItem;
  if (req.body.list === "Work") {
    wrokItem.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newAddedItems: wrokItem });
});

app.listen(3000, function () {
  console.log("server is started on port 3000");
});
