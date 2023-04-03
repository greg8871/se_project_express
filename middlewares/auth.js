const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { ERROR_CODES } = require("../utils/errors");

const handleAuthenticationError = (res) => {
  res
    .status(ERROR_CODES.Unauthorized)
    .send({ message: "Authorization required" });
};

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer")) {
    handleAuthenticationError(res);
  }
  const token = authorization.replace("Bearer", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    handleAuthenticationError(res);
  }

  req.user = payload;

  return next();
};
