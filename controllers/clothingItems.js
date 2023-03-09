const errors = require("../utils/errors");
const ClothingItem = require("../models/clothingItem");

exports.getClothingItems = (req, res) => {
  ClothingItem.find()
    .then((items) => res.status(200).send(items))
    .catch((error) => errors.handleError(error, res));
};

exports.createClothingItem = (req, res) => {
  const item = new ClothingItem({ ...req.body, owner: req.user._id });
  /*  item; */
  item
    .save()
    .then(() => res.status(201).send(item))
    .catch((error) => errors.handleError(error, res));
};
exports.deleteClothingItem = async (req, res) => {
  try {
    const item = await ClothingItem.findById(req.params.itemId);

    if (item) {
      const result = await ClothingItem.findByIdAndRemove({
        _id: req.params.itemId,
        owner: req.user._id,
      });
      res.status(200).send(result);
    } else {
      res.status(errors.NOT_FOUND).send({ message: "Resource not found" });
    }
  } catch (err) {
    errors.handleError(err, res);
  }
};

exports.likeItem = async (req, res) => {
  try {
    const item = await ClothingItem.findById(req.params.itemId);

    if (item) {
      const result = await ClothingItem.findByIdAndUpdate(
        req.params.itemId,
        { $addToSet: { likes: req.user._id } },
        { new: true }
      );
      res.status(200).send(result);
    } else {
      const err = new Error("Item not found");
      err.name = "NotFound";
      throw err;
    }
  } catch (err) {
    errors.handleError(err, res);
  }
};
exports.dislikeItem = async (req, res) => {
  try {
    const item = await ClothingItem.findById(req.params.itemId);

    if (item) {
      const result = await ClothingItem.findByIdAndUpdate(
        req.params.itemId,
        { $pull: { likes: req.user._id } },
        { new: true }
      );
      res.status(200).send(result);
    } else {
      const err = new Error("Item not found");
      err.name = "NotFound";
      throw err;
    }
  } catch (err) {
    errors.handleError(err, res);
  }
};
