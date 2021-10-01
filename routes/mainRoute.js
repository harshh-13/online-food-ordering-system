const express = require('express')
const route = express.Router()
const User = require('../model/users')

route.get('/', (req, res)=>{
    res.send('hey')
})

route.post('/', (req, res)=>{
    let register = User(req.body)
    register.save()
    .then((err, docs)=>{
        if(err)
            res.send(err)
        else
            res.send('Successfully registered')
    })
})

route.post('/login', (req, res)=>{
    User.findOne({email: req.body.email})
    .then(found=>{
        if(found.pwd==req.body.pwd)
            res.json('Login successful')
        else 
            res.json('Wrong Password')
    })
    .catch(err=>res.json('User Not Found!'))
})

module.exports = route