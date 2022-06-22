const {PostedOrder, orders} = require("~/assembly/model");

class NearService {

     order(productName,  userName, price) {
        const order = new PostedOrder(productName, userName, price);
        orders.push(order);

        return {statusCode: 200, message: 'Success order!'}
    }
}

module.exports = function () {
    return new NearService()
}
