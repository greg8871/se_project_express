const express = require("express");

const router = express.Router();
const errors = require("../utils/errors");

const clothingItemController = require("../controllers/clothingItem");
const userController = require("../controllers/user");

router.get("/user", userController.getUsers);
router.get("/user/:userId", userController.getUser);
router.post("/user", userController.createUser);

router.get("/items", clothingItemController.getClothingItem);
router.post("/items", clothingItemsController.createClothingItem);
router.delete("/items/:itemId", clothingItemsController.deleteClothingItem);

router.use((req, res) => {
  res.status(errors.NOT_FOUND).json({
    message: "Requested resource not found",
  });
});

module.exports = router;
