/**
 * 
 * @param {*} statename 
 returns [...options per state]
 */

const { mongoose } = require("mongoose");
const {
  ANDHRA_PRADESH_OPTIONS,
  ARUNACHAL_PRADESH_OPTIONS,
  ASSAM_OPTIONS,
  BIHAR_OPTIONS,
  CHANDIGARH_OPTIONS,
  CHATTISGARH_OPTIONS,
  GOA_OPTIONS,
  HARYANA_OPTIONS,
  DELHI_OPTIONS,
} = require("./constants");

const optionHelper = (statename) => {
  switch (statename) {
    case "AndhraPradesh":
      return ANDHRA_PRADESH_OPTIONS;
    case "Andaman&Nicobar":
      return [];
    case "ArunachalPradesh":
      return ARUNACHAL_PRADESH_OPTIONS;
    case "Assam":
      return ASSAM_OPTIONS;
    case "Bihar":
      return BIHAR_OPTIONS;
    case "Chandigarh":
      return CHANDIGARH_OPTIONS;
    case "Chattisgarh":
      return CHATTISGARH_OPTIONS;
    case "DadraandNagarHaveli":
      return;
    case "DamanandDiu":
      return;
    case "Delhi":
      return;
    case "Goa":
      return GOA_OPTIONS;
    case "Haryana":
      return HARYANA_OPTIONS;
    case "Delhi":
      return DELHI_OPTIONS;
    default:
      return [];
  }
};

// return options according to the field
const getDataFromOptions = async (statename, option) => {
  const res = await mongoose.connection.collection(statename).distinct(option);
  return res;
};

//returns
const sendWageData = async (statename, options) => {
  console.log(options, statename);
  const res = await mongoose.connection
    .collection(statename)
    .find(options)
    .toArray();
  if (res.length == 0) {
    return { Error: "Result not found" };
  }
  delete res[0]._id;
  return res[0];
};

module.exports = {
  optionHelper,
  getDataFromOptions,
  sendWageData,
};
