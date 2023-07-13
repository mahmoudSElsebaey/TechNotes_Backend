const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const usersController = require('../controllers/userController');

router.route('/')
  .get(verifyToken, usersController.getAllUsers)
  .post(verifyToken, usersController.createNewUser)
  .patch(verifyToken, usersController.updateUser)
  .delete(verifyToken, usersController.deleteUser);

module.exports = router;


// const express = require("express");
// const router = express.Router();
// const userController = require("./../controllers/userController");

// router.post("/users", userController.createUser);

// router.get("/users", userController.getAllUsers);

// router.get("/users/:id", userController.getUser);

// router.patch("/users/:id", userController.updateUser);

// router.delete("/users/:id", userController.deleteUser);

// module.exports = router;
