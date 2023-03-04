const express = require("express");
const clothingItemsController = require("../controllers/clothingItems");
const ClothingItem = require("../models/clothingItem");
const errors = require("../utils/errors");
const router = express.Router();
// Get all
router.get("/", clothingItemsController.getClothingItems);

// Create a new
router.post("/", clothingItemsController.createClothingItem);
/* router.post("/", (req, res) => {
  const item = new ClothingItem(req.body);
  item.save((err) => {
    if (err) return errors.handleError(err, res);
    return res.status(201).send(item);
  });
}); */

// Delete
router.delete(":itemId", clothingItemsController.deleteClothingItem);
/* router.delete("/:itemId", (req, res) => {
  ClothingItem.findByIdAndRemove(req.params.itemId, (err, item) => {
    if (err) return errors.handleError(err, res);
    if (!item)
      return res
        .status(errors.NOT_FOUND)
        .send({ message: "Requested resource not found" });
    return res.status(200).send({ message: "Successfully deleted" });
  });
}); */

// like
router.put("/:itemId/likes", clothingItemsController.likeItem);
/* router.put("/:itemId/likes", (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
    (err, item) => {
      if (err) return errors.handleError(err, res);
      return res.status(200).send(item);
    }
  );
}); */

// unlike
router.delete("/:itemId/likes", clothingItemsController.dislikeItem);
/* router.delete("/:itemId/likes", (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true },
    (err, item) => {
      if (err) return errors.handleError(err, res);
      return res.status(200).send(item);
    }
  );
}); */
module.exports = router;
