const {Schema, model} = require('mongoose')

const schema = new Schema({
    sender: {
        ref: 'users',
        type: Schema.Types.ObjectId,
        default: null
    },
    recepient: {
        ref: 'users',
        type: Schema.Types.ObjectId,
        default: null
    },
    client: {
        ref: 'users',
        type: Schema.Types.ObjectId,
        default: null
    },
    employee: {
        ref: 'users',
        type: Schema.Types.ObjectId,
        default: null
    },
    message: {
        type: String,
        required: true
    },
    readed: {
        type: Boolean,
        default: false
    },
    room: {
        ref: 'rooms',
        type: Schema.Types.ObjectId,
        default: null
    },
    sendBy: {
        type: String,
        default: '',
    },
    history: {
        ref: 'histories',
        type: Schema.Types.ObjectId,
        default: null
    },
    session: {
        type: String,
        default: '',
    },
    date: {
        type: Date,
        default: Date.now
    },
    callAlert: {
        type: Boolean,
        default: false
    },
    callStatus: {
        type: String,
        default: false
    }
})

module.exports = model('messages', schema)
