const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Book = require('../models/books');

router.get('/', (req,res,next) => {
        Book.find()
        .select('bid bName price')
        .exec()
        .then( recvBooks => {
                    res.status(201).json({
                        message : 'Here are all the books',
                                books : recvBooks.map( recvBook => {
                                    return {
                                        bid : recvBook.bid,
                                        bName : recvBook.bName,
                                        price : recvBook.price,
                                        request : {
                                            type : 'GET',
                                            url:'http://localhost:5000/books/'+recvBook.bid    
                                        }
                                            }
                                            }
                                    )
                                    }
                                    );
        } )
        .catch(err => { res.status(500).json({
            message : 'Unable to fetch all the books',
            error : err
        }) })
} );

router.get('/:bookId', (req,res,next) => {
    Book.findOne({bid : req.params.bookId})
    .select('bid bName price')
    .exec()
    .then( recvBook => {
        res.status(201).json({
            message : 'Here is the book',
            book : recvBook
        });
    } )
    .catch(err => { res.status(500).json({
        message : 'Unable to fetch the book',
        error : err
    }) })
} );




module.exports = router;