const {Schema, model} = require('mongoose')

const schema = new Schema({
    userId: {
        ref: 'users',
        type: Schema.Types.ObjectId,
        default: null
    },
    paymentMethod: {
        type: String,
        default: null,
    },
    status: {
        type: String,
        default: null,
    },
    amount: {
        type: String,
        default: null,
    },
    userDetails: {
        name: {type: String, required: true},
        email: {type: String, required: true},
        phone: {type: String, required: true},
        address: {type: String, required: true},
        city: {type: String, required: true},
        country: {type: String, required: true},
        postalCode: {type: String, required: true}
    },
    services: [
        {
            serviceId: {type: String, required: true},
            price: {type: String, required: true},
            qty: {type: String, required: true},
        }
    ],
    cart: Schema.Types.Mixed,
    date: {
        type: Date,
        default: Date.now,
    },
    appointmentDate: {
        type: String,
        default: null,
    }
})

module.exports = model('orders', schema)
