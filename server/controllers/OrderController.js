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
            const cartProducts = cart.products
            const cartSubproducts = cart.subproducts
            let product = {}
            let price = {}

            for (var i = 0; i < cartProducts.length; i++) {
                product = await stripe.products.create({
                    name: cartProducts[i].product.translation.name,
                })

                price = await stripe.prices.create({
                   product: product.id,
                   unit_amount: parseFloat(cartProducts[i].product.personal_price.price * 100),
                   currency: 'eur',
               })

               items.push({
                   price : price.id,
                   quantity: parseInt(cartProducts[i].qty),
               })
            }

            for (var i = 0; i < cartSubproducts.length; i++) {
                product = await stripe.products.create({
                    name: cartSubproducts[i].subproduct.product.translation.name,
                })

                price = await stripe.prices.create({
                   product: product.id,
                   unit_amount: parseFloat(cartSubproducts[i].subproduct.product.personal_price.price * 100),
                   currency: 'eur',
               })

               items.push({
                   price : price.id,
                   quantity: parseInt(cartSubproducts[i].qty),
               })
            }

            const shipping = await stripe.products.create({
                name: 'shipping 15 EUR',
            })

            const shippingPrice = await stripe.prices.create({
               product: shipping.id,
               unit_amount: parseFloat(15 * 100),
               currency: 'eur',
           })

           items.push({
               price : shippingPrice.id,
               quantity: 1,
           })

            // for (var i = 0; i < cart.length; i++) {
            //    //  product = await stripe.products.create({
            //    //      name: cart[i].service.translation.name,
            //    //  })
            //    //
            //    //  price = await stripe.prices.create({
            //    //     product: product.id,
            //    //     unit_amount: parseFloat(cart[i].service.price * 100),
            //    //     currency: 'ron',
            //    // })
            //
            //    items.push({
            //        price : cart[i].service.stripe_price,
            //        quantity: parseInt(cart[i].qty),
            //    })
            // }

            return res.status(200).json(items)

        } catch (e) {
            return res.status(404).json({message: 'error'})
        }
    }

    async mergeOrderWithCart(req, res) {
        try {
            const { userId, cart, orderId, amount } = req.body

            const order = await Order.findOneAndUpdate(
                {_id: orderId},
                {
                    $set: {
                        status: 'scheduled',
                        cart: cart,
                        amount: amount
                    }
                },
                {new: true}
            )

            return res.status(200).json(order)

        } catch (e) {
            return res.status(404).json({message: 'error'})
        }
    }

}

module.exports = function () {
    return new OrderController()
}
