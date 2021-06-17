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
        type: String, // client, admin
        default: ''
    },
    role: {
        type: String, // auth, guest, root, manager, employee
        default: '',
    },
    age: {
        type: String,
        default: ''
    },
    comments: {
        type: String,
        default: ''
    },
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
    position: {
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
        agreementUsing: Boolean,
        agreementAnalyzing: Boolean,
        agreementContact: Boolean,
        agreementProtect: Boolean,
    }],
    lead: {
        type: Boolean,
        default: false,
    },
    comment: {
        type: String,
        default: ''
    },
    comunitatePreference: {
        type: String,
        default: ''
    },
    trigger: {
        type: String,
        default: ''
    },
    date: {
        type: Date,
        default: Date.now
    },
    sessionDate: {
        type: Date,
        default: 0
    },
    sessionDuration: {
        type: String,
        default: 0
    },
    callStatus: {
        type: String,
        default: null
    },
    botActivated: {
        type: Boolean,
        default: false,
    }
})

module.exports = model('users', schema)
