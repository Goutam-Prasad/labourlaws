const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const indexRouter = require("./routes");
app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.set("views", path.join(__dirname, "views"));
app.use(indexRouter);
//connection
const db = mongoose.connection;
const dbUrl =
  "mongodb+srv://goutam_prasad:Gout%40m1997@cluster0.4xjno.mongodb.net/labourLaws";

mongoose.connect(dbUrl);
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database Connected");
});

app.listen("3000", () => {
  console.log(`Listening to Port 3000`);
});
