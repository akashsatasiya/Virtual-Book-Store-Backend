const mongoose = require('mongoose');

const connectDB = () =>  {mongoose.connect(process.env.MONGO_URI2, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex :true
}).then(result => console.log(`connected to the database : `,result.connection.host)).catch( err => console.log(`error in connecting to database`,err));}

  

// const connectDB = async () => {
//     try{
//         const conn = await mongoose.connect(process.env.MONGO_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//             useFindAndModify: false
//         });
//         console.log(`MongoDB connected: ${conn.connection.host}`);
//     }
//     catch(err){
//         console.err(err);
//         process.exit(1);
//     };
// };

module.exports = connectDB;