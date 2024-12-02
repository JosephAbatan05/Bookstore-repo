const Book = require('../models/Book');

// Add a new book (Admin only)
exports.addBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json({ message: 'Book added successfully', book });
  } catch (error) {
    res.status(400).json({ message: 'Failed to add book', error });
  }
};
// Update book (Admin only)
exports.updateBook = async (req, res) => {
    try {
      const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!book) return res.status(404).json({ message: 'Book not found' });
      res.json({ message: 'Book updated successfully', book });
    } catch (error) {
      res.status(400).json({ message: 'Failed to update book', error });
    }
  };

  //Delete book (Admin only)
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete book', error });
  }
};

// Get all books (Public)
exports.getAllBooks = async (req, res) => {
    try {
      const books = await Book.find();
      res.json(books);
    } catch (error) {
      res.status(400).json({ message: 'Failed to fetch books', error });
    }
  };

// Get book details (Public)
exports.getBookDetails = async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) return res.status(404).json({ message: 'Book not found' });
      res.json(book);
    } catch (error) {
      res.status(400).json({ message: 'Failed to fetch book details', error });
    }
  };


  const Cart = require('../models/Cart');
const Book = require('../models/Book');



// Add to cart
exports.addToCart = async (req, res) => {




  try {
    const { bookId, quantity } = req.body;
    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
        if (!cart) {
            cart = new Cart({ userId: req.user._id, items: [{ bookId, quantity }] });
          } else {
            const itemIndex = cart.items.findIndex(item => item.bookId.toString() === bookId);
            if (itemIndex > -1) {
              cart.items[itemIndex].quantity += quantity;
            } else {
              cart.items.push({ bookId, quantity });
            };
          await cart.save();
          res.json({ message: 'Book added to cart', cart });
          };
        }}
        catch(error){
          res.status(400).json({ message: 'Failed to add to cart', error });
        }
  };




      // Get cart items
      exports.getCart = async (req, res) =>{
        try {
          const cart = await Cart.findOne({ userId: req.user._id }).populate('items.bookId');
          if (!cart) return res.status(404).json({ message: 'Cart is empty' });
          res.json(cart);
        } catch (error) {{
            res.status(400).json({ message: 'Failed to fetch cart', error });
          }
        };
    }
        // Remove from cart
        exports.removeFromCart = async (req, res) => {
          try {
            const { bookId } = req.body;
            const cart = await Cart.findOne({ userId: req.user._id });
        
            if (!cart) return res.status(404).json({ message: 'Cart not found' });
        
            cart.items = cart.items.filter(item => item.bookId.toString() !== bookId);
            await cart.save();
        
            res.json({ message: 'Book removed from cart', cart });
          } 
          catch (error) {
            res.status(400).json({ message: 'Failed to remove from cart', error });
          }
        };
      