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

router.get('/chart', isLoggedIn, (req, res) => {
    if(req.user.isGovtOfficial) {
            
        var free = [];
        var paid = [];
        var freepaid = [];
        Inventory.find().then(inv => {
            inv.forEach(pay => {
                if(pay.upiref === null)
                    free.push(pay._creator);
                else
                    paid.push(pay._creator);
            });
            }).then(a => {
               for(var i = 0; i < free.length; ++i) {
                   for(var j = 0; j < paid.length; ++j) {
                       if(String(free[i]) === String(paid[j])) {
                           freepaid.push(free[i]);
                           break;
                       }
                   }
               }
                console.log("free");
                free.forEach(element => {
                    console.log(element);
                });
                console.log("paid");

                paid.forEach(element => {
                    console.log(element);
                });
                console.log("freepaid");

                freepaid.forEach(element => {
                    console.log(element);
                });
                res.render('chart', {a :free.length, b : paid.length, c : freepaid.length})
            }).then(b => {
                User.count({}, (err, uc) => {
                    Vaccinationreq.count({}, (err, vc) => {
                        Covidreq.count({}, (err, cc) => {
                            res.render('chart', {a :free.length, b : paid.length, c : freepaid.length, uc : uc, vc : vc, cc : cc});
                        })
                    })
                })
            })
    }
})




module.exports = router;