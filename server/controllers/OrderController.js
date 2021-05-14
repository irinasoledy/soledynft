const Cart = require('../models/cart')
const Order = require('../models/order')

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
}

module.exports = function () {
    return new OrderController()
}
