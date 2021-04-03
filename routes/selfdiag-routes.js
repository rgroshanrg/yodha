const router = require('express').Router();
const passport = require('passport');
const User = require('../utils/models/user-model');
const Feedback = require('../utils/models/feedback-model');
const isLoggedIn = require('../utils/middlewares/isLoggedIn');
const passportLocalMongoose = require('passport-local-mongoose');

router.get('/', isLoggedIn, (req, res) => {
    var isAuthenticated = false, type = '#', name = '';
    if(req.user) {
        isAuthenticated = true;
        if(req.user.isGeneralPublic === true) { type = 'gp'; } 
        else if(req.user.isHealthWorker === true) { type = 'hw'; } 
        else if(req.user.isGovtOfficial === true) { type = 'go'; } 
        else if(req.user.isAdmin === true) { type = 'ad'; }
        name = req.user.name;
    }
    res.render('self-diagnosis', {name: name, isAuthenticated : isAuthenticated, type : type, success: req.flash('success')});
})


module.exports = router;