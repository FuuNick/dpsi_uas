const Cart = require('../models/cart');
const CartItem = require('../models/cartItem');
const Product = require('../models/product');

exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ where: { user_id: req.user.id }, include: [CartItem] });
        if (cart) {
            res.status(200).json(cart);
        } else {
            res.status(404).json({ error: 'Cart not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch cart' });
    }
};

exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        let cart = await Cart.findOne({ where: { user_id: req.user.id } });
        if (!cart) {
            cart = await Cart.create({ user_id: req.user.id });
        }
        const product = await Product.findByPk(productId);
        if (product) {
            let cartItem = await CartItem.findOne({ where: { cart_id: cart.id, product_id: product.id } });
            if (cartItem) {
                cartItem.quantity += quantity;
                await cartItem.save();
            } else {
                await CartItem.create({ cart_id: cart.id, product_id: product.id, quantity });
            }
            res.status(200).json(cart);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to add to cart' });
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        const { itemId } = req.params;
        const cartItem = await CartItem.findByPk(itemId);
        if (cartItem) {
            await cartItem.destroy();
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Item not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to remove from cart' });
    }
};
