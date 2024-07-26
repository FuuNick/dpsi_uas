const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const ProductController = require('../controllers/productController');
const authorize = require('../middleware/authorize');

const adminMiddleware = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ error: 'Forbidden' });
    }
};

router.get('/products', authMiddleware, adminMiddleware, adminController.getAllProducts);
router.get('/orders', authMiddleware, adminMiddleware, adminController.getAllOrders);
router.get('/users', authorize('admin'), adminController.getAllUsers);
router.get('/carts', authMiddleware, adminMiddleware, adminController.getAllCarts);

router.post('/products', authorize('admin'), ProductController.createProduct);
router.put('/products/:id', authorize('admin'), ProductController.updateProduct);
router.delete('/products/:id', authorize('admin'), ProductController.deleteProduct);

router.get('/transactions', authorize('admin'), adminController.getAllTransactions);

router.post('/categories', authorize('admin'), adminController.createCategory);
router.put('/categories/:id', authorize('admin'), adminController.updateCategory);
router.delete('/categories/:id', authorize('admin'), adminController.deleteCategory);

module.exports = router;
