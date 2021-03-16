const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');


//Loading config
dotenv.config({path: './config/config.env'});

// Routes 
const userRoutes = require('./api/routes/user');
const bookRoutes = require('./api/routes/books');
const authRoutes = require('./api/routes/auth');

//const uri1 = 'mongodb+srv://akash:passw0rd@book-store.ez0yv.mongodb.net/RC-backend-book-shop?retryWrites=true&w=majority';
//const uri2 = 'mongodb+srv://sky_sky:sky_sky@node-rest-shop.7eiux.mongodb.net/node-rest-shop?retryWrites=true&w=majority' ;


// Connection with db
connectDB();

// logger
app.use(morgan('dev'));

// Body Parser
app.use(express.json());
app.use(express.urlencoded({extended : false}));


app.use('/users',userRoutes);
app.use('/books',bookRoutes);
app.use('/auth', authRoutes);

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
