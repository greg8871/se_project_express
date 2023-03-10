const User = require("../models/user");
const errors = require("../utils/errors");

exports.getUsers = function (req, res) {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => errors.handleError(err, res));
};

exports.getUser = async function (req, res) {
  try {
    const user = await User.findById(req.params.userId);

    if (user) {
      return res.send(user);
    }
    const err = new Error("User not found");
    err.name = "NotFound";
    throw err;
  } catch (err) {
    return errors.handleError(err, res);
  }
};
exports.createUser = function (req, res) {
  User.create({ name: req.body.name, avatar: req.body.avatar })
    .then((items) => res.status(200).send(items))
    .catch((err) => errors.handleError(err, res));
};
exports.getAllUsers = function (req, res) {
  User.find({})
    .then((users) => res.json(users))
    .catch((err) => errors.handleError(err, res));
};
