const router = require("express").Router();
const { updateUser } = require("../controllers/users");
const auth = require("../middlewares/auth");
const {
    getCurrentUser,
    getUsers,
    getUser,
  } = require("../controllers/users");
  router.get("/me", auth.handleAuthenticationError, getCurrentUser);

  router.patch("/me", auth.handleAuthenticationError, updateUser);
  
  router.get("/", getUsers);
  
  router.get("/:userId", getUser);
  
  module.exports = router, handleAuthenticationError ;