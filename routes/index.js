const router = require("express").Router();
const clothingItem = require("./clothingItems");
const user = require("./user");
const { NOT_FOUND } = require("../utils/errors");
const { createUser, login } = require("../controllers/users");
const auth = require("../middlewares/auth");

router.use("/items", clothingItem);
router.use("/user", auth.handleAuthenticationError, user);
router.post("/signup", createUser);
router.post("/signin", login);


  router.use((req, res) => {
    res.status(NOT_FOUND.error).send({ message: "Router not found" });
});

module.exports = router;