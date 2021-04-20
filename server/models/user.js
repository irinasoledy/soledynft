const {Schema, model} = require('mongoose')

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        default: ''
    },
    login: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
    },
    avatar: {
        type: String,
        default: null
    },
    type: {
        type: String,
        default: ''
    },
    gender: {
        type: String,
        default: ''
    },
    // cookies: {
    //     type: String,
    //     default: ''
    // },
    cookies: [String],
    logged: {
        type: Boolean,
        default: false
    },
    online: {
        type: Boolean,
        default: false
    },
    status: {
        type: Boolean,
        default: false,
    },
    password: {
        type: String,
        default: ''
    },
    hash: {
        type: String,
        default: ''
    },
    facebookAuth: {
        type: String,
        default: ''
    },
    googleAuth: {
        type: String,
        default: ''
    },
    policy: [{
        agreementUsing : Boolean,
        agreementAnalyzing : Boolean,
        agreementContact : Boolean,
        agreementProtect : Boolean,
    }],
    date : {
        type: Date,
        default: Date.now
    }
})

module.exports = model('users', schema)
