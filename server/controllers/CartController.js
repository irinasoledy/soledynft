const Cart = require('../models/cart')

class CartController {
    async add(req, res) {
        try {
            const {userId, serviceId} = req.body

            const findCart = await Cart.findOne({userId: userId, serviceId: serviceId})

            if (!findCart) {
                await new Cart({
                    userId: userId,
                    serviceId: serviceId,
                    qty: 1
                }).save()
            }

            const cart = await Cart.find({userId: userId}).sort({date: 'desc'})

            return res.status(200).json(cart)
        } catch (e) {
            return res.status(404).json({message: 'error'})
        }
    }

    async get(req, res) {
        try {
            const {userId} = req.query
            const cart = await Cart.find({userId: userId}).sort({date: 'desc'})

            return res.status(200).json(cart)
        } catch (e) {
            return res.status(404).json({message: 'error'})
        }
    }

    async updateQty(req, res) {
        try {
            const {qty, userId, cartId} = req.body

            await Cart.findOneAndUpdate(
                {_id: cartId},
                {$set: {qty, qty}},
                {new: true}
            )

            const cart = await Cart.find({userId: userId}).sort({date: 'desc'})

            return res.status(200).json(cart)

        } catch (e) {
            return res.status(404).json({message: 'error'})
        }
    }

    async remove(req, res) {
        try {
            const {userId} = req.query
            await Cart.remove({_id: req.params.id})
            const cart = await Cart.find({userId: userId}).sort({date: 'desc'})

            return res.status(200).json(cart)
        } catch (e) {
            return res.status(404).json({message: 'error'})
        }
    }

}

module.exports = function () {
    return new CartController()
}
