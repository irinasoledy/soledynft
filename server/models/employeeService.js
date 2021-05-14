const {Schema, model} = require('mongoose');

const schema = new Schema({
    employee: {
        ref: 'users',
        type: Schema.Types.ObjectId,
        default: null
    },
    service: {
        type: String,
        required: true
    }
})

module.exports = model('employeeServices', schema)
