const Payment = require('../models/payment');
const Order = require('../models/order');

exports.addPaymentMethod = async (req, res) => {
    try {
        const { method, security_code } = req.body;
        const payment = await Payment.create({ user_id: req.user.id, method, security_code });
        res.status(201).json(payment);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add payment method' });
    }
};

exports.processPayment = async (req, res) => {
    try {
        const { orderId, security_code } = req.body;
        const payment = await Payment.findOne({ where: { user_id: req.user.id, security_code } });
        if (!payment) {
            return res.status(401).json({ error: 'Invalid security code' });
        }

        const order = await Order.findByPk(orderId);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        order.status = 'Paid';
        await order.save();

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Failed to process payment' });
    }
};
