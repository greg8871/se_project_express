const {
  handleOnFailError,
  handleError,
  FORRBIDEN,
} = require("../utils/errors");
const ClothingItem = require("../models/clothingItem");

exports.getClothingItems = (req, res) => {
  ClothingItem.find()
    .then((items) => res.status(200).send(items))
    .catch((error) => handleError(error, res));
};

exports.createClothingItem = (req, res) => {
  const item = new ClothingItem({ ...req.body, owner: req.user._id });
  /*  item; */
  item
    .save()
    .then(() => res.status(201).send(item))
    .catch((error) => handleError(error, res));
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
  } catch (error) {
    handleError(error, res);
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
      ).orFail(() => {
        handleOnFailError();
      });

      res.status(200).send(result);
    } else {
      const err = new Error("Item not found");
      err.name = "NotFound";
      throw err;
    }
  } catch (error) {
    handleError(error, res);
  }
};
exports.deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
    .orFail(() => {
      handleOnFailError();
    })
    .then((item) => {
      if (item.owner.equals(req.user._id)) {
        return item.remove(() => res.send({ clothingItem: item }));
      }
      return res
        .status(FORRBIDEN)
        .send({ message: "You do not have permission" });
    })
    .catch((error) => {
      handleError(error, res);
    });
};
