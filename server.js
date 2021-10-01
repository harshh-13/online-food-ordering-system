const express = require('express')
const app = express()
const mongoose = require('mongoose')
const route = express.Router()
const cors = require('cors')
require('dotenv').config()

const user = require('./model/users')
const Item = require('./model/items')
const main = require('./routes/mainRoute')
const apis = require('./routes/apis')

app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true,useUnifiedTopology: true})
    .then((result)=>app.listen(process.env.PORT || 5000))
    .catch((err)=>console.log(err))

app.use('/', main)
app.use('/api', apis)