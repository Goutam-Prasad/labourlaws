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
  //("function called");
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

//Variable used for single page routing
let sListMinWageAct = 0;
let slistLwf = 0;
//locals for showing pages
let showPtTaxPage = 0;
let showBonusInputPage = 0;
let showEsicPage = 0;
let showMinWagePageStateList = 0;
let showLwfPageStateList = 0;
let showLwfPage = 0;

indexRouter.get("/", (req, res) => {
  // //("inside get ", sData);
  res.render("home", {
    showPtTaxPage,
    sData,
    bonusData,
    showBonusInputPage,
    showEsicPage,
    esicContri,
    showMinWagePageStateList,
    sListMinWageAct,
    showLwfPageStateList,
    slistLwf,
  });

  //these are used to reset locals so as upon re rendering the page gets empty
  showPtTaxPage = 0;
  sData = 0; //pt input section
  showBonusInputPage = 0;
  bonusData = 0; //bonusdata section
  showEsicPage = 0;
  esicContri = 0;
  showMinWagePageStateList = 0;
  showLwfPageStateList = 0;
});

indexRouter.post("/", async (req, res) => {
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
      sListMinWageAct = await States.find({});
      showMinWagePageStateList = 1;
    }
    if (pages.includes("lwf")) {
      slistLwf = await getStatelist();
      showLwfPageStateList = 1;
    }
  }
  res.redirect(301, "/");
});

indexRouter.post("/outputs", calculatePtTax, async (req, res) => {
  const { Ptstate, basicSalary, esicInput } = req.body;
  if (Ptstate) {
    const selectedState = await PtInput.find({ state: req.body.Ptstate });
    const stateData = selectedState[0];
    stateData.tax = req.body.tax;
    sData = stateData;
    showPtTaxPage = 1;
  }
  if (basicSalary) {
    const bonus = (8.33 / 100) * parseInt(basicSalary);
    bonusData = bonus;
    showBonusInputPage = 1;
  }
  if (esicInput) {
    const esicContribution = {
      employee: parseFloat((0.75 / 100) * parseInt(esicInput)).toFixed(2),
      employer: parseFloat((3.25 / 100) * parseInt(esicInput)).toFixed(2),
    };
    esicContri = esicContribution;
    showEsicPage = 1;
  }
  res.redirect(301, "/");
});
indexRouter.get("/inputs", (req, res) => {
  res.render("inputs.ejs", { sData });
  sData = 0;
});

indexRouter.get("/getstatelist", async (req, res) => {
  const stateList = await States.find({});
  res.json(stateList);
});

indexRouter.post("/ptinputs", async (req, res) => {
  try {
    // showPtTaxPage = 1;
    const selectedState = await PtInput.find({ state: req.body.state });
    let { state, salary, gender } = req.body;
    const tax = PtTax(state, salary, gender);
    //("tax is", tax);
    //(selectedState);
    const stateData = selectedState[0];
    const result = { ...stateData, tax: tax };
    //("bf adding tax key ", stateData);
    const finaldata = { ...result._doc, tax: tax };
    //("final data", finaldata);
    delete finaldata._id;
    delete finaldata.__v;
    // const result = Object.assign({}, { ...stateData, tax: tax });
    res.json(finaldata);
    // res.redirect(301, "/");
    // res.render("results", { stateData });
  } catch (err) {
    console.log(err);
  }
});

//Bonus input Path
indexRouter.get("/bonusinput", (req, res) => {
  res.redirect(301, "/");
  // res.render("bonusinput.ejs", { bonusData });
  bonusData = 0;
});

indexRouter.post("/bonusinput/result", (req, res) => {
  try {
    //(req.body);
    const { basicSalary } = req.body;
    const bonus = (8.33 / 100) * parseInt(basicSalary);
    bonusData = bonus;
    showBonusInputPage = 1;
    //(bonus);
    res.json(bonus);
    // res.redirect(301, "/");
    //res.render("bonusoutput.ejs", { bonus });
  } catch (err) {
    console.log(err);
  }
});

//esic input Path
indexRouter.get("/esicinput", (req, res) => {
  res.redirect(301, "/");
  // res.render("esicinput.ejs", { esicContri });
  esicContri = 0;
});

indexRouter.post("/esicinput/output", (req, res) => {
  try {
    const { grossSalary } = req.body;
    const esicContribution = {
      employeeContribution: parseFloat(
        (0.75 / 100) * parseInt(grossSalary)
      ).toFixed(2),
      employerContribution: parseFloat(
        (3.25 / 100) * parseInt(grossSalary)
      ).toFixed(2),
    };
    esicContri = esicContribution;
    res.json(esicContribution);
    // res.redirect(301, "/esicinput");
    //res.render("esicoutput", { esicContribution });
  } catch (err) {
    console.log(err);
  }
});

//Minimum Wage Routes

indexRouter.get("/minimumwage", async (req, res) => {
  const stateList = await States.find({});
  res.redirect(301, "/");
  // res.render("MinimumWageAct/stateSelection", { stateList });
});

indexRouter.get("/lwf", async (req, res) => {
  const stateList = await getStatelist();
  res.render("lwf/lwfinputoptions.ejs", { stateList });
});

indexRouter.get("/lwf/:statename", async (req, res) => {
  const { statename } = req.params;
  const options = optionHelperForLWF(statename);
  res.json({ options });
  // res.render("lwf/lwfemploymnetType.ejs", {
  //   options,
  //   statename,
  //   lwfResult,
  //   sName,
  //   g_Salary,
  //   emp_Count,
  // });
  // lwfResult = 0;
  // sName = 0;
  // g_Salary = 0;
  // emp_Count = 0;
});

indexRouter.post("/lwf/:statename", async (req, res) => {
  try {
    // const { statename } = req.params;
    const { gross_salary, employment_class, employee_count, state } = req.body;
    const result = await getDataFromLwf(state);
    const contribution = await getContributionInLWF(
      state,
      gross_salary,
      employment_class,
      employee_count
    );
    result["Your Contribution"] = contribution[0];
    result["Your Employer Contribution"] = contribution[1];
    //(result);
    res.json(result);
    // lwfResult = result; //only used or data passing
    // sName = statename; //only used or data passing
    // g_Salary = gross_salary; //only used or data passing
    // emp_Count = employee_count; //only used or data passing
    // // res.render("lwf/lwfoutput.ejs", {
    //   result,
    //   statename,
    //   gross_salary,
    //   employee_count,
    // });

    //res.redirect(301, `/lwf/${statename}`);
  } catch (err) {
    console.log(err);
  }
});

indexRouter.get("/minimumwage/:statename", async (req, res) => {
  const { statename } = req.params;
  const options = optionHelper(statename); //[coe:,zone,category]--options
  let result = {};
  for (let option of options) {
    result[option] = await getDataFromOptions(statename, option);
  }
  res.json(result);
  // res.render("MinimumWageAct/stateoptions.ejs", {
  //   result,
  //   statename,
  //   minwageResult,
  // });
  // minwageResult = 0;
});

indexRouter.post("/minimumwage/:statename/result", async (req, res) => {
  try {
    const { statename } = req.params;
    //(req.params);
    const option = req.body.option;
    //(option);
    let result = await sendWageData(statename, option);
    minwageResult = result;
    res.json(result);
    // res.redirect(301, `/minimumwage/${statename}`);
    //res.render("MinimumWageAct/wageoutput.ejs", { result });
  } catch (err) {
    console.log(err);
  }
});

module.exports = indexRouter;
