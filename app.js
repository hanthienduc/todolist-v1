const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

const items = ["buy food", "cook food", "eat food"];
const workItems = [];

app.get("/", function(req, res) {

    const day = date.getDate();

    res.render("list", { listTitle: day, newListItem: items });

});

app.post("/", function(req, res) {
    const title = req.body.listTitle;
    const item = req.body.newItem;
    if (title === "Work") {

        workItems.push(item);
        res.redirect("/");
    } else {
        workItems.push(item);
        res.redirect("/work");
    }

});

app.get("/work", function(req, res) {
    res.render("list", { listTitle: "Work", newListItem: workItems });
})

app.get("/about", function(req, res) {
    res.render("about");
})

app.listen(3000, function() {
    console.log("The server is running on PORT 3000.");
});