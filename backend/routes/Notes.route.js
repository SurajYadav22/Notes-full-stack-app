import express from "express";
import { NoteModel } from "../models/Notes.model.js";

const notesRouter = express.Router();

notesRouter.get("/", async (req, res) => {
  res.send("All notes");
});

notesRouter.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const new_note = new NoteModel(payload);
    await new_note.save();
    res.send({ status: "success", message: "Notes has been created" });
  } catch (error) {
    res.send({ message: "Something went wrong" });
  }
});

notesRouter.patch("/patch/:id", async (req, res) => {
  res.send("Post updated");
});

notesRouter.delete("/delete/:id", (req, res) => {
  res.send("Post deleted");
});

export { notesRouter };
