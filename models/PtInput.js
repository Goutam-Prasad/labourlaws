const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PtInputSchema = new Schema({
  state: String,
  dueDate: String,
  frequency: String,
  Website: String,
});

module.exports = mongoose.model("PtInput", PtInputSchema);
