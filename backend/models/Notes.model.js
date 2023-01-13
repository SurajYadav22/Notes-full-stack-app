import mongoose from "mongoose";

const notesSchema = mongoose.Schema({
  title: String,
  note: String,
  category: String,
  author: String,
});

const NoteModel = mongoose.model("note", notesSchema);

export { NoteModel };
