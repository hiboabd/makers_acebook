var express = require('express');
var router = express.Router();

console.log(2);

var HomeController = require('../controllers/home');

router.get('/', HomeController.Index);

module.exports = router;
