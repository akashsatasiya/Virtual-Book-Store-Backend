const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const User = require('../models/user');

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
                        _id :  new mongoose.Types.ObjectId(),
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



module.exports = router;