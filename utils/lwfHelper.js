const mongoose = require("mongoose");
const { lwfemployeeContributionHelper } = require("./lwfcontributionfunctn");

const {
  ANDRA,
  CHANDIGARH,
  GOA,
  HARYANA,
  DELHI,
  GUJRAT,
  KERELA,
  MP,
  MAHARATRA,
  PUNJAB,
  KARNATAKA,
  TAMILNADU,
  TELANGANA,
  WESTBENGAL,
  OTHERS,
} = require("./lwfConstants");

/**
 *
 * @param {*} statename
 * @returns options for lwf i.e returns selection of class of employment for thr given state
 */

const optionHelperForLWF = (statename) => {
  switch (statename) {
    case "AndhraPradesh":
      return ANDRA;
    case "Chandigarh":
      return CHANDIGARH;
    case "Chattisgarh":
      return CHANDIGARH;
    case "Goa":
      return GOA;
    case "Haryana":
      return HARYANA;
    case "Delhi":
      return DELHI;
    case "Gujrat":
      return GUJRAT;
    case "Karnataka":
      return KARNATAKA;
    case "Kerala":
      return KERELA;
    case "MadhyaPradesh":
      return MP;
    case "Maharastra":
      return MAHARATRA;
    case "Orissa":
      return ORISSA;
    case "Punjab":
      return PUNJAB;
    case "Tamilnadu":
      return TAMILNADU;
    case "Telengana":
      return TELANGANA;
    case "WestBengal":
      return WESTBENGAL;
    default:
      return OTHERS;
  }
};

/**
 *
 * @returns [...list of states whre lwf rules are applicable]
 */

const getStatelist = async () => {
  const list = await mongoose.connection
    .collection("LWFStatesName")
    .find({})
    .toArray();
  list.forEach((item) => delete item._id);
  return list;
};

/**
 *
 * @param {*} statename
 * @returns {...all Lwf data for a particular state}
 */

const getDataFromLwf = async (statename) => {
  const res = await mongoose.connection
    .collection("LWF_Data")
    .find({ name: statename })
    .toArray();
  delete res[0]._id;
  delete res[0].minEmployee;
  delete res[0].name;
  delete res[0].categoryConstrain;
  return res[0];
};

/**
 *
 * @param {*} statename
 * @param {*} gross_salary
 * @param {*} employment_class
 * @param {*} employee_count
 * @returns [contribution of employee and employer ]
 */

const getContributionInLWF = async (
  statename,
  gross_salary,
  employment_class,
  employee_count
) => {
  const res = await mongoose.connection
    .collection("LWF_Data")
    .find({ name: statename })
    .toArray();

  const {
    employeeContribution,
    employerContribution,
    minEmployee,
    categoryConstrain,
  } = res[0]; //destructuring from the result got from database
  let yourContribution = 0;
  let yourEmployerContribution = 0;
  if (
    parseInt(employee_count) > parseInt(minEmployee) &&
    categoryConstrain.includes(employment_class)
  ) {
    yourContribution = lwfemployeeContributionHelper(
      statename,
      employeeContribution,
      gross_salary
    );
    if (statename == "Maharastra") {
      if (parseInt(gross_salary) > 3000) {
        yourEmployerContribution = (
          parseFloat(employerContribution[1] / 100) * gross_salary
        ).toFixed(2);
      } else {
        yourEmployerContribution = (
          parseFloat(employerContribution[1] / 100) * gross_salary
        ).toFixed(2);
      }
    } else {
      yourEmployerContribution = (
        parseFloat(employerContribution / 100) * gross_salary
      ).toFixed(2);
    }
  }

  return [yourContribution, yourEmployerContribution];
};
module.exports = {
  getDataFromLwf,
  optionHelperForLWF,
  getContributionInLWF,
  getStatelist,
};
