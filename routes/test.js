var express = require('express');
var router = express.Router();

var testController = require('../controllers/test')
router.get('/', testController.Index)
// we use slash to define the beginning
module.exports = router;
