const { hashPassword, comparePassword } = require('../helpers/authHelper');
const userModel = require('../models/userModel')
const JWT = require('jsonwebtoken')
var nodemailer = require('nodemailer');

const registerController = async (req, res) => {
    try {

        //get user details
        const { name, email, password, phone } = req.body;

        //validations
        if (!name) {
            return res.send({ message: 'Name is required' })
        }
        if (!email) {
            return res.send({ message: 'Email is required' })
        }
        if (!password) {
            return res.send({ message: 'Password is required' })
        }
        if (!phone) {
            return res.send({ message: 'Phone number is required' })
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
            return res.status(200).send({
                success: false,
                message: 'Email and password required'
            })
        }

        //check user
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(200).send({
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
            message: 'Login Successful',
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

const forgotController = async (req, res) => {
    try {
        const { email } = req.body

        const user = await userModel.findOne({ email: email })
        if (!user) {
            return res.status(200).send({
                success: false,
                message: 'Invalid email'
            })
            console.log("no user")
        }
        else {

            const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })

            // console.log(user.email)
            console.log(token)
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD
                }
            });

            var mailOptions = {
                from: { name: 'Nest Home Decor', address: process.env.EMAIL },
                to: user.email,
                subject: 'Reset password link',
                text: `http://localhost:3000/resetpassword/${user._id}/${token}`
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                    res.status(500).send({
                        success: false,
                        message: "Error in sending link",
                        error
                    })
                } else {
                    res.status(200).send({
                        success: true,
                        message: "Reset Password link sent to mail"
                    })
                }
            });

        }
    }

    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in sending reset password link",
            error
        })
    }
}

const resetController = async (req, res) => {
    try {
        const { id, token } = req.params
        const { password } = req.body

        await JWT.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            if (error) {
                return res.status(200).send({
                    success: false,
                    message: "Error in reseting password"
                })
            }
            else {
                const hashedPassword = hashPassword(password).
                    then(hashedPassword => {
                        userModel.findByIdAndUpdate({ _id: id }, { password: hashedPassword }).
                            then(pass => res.status(200).send({
                                success: true,
                                message: "Password updated"
                            })).
                            catch(error =>
                                res.status(500).send({
                                    success: false,
                                    message: "Error in reseting password",
                                    error
                                })
                            )
                    })


            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in reseting password",
            error
        })
    }

}

module.exports = { registerController, loginController, testController, forgotController, resetController }; 