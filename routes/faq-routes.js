const router = require('express').Router();
const passport = require('passport');
const User = require('../utils/models/user-model');
const Feedback = require('../utils/models/feedback-model');
const Inventory = require('../utils/models/inventory-model');
const Covidreq = require('../utils/models/covid-request-model');
const isLoggedIn = require('../utils/middlewares/isLoggedIn');

router.get('/', (req, res) => {
    var isAuthenticated = false, type = '#', name = '';
    if(req.user) {
        isAuthenticated = true;
        if(req.user.isGeneralPublic === true) { type = 'gp'; } 
        else if(req.user.isHealthWorker === true) { type = 'hw'; } 
        else if(req.user.isGovtOfficial === true) { type = 'go'; } 
        else if(req.user.isAdmin === true) { type = 'ad'; }
        name = req.user.name;
    }
    res.render('faq', {name: name, isAuthenticated : isAuthenticated, type : type, success: req.flash('success')});
})


module.exports = router;