const router = require('express').Router();
const passport = require('passport');
const User = require('../utils/models/user-model');
const VaccinationRequest = require('../utils/models/vaccination-request-model');
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
    res.render('vaccination-request', {name: name, isAuthenticated : isAuthenticated, type : type, success: req.flash('success')});
})

router.post('/', isLoggedIn, (req, res) => {
    
    User.findById(req.user._id, (err, user) => {
        let request = {
            reqBy : req.user._id,
            phoneNo : req.body.phoneNo,
            age : req.body.age,
            gender : req.body.gender,
            name : user.name,
            email : user.email
        }
        new VaccinationRequest(request).save().then((newReq) => {
            console.log(newReq);
            req.flash('success', 'Succesfully Requested Vaccination');
            res.redirect('/request-vaccination');
        }).catch((err) => {
            console.log(err);
        })
    }).then(user => {}).catch(err => console.log(err));
    

})

module.exports = router;