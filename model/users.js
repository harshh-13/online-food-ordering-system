const express = require('express');
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    name: {
        type: String,
        minLength: 3,
        required: true,
        trim: true
    },
    email: { 
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    phno: {
        type: Number,
        required: true,
        trim: true,
        unique:true,
        minLength:10,
        maxLength:10
    },
    pwd : {
        type: String,
        minLength: 6,
        maxLength: 24,
        required: true
    },
    isAdmin : {
        type: Boolean,
        default: false
    },
    cart: {
        type: Array,
        default: []
    },
    address:{
        type: String,
        required: false
    },
    stripe_account_id:'',
    stripe_seller:{},
    stripeSession:{}
}, { timestamps: true })


userSchema.pre("save", function(next){
    let usr = this

    if(usr.isModified('pwd')){
        return bcrypt.hash(usr.pwd, 10, function(err, hash){
            if(err){
                console.log(err)
                return next()
            }
            usr.pwd = hash
            return next()
        })
    } else{
        return next()
    }
})

userSchema.methods.comparePassword = function(pwd, next){
    bcrypt.compare(pwd, this.pwd, function(err, match){
        if(err){
            console.log('COMPARE PASSWORD ERROR', err)
            return next(err, false);
        } 
        console.log('MATCH PASSWORD', match)
        return next(null, match);
    })
}

module.exports = mongoose.model('user', userSchema)