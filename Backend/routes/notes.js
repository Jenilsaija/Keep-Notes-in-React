const express = require("express");
const router = express.Router();
//Import middleware and post model.
const fetchuser = require("../middlleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

//ROUTE-1: Get all the notes using: GET "/api/notes/fetchallnotes"
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    //this code fetch all notes from database.
    const note = await Note.find({ user: req.user.id });
    res.json(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

//ROUTE-2: Add a new notes using: POST "/api/notes/addnote"
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Please Enter a Valid title").isLength({ min: 3 }),
    body("description", "Description atlist 5 charecter").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //If there are errors return bed request and the errors.
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      //this code will be save notes.
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savenote = await note.save();
      res.json(savenote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//ROUTE-3: Update an existing notes using: put "/api/notes/updatenote"
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    //create new note object.
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //Find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    //it will check note is available or not.
    if (!note) {
      return res.status(404).send("Not Found");
    }
    //that will check operation performer is valid user or not.
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    //it will find using id and update it.
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

//ROUTE-4: delet an existing notes using: delete "/api/notes/deletenote" login require
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    //Find the note to be Deleted and Delete it
    let note = await Note.findById(req.params.id);
    //it will check note is available or not.
    if (!note) {
      return res.status(404).send("Not Found");
    }
    //that will check operation performer is valid user or not.
    //allow deletion only if user owns this note.
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    //it will find using id and update it.
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note Has Been Deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
