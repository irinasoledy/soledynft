const UserService = require('../services/UserService')()


class NearController {

    async order(req, res) {
        try {
            const productName = req.productName;
            const userName = req.userName;
            const price = req.price;

            const response = await NearService.order(productName, userName, price)

            return res.status(200).json({response})

        } catch (e) {
            return res.status(404).json({message: `Error NearController@order ${e}`})
        }
    }
}

module.exports = function () {
    return new NearController()
}
