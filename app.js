const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')
const userRoutes = require('./routes/userRoutes')
const courseRoutes = require('./routes/courseRoutes')

dotenv.config()

const app = express()
const port = 8001

// MongoDB Connection
mongoose.connect(`mongodb+srv://dranyam123:${process.env.MONGODB_PASSWORD}@cluster0.r17kiq2.mongodb.net/s55-backend?retryWrites=true&w=majority`, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})

let db = mongoose.connection
db.once('open', () => console.log('Connected to MongoDB!'))
// MongoDB Connection END

// To avoid CORS errors when trying to send request to our server
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/users', userRoutes)
app.use('/courses', courseRoutes)
// Routes END

app.listen(port, () => {
	console.log(`API is now running on localhost:${port}`)
})