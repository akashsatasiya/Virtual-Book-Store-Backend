const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const User = require('../models/user');
const Book = require('../models/books');

router.post('/signup', (req,res,next) =>{
     User.find({email : req.body.email})
     .exec()
     .then( user => {
         if(user.length >= 1){
             res.status(401).json({
                 message : 'User already exists'
             });
         }
         else{
            bcrypt.hash(req.body.password,10,(err,hash) => {
                if(err){
                    return res.status(500).json({
                        message : 'Unable to Signup',
                        error : err
                    });
                }
                else{
                    const user = new User({
                        uid :  uuid.v4(),
                        email : req.body.email,
                        password : hash
                    });
                    user.save().then( result =>{res.status(200).json({
                        message : 'User Added',
                        result
                    });} )
                    .catch( err => { res.status(500).json({
                        message : 'User Not added',
                        error : err
                    }) } );
                }
            } );
           
            
         }
     }).catch( err => {
         res.status(401).json({
             message : 'User not added',
             error : err
         });
     } );
    
     
} );

router.post('/login', (req,res,next) =>{
           User.findOne({email : req.body.email})
           .exec()
           .then( user =>{
               if(user.length < 1){
                return res.status(401).json({
                    message : 'Auth fail 1',
                    error : err
                });
            }
                bcrypt.compare(req.body.password,user.password, (err,result) =>{
                       if(err){
                           return res.status(401).json({
                               message : 'Authentication failed'
                           });
                       }
                       if(result){
                                return res.status(201).json({
                                    message : 'Authorization Successful'
                                });
                       }
                   } ); 
                //    res.status(401).json({
                //     message : 'Auth fail 2',
                //     error : err
                })
                .catch(err => {
                    res.status(401).json({
                        message : 'Auth fail 3',
                        error : err
                    });
                });
               }
            );


router.delete('/:userId',(req,res,next) => {
    User.remove({uid : req.params.userId})
    .exec()
    .then( result => {
        res.status(201).json({
            message :'Deleted User',
            result
        })
    } )
    .catch( err => {
        res.status(400).json({
            message : 'Unable to delete the ID',
            error :err
        });
    } );
} );



router.post('/:userId/newBook', (req,res,next) =>{
        //   console.log(typeof req.params.userId);
         
          const book = new Book({
              bid : uuid.v4(),
              bName : req.body.bName,
              price : req.body.price
          });
        //   console.log(typeof book.uid);

          User.findOne({uid: req.params.userId})
          .exec()
          .then( user => {
              console.log(user.uid);
              const tbooks = user.books;
              tbooks.push(book.bid);
              const tid = user.uid;
               console.log('Books :',tbooks)
              User.updateOne({uid : req.params.userId}, {$set : { books : tbooks }} )
              .exec()
              .then( result => {
                 book.save()
                 .then( result1 => {
                  return res.status(200).json( {
                        message : "Book Updated",
                        result1
                        });
                 } ).catch(err => {
                    res.status(200).json({
                        message :'Book not added 1',
                        error : err});
                 });
                 
                 
              }).catch(err => {
                res.status(200).json('Book not added 2');
             } );
             

          } )
          .catch( err => {
             res.status(200).json('No id found')
          } );
         
} );

router.get('/:userId/view_all_books', (req,res,next) => {
    User.findOne({uid : req.params.userId })
    .populate()
    .exec()
    .then( result => {
          res.status(200).json({
              message : 'All the Books',
              books : result.books
          });
    } )
    .catch( err => {
        res.status(200).json('Unable to fetch books')
     } );
} );



module.exports = router;