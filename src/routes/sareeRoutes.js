const express = require('express');
const { verifyToken } = require('../middleware/auth');
const { thumbnailUpload } = require('../middleware/multer');
const { uploadSaree, getSareeById, editSareeDetail, getAllSarees } = require('../controller/SareeController');
const router1 = express.Router();

router1.post("/saree/upload", thumbnailUpload, uploadSaree);
// router1.post("/saree/upload", verifyToken, thumbnailUpload, uploadSaree);
router1.get("/saree/details/:id", getSareeById);
router1.get("/saree/all", getAllSarees);
// router1.get("/saree/details/:id", verifyToken, getSareeById);
router1.post("/saree/edit", thumbnailUpload, editSareeDetail);
// router1.post("/saree/edit", verifyToken, thumbnailUpload, editSareeDetail);

module.exports = router1;