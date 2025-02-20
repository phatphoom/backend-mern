const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
    userId: Number,
    title: String,
});

const NoteModel = mongoose.model("Note", NoteSchema);

module.exports = NoteModel;
