var express = require('express');
var router = express.Router();
var home_controller = require("../controllers/home")

/* GET home page. */
router.get('/',home_controller.home_page );

module.exports = router;
