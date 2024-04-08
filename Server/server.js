const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoute')
const cors = require('cors')
const catrgoryRoutes = require('./routes/categoryRoutes')
const productRouter = require('./routes/productRoutes')

//configure env
dotenv.config()

//database config
connectDB()

//rest object
const app = express()

//middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/category', catrgoryRoutes)
app.use('/api/v1/product', productRouter)

//rest api
app.get('/', (req, res) => {
    res.send("<h1>Welcome</h1>");
})

//PORT
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running on ${process.env.PORT}`)
})