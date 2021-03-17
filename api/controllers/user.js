const User = require('../models/user');
const Book = require('../models/books');
const Order = require('../models/orders');
const mongoose = require("mongoose");
const uuid = require('uuid');

exports.view_id = (req,res,next) => {
    User.findOne({uid : req.params.userId})
   .select('uid email')
   .exec()
   .then( recvUser => {
           res.status(201).json({
               message : 'User Information', 
               user : recvUser
           });
       } )
   .catch(err => { res.status(500).json({
           message : 'Unable to fetch the user details',
           error : err
       }) })
   };

exports.delete_user = (req,res,next) => {
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
}

exports.edit_userId = (req,res,next) => {
    const updateOps = {}
    for(const ops of req.body){updateOps[ops.propName] = ops.value}
    User.updateOne({uid : req.params.userId},{ $set : updateOps })
    .exec()
    .then( result2 => {
        return res.status(201).json({
            message : 'User updated  ',
            result :result2
        });
    } )
    .catch( err => {
    return res.status(200).json('Unable to edit User')
  } );
}

exports.post_new_book = (req,res,next) =>{
    //   console.log(typeof req.params.userId);
     
      const book = new Book({
          bid : uuid.v4(),
          owner : req.params.userId,
          bName : req.body.bName,
          price : req.body.price,
          bSubject :req.body.bSubject,
          bCampus :req.body.bCampus,
          usageYear : req.body.usageYear
          
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
                    message : "Book Added",
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
     
} 

exports.view_all_books_for_user = (req,res,next) => {
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
}

exports.edit_book = (req,res,next)=>{
    const tbookId  = req.params.bookId;
    User.findOne({uid : req.params.userId })
    .exec()
    .then( result => {
        const tbooks = result.books;
        console.log('Books :',tbooks);
        // console.log(req.params.bookId);
        let index = -1;
        // console.log(req.params.bookId);
        // console.log(tbooks[0]);
         index =     tbooks.indexOf(tbookId);
    //    console.log('index :',index)
       if( index >= 0 ){
           const updateOps = {}
           for(const ops of req.body){updateOps[ops.propName] = ops.value}
           Book.updateOne({bid : req.params.bookId},{ $set : updateOps })
           .exec()
           .then( result2 => {
               return res.status(201).json({
                   message : 'Book updated  ',
                   result :result2
               });
           } )
           .catch( err => {
           return res.status(200).json('Unable to edit book 1')
         } );
       }
       else
       {
        res.status(200).json('Unable to edit book 4');
       }
    } )
    .catch( err => {
        res.status(200).json('Unable to edit book');
     } );
}

exports.delete_book_from_id = (req,res,next)=>{
    const tbookId  = req.params.bookId;
    User.findOne({uid : req.params.userId })
    .exec()
    .then( result => {
        const tbooks = result.books;

        let index = tbooks.indexOf(tbookId);
        // console.log(index);
      
       if( index >= 0 ){
        Book.deleteOne({bid : req.params.bookId})
        .exec()
        .then( result => {
            res.status(201).json({
                message :'Deleted Book',
                result
            })
        } )
        .catch( err => {
            res.status(400).json({
                message : 'Unable to delete the Book',
                error :err
            });
        } );
       }
       else
       {
        res.status(200).json('Unable to delete book 4');
       }
    } )
    .catch( err => {
        res.status(200).json('Unable to delete book');
     } );
}

exports.post_order = (req,res,next) =>{
  
     
    const order = new Order({
        oid : uuid.v4(),
        totalPrice : req.body.totalPrice,
        sellerId : req.body.sellerId,
        buyerId : req.params.userId,
        books : req.body.books
        
    });
 
    User.findOne({uid: req.params.userId})
    .exec()
    .then( user => {
      //   console.log(user.uid);
        const torders = user.orders;
        torders.push(order.oid);
      //   const tid = user.uid;
      //    console.log('Books :',tbooks)
        User.updateOne({uid : req.params.userId}, {$set : { orders : torders }} )
        .exec()
        .then( result => {
           order.save()
           .then( result1 => {
            return res.status(200).json( {
                  message : "Order Added",
                  result1
                  });
           } ).catch(err => {
              res.status(200).json({
                  message :'Order not added 1',
                  error : err});
           });
           
           
        }).catch(err => {
          res.status(200).json('Order not added 2');
       } );
       

    } )
    .catch( err => {
       res.status(200).json('No id found')
    } );
   
} 
exports.view_all_order_details = (req,res,next) => {
    User.findOne({uid : req.params.userId })
    .exec()
    .then( result => {
          res.status(200).json({
              message : 'All the orders',
              orders : result.orders
          });
    } )
    .catch( err => {
        res.status(200).json('Unable to fetch orders')
     } );
} 

exports.delete_orders = (req,res,next)=>{
    const torderId  = req.params.orderId;
    User.findOne({uid : req.params.userId })
    .exec()
    .then( result => {
        const torders = result.orders;

        let index = torders.indexOf(torderId);
        // console.log(index);
      
       if( index >= 0 ){
        Order.deleteOne({oid : req.params.orderId})
        .exec()
        .then( result => {
            res.status(201).json({
                message :'Deleted Order',
                result
            })
        } )
        .catch( err => {
            res.status(400).json({
                message : 'Unable to delete the Order',
                error :err
            });
        } );
       }
       else
       {
        res.status(200).json('Unable to delete Order 4');
       }
    } )
    .catch( err => {
        res.status(200).json('Unable to delete Order');
     } );
}

exports.add_book_wishlist = (req,res,next) =>{
     
    //   const book = new Book({
    //       bid : uuid.v4(),
    //       owner : req.params.userId,
    //       bName : req.body.bName,
    //       price : req.body.price
    //   });
    //   console.log(typeof book.uid);

      User.findOne({uid: req.params.userId})
      .exec()
      .then( user => {
          const twishlist = user.wishlist;
          twishlist.push(req.params.bookId);

          User.updateOne({uid : req.params.userId}, {$set : { wishlist : twishlist }} )
          .exec()
          .then( result => {
               res.status(201).json({ message : 'Book added to wishlist'})     
             
          }).catch(err => {
            res.status(200).json('Book not added to wishlist');
         } );
         

      } )
      .catch( err => {
         res.status(200).json('No id found')
      } );
     
}
exports.view_wishlist = (req,res,next) => {
    User.findOne({uid : req.params.userId })
    .exec()
    .then( result => {
          res.status(200).json({
              message : 'Wishlist',
              wishlist : result.wishlist
          });
    } )
    .catch( err => {
        res.status(200).json('Unable to fetch wishlist')
     } );
}

exports.delete_book_wishlist = (req,res,next)=>{
    const tbookId  = req.params.bookId;
    User.findOne({uid : req.params.userId })
    .exec()
    .then( result => {
        const twishlist = result.wishlist;

        let index = twishlist.indexOf(tbookId);
        // console.log(index);
      
       if( index >= 0 ){
           twishlist.splice(index,1);
           User.updateOne({uid : req.params.userId}, {$set : { wishlist : twishlist }} )
           .exec()
           .then( result => {
                res.status(201).json({ message : 'Book deleted from wishlist'})     
              
           }).catch(err => {
             res.status(200).json('Book not deleted wishlist');
          } );


       }
       else
       {
        res.status(200).json('Unable to delete book from wish list');
       }
    } )
    .catch( err => {
        res.status(200).json('Unable to delete book from wish list');
     } );
}

exports.add_notifications = (req,res,next) =>{

      User.findOne({uid: req.params.userId})
      .exec()
      .then( user => {
          const tnotifications = user.notifications;
          const tnot = { msg : req.body.msg, time : Date.now()};
          tnotifications.push(tnot);

          User.updateOne({uid : req.params.userId}, {$set : { notifications : tnotifications }} )
          .exec()
          .then( result => {
               res.status(201).json({ message : 'Notification added '})     
             
          }).catch(err => {
            res.status(200).json('Notification not added');
         } );
         

      } )
      .catch( err => {
         res.status(200).json('No id found')
      } );
     
}

exports.view_notifications = (req,res,next) => {
    User.findOne({uid : req.params.userId})
    .exec()
    .then( user => {
        res.status(201).json({
            message : 'All notifications for id : '+ req.params.userId,
            notifications : user.notifications,
        });
    } )
}