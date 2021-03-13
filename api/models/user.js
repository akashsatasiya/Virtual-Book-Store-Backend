const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    email : {type : String ,
            required : true,
            unique : true,
            match :/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/},
            password : {type :String ,
                        required : true}    
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
            // orders : {type :[String], required : true},
            // books : {type :[String],required : true}
        }
);

const user = mongoose.model('User',userSchema);

module.exports = user;