const db = require("../config/db");

const home_controller = {
    home_page:(req, res, next)=>{
        res.render('home', { title: 'Express' });
    }
}

module.exports = home_controller;