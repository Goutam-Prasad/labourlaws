const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
app.set("view engine", "ejs");
const PtInput = require("./models/PtInput");

app.set("views", path.join(__dirname, "views"));
const { PtTax } = require("./PtInputLogic");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

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
  console.log(selectedState);
  res.render("results", { stateData: req.body });
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Something went wrong";
  res.send(err.message);
});

app.listen("3000", () => {
  console.log(`Listening to Port 3000`);
});
