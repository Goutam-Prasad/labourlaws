/**
 * 
 * @param {*} statename 
 returns [...options per state]
 */

const { mongoose } = require("mongoose");
const {
  ANDHRA_PRADESH_OPTIONS,
  ANDAMAN_OPTIONS,
  ARUNACHAL_PRADESH_OPTIONS,
  ASSAM_OPTIONS,
  BIHAR_OPTIONS,
  CHANDIGARH_OPTIONS,
  CHATTISGARH_OPTIONS,
  GOA_OPTIONS,
  HARYANA_OPTIONS,
  DELHI_OPTIONS,
  DADRA_AND_NAGAR_OPTIONS,
  DAMAN_AND_DIU_OPTIONS,
  GUJRAT_OPTIONS,
  HIMACHAL_OPTIONS,
  J_AND_K_OPTIONS,
  JHARKHAND_OPTIONS,
  KARNATAKA_OPTIONS,
  KERALA_OPTIONS,
  MP_OPTIONS,
  MEGHALAYA_OPTIONS,
  MIZORAM_OPTIONS,
  NAGALAND_OPTIONS,
  ORISSA_OPTIONS,
  PUDUCHERRY_OPTIONS,
  PUNJAB_OPTIONS,
  RAJASTHAN_OPTIONS,
  SIKKIM_OPTIONS,
  TN_OPTIONS,
  TELENGANA_OPTIONS,
  UTTARAKHAND_OPTIONS,
  WB_OPTIONS,
  MH_OPTIONS,
  MANIPUR_OPTIONS,
} = require("./constants");

const optionHelper = (statename) => {
  switch (statename) {
    case "AndhraPradesh":
      return ANDHRA_PRADESH_OPTIONS;
    case "Andaman&Nicobar":
      return ANDAMAN_OPTIONS;
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
      return DADRA_AND_NAGAR_OPTIONS;
    case "DamanandDiu":
      return DAMAN_AND_DIU_OPTIONS;
    case "Goa":
      return GOA_OPTIONS;
    case "Haryana":
      return HARYANA_OPTIONS;
    case "Delhi":
      return DELHI_OPTIONS;
    case "Gujrat":
      return GUJRAT_OPTIONS;
    case "HimachalPradesh":
      return HIMACHAL_OPTIONS;
    case "JammuandKashmir":
      return J_AND_K_OPTIONS;
    case "Jharkhand":
      return JHARKHAND_OPTIONS;
    case "Karnataka":
      return KARNATAKA_OPTIONS;
    case "Kerala":
      return KERALA_OPTIONS;
    case "MadhyaPradesh":
      return MP_OPTIONS;
    case "Maharastra":
      return MH_OPTIONS;
    case "Manipur":
      return MANIPUR_OPTIONS;
    case "Meghalaya":
      return MEGHALAYA_OPTIONS;
    case "Mizoram":
      return MIZORAM_OPTIONS;
    case "Nagaland":
      return NAGALAND_OPTIONS;
    case "Orissa":
      return ORISSA_OPTIONS;
    case "Puducherry":
      return PUDUCHERRY_OPTIONS;
    case "Punjab":
      return PUNJAB_OPTIONS;
    case "Rajasthan":
      return RAJASTHAN_OPTIONS;
    case "Sikkim":
      return SIKKIM_OPTIONS;
    case "Tamilnadu":
      return TN_OPTIONS;
    case "Telengana":
      return TELENGANA_OPTIONS;
    case "Uttarakhand":
      return UTTARAKHAND_OPTIONS;
    case "WestBengal":
      return WB_OPTIONS;
    default:
      return [];
  }
};
//get effective date of the state when the rule was estalished
const getMinWageRuleEffectiveDate = async (statename) => {
  const res = await mongoose.connection
    .collection("minwagedate")
    .find({ name: statename })
    .toArray();
  delete res[0]._id;
  delete res[0].name;
  return res[0];
};
// return options according to the field
const getDataFromOptions = async (statename, option) => {
  const res = await mongoose.connection.collection(statename).distinct(option);
  return res;
};

//returns wage details of the entered state
const sendWageData = async (statename, options) => {
  const res = await mongoose.connection
    .collection(statename)
    .find(options)
    .toArray();
  if (res.length == 0) {
    return { Error: "Result not found" };
  }
  delete res[0]._id;
  const result = await getMinWageRuleEffectiveDate(statename);
  res[0]["Effective from Date"] = Object.values(result);
  return res[0];
};

module.exports = {
  optionHelper,
  getDataFromOptions,
  sendWageData,
};
