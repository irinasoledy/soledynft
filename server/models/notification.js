const {Schema, model} = require('mongoose')

const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId,
        default: null
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = model('notifications', schema)
