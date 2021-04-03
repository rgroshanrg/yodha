const router = require('express').Router();
const passport = require('passport');
const User = require('../utils/models/user-model');
const Feedback = require('../utils/models/feedback-model');
const Inventory = require('../utils/models/inventory-model');
const Covidreq = require('../utils/models/covid-request-model');
const Vaccinationreq = require('../utils/models/vaccination-request-model');
const isLoggedIn = require('../utils/middlewares/isLoggedIn');

router.get('/', isLoggedIn, (req, res) => {
    // let type = '#';
    if(req.user.isHealthWorker) {
        type = 'hw';
        name = req.user.name;
        Inventory.find().then(payments => {
            Covidreq.find().then(covidreqs => {
                Feedback.find({isGeneralPublic : true}).then(feedback => {
                    Vaccinationreq.find().then(vaccination => {
                        res.render('dashboard', {
                            name: name, 
                            type : type, 
                            success: req.flash('success'),
                            payments : payments,
                            covidreqs : covidreqs,
                            feedback : feedback,
                            vaccination : vaccination
                        })
                    })
                })
            })
        })
    } else if(req.user.isGovtOfficial) {
        type = 'go';
        name = req.user.name;
        Inventory.find().then(payments => {
            Covidreq.find().then(covidreqs => {
                Feedback.find({isHealthWorker : true}).then(feedback => {

                    Vaccinationreq.find().then(vaccination => {
                        res.render('dashboard', {
                            name: name, 
                            type : type, 
                            success: req.flash('success'),
                            payments : payments,
                            covidreqs : covidreqs,
                            feedback : feedback,
                            vaccination : vaccination
                        })
                    })
                })
            })
        })
    } else {
        res.send('Access Denied.')
    }
    // var isAuthenticated = false, type = '#', name = '';
    // if(req.user) {
    //     isAuthenticated = true;
    //     if(req.user.isGeneralPublic === true) { type = 'gp'; } 
    //     else if(req.user.isHealthWorker === true) { type = 'hw'; } 
    //     else if(req.user.isGovtOfficial === true) { type = 'go'; } 
    //     else if(req.user.isAdmin === true) { type = 'ad'; }
    //     name = req.user.name;
    // }
    // var paymens = [];
    // var covreqs = [];
    // let temp = {};
    // Inventory.find().then(payments => {
    //     Covidreq.find().then(covidreqs => {
    //         Feedback.find().then(feedback => {
    //             res.render('dashboard', {
    //                 name: name, 
    //                 isAuthenticated : isAuthenticated, 
    //                 type : type, 
    //                 success: req.flash('success'),
    //                 payments : payments,
    //                 covidreqs : covidreqs,
    //                 feedback : feedback
    //             })
    //         })
    //     })
    // })
    

    // var totalUser, boughtFree, boughtPaid, notBought;

    // User.countDocuments({isGeneralPublic : true}, (err, count) => {
    //     if(err) {
    //         console.log(err);
    //     }
    // }).then((count) => {
    //     totalUser = count;
    //     Inventory.countDocuments({}, (err, countAll) => {
    //         if(err) {
    //             console.log(err);
    //         }
    //     }).then(countAll => {
    //         Inventory.countDocuments({upiref : null}, (err, countnull) => {
    //             if(err) {
    //                 console.log(err);
    //             }
    //         }).then(countnull => {
    //             boughtFree = countnull;
    //             boughtPaid = countAll - boughtFree;
    //             notBought = totalUser - (boughtFree + boughtPaid);
    //             console.log(notBought);
    //             console.log(boughtFree);
    //             console.log(boughtPaid);
    //             console.log(totalUser);
    //             res.render('dashboard', {
    //                 name: name, 
    //                 isAuthenticated : isAuthenticated, 
    //                 type : type, 
    //                 success: req.flash('success'),
    //                 boughtFree: (100*boughtFree)/totalUser,
    //                 boughtPaid : (100*boughtPaid)/totalUser,
    //                 notBought : (100*notBought)/totalUser
    //             })
                

    //         }).catch(err => {
    //             console.log(err);
    //         })
    //     }).catch(err => {
    //         console.log(err);
    //     })
    // }).catch(err => {
    //     console.log(err);
    // })
})


module.exports = router;