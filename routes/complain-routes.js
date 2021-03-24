const router = require('express').Router();
const passport = require('passport');
const User = require('../utils/models/user-model');
const Complain = require('../utils/models/complain-model');
const isLoggedIn = require('../utils/middlewares/isLoggedIn');
const passportLocalMongoose = require('passport-local-mongoose');

router.get('/add', isLoggedIn, (req, res) => {
    res.render('complain-box');
})

router.post('/add', isLoggedIn, (req, res) => {
    let userid = req.user._id;
    let complainText = req.body.complainText;
    let comp;
    if(req.user.isGeneralPublic === true) {
        comp = {
            _creator : userid,
            text : complainText,
            isGeneralPublic: true
        }
    } else {
        comp = {
            _creator : userid,
            text : complainText,
            isHealthWorker: true
        }
    }
    new Complain(comp).save().then((newComplain) => {
        req.flash('success', 'Complain Sent Successfully.');
        res.redirect('/complain/add');
    })

})


module.exports = router;