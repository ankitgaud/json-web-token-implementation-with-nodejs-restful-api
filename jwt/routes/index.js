var express = require('express');
var router = express.Router();

const { logIn, verify, logout } = require('../lib/handler')

// login for access all the pages
router.post('/login', logIn)

/* GET home page. */
router.get('/', verify, function(req, res, next) {
  res.send("index");
});

router.get('/logout', logout)

module.exports = router;
