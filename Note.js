const express = require("express");
const route = express.Router();
const NoteModel = require("./model/note");
route.get("/", async (req, res) => {
    res.json({ message: "hi" });
});

route.post("/add", async (req, res) => {
    try {
        const { userId, title } = req.body;
        const newTodo = new NoteModel({ userId, title });
        await newTodo.save();
        res.status(201).json({ message: "Todo saved successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Error saving todo" });
    }
});

route.get("/get", async (req, res) => {
    try {
        const todos = await NoteModel.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: "Error fetching todos" });
    }
});

route.delete("/delete/:id", async (req, res) => {
    try {
        const todoId = req.params.id;
        const deletedTodo = await NoteModel.findByIdAndDelete(todoId);
        if (!deletedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.status(200).json({ message: "Todo deleted successfully!" });
    } catch (error) {
        console.error("Error deleting todo:", error); // Log the error for debugging
        res.status(500).json({ error: "Error deleting todo" });
    }
});

route.delete("/deletedataall", async (req, res) => {
    try {
        const result = await NoteModel.deleteMany({}); // Delete all documents
        console.log("Deleted count:", result.deletedCount);
        res.json({ message: "All data deleted successfully" });
    } catch (error) {
        console.error("Error deleting all data:", error);
        res.status(500).json({ message: "Error deleting all data" });
    }
});

module.exports = route;
