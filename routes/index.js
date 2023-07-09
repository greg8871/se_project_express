const router = require("express").Router();
const auth = require("../middlewares/auth");

const user = require("./user");
const {login} = require("../controllers/users");
const clothingItem = require("./clothingItems");
const NotFoundError = require("../errors/not-found");
const { createUser } = require("../controllers/users");
router.post("/signup", createUser);
router.post("/signin", login);
router.use("/items", clothingItem);
router.use("/users", auth, user);

router.use(auth, (req, res, next) => {
  next(new NotFoundError(`That route doesn't exist`));
});

module.exports = router;
