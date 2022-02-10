const express = require('express');
const router = express.Router();

// importing translation controller 
const translateController= require('../controller/translateController');

// handling translate request 
router.get('/', translateController.home);
router.get('/translate', translateController.translate);

module.exports = router;