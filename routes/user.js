var express = require('express');
var router = express.Router();
var user_controller = require("../controllers/user")

/* GET users listing. */
router.get('/signup',user_controller.signup_page );
router.get('/login',user_controller.login_page );
router.get('/profile',user_controller.profile_page );
router.get('/logout',user_controller.logout_function );
router.post('/signup',user_controller.signup_function);
router.post('/login',user_controller.login_function)

module.exports = router;
