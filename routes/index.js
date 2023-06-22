const router = require("express").Router();
const handleError = require("../utils/errors");
const { createUser, login } = require("../controllers/users");

router.post("/signup", createUser);
router.post("/signin", login);

router.use("/items", require("./clothingItems"));
router.use("/user", require("./user"));

router.use((req, res) => {
  const error = new Error("Requested resource not found.");
  error.name = "DocumentNotFoundError";

  handleError(error, res);
});

module.exports = router;