const express = require('express')
const { isAdmin, requireSignin } = require('../middlewares/authMiddleware');
const { createCategoryController, updateCategoryController, categoryController, singleCategoryContoller, deleteCategoryController } = require('../controllers/categoryController');

const router = express.Router()

//create catrgory
router.post('/create-category', requireSignin, isAdmin, createCategoryController)

//update category
router.put('/update-category/:id', requireSignin, isAdmin, updateCategoryController)

//get all categories
router.get('/get-category', categoryController)

//single category
router.get('/single-category/:slug', singleCategoryContoller)

//delete category
router.delete('/delete-category/:id', requireSignin, isAdmin, deleteCategoryController)

module.exports = router;