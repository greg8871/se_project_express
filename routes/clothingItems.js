const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  createClothingItem,
  getClothingItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

router.post("/", auth, createClothingItem);
router.get("/", auth, getClothingItems);
router.put("/:itemId/likes", auth, likeItem);
router.delete("/:itemId/likes", auth, dislikeItem);
router.delete("/:itemId", auth, deleteItem);

module.exports = router;
