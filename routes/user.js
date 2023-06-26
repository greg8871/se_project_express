const router = require("express").Router();
const { updateUser } = require("../controllers/users");
const auth = require("../middlewares/auth");
const {
    getCurrentUser,
    getUsers,
    getUser,
  } = require("../controllers/users");

  router.get("/me", auth, getCurrentUser);

  router.patch("/me", auth, updateUser);
  
  router.get("/", auth, getUsers);
  
  router.get("/:userId", auth, getUser);
  
  module.exports = router;