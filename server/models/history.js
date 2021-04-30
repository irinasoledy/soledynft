const {Schema, model} = require('mongoose')

const schema = new Schema({
    userId: {
        ref: 'users',
        type: Schema.Types.ObjectId,
        default: null
    },
    recipientId: {
        ref: 'users',
        type: Schema.Types.ObjectId,
        default: null
    },
    session: {
        type: String,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = model('histories', schema)
