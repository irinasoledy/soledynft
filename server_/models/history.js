const {Schema, model} = require('mongoose')

const schema = new Schema({
    employee : {
        ref: 'users',
        type: Schema.Types.ObjectId,
        default: null
    },
    client : {
        ref: 'users',
        type: Schema.Types.ObjectId,
        default: null
    },
    date : {
        type: Date,
        default: Date.now
    }
})

module.exports = model('histories', schema)
