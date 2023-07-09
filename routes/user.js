const router = require("express").Router();
const { updateUser } = require("../controllers/users");
const auth = require("../middlewares/auth");
const {
    getCurrentUser,
    
  
  } = require("../controllers/users");
  const { validateUserUpdate } = require("../middlewares/validation");

  
  router.get("/me", auth, getCurrentUser);

  router.patch("/me", auth, validateUserUpdate, updateUser);
  
  
  
  
  module.exports = router;