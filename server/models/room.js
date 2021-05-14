const {Schema, model} = require('mongoose')

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        default: ''
    },
    employee: {
        ref: 'users',
        type: Schema.Types.ObjectId,
        default: null
    },
    client: {
        ref: 'users',
        type: Schema.Types.ObjectId,
        default: null
    },
    active: {
        type: Boolean,
        default: false
    }
})

module.exports = model('rooms', schema)
