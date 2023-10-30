const { cartModel } = require('../model/Cart');
const jwt = require('jsonwebtoken');
const { isNull } = require('./AuthController');
const CONFIG = require('../config');

const addToCart = async (req, res) => {
    const { customer_id, saree_id } = req.body;
    try {
        const checkSaree = await cartModel.findOne({ saree_id, customer_id });
        if (!isNull(checkSaree)) {
            return res.status(400).json({ message: "Item already present in the cart" });
        }
        const newCart = new cartModel();
        newCart.customer_id = customer_id;
        newCart.saree_id = saree_id;
        await newCart.save();
        return res.status(200).json({ message: "Added to cart" });
    } catch (error) {
        console.log(error);
    }
}
const removeFromCart = async (req, res) => {
    const { _id } = req.body;
    try {
        await cartModel.findByIdAndDelete(_id);
        return res.status(200).json({ message: "Deleted from cart" });
    } catch (error) {
        console.log(error);
    }
}

const updateCount = async (req, res) => {
    const { customer_id, saree_id, type } = req.body;
    try {
        const checkSaree = await cartModel.findOne({ saree_id, customer_id });
        let newAmt = checkSaree?.amount;
        if (type == 0)
            newAmt -= 1;
        else
            newAmt += 1;
        checkSaree.amount = newAmt;
        await checkSaree.save();
        return res.status(200).json({ message: "OK", qty: newAmt });
    } catch (error) {
        console.log(error);
    }
}

const cartGrid = async (req, res) => {
    let token = '';
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }
    const decodedToken = jwt.verify(token, CONFIG.JWT_SECRET);
    const id = decodedToken._id;
    try {
        const cartItems = await cartModel.find({ customer_id: id });
        return res.status(200).json(cartItems);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    addToCart,
    updateCount,
    cartGrid,
    removeFromCart
}