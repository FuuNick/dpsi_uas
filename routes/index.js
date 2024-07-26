var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('<p>server has connected!</p>');
});

module.exports = router;