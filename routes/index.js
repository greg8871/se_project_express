const express = require("express");

const router = express.Router();
const clothingItemsRouter = require("./clothingItems");
const usersRouter = require("./user");

const _404ErrorMessage = "Requested resource not found";

/* const clothingItemsController = require("../controllers/clothingItems"); */
/* const userController = require("../controllers/users"); */

/* router.get("/items", clothingItemsController.getClothingItems);
router.post("/items", clothingItemsController.createClothingItem);
router.delete("/items/:itemId", clothingItemsController.deleteClothingItem); */

router.use("/items", clothingItemsRouter);
router.use("/users", usersRouter);
router.use((req, res) => {
  res.status(404).send({ message: _404ErrorMessage });
});

module.exports = router;
