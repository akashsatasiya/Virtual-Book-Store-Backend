const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    
    uid : {type : String , required : true},
    email : {type : String ,
            required : true,
            unique : true,
            match :/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
     },
            password : {type :String ,
                        required : true}    ,
            firstName : {type : String , required : true},
            lastName : {type : String , required : true},
            DOB : {type :Date ,required : true },
            dateOFSubScription : {type : Date , required : true, default : Date.now()},
            cityOfResidence : {type : String , required : true},
            currentLocation : {type : String, required : true},
            phoneNo : {type : Number , required : true},
            year : {type : Number , required : true},
            penPoints : {type : Number , required : true,default : 0},
            blackList : {type : String,enum :['Yes','No'] , required : true,default :'No'},
            orders : {type :[String] , ref : 'Order' },
            books : {type :[String],ref : 'Book'},
            wishlist : {type :[String]}
        }
);

const user = mongoose.model('User',userSchema);

module.exports = user;