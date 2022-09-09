const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.set("views", path.join(__dirname, "views"));

const { PtTax } = require("./PtInputTaxLogic");
const PtInput = require("./models/PtInput");

//connection
const db = mongoose.connection;
const dbUrl = "mongodb://localhost:27017/test";
mongoose.connect(dbUrl);
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database Connected");
});
const calculatePtTax = (req, res, next) => {
  let { state, salary, gender } = req.body;
  req.body.tax = PtTax(state, salary, gender);
  next();
};

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/inputs", (req, res) => {
  res.render("inputs.ejs");
});

app.post("/inputs", calculatePtTax, async (req, res) => {
  const selectedState = await PtInput.find({ state: req.body.state });
  selectedState.push(req.body.tax);
  res.render("results", { stateData: selectedState });
});

app.listen("3000", () => {
  console.log(`Listening to Port 3000`);
});
