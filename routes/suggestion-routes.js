const router = require('express').Router();
const passport = require('passport');
const User = require('../utils/models/user-model');
const Suggestion = require('../utils/models/suggestion-model');
const isLoggedIn = require('../utils/middlewares/isLoggedIn');
const passportLocalMongoose = require('passport-local-mongoose');

router.get('/add', isLoggedIn, (req, res) => {
    res.render('suggestion-box');
})

router.post('/add', isLoggedIn, (req, res) => {
    let userid = req.user._id;
    let suggestionText = req.body.suggestionText;
    let comp;
    if(req.user.isGeneralPublic === true) {
        comp = {
            _creator : userid,
            text : suggestionText,
            isGeneralPublic: true
        }
    } else {
        comp = {
            _creator : userid,
            text : suggestionText,
            isHealthWorker: true
        }
    }
    new Suggestion(comp).save().then((newSuggestion) => {
        req.flash('success', 'Suggestion Sent Successfully.');
        res.redirect('/suggestion/add');
    })

})


module.exports = router;