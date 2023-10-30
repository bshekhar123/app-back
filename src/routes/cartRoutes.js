const express = require('express');
const { verifyToken } = require('../middleware/auth');
const { cartGrid, updateCount, addToCart, removeFromCart } = require('../controller/CartController');
const router3 = express.Router();

router3.get("/cart/grid", verifyToken, cartGrid);
router3.post("/cart/update/count", verifyToken, updateCount);
router3.post("/cart/add", verifyToken, addToCart);
router3.post("/cart/remove", verifyToken, removeFromCart);

module.exports = router3;