var express = require("express");
var router = express.Router();
var models = require("../models");

// GET /users/signup/
router.get('/signup', function (req, res, next) {
    res.send('signup');
  });

module.exports = router;