import Note from "../models/Note.js";

export async function getAllNotes(_, res) {
  try {
    const notes =await Note.find().sort({ createdAt: -1 }) // Sort by creation date, newest first
    res.status(200).json(notes)
    console.log("Notes retrieved successfully:", notes)
  } catch (error) {
    console.error("Error in getAllNotes controller:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

export async function getNoteById(req, res) {
  try { 
    const note =await Note.findById(req.params.id)
    if (!note) return res.status(404).json({ message: "Note not found" })
    res.status(200).json(note)
    console.log("Note retrieved successfully:", note)
  } catch (error) {
    console.error("Error in getNoteById controller:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

export async function createNote(req, res)  {
  try {
    const { title, content } = req.body 
    const newNote = new Note({ title, content })
    await newNote.save()
    res.status(201).json({ message: "your note has been created successfully", note: newNote })
  } catch (error) {
    console.error("Error in createNote controller:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}
 
export async function updateNote(req, res) {
  try {
    const { title, content } = req.body
    const id = req.params.id
    const updatedNote = await Note.findByIdAndUpdate(id, { title, content }, { new: true })
    if (!updatedNote) return res.status(404).json({ message: "Note not found" })
    res.status(200).json({ message: "your note has been updated successfully", note: updatedNote })
  } catch (error) {
    console.error("Error in updateNote controller:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

export async function deleteNote(req, res) {
  try {
    const id = req.params.id
    const deletedNote = await Note.findByIdAndDelete(id)
    if (!deletedNote) return res.status(404).json({ message: "Note not found" })
    res.status(200).json({ message: "your note has been deleted successfully", note: deletedNote })
  } catch (error) {
    console.error("Error in deleteNote controller:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}  