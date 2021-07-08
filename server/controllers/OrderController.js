const Cart = require('../models/cart')
const Order = require('../models/order')
const stripe = require('stripe')('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');

class OrderController {

    async addUserInfo(req, res) {
        try {
            let order = {}
            const {userId, name, email, phone, address, city, country, postalCode} = req.body

            const findCart = await Cart.find({userId: userId})

            if (findCart) {
                order = await new Order({
                    userId: userId,
                    status: 'preorder',
                    userDetails: {
                        name,
                        email,
                        phone,
                        address,
                        city,
                        country,
                        postalCode
                    },
                }).save()
            }

            return res.status(200).json(order)
        } catch (e) {
            return res.status(404).json({message: 'error'})
        }
    }

    async updateUserInfo(req, res) {
        try {
            const {orderId, name, email, phone, address, city, country, postalCode} = req.body

            const order = await Order.findOneAndUpdate(
                {_id: orderId},
                {
                    $set: {
                        userDetails: {
                            name,
                            email,
                            phone,
                            address,
                            city,
                            country,
                            postalCode
                        },
                    }
                },
                {new: true}
            )

            return res.status(200).json(order)
        } catch (e) {
            return res.status(404).json({message: 'error'})
        }
    }

    async updateUserPayment(req, res) {
        try {
            const {orderId, paymentMethod} = req.body

            const order = await Order.findOneAndUpdate(
                {_id: orderId},
                {
                    $set: {
                        paymentMethod
                    }
                },
                {new: true}
            )

            return res.status(200).json(order)
        } catch (e) {
            return res.status(404).json({message: 'error'})
        }
    }

    async changeOrderStatus(req, res) {
        try {
            const {userId, orderId, status} = req.body

            await Order.findOneAndUpdate(
                {_id: orderId},
                {
                    $set: {status}
                },
                {new: true}
            )

            const orders = await Order.find({userId, status: {$ne: 'preorder'}}).sort({date: 'desc'})

            return res.status(200).json(orders)
        } catch (e) {
            return res.status(404).json({message: 'error'})
        }
    }

    async changeOrderPayment(req, res) {
        try {
            const {userId, orderId, payment} = req.body

            await Order.findOneAndUpdate(
                {_id: orderId},
                {
                    $set: {paymentMethod: payment}
                },
                {new: true}
            )

            const orders = await Order.find({userId, status: {$ne: 'preorder'}}).sort({date: 'desc'})

            return res.status(200).json(orders)
        } catch (e) {
            return res.status(404).json({message: 'error'})
        }
    }

    async changeOrderAppointment(req, res) {
        try {
            const {order} = req.body

            await Order.findOneAndUpdate(
                {_id: order._id},
                {
                    $set: {appointmentDate: order.appointmentDate}
                },
                {new: true}
            )

            return res.status(200).json(true)
        } catch (e) {
            return res.status(404).json({message: 'error'})
        }
    }

    async pay(req, res) {
        try {
            const {userId, orderId, amount} = req.body

            const carts = await Cart.find({userId}).select(['serviceId', 'qty'])

            const order = await Order.findOneAndUpdate(
                {_id: orderId},
                {
                    $set: {
                        status: 'scheduled',
                        amount: amount,
                        services: carts
                    }
                },
                {new: true}
            )

            await Cart.deleteMany({userId})

            return res.status(200).json(order)
        } catch (e) {
            return res.status(404).json({message: 'error'})
        }
    }

    async getAll(req, res) {
        try {
            const {userId} = req.query

            const orders = await Order.find({userId, status: {$ne: 'preorder'}}).sort({date: 'desc'})

            return res.status(200).json(orders)
        } catch (e) {
            return res.status(404).json({message: 'error'})
        }
    }

    async getOne(req, res) {
        try {
            const {id} = req.query

            const order = await Order.findOne({_id: id})

            return res.status(200).json(order)
        } catch (e) {
            return res.status(404).json({message: 'error'})
        }
    }


    async createStripeProducts() {}

    async addProductsToStripe(req, res) {
        try {
            const { userId, cart } = req.body
            const items = []
            let product = {}
            let price = {}

            for (var i = 0; i < cart.length; i++) {
               //  product = await stripe.products.create({
               //      name: cart[i].service.translation.name,
               //  })
               //
               //  price = await stripe.prices.create({
               //     product: product.id,
               //     unit_amount: parseFloat(cart[i].service.price * 100),
               //     currency: 'ron',
               // })

               items.push({
                   price : cart[i].service.stripe_price,   
                   quantity: parseInt(cart[i].qty),
               })
            }
            return res.status(200).json(items)
        } catch (e) {
            return res.status(404).json({message: 'error'})
        }
    }
}

module.exports = function () {
    return new OrderController()
}
