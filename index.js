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
const States = require("./models/States");

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
  const stateData = selectedState[0];
  stateData.tax = req.body.tax;
  res.render("results", { stateData });
});

//Bonus input Path
app.get("/bonusinput", (req, res) => {
  res.render("bonusinput.ejs");
});

app.post("/bonusinput", (req, res) => {
  const { basicSalary } = req.body;
  const bonus = (8.33 / 100) * parseInt(basicSalary);
  res.render("bonusoutput.ejs", { bonus });
});

//esic input Path
app.get("/esicinput", (req, res) => {
  res.render("esicinput.ejs");
});

app.post("/esicinput", (req, res) => {
  const { grossSalary } = req.body;
  const esicContribution = {
    employee: parseFloat((0.75 / 100) * parseInt(grossSalary)).toFixed(2),
    employer: parseFloat((3.25 / 100) * parseInt(grossSalary)).toFixed(2),
  };
  res.render("esicoutput", { esicContribution });
});

//Minimum Wage Routes

app.get("/minimumwage", async (req, res) => {
  const stateList = await States.find({});
  res.render("MinimumWageAct/stateSelection", { stateList });
});
app.get("/minimumwage/:statename", (req, res) => {
  const { statename } = req.params;
  res.send(`Cilcked on ${statename}`);
});
app.listen("3000", () => {
  console.log(`Listening to Port 3000`);
});
