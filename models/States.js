const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stateSchema = new Schema({
  name: String,
});

module.exports = mongoose.model("State", stateSchema);
