const { Schema, model } = require('mongoose')

const schema = new Schema({
    userId : {
        ref: 'users',
        type: Schema.Types.ObjectId,
        default: null
    },
    whatsapp: {
        type: String,
        default: null
    },
    messager: {
        type: String,
        default: null
    },
    viber: {
        type: String,
        default: null
    },
    telegram: {
        type: String,
        default: null
    },
    facebook: {
        type: String,
        default: null
    },
    instagram: {
        type: String,
        default: null
    },
    other: {
        type: String,
        default: null
    },
    preferred: {
        type: String,
        default: null
    },
    address: {
        type: String,
        default: null
    },
    city: {
        type: String,
        default: null
    },
    country: {
        type: String,
        default: null
    },
    postalCode: {
        type: String,
        default: null
    },
    language: {
        type: String,
        default: null
    },
    currency: {
        type: String,
        default: null
    },
    payment: {
        type: String,
        default: null
    },
    date: {
        type: Date,
        default: Date.now
    },
})

module.exports = model('userDetails', schema)
