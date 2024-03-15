const express = require('express')
const { registerController, loginController, testController } = require('../controllers/authController')
const { requireSignin, isAdmin } = require('../middlewares/authMiddleware')

//router object
const router = express.Router()

//routing
//register||POST method
router.post('/register', registerController)

router.post('/login', loginController)

router.get('/test', requireSignin, isAdmin, testController)

module.exports = router;