const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
             _id : mongoose.Schema.Types.ObjectId,
            totalPrice : {type : Number ,required : true} ,  
            sellerId : {type : String , required : true},
            buyerId : {type : String , required : true},
            dateOfOrder : {type :String ,required : true },
            buyerStatus : {type : String , required : true},
            sellerStatus : {type : String , required : true},
            books : {type :[String], required : true }
        }
);

const order = mongoose.model('Order',orderSchema);

module.exports = order;