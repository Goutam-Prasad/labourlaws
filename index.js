const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

const calculate = (req, res, next) => {
  console.log("hi there");
  next();
};

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/inputs", (req, res) => {
  res.render("inputs.ejs");
});
app.post("/inputs", calculate, (req, res) => {
  console.log("inside", req.body);
  res.render("home");
});
app.get("/inputs/ptinput", (req, res) => {
  res.send("reached");
});
app.listen("3000", () => {
  console.log(`Listening to Port 3000`);
});
