const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const uuid = require('uuid');
const checkAuth = require('../middleware/check-auth');


const userController = require('../controllers/user');


// const User = require('../models/user');
// const Book = require('../models/books');
// const Order = require('../models/orders');

router.get('/:userId', checkAuth,userController.view_id );

router.delete('/:userId',checkAuth,userController.delete_user );

router.patch('/:userId',checkAuth,userController.edit_userId);

router.post('/:userId/newBook', checkAuth,userController.post_new_book);

router.get('/:userId/view_all_books', checkAuth,userController.view_all_books_for_user );
// change

router.patch('/:userId/:bookId',checkAuth ,userController.edit_book );

router.delete('/:userId/:bookId', checkAuth,userController.delete_book_from_id );



// Orders

router.post('/:userId/newOrder', checkAuth, userController.post_order);


router.get('/:userId/view_all_orders',checkAuth, userController.view_all_order_details);

router.delete('/order/:userId/:orderId',checkAuth, userController.delete_orders );


// Wishlist

router.post('/:userId/:bookId/wishlist', checkAuth, userController.add_book_wishlist );

router.get('/:userId/view_wishlist', checkAuth, userController.view_wishlist );

router.delete('/wishlist/:userId/:bookId', checkAuth ,userController.delete_book_wishlist );

router.get('/:userId/view_notifications', checkAuth, userController.view_notifications );

router.post('/:userId/notifications', checkAuth , userController.add_notifications );


module.exports = router;