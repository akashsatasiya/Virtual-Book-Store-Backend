const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
            oid : {type : String , required : true},
            totalPrice : {type : Number ,required : true} ,  
            sellerId : {type : [String] , required : true},
            buyerId : {type : [String] , required : true},
            dateOfOrder : {type :Date ,required : true,default : Date.now() },
            buyerStatus : {type : String ,enum : ['Yes','No'] ,required : true ,default : 'Yes' },
            sellerStatus :{type : String ,enum : ['Yes','No'] ,required : true ,default : 'Yes' },
            books : {type :[String], required : true }
        }
);

const order = mongoose.model('Order',orderSchema);

module.exports = order;