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
    res.render('feedback', {name: name, isAuthenticated : isAuthenticated, type : type, success: req.flash('success')});
})

router.post('/', isLoggedIn, (req, res) => {
    let userid = req.user._id;
    let message = req.body.message;
    let subject = req.body.subject;
    let comp;
    
    User.findById(req.user._id, (err, user) => {
        if(req.user.isGeneralPublic === true) {
            comp = {
                _creator : userid,
                message : message,
                subject : subject,
                isGeneralPublic: true,
                name : user.name,
                email : user.email
            }
        } else {
            comp = {
                _creator : userid,
                message : message,
                subject : subject,
                isHealthWorker: true,
                name : user.name,
                email : user.email
            }
        }
        new Feedback(comp).save().then((newFeedback) => {
            console.log(newFeedback);
            req.flash('success', 'Complain/Suggestion Sent Successfully.');
            res.redirect('/feedback');
        }).catch((err) => {
            console.log(err);
        })
    }).then(user => {}).catch(err => console.log(err));
    

})


module.exports = router;