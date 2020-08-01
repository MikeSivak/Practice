const {Router} = require('express');
const order_controller = require('../controllers/order.controller.js');
const order_router = Router();

order_router.post('/sale', order_controller.saleProduct);

module.exports = order_router;