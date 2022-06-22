const {PostedOrder, orders} = require("~/assembly/model");

class NearService {

    order(productName, userName, price) {
        const order = new PostedOrder(productName, userName, price);
        orders.push(order);

        return {statusCode: 200, message: 'Success order!'}
    }

    getOrders() {
        const numOrders = min(10, orders.length);
        const startIndex = orders.length - numOrders;
        const result = new PostedOrder(numOrders);
        for (let i = 0; i < numOrders; i++) {
            result[i] = orders[i + startIndex];
        }
        return result;
    }
}

module.exports = function () {
    return new NearService()
}
