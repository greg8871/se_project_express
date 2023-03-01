const express = require("express").Router();
const ClothingItem = require("../models/clothingItem");
const errors = require("../utils/errors");

// Get all
router.get("/", (req, res) => {
  ClothingItem.find((err, items) => {
    if (err) return errors.handleError(err, res);
    return res.status(200).send(items);
  });
});

// Create a new
router.post("/", (req, res) => {
  const items = new ClothingItem(req.body);
  item.save((err) => {
    if (err) return errors.handleError(err, res);
    return res.status(201).send(items);
  });
});

// Delete
router.delete("/:itemId", (req, res) => {
  ClothingItem.findByIdAndRemove(req.params.itemId, (err, items) => {
    if (err) return errors.handleError(err, res);
    if (!items)
      return res
        .status(errors.NOT_FOUND)
        .send({ message: "Requested resource not found" });
    return res.status(200).send({ message: "Successfully deleted" });
  });
});

// like
router.put("/:itemId/likes", (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
    (err, item) => {
      if (err) return errors.handleError(err, res);
      return res.status(200).send(item);
    }
  );
});

// unlike
router.delete("/:itemId/likes", (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true },
    (err, item) => {
      if (err) return errors.handleError(err, res);
      return res.status(200).send(item);
    }
  );
});
