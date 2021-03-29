const { Schema, model } = require('mongoose')

const schema = new Schema({
    userId : {
        ref: 'users',
        type: Schema.Types.ObjectId,
        default: null
    },
    status : {
        type: String,
        default: null
    },
    online: {
        type: Boolean,
        default: 1
    },
    logged: {
        type: Boolean,
        default: 0
    },
    assigedManager: {
        ref: 'users',
        type: Schema.Types.ObjectId,
        default: null
    },
    visitsQty: {
        type: Number,
        required: true,
    },
    visitsMin: {
        type: String,
        default: null
    },
    lastVisit: {
        type: Date,
        default: Date.now
    },
    currentPage: {
        type: String,
        required: true
    }
})

module.exports = model('userActions', schema)
