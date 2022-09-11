const mongoose = require("mongoose");
const PtInput = require("../models/PtInput");
const State = require("../models/States");
const states = require("./stateseeds");
const stateNames = require("./statesnameseeds");
const dbUrl = process.env.MONGO
const db = mongoose.connection;
mongoose.connect(dbUrl);
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database Connected");
});

const stateValuesArray = Object.values(states);
const statename = Object.values(stateNames);
// console.log(stateValuesArray);
const seedsDB = async () => {
  await PtInput.deleteMany({});
  await State.deleteMany({});
  for (let elem = 0; elem < stateValuesArray.length; elem++) {
    const newEntry = new PtInput({
      state: stateValuesArray[elem].name,
      frequency: stateValuesArray[elem].frequency,
      dueDate: stateValuesArray[elem].dueDate,
      Website: stateValuesArray[elem].Website,
    });
    await newEntry.save();
  }
  for (let elem = 0; elem < statename.length; elem++) {
    const stateNameEntry = new State({
      name: statename[elem].name,
    });
    await stateNameEntry.save();
  }
};

seedsDB()
  .then(() => {
    db.close();
    console.log("Database Connection Closed");
  })
  .catch((err) => {
    console.log(err);
  });
