const express = require("express");
const indexRouter = express.Router();
const { PtTax } = require("../PtInputTaxLogic");
const PtInput = require("../models/PtInput");
const States = require("../models/States");
const {
  optionHelper,
  getDataFromOptions,
  sendWageData,
} = require("../utils/helper");
const {
  getDataFromLwf,
  optionHelperForLWF,
  getContributionInLWF,
  getStatelist,
} = require("../utils/lwfHelper");

const calculatePtTax = (req, res, next) => {
  let { state, salary, gender } = req.body;
  req.body.tax = PtTax(state, salary, gender);
  next();
};

indexRouter.get("/", (req, res) => {
  res.render("home");
});

indexRouter.get("/inputs", (req, res) => {
  res.render("inputs.ejs");
});

indexRouter.post("/inputs", calculatePtTax, async (req, res) => {
  const selectedState = await PtInput.find({ state: req.body.state });
  const stateData = selectedState[0];
  stateData.tax = req.body.tax;
  res.render("results", { stateData });
});

//Bonus input Path
indexRouter.get("/bonusinput", (req, res) => {
  res.render("bonusinput.ejs");
});

indexRouter.post("/bonusinput", (req, res) => {
  const { basicSalary } = req.body;
  const bonus = (8.33 / 100) * parseInt(basicSalary);
  res.render("bonusoutput.ejs", { bonus });
});

//esic input Path
indexRouter.get("/esicinput", (req, res) => {
  res.render("esicinput.ejs");
});

indexRouter.post("/esicinput", (req, res) => {
  const { grossSalary } = req.body;
  const esicContribution = {
    employee: parseFloat((0.75 / 100) * parseInt(grossSalary)).toFixed(2),
    employer: parseFloat((3.25 / 100) * parseInt(grossSalary)).toFixed(2),
  };
  res.render("esicoutput", { esicContribution });
});

//Minimum Wage Routes

indexRouter.get("/minimumwage", async (req, res) => {
  const stateList = await States.find({});
  res.render("MinimumWageAct/stateSelection", { stateList });
});
indexRouter.get("/lwf", async (req, res) => {
  const stateList = await getStatelist();
  res.render("lwf/lwfinputoptions.ejs", { stateList });
});

indexRouter.get("/lwf/:statename", async (req, res) => {
  const { statename } = req.params;
  const options = optionHelperForLWF(statename);
  res.render("lwf/lwfemploymnetType.ejs", { options, statename });
});

indexRouter.post("/lwf/:statename", async (req, res) => {
  const { statename } = req.params;
  const { gross_salary, employement_class, employee_count } = req.body;
  const result = await getDataFromLwf(statename);
  const contribution = await getContributionInLWF(
    statename,
    gross_salary,
    employement_class
  );
  result["Your Contribution"] = contribution[0];
  result["Your Employer Contribution"] = contribution[1];
  res.render("lwf/lwfoutput.ejs", {
    result,
    statename,
    gross_salary,
    employee_count,
  });
});

indexRouter.get("/minimumwage/:statename", async (req, res) => {
  const { statename } = req.params;
  const options = optionHelper(statename); //[coe:,zone,category]--options
  let result = {};
  for (let option of options) {
    result[option] = await getDataFromOptions(statename, option);
  }
  res.render("MinimumWageAct/stateoptions.ejs", { result, statename });
});

indexRouter.post("/minimumwage/:statename", async (req, res) => {
  const { statename } = req.params;
  const { gross_salary } = req.body;
  let result = await sendWageData(statename, req.body);
  res.render("MinimumWageAct/wageoutput.ejs", { result });
});

module.exports = indexRouter;
