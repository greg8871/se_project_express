const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { UNAUTHORIZED } = require("../utils/errors");

const handleAuthenticationError = (res) =>
  res.status(UNAUTHORIZED).send({ message: "Authorization required" });

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer")) {
    handleAuthenticationError(res);
  }
  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      return res.status(401).send({ message: "Invalid token" });
    }
    if (err.name === "TokenExpiredError") {
      return res.status(401).send({ message: "Token expired" });
    }
    return res.status(FORBIDDEN_ERROR.error).send({ message: "Bad request" });
  }

  req.user = payload;

  next();

  return null;
};

module.exports = {
  handleAuthenticationError,
};