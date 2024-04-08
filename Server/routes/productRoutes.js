const { createProductController, getProductController, getSingleProductController, productPhotoController, deleteProductController, updateProductController } = require('../controllers/productController')
const { requireSignin, isAdmin } = require('../middlewares/authMiddleware')
const formidable = require('express-formidable')
const express = require('express')

const router = express.Router()

//create product
router.post('/create-product', requireSignin, isAdmin, formidable(), createProductController)

//get products
router.get('/get-product', getProductController)

//single product
router.get('/get-product/:slug', getSingleProductController)

//get photo
router.get('/product-photo/:pid', productPhotoController)

//delete product
router.delete('/product/:pid', deleteProductController)

//update product
router.put('/update-product/:pid', requireSignin, isAdmin, formidable(), updateProductController)

module.exports = router;
