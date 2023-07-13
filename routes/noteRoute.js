const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const noteController = require('../controllers/noteController');

router.route('/')
  .get(verifyToken, noteController.getAllNotes)
  .post(verifyToken, noteController.createNewNote)
  .patch(verifyToken, noteController.updateNote)
  .delete(verifyToken, noteController.deleteNote);

module.exports = router;


// const express = require("express");
// const router = express.Router();
// const noteController = require("./../controllers/noteController");

// router.post("/notes", noteController.createNote);

// router.get("/notes", noteController.getAllNotes);

// router.get("/notes/:id", noteController.getNote);

// router.patch("/notes/:id", noteController.updateNote);

// router.delete("/notes/:id", noteController.deleteNote);

// module.exports = router;
