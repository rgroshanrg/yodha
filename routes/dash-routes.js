const router = require('express').Router();
const passport = require('passport');
const User = require('../utils/models/user-model');
const Feedback = require('../utils/models/feedback-model');
const Inventory = require('../utils/models/inventory-model');
const Covidreq = require('../utils/models/covid-request-model');
const Vaccinationreq = require('../utils/models/vaccination-request-model');
const isLoggedIn = require('../utils/middlewares/isLoggedIn');

// router.get('/', isLoggedIn, (req, res) => {
//     // let type = '#';
//     if(req.user.isHealthWorker) {
//         type = 'hw';
//         name = req.user.name;
//         Inventory.find().then(payments => {
//             Covidreq.find().then(covidreqs => {
//                 Feedback.find({isGeneralPublic : true}).then(feedback => {
//                     Vaccinationreq.find().then(vaccination => {
//                         res.render('dashboard', {
//                             name: name, 
//                             type : type, 
//                             success: req.flash('success'),
//                             payments : payments,
//                             covidreqs : covidreqs,
//                             feedback : feedback,
//                             vaccination : vaccination
//                         })
//                     })
//                 })
//             })
//         })
//     } else if(req.user.isGovtOfficial) {
//         type = 'go';
//         name = req.user.name;
//         Inventory.find().then(payments => {
//             Covidreq.find().then(covidreqs => {
//                 Feedback.find({isHealthWorker : true}).then(feedback => {

//                     Vaccinationreq.find().then(vaccination => {
//                         res.render('dashboard', {
//                             name: name, 
//                             type : type, 
//                             success: req.flash('success'),
//                             payments : payments,
//                             covidreqs : covidreqs,
//                             feedback : feedback,
//                             vaccination : vaccination
//                         })
//                     })
//                 })
//             })
//         })
//     } else {
//         res.send('Access Denied.')
//     }
// })

router.get('/orders', isLoggedIn, (req, res) => { 
    name = req.user.name;
    if(req.user.isHealthWorker) {
        type = 'hw';
        
    } else if(req.user.isGovtOfficial) {
        type = 'go';

    } else {
        return res.send('Access Denied');
    }
    Inventory.find().then(payments => {
        res.render('orders', {
            name: name, 
            type : type, 
            success: req.flash('success'),
            payments : payments.reverse()
        })
    })
})

router.get('/vaccination', isLoggedIn, (req, res) => { 
    name = req.user.name;
    if(req.user.isHealthWorker) {
        type = 'hw';
        
    } else if(req.user.isGovtOfficial) {
        type = 'go';

    } else {
        return res.send('Access Denied');
    }
    Vaccinationreq.find().then(vaccination => {
        res.render('vaccination', {
            name: name, 
            type : type, 
            success: req.flash('success'),
            vaccination : vaccination.reverse()
        })
    })
})

router.get('/covidtests', isLoggedIn, (req, res) => { 
    name = req.user.name;
    if(req.user.isHealthWorker) {
        type = 'hw';
        
    } else if(req.user.isGovtOfficial) {
        type = 'go';

    } else {
        return res.send('Access Denied');
    }
    Covidreq.find().then(covidreqs => {
        res.render('covidtests', {
            name: name, 
            type : type, 
            success: req.flash('success'),
            covidreqs : covidreqs.reverse()
        })
    })
})


router.get('/complain', isLoggedIn, (req, res) => { 
    name = req.user.name;
    if(req.user.isHealthWorker) {
        type = 'hw';
        Feedback.find({isGeneralPublic : true}).then(feedback => {
            res.render('complain', {
                name: name, 
                type : type, 
                success: req.flash('success'),
                feedback : feedback.reverse()
            })
        })
        
    } else if(req.user.isGovtOfficial) {
        type = 'go';
        Feedback.find({isGeneralPublic : true}).then(feedback => {
            res.render('complain', {
                name: name, 
                type : type, 
                success: req.flash('success'),
                feedback : feedback.reverse()
            })
        })

    } else {
        return res.send('Access Denied');
    }
})




module.exports = router;