const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());
const NoteController = require("./Note");
mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("connected db");
});
app.use("/", NoteController);
app.listen("5000", () => console.log("Happy"));
