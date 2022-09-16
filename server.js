const express = require("express");
const port =process.env.PORT || 3000;
//const bodyParser = require('body-parser');

const app = express();
const mongoose = require("mongoose");
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//connect to database
mongoose
  .connect("mongodb+srv://mike:mike6950@cluster0.evx2xe1.mongodb.net/termsDB", {})
  .then(() => {
    // console.log("Connected");
  })
  .catch((e) => {
    // console.log("Something is wrong", e);
  });
//create new list
const List = mongoose.model("List", { title: String });

app.get("/", (req, res) => {
  List.find({}, (err, termItems) => {
    if (err) {
      //  console.log("Something is wrong", err);
    } else {
      res.render("index", { termItems: termItems });
      // console.log("list found :", docs);
    }
  });
});
app.post("/", (req, res) => {
  let termTitle = req.body.title;
  const listItem = new List({ title: termTitle });
  listItem.save();
  res.redirect("/");
});
app.get("/administrator", (req, res) => {
  res.render("auth");
});
app.post("/delete", (req, res) => {
  let termTitle = req.body.title;
  List.deleteOne({ title: termTitle }, (err) => {
    if (err) {
      // console.log(err);
    } else {
      //console.log(termTitle);
      // console.log("Successfully deleted");
    }
  });
  res.redirect("/");
});
//authorization
app.post("/auth", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  if (username == "administrator" && password == "mikeandpeter") {
    res.render("administrator");
  } else {
    res.redirect("/");
  }
});
app.get("/auth", (req, res) => {
  res.render("auth");
});
app.get("/:customName", (req, res) => {
  const customName = req.params.customName;
 // console.log(customName);
  if (customName == "administrator") {
    res.render("auth");
  } else if (customName == "auth") {
    res.render("auth");
  } else {
    res.redirect("/");
  }
});
app.listen(port, () => {
  // console.log(`Server is running on port ${port}`);
});
