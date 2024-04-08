const express = require('express')
const { registerController, loginController, testController, forgotController, resetController, updateProfileController } = require('../controllers/authController')
const { requireSignin, isAdmin } = require('../middlewares/authMiddleware')

//router object
const router = express.Router()

//routing
//register||POST method
router.post('/register', registerController)

router.post('/login', loginController)

router.post('/forgotpassword', forgotController)

router.post('/resetpassword/:id/:token', resetController)

router.get('/test', requireSignin, isAdmin, testController)

router.put('/userdashboard', updateProfileController)

//protected user route
router.get("/user-auth", requireSignin, (req, res) => {
    res.status(200).send({ ok: true });
})

//protected admin route
router.get("/admin-auth", requireSignin, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
})

module.exports = router;