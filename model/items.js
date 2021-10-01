const express = require("express");
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema({
    rest_name: {
        type: String,
        required: true,
        trim: true
    },
    itemName: { 
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        trim: true
    },
    itemPrice: {
        type: Number,
        required: true
    },
    itemDesc: {
        type: String,
        required: true,
        trim: true
    },
    isVeg: {
        type: Boolean,
        required: true
    },
    isBest: {
        type: Boolean,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        default: 5,
        required: false,
        minimum: 1
    },
}, { timestamps: true })

module.exports = mongoose.model('item', itemSchema)