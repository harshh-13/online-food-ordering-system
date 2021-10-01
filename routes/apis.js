const express = require('express')
const api = express.Router()
const fxn = require('../controllers/apis')

api.get('/all-items', fxn.getAllItems)
api.post('/add-item', fxn.addItem)

api.get('/user', fxn.getUser)

api.post('/register', fxn.register)
api.post('/login', fxn.login)

api.get('/addToCart', fxn.addToCart)
api.get('/removeFromCart', fxn.removeFromCart)
api.get('/decrementCart', fxn.decrementCart)

api.get('/:id', fxn.getItem)
api.get('/:msg', fxn.showMsg)

module.exports = api