const {Schema, model} = require('mongoose')

const schema = new Schema({
    slug : {
        type: String,
        required: true
    },
    name : {
        type: String,
        required: true
    },
    parentId : {
        ref: 'services',
        type: Schema.Types.ObjectId,
        default: 0
    },


    duration : {
        type: String,
        default: ''
    },
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
    active : {
        type: Boolean,
        default: false
    }
})

module.exports = model('services', schema)
