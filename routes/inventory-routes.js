const router = require('express').Router();

const isLoggedIn = require('../utils/middlewares/isLoggedIn');
const Inventory = require('../utils/models/inventory-model');

const User = require('../utils/models/user-model');
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
    res.render('inventory', {name: name, isAuthenticated : isAuthenticated, type : type, success: req.flash('success'), error : req.flash('error')});
});

router.post('/', isLoggedIn, (req, res) => {
    // console.log(req.body);
    if(!req.body.upiref) {
        Inventory.findOne({_creator : req.user._id}, (err, user) => {
            if(user != null) {
                console.log(user);
                req.flash('error', 'You are not allowed to take Free Kit more than Once.')
                // return res.send("You are not allowed to take Free Kit more than Once.")
                return res.redirect('/inventory');
            } else {
                User.findById(req.user._id, (err, user) => {
                    let inv = {
                        name : req.body.name,
                        _creator : req.user._id,
                        phone : req.body.phone,
                        address : req.body.address,
                        pin : req.body.pin,
                        upiref : null,
                        name : user.name,
                        email : user.email
                    }
                    new Inventory(inv).save().then(newInv => {
                        console.log(newInv);
                        req.flash('success', 'Order Successfull.')
                        res.redirect('/inventory');
                    }).catch((err) => {
                        console.log(err);
                        res.send(err);
                    })
                }).then(user => {}).catch(err => console.log(err));
            }
        })
    } else {
        Inventory.findOne({_creator : req.user._id}, (err, user) => {
                User.findById(req.user._id, (err, user) => {
                    let inv = {
                        name : req.body.name,
                        _creator : req.user._id,
                        phone : req.body.phone,
                        address : req.body.address,
                        pin : req.body.pin,
                        upiref : req.body.upiref,
                        name : user.name,
                        email : user.email
                    }
                    new Inventory(inv).save().then(newInv => {
                        console.log(newInv);
                        req.flash('success', 'Order Successfull.')
                        res.redirect('/inventory');
                    }).catch((err) => {
                        console.log(err);
                        res.send(err);
                    })
                }).then(user => {}).catch(err => console.log(err));
        })
    }
})

module.exports = router;