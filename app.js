const express = require('express');
const app = express();

const morgan = require('morgan');
const cors = require('cors');

//body-parser
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const expressLayouts = require('express-ejs-layouts');

//dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// setting static files 
app.use(express.static('./assets'));
//enable CORS
app.use(cors());


// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// use express router
app.use('/', require('./routes/translate'));

module.exports = app;