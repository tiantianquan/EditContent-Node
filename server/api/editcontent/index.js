var express = require('express');
var controller = require('./editcontent.controller');

var router = express.Router();

router.get('/', controller.getEditContent);
router.post('/', controller.postEditContent);

module.exports = router;