const express = require('express');
const app = express();

const morgan = require('morgan');
const cors = require('cors');

//body-parser
app.use(express.urlencoded({extended: false}));
app.use(express.json());


//dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

//enable CORS
app.use(cors());

// use express router
app.use('/', require('./routes/translate'));


//error handler
app.use((req,res,next) => {
    const error = new Error('Not Found!');
    error.status = 400;
    next(error);
});


module.exports = app;