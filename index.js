const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const NoteController = require("./Note");

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/api", NoteController);

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("connected db");
});
const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Happy"));
module.exports = app;
