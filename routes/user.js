const express = require("express");
const userController = require("../controllers/users");

const router = express.Router();
const User = require("../models/user");
const errors = require("../utils/errors");

router.get("/users", userController.getUsers);
router.get("/users/:userId", userController.getUser);
router.post("/users", userController.createUser);
// Get all users
router.get("/", (req, res) => {
  User.find({})
    .then((users) => res.json(users))
    .catch((err) => errors.handleError(err, res));
});

//  specific user by id
router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(errors.NOT_FOUND).json({ message: "User not found" });
      }
      return res.json(user);
    })
    .catch((err) => errors.handleError(err, res));
});

// Create a new user
router.post("/", (req, res) => {
  User.create(req.body)
    .then((user) => res.status(201).json(user))
    .catch((err) => errors.handleError(err, res));
});

module.exports = router;
