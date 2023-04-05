const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const FORRBIDEN = 403;
const NOT_FOUND = 404;
const ALREADYEXITSERROR = 409;
const INTERNAL_SERVER_ERROR = 500;

// handleError function to return appropriate status code for different errors
const handleOnFailError = () => {
  const error = new Error("Requested resource not found");
  error.statusCode = 404;
  error.name = "NotFound";
  throw error;
};
const handleError = (err, res) => {
  switch (err.name) {
    case "NotFound":
      return res.status(NOT_FOUND).send({ message: err.message });
    case "ForBidden":
      return res.status(FORRBIDEN).send({ message: "'This is forbidden" });
    case "AlreadyExistsError":
      return res
        .status(ALREADYEXITSERROR)
        .send({ message: "'Email already exists" });
    case "Unauthorized":
      return res
        .status(UNAUTHORIZED)
        .send({ message: "'You are not authorized to do that" });
    case "ValidationError":
      return res.status(BAD_REQUEST).send({ message: "'Invalid data" });

    case "CastError":
      return res.status(BAD_REQUEST).send({ message: "'Invalid data" });

    default:
      return res
        .status(exports.INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server." });
  }
};
module.exports = {
  handleOnFailError,
  handleError,
  FORRBIDEN,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  UNAUTHORIZED,
  BAD_REQUEST,
  ALREADYEXITSERROR,
};
