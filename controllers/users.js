const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const {
  INTERNAL_SERVER_ERROR,
  ALREADYEXITSERROR,
  NOT_FOUND,
  FORRBIDEN,
} = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  if (!password) {
    res
      .status(ALREADYEXITSERROR.error)
      .send({ message: "Password is required" });
  }

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then((user) => {
      res.send({ name, avatar, _id: user._id, email: user.email });
    })
    .catch((error) => {
      if (error.name === "ValidationError") {
        res
          .status(ALREADYEXITSERROR.error)
          .send({ message: "Invalid data provided" });
      } else if (error.code === 11000) {
        res
          .status(FORRBIDEN.error)
          .send({ message: "Email already exists in database" });
      } else {
        res
          .status(INTERNAL_SERVER_ERROR.error) // define what is SEFAULT_ERROR
          .send({ message: "An error has occurred on the server" });
      }
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        return res.status(401).send({ message: "Email or Password not found" });
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          res.status(401).send({ message: "Email or Password not found" });
        }

        const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "7d",
        });
        res.send({ token });
      });
    })
    .catch((err) => {
      console.error(err)
      if (err.statusCode === 401) {
        res.status(401).send({ message: "Email or Password not found" });
      } else {
        res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: "Internal server error" });
      }
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(() => {
      res
        .status(INTERNAL_SERVER_ERROR.error)
        .send({ message: "An error has occured on the server" });
    });
};

const updateUser = (req, res) => {
  const { name, avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND.error).send({ message: "User not found" });
      }

      res.status(200).send({ data: user });
    })
    .catch((error) => {
      if (error.name === "ValidationError") {
        res
          .status(ALREADYEXITSERROR.error)
          .send({ message: "Invalid data provided" });
      }

      res
        .status(INTERNAL_SERVER_ERROR.error)
        .send({ message: "An error has occurred on the server" });
    });
};

const getCurrentUser = (req, res) => {
  const { _id: userId } = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: "User not found" });
      } else {
        res.status(200).send({ data: user });
      }
    })
    .catch((error) => {
      if (error.name === "CastError") {
        res.status(400).send({ message: "Invalid user ID" });
      } else {
        res
          .status(500)
          .send({ message: "An error has occurred on the server" });
      }
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).send({ message: "Invalid user ID" });
  }

  User.findById(userId)
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND.error).send({ message: "User not found" });
      } else {
        res.status(200).send({ data: user });
      }
    })
    .catch((error) => {
      if (error.name === "CastError") {
        res
          .status(ALREADYEXITSERROR.error)
          .send({ message: "Invalid user ID" });
      } else {
        res
          .status(INTERNAL_SERVER_ERROR.error)
          .send({ message: "An error has occured on the server" });
      }
    });
};

module.exports = {
  createUser,
  updateUser,
  getCurrentUser,
  login,
  getUsers,
  getUser,
};
