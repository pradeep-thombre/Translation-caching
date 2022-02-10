
const http = require('http');
var mongoose =  require('./config/mongoose');
const path = require('path');
const colors = require('colors');
const port = process.env.PORT || 5000;


const app = require('./app');

const MongoDbStore = require('connect-mongo');

const server = http.createServer(app);
server.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});
module.exports = server