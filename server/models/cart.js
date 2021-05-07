const {Schema, model} = require('mongoose')

const schema = new Schema({
    userId: {
        ref: 'users',
        type: Schema.Types.ObjectId,
        default: null
    },
    serviceId: {
        type: String,
        default: false
    },
    qty: {
        type: String,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = model('carts', schema)
