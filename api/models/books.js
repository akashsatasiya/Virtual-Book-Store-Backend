const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    bid : {type : String , required : true},
            bName : {type : String , required : true},
            bSubject : {type : String , required : true},
            bCampus : {type :String ,required : true },
            usageYear : {type : Number , required : true},
            owner : {type : String , required : true},
            price : {type : Number, required : true} ,
            publishDateOnWebsite : {type : Date,default : Date.now() }
        }
);

const book = mongoose.model('Book',bookSchema);

module.exports = book;