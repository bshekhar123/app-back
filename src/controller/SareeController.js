const { sareeModel } = require('../model/Saree');
const { isNull } = require('./AuthController');

const getAllSarees = async (req, res) => {
    try {
        const sarees = await sareeModel.find();
        res.status(200).json(sarees);
    } catch (error) {
        console.log(error);
    }
}

const uploadSaree = async (req, res) => {
    try {
        const { name, price, colour, type, outOfStock, description } = req.body;
        if (!name || !price || !colour || !type) {
            res.status(400).json({
                message: 'Please Fill all the Details of Saree'
            });
        }
        let pic = "";
        if (!isNull(req.file)) {
            pic = `${req.file?.filename}`
        }
        const newSaree = new sareeModel();
        newSaree.name = name;
        newSaree.description = description;
        newSaree.price = price;
        if (!isNull(colour)) {
            newSaree.colour = JSON.parse(colour);
        }
        if (!isNull(outOfStock)) {
            newSaree.outOfStock = JSON.parse(outOfStock);
        }
        newSaree.type = type;
        newSaree.thumbnail = pic;
        await newSaree.save();
        return res.status(200).json({
            message: 'Saree Added'
        });
    } catch (error) {
        console.log(error);
    }
};

const getSareeById = async (req, res) => {
    try {
        const { id } = req.params;
        const newSaree = await sareeModel.findById(id);
        res.status(200).json(newSaree);
    } catch (error) {
        console.log(error);
    }
};

const editSareeDetail = async (req, res) => {
    try {
        console.log(req.body, req.file)
        const { _id, name, price, colour, type, outOfStock, description } = req.body;
        if (!name || !price || !colour || !type) {
            res.status(400).json({
                message: 'Please Fill all the Details of Saree'
            });
        }
        let pic = "";
        const newSaree = await sareeModel.findById(_id);
        if (!isNull(req.file)) {
            pic = `${req.file?.filename}`
            newSaree.thumbnail = pic;
        }
        newSaree.name = name;
        newSaree.description = description;
        newSaree.price = price;
        if (!isNull(colour)) {
            newSaree.colour = JSON.parse(colour);
        }
        newSaree.type = type;
        newSaree.outOfStock = outOfStock;
        await newSaree.save();
        res.status(200).json({
            message: 'Saree Details Updated'
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    uploadSaree,
    getSareeById,
    editSareeDetail,
    getAllSarees
}