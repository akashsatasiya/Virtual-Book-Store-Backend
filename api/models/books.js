const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
            password : {type :String ,required : true},
            bName : {type : String , required : true},
            bSubject : {type : String , required : true},
            bCampus : {type :String ,required : true },
            usageYear : {type : NUmber , required : true},
            owner : {type : String , required : true},
            price : {type : Number, required : true},
            publishDateOnWebsite : {type : String }
        }
);

const book = mongoose.model('Book',bookSchema);

module.exports = book;