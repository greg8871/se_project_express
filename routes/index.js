const express = require("express");

const router = express.Router();
const clothingItemsRouter = require("./clothingItems");
const errors = require("../utils/errors");

const clothingItemsController = require("../controllers/clothingItems");
const userController = require("../controllers/users");

router.get("/users", userController.getUsers);
router.get("/users/:userId", userController.getUser);
router.post("/users", userController.createUser);

router.get("/items", clothingItemsController.getClothingItems);
router.post("/items", clothingItemsController.createClothingItem);
router.delete("/items/:itemId", clothingItemsController.deleteClothingItem);

router.use("/items", clothingItemsRouter);

router.use((req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

module.exports = router;
