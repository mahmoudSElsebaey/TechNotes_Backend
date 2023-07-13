const Note = require("../models/Note");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

const getAllNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find().lean();

  if (!notes?.length) {
    return res.status(400).json({ message: "No notes found" });
  }

  const notesWithUser = await Promise.all(
    notes.map(async (note) => {
      const user = await User.findById(note.user).lean().exec();
      return { ...note, username: user.username };
    })
  );

  res.json(notesWithUser);
});

const createNewNote = asyncHandler(async (req, res) => {
  const { user, title, text } = req.body;
  if (!user || !title || !text) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const duplicate = await Note.findOne({ title })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();
  if (duplicate !== null) {
    return res.status(409).json({ message: "Duplicate note title" });
  }

  const noteObject = { user, title, text };
  const newNote = await Note.create(noteObject);

  console.log(newNote);

  if (newNote) {
    // Created
    return res.status(201).json({ message: "New note created" });
  } else {
    return res.status(400).json({ message: "Invalid note data received" });
  }
});

const updateNote = asyncHandler(async (req, res) => {
  const { id, user, title, text, completed } = req.body;

  if (!id || !user || !title || !text || typeof completed !== "boolean") {
    return res.status(400).json({ message: "All fields are required" });
  }

  const note = await Note.findById(id).exec();

  if (!note) {
    return res.status(400).json({ message: "Note not found" });
  }

  const duplicate = await Note.findOne({ title })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate note title" });
  }

  note.user = user;
  note.title = title;
  note.text = text;
  note.completed = completed;

  const updatedNote = await note.save();

  res.json(`'${updatedNote.title}' updated`);
});

const deleteNote = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Note ID required" });
  }

  const note = await Note.findById(id).exec();

  if (!note) {
    return res.status(400).json({ message: "Note not found" });
  }

  const result = await note.deleteOne();

  const reply = `Note '${result.title}' with ID ${result._id} deleted`;

  res.json(reply);
});

module.exports = {
  getAllNotes,
  createNewNote,
  updateNote,
  deleteNote,
};

// const Note = require("../models/note");

// //>>>>>>>>>>> POST/CREATE DATA
// const createNote = async (req, res) => {
//   try {
//     const note = new Note({ ...req.body, user: req.user._id });
//     await note.save();
//     res.status(200).send(note);
//   } catch (e) {
//     res.status(400).send(e.message);
//   }
// };

// //>>>>>>>>>>> Get all data
// const getAllNotes = async (req, res) => {
//   try {
//     await req.user.populate("notes");
//     res.status(200).send(req.user.notes);
//   } catch (e) {
//     res.status(500).send(e.message);
//   }
// };

// //>>>>>>>>>>> Get data by id
// const getNote = async (req, res) => {
//   try {
//     const _id = req.params.id;
//     const note = await Note.findOne({ _id, user: req.user.id });
//     if (!note) {
//       return res.status(404).send("Unable to find note");
//     }
//     await note.populate("user");
//     res.status(200).send(note);
//   } catch (e) {
//     res.status(500).send(e.message);
//   }
// };

// //>>>>>>>>>>> PATCH/UPDATE DATA ==> by id
// const updateNote = async (req, res) => {
//   try {
//     const _id = req.params.id;
//     const note = await Note.findOneAndUpdate(
//       { _id, user: req.user.id },
//       req.body,
//       {
//         new: true,
//         runValidators: true,
//       }
//     );
//     if (!note) {
//       return res.status(404).send("Unable to find note");
//     }
//     res.status(200).send(note);
//   } catch (e) {
//     res.status(500).send(e.message);
//   }
// };

// //>>>>>>>>>>> DELETE/REMOVE DATA  ===> by id
// const deleteNote = async (req, res) => {
//   try {
//     const _id = req.params.id;
//     const note = await Note.findOneAndDelete({ _id, user: req.user.id });
//     if (!note) {
//       return res.status(404).send("Unable to find note");
//     }
//     res.status(200).send(note);
//   } catch (e) {
//     res.status(500).send(e.message);
//   }
// };

// module.exports = {
//   createNote,
//   getAllNotes,
//   getNote,
//   updateNote,
//   deleteNote,
// };
