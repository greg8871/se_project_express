/* const express = require("express");

const router = express.Router();
const clothingItemsRouter = require("./clothingItems");
const usersRouter = require("./user");

const ErrorMessageNotFound = "Requested resource not found";

router.use("/items", clothingItemsRouter);
router.use("/users", usersRouter);
router.use((req, res) => {
  res.status(404).send({ message: ErrorMessageNotFound });
});

module.exports = router; */
