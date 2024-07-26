const Product = require('../models/product');
const Order = require('../models/order');
const User = require('../models/user');
const Cart = require('../models/cart');
const CartItem = require('../models/cartItem');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};

exports.getAllCarts = async (req, res) => {
    try {
        const carts = await Cart.findAll({ include: [CartItem] });
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch carts' });
    }
};


exports.getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.findAll();
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching transactions', error });
    }
};

exports.createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Error creating category', error });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const category = await Category.update(req.body, { where: { id: req.params.id } });
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: 'Error updating category', error });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.destroy({ where: { id: req.params.id } });
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting category', error });
    }
};