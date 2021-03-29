const {Schema, model} = require('mongoose')

const schema = new Schema({
    client : {
        ref: 'users',
        type: Schema.Types.ObjectId,
        default: null
    },
    employee : {
        ref: 'users',
        type: Schema.Types.ObjectId,
        default: null
    },
    message : {
        type: String,
        required: true
    },
    room : {
        ref: 'rooms',
        type: Schema.Types.ObjectId,
        default: null
    },
    sendBy : {
        type: String,
        default: '',
    },
    history : {
        ref: 'histories',
        type: Schema.Types.ObjectId,
        default: null
    },
    date : {
        type: Date,
        default: Date.now
    }
})

module.exports = model('messages', schema)
