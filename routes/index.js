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

//variables for showing data in the same page from which request is sent stores as locals

//ptstates section
let sData = 0;

//bonusdata section
let bonusData = 0;

//esic section
let esicContri = 0;

//minwage section
let minwageResult = 0;

//lwf section
let lwfResult = 0; //lwf result
let sName = 0; //statename
let g_Salary = 0; //gross_salary
let emp_Count = 0; //employee_count

//locals for showing pages
let showPtTaxPage = 0;
let showBonusInputPage = 0;
let showEsicPage = 0;
let showMinWagePage = 0;
let showLwfPage = 0;

indexRouter.get("/", (req, res) => {
  res.render("home", {
    showPtTaxPage,
    sData,
    bonusData,
    showBonusInputPage,
    showEsicPage,
    esicContri,
  });
  showPtTaxPage = 0;
  showBonusInputPage = 0;
  showEsicPage = 0;
});

indexRouter.post("/", (req, res) => {
  const pages = Object.keys(req.body);
  if (pages.includes("reset")) {
    showPtTaxPage = 0;
    showBonusInputPage = 0;
    showEsicPage = 0;
    showLwfPage = 0;
    showMinWagePage = 0;
  } else {
    if (pages.includes("PtTax")) {
      showPtTaxPage = 1;
    }
    if (pages.includes("bonusinput")) {
      showBonusInputPage = 1;
    }
    if (pages.includes("esic")) {
      showEsicPage = 1;
    }
    if (pages.includes("minimumwage")) {
      showMinWagePage = 1;
    }
    if (pages.includes("lwf")) {
      showLwfPage = 1;
    }
  }
  res.redirect(301, "/");
});

indexRouter.get("/inputs", (req, res) => {
  res.render("inputs.ejs", { sData });
  sData = 0;
});

indexRouter.post("/inputs", calculatePtTax, async (req, res) => {
  const selectedState = await PtInput.find({ state: req.body.state });
  const stateData = selectedState[0];
  stateData.tax = req.body.tax;
  sData = stateData;
  res.redirect(301, "/inputs");
  // res.render("results", { stateData });
});

//Bonus input Path
indexRouter.get("/bonusinput", (req, res) => {
  res.redirect(301, "/");
  // res.render("bonusinput.ejs", { bonusData });
  bonusData = 0;
});

indexRouter.post("/bonusinput", (req, res) => {
  const { basicSalary } = req.body;
  const bonus = (8.33 / 100) * parseInt(basicSalary);
  bonusData = bonus;
  res.redirect(301, "/bonusinput");
  //res.render("bonusoutput.ejs", { bonus });
});

//esic input Path
indexRouter.get("/esicinput", (req, res) => {
  res.redirect(301, "/");
  // res.render("esicinput.ejs", { esicContri });
  esicContri = 0;
});

indexRouter.post("/esicinput", (req, res) => {
  const { grossSalary } = req.body;
  const esicContribution = {
    employee: parseFloat((0.75 / 100) * parseInt(grossSalary)).toFixed(2),
    employer: parseFloat((3.25 / 100) * parseInt(grossSalary)).toFixed(2),
  };
  esicContri = esicContribution;
  res.redirect(301, "/esicinput");
  //res.render("esicoutput", { esicContribution });
});

//Minimum Wage Routes

indexRouter.get("/minimumwage", async (req, res) => {
  const stateList = await States.find({});
  res.re;
  res.render("MinimumWageAct/stateSelection", { stateList });
});

indexRouter.get("/lwf", async (req, res) => {
  const stateList = await getStatelist();
  res.render("lwf/lwfinputoptions.ejs", { stateList });
});

indexRouter.get("/lwf/:statename", async (req, res) => {
  const { statename } = req.params;
  const options = optionHelperForLWF(statename);
  res.render("lwf/lwfemploymnetType.ejs", {
    options,
    statename,
    lwfResult,
    sName,
    g_Salary,
    emp_Count,
  });
  lwfResult = 0;
  sName = 0;
  g_Salary = 0;
  emp_Count = 0;
});

indexRouter.post("/lwf/:statename", async (req, res) => {
  const { statename } = req.params;
  const { gross_salary, employment_class, employee_count } = req.body;
  const result = await getDataFromLwf(statename);
  const contribution = await getContributionInLWF(
    statename,
    gross_salary,
    employment_class,
    employee_count
  );
  result["Your Contribution"] = contribution[0];
  result["Your Employer Contribution"] = contribution[1];
  lwfResult = result; //only used or data passing
  sName = statename; //only used or data passing
  g_Salary = gross_salary; //only used or data passing
  emp_Count = employee_count; //only used or data passing
  // res.render("lwf/lwfoutput.ejs", {
  //   result,
  //   statename,
  //   gross_salary,
  //   employee_count,
  // });

  res.redirect(301, `/lwf/${statename}`);
});

indexRouter.get("/minimumwage/:statename", async (req, res) => {
  const { statename } = req.params;
  const options = optionHelper(statename); //[coe:,zone,category]--options
  let result = {};
  for (let option of options) {
    result[option] = await getDataFromOptions(statename, option);
  }
  res.render("MinimumWageAct/stateoptions.ejs", {
    result,
    statename,
    minwageResult,
  });
  minwageResult = 0;
});

indexRouter.post("/minimumwage/:statename", async (req, res) => {
  const { statename } = req.params;
  let result = await sendWageData(statename, req.body);
  minwageResult = result;
  res.redirect(301, `/minimumwage/${statename}`);
  //res.render("MinimumWageAct/wageoutput.ejs", { result });
});

module.exports = indexRouter;
