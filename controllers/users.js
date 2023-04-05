const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
/* const errors = require("../utils/errors"); */
const { JWT_SECRET } = require("../utils/config");

const { handleOnFailError, handleError } = require("../utils/errors");

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  User.findOne({ email }).then((user, err) => {
    if (err) {
      return res.status(500).send({ message: "A server error has occured" });
    }

    if (user) {
      const error = new Error("User with this email already exists");
      error.name = "AlreadyExistsError";
      throw error;
    }
    return bcrypt.hash(password, 10).then((hash) => {
      User.create({ name, avatar, email, password: hash })
        .then((item) =>
          res /* setHeader("Content-Type", "application/json") */
            .status(201)
            .send({
              name: item.name,
              avatar: item.avatar,
              email: item.email,
            })
        )
        .catch((err2) => {
          handleError(err2, res);
        });
    });
  });
};

const getCurrentUser = async (req, res, next, ERROR_CODES) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        res.status(ERROR_CODES.NotFound).send({ message: "User not found" });
      }
      res.status(ERROR_CODES.Ok).send(user);
    })
    .catch((error) => {
      if (error.name === "CastError") {
        res.status(ERROR_CODES.NotFound).send({ message: "User not found" });
      } else {
        next(error);
      }
    });
};

const updateUser = (req, res) => {
  const { name, avatar, _id } = req.body;

  User.findByIdAndUpdate(
    { _id },
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail(handleOnFailError)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      handleError(err, res);
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "7d",
        }),
      });
    })
    .catch((err) => {
      handleError(err, res);
    });
};

module.exports = { createUser, getCurrentUser, updateUser, login };
