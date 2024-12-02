const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const bookController = require('../controllers/bookController');

// Public routes
router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookDetails);

// Admin routes
router.post('/', auth, role('admin'), bookController.addBook);
router.put('/:id', auth, role('admin'), bookController.updateBook);
router.delete('/:id', auth, role('admin'), bookController.deleteBook);

module.exports = router;