const router = require("express").Router();
const {
  updateUser,
  getCurrentUser,
  createUser,
} = require("../controllers/users");
const auth = require("../middlewares/auth");

router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, updateUser);
router.post("/", createUser);

module.exports = router;
