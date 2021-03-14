const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    
    uid : {type : String , required : true},
    email : {type : String ,
            required : true,
            unique : true,
            match :/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/},
            password : {type :String ,
                        required : true}    ,
            // firstName : {type : String , required : true},
            // lastName : {type : String , required : true},
            // DOB : {type :String ,required : true },
            // dateOFSubScription : {type : String , required : true},
            // cityOfResidence : {type : String , required : true},
            // currentLocation : {type : String, required : true},
            // phoneNo : {type : Number , required : true},
            // email : {type : String , required : true},
            // year : {type : Number , required : true},
            // penPoints : {type : Number , required : true},
            // blackList : {type : String , required : true},
            orders : {type :[String] , ref : 'Order' },
            books : {type :[String],ref : 'Book'},
            wishlist : {type :[String]}
        }
);

const user = mongoose.model('User',userSchema);

module.exports = user;