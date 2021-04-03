const router = require('express').Router();
const passport = require('passport');
const User = require('../utils/models/user-model');
const CovidRequest = require('../utils/models/covid-request-model');
const isLoggedIn = require('../utils/middlewares/isLoggedIn');
const passportLocalMongoose = require('passport-local-mongoose');
const nodemailer = require('nodemailer');
const keys = require('../config/keys');

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
    res.render('covid-request', {name: name, isAuthenticated : isAuthenticated, type : type, success: req.flash('success')});
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
        new CovidRequest(request).save().then((newReq) => {
            console.log(newReq);
            req.flash('success', 'Succesfully Requested covid');
            res.redirect('/request-covid');
        }).catch((err) => {
            console.log(err);
        })
    }).then(user => {}).catch(err => console.log(err));
    

})
router.post('/sendmail', (req, res) => {
    var email = req.body.email;
    console.log(email);

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: keys.GMAIL.EMAIL_ID,
            pass: keys.GMAIL.EMAIL_PASS,
        },
    })
    let info = transporter.sendMail({
        from: '"Yodha - The Real Heroes" <yodhatherealwarriors@gmail.com>',  // sender address
        to: req.user.email, // list of receivers seperated by comma
        subject: "Yodha - Covid Report", // Subject line
        text: "You have been Tested NEGATIVE for Covid-19 Test ", // plain text body
    }, (error, info) => {

        if (error) {
            console.log(error)
            return;
        }
        console.log('Message sent successfully!');
        console.log(info);
        transporter.close();
        res.redirect('/dashboard');
    });


    // res.redirect('/dashboard');
})


module.exports = router;