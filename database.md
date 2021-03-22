table user{

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
            wishlist : {type :[String]},
            notifications : [{ msg : {type :String} , time : {type : Date , default : Date.now()} }]

        }

table order{
oid : {type : String , required : true},
totalPrice : {type : Number ,required : true} ,  
 sellerId : {type : [String] , required : true},
buyerId : {type : [String] , required : true},
dateOfOrder : {type :Date ,required : true,default : Date.now() },
buyerStatus : {type : String ,enum : ['Yes','No'] ,required : true ,default : 'Yes' },
sellerStatus :{type : String ,enum : ['Yes','No'] ,required : true ,default : 'Yes' },
books : {type :[String], required : true }
}

table book {
bid : {type : String , required : true},
bName : {type : String , required : true},
bSubject : {type : String , required : true},
bCampus : {type :String ,required : true },
usageYear : {type : Number , required : true},
owner : {type : String , required : true},
price : {type : Number, required : true} ,
publishDateOnWebsite : {type : Date,default : Date.now() }
}
