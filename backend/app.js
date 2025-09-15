const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const dotenv = require('dotenv')

dotenv.config({ path: ".env.local" })

const app = express()

app.use(cors())

app.use(bodyParser.json())

const authRoutes = require('./routes/auth')
const dataRoutes = require('./routes/data')

app.use(authRoutes)
app.use(dataRoutes)

async function connectDb() {
    try {
        await mongoose.connect(process.env.MDB_URI)
        console.log('connected to db success!')
    }
    catch (err) {
        console.log('err in connecting to db', err)
    }
}
connectDb()

app.listen(3000, (err) => {
    if (err) {
        'err in creating server'
    }
    console.log('server running on 3000')
})