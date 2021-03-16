const http = require('http');
const app = require('./app');
const dotenv = require('dotenv');

//Loading config
dotenv.config({path: './config/config.env'});

const port = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(port, ()=> {
    console.log(`Server Running on Port : ${port}`);
}  );