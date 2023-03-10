exports.BAD_REQUEST = 400;
exports.NOT_FOUND = 404;
exports.INTERNAL_SERVER_ERROR = 500;

// handleError function to return appropriate status code for different errors
exports.handleError = (err, res) => {
  switch (err.name) {
    case "NotFound":
      return res.status(exports.NOT_FOUND).send({ message: err.message });
    case "ValidationError":
      return res.status(exports.BAD_REQUEST).send({ message: "'Invalid data" });

    case "CastError":
      return res.status(exports.BAD_REQUEST).send({ message: "'Invalid data" });

    default:
      return res
        .status(exports.INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server." });
  }
};
