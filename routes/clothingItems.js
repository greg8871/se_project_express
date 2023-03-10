const express = require("express");
const clothingItemsController = require("../controllers/clothingItems");
/* const ClothingItem = require("../models/clothingItem");
const errors = require("../utils/errors"); */
const router = express.Router();

router.get("/", clothingItemsController.getClothingItems);

router.post("/", clothingItemsController.createClothingItem);

router.delete("/:itemId", clothingItemsController.deleteClothingItem);

router.put("/:itemId/likes", clothingItemsController.likeItem);

router.delete("/:itemId/likes", clothingItemsController.dislikeItem);

module.exports = router;
