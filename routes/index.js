const router = require("express").Router();
const auth = require("../middlewares/auth");

const user = require("./user");

const clothingItem = require("./clothingItems");
const NotFoundError = require("../errors/not-found");



router.use("/items", clothingItem);
router.use("/users", auth, user);

router.use(auth, (req, res, next) => {
  next(new NotFoundError(`That route doesn't exist`));
});

module.exports = router;
