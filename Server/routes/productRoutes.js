const { createProductController, getProductController, getSingleProductController, productPhotoController, deleteProductController, updateProductController, productFiltersController, searchProductController } = require('../controllers/productController')
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
router.delete('/delete-product/:pid', deleteProductController)

//update product
router.put('/update-product/:pid', requireSignin, isAdmin, formidable(), updateProductController)

// filter products
router.post('/product-filters', productFiltersController);

// search base filter
router.get('/search/:keyword', searchProductController);

module.exports = router;
