const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');


// Routes 
const userRoutes = require('./api/routes/user');


// Connection with db
mongoose.connect('mongodb+srv://akash:passw0rd@book-store.ez0yv.mongodb.net/RC-backend-book-shop?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true 
}).then(result => console.log(`connected to the database`)).catch( err => console.log(`error in connecting to database`));

// Body Parser
app.use(express.json());
app.use(express.urlencoded({extended : false}));


app.use('/users',userRoutes);

app.use((req,res,next)=>
{
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error,req,res,next)=>
{
    res.status(error.status || 500);
    res.json({
        error: {
            message : error.message
        }
    })
} );

module.exports = app;
