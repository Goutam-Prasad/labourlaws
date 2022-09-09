const mongoose = require("mongoose");
const PtInput = require("../models/PtInput");
const states = require("./state");
const dbUrl = "mongodb://localhost:27017/test";
const db = mongoose.connection;
mongoose.connect(dbUrl);
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database Connected");
});

const stateValuesArray = Object.values(states);
// console.log(stateValuesArray);
const seedsDB = async () => {
  await PtInput.deleteMany({});
  for (let elem = 0; elem < stateValuesArray.length; elem++) {
    const newEntry = new PtInput({
      state: stateValuesArray[elem].name,
      frequency: stateValuesArray[elem].frequency,
      dueDate: stateValuesArray[elem].dueDate,
      Website: stateValuesArray[elem].Website,
    });
    await newEntry.save();
  }
  // const c = new PtInput({
  //   state: "a",
  //   frequency: "b",
  //   dueDate: "12th",
  //   Website: "ddd.com",
  // });
  // await c.save();
};

seedsDB()
  .then((result) => {
    db.close();
  })
  .catch((err) => {
    console.log(err);
  });
