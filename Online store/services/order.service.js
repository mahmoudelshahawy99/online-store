const sequelize = require('sequelize');
const db = require('../services/db');

module.exports = {
    getAll,
    saveOrder,
    getDailyReport
};

async function getAll(trader_id) {
    const orders = await db.Order.findAll({ where: { traderId: trader_id } });
    if(!orders.length){
        throw 'No orders for this trader';
    }else{
        return orders.map(x => basicDetails(x));
    }
}

function basicDetails(order) {
    const { id, firstName, lastName, total_price, createdAt } = order;
    return { id, firstName, lastName, total_price, createdAt };
}

async function saveOrder(params,trader_id) {
    console.log(params.items);
    const order = new db.Order(params);
    order.traderId = trader_id;
    await order.save();

    for($i=0; $i < params.items.length; $i++) {
        var product = await db.Product.findByPk(params.items[$i].product_id);
        if(product.quantity >= params.items[$i].quantity){
            var orderDetails = new db.OrderDetails(params.items[$i]);
            orderDetails.orderId = order.id;
            await orderDetails.save();

            product.quantity -= params.items[$i].quantity;
            product.updatedAt = Date.now();
            await product.save();
        }else{
            await order.destroy();
            throw 'quantity less than in stock';
        }    
    };
}

async function getDailyReport() {
    const today = new Date().toISOString().slice(0, 10);
    const orders = await db.Order.findAll({ where: sequelize.where(sequelize.fn('date', sequelize.col('createdAt')), '=', today) });
    if(!orders.length){
        throw 'No orders today';
    }else{
        return orders.map(x => basicDetails(x));
    }
}