const mongoose = require("mongoose");

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
const getStatelist = async () => {
  const list = await mongoose.connection
    .collection("LWFStatesName")
    .find({})
    .toArray();
  list.forEach((item) => delete item._id);
  return list;
};

const getDataFromLwf = async (statename) => {
  const res = await mongoose.connection
    .collection("LWF_Data")
    .find({ name: statename })
    .toArray();
  delete res[0]._id;
  delete res[0].minEmployee;
  delete res[0].name;
  return res[0];
};
//return contribution of an employee
const getContributionInLWF = async (
  statename,
  gross_salary,
  employment_class
) => {
  const res = await mongoose.connection
    .collection("LWF_Data")
    .find({ name: statename })
    .toArray();
  console.log(res[0]);
  const { employeeContribution, employerContribution } = res[0];
  const yourContribution = (
    (parseFloat(employeeContribution) / 100) *
    gross_salary
  ).toFixed(2);
  const yourEmployerContribution = (
    parseFloat(employerContribution / 100) * gross_salary
  ).toFixed(2);
  return [yourContribution, yourEmployerContribution];
};
module.exports = {
  getDataFromLwf,
  optionHelperForLWF,
  getContributionInLWF,
  getStatelist,
};
