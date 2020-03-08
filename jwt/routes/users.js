var express = require('express');
var router = express.Router();
const { verify } = require('../lib/handler')

/* GET users listing. */
router.get('/', verify, function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
