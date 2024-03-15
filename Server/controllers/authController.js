const { hashPassword, comparePassword } = require('../helpers/authHelper');
const userModel = require('../models/userModel')
const JWT = require('jsonwebtoken')

const registerController = async (req, res) => {
    try {

        //get user details
        const { name, email, password, phone } = req.body;

        //validations
        if (!name) {
            return res.send({ error: 'Name is required' })
        }
        if (!email) {
            return res.send({ error: 'Email is required' })
        }
        if (!password) {
            return res.send({ error: 'Password is required' })
        }
        if (!phone) {
            return res.send({ error: 'Phone number is required' })
        }

        //Check user
        const existingUser = await userModel.findOne({ email })
        //Existing user
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: "Already registered please login"
            })
        }

        //register user
        const hashedPassword = await hashPassword(password)

        //save
        const user = await new userModel({ name, email, phone, password: hashedPassword }).save()
        res.status(201).send({
            success: true,
            message: "User registered successfully",
            user
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: true,
            message: "Error in registration",
            error
        })

    }
}

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body

        //validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: 'Email and password required'
            })
        }

        //check user
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Invalid user or password'
            })
        }

        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: 'Invalid user or password'
            })
        }

        //token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
        res.status(200).send({
            success: true,
            message: 'Login successful',
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone
            },
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in login",
            error
        })

    }
}
const testController = (req, res) => {
    res.send('protected route')
}

module.exports = { registerController, loginController, testController }; 