const Order = require('../models/order');
const Cart = require('../models/cart');
const CartItem = require('../models/cartItem');
const Product = require('../models/product');

exports.createOrder = async (req, res) => {
    try {
        const cart = await Cart.findOne({ where: { user_id: req.user.id }, include: [CartItem] });
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        const total = cart.CartItems.reduce((sum, item) => {
            return sum + (item.quantity * item.product.price);
        }, 0);

        const order = await Order.create({
            user_id: req.user.id,
            total,
            status: 'Pending'
        });

        // Empty the cart after creating an order
        await CartItem.destroy({ where: { cart_id: cart.id } });

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create order' });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({ where: { user_id: req.user.id } });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
};
