const User = require("../models/user");
const errors = require("../utils/errors");

exports.getUsers = function (req, res) {
  User.find({})
    .orFail(new Error("Users not found"))
    .exec((err, users) => {
      if (err) {
        return errors.handleError(err, res);
      }
      res.send(users);
    });
};

exports.getUser = async function (req, res) {
  try {
    const user = await User.findById(req.params.userId);

    if (user) {
      res.send(user);
    } else {
      const err = new Error("User not found");
      err.name = "NotFound";
      errors.handleError(err, res);
    }
  } catch (err) {
    return errors.handleError(err, res);
  }
};
exports.createUser = function (req, res) {
  User.create(req.body)
    .then((items) => res.status(200).send(items))
    .catch((err) => errors.handleError(err, res));
};
