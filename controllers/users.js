const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
/* const errors = require("../utils/errors"); */
const { JWT_SECRET } = require("../utils/config");

const { handleOnFailError, handleError } = require("../utils/errors");

const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        const error = new Error("User with this email already exists");
        return next(error);
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
    })
    .catch((err) => {
      handleError(err, res);
    });
};

const getCurrentUser = async (req, res) => {
  User.findById(req.user._id)
    .orFail(handleOnFailError)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      handleError(err, res);
    });
};

const updateUser = (req, res) => {
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    { _id: req.user._id },
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail(handleOnFailError)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      handleError(err, res);
    });
};

const login = (req, res,) => {
  
  const { email, password } = req.body;
 

  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "7d",
        }),
      });
    })
    .catch((error) => {
      // const err = new Error();
      
      // err.name = "Unauthorized";

      handleError(error, res);
    });
};

module.exports = { createUser, getCurrentUser, updateUser, login,};
