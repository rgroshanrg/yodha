const router = require('express').Router();

const isLoggedIn = require('../utils/middlewares/isLoggedIn');


// router.get('/', isLoggedIn, (req, res) => {
//     res.send('LoggedIn as' + req.user.name);
// });

router.get('/testing-centers', isLoggedIn, (req, res) => {
    var type;
    if(req.user.isGeneralPublic === true) { type = 'gp'; } 
    else if(req.user.isHealthWorker === true) { type = 'hw'; } 
    else if(req.user.isGovtOfficial === true) { type = 'go'; } 
    else if(req.user.isAdmin === true) { type = 'ad'; } else { type = '#'; } 
    res.render('testing-centers', {name : req.user.name, type : type});
});

router.get('/vaccination-centers', isLoggedIn, (req, res) => {
    var type;
    if(req.user.isGeneralPublic === true) {
        type = 'gp';
    } else if(req.user.isHealthWorker === true) {
        type = 'hw';
    } else if(req.user.isGovtOfficial === true) {
        type = 'go';
    } else if(req.user.isAdmin === true) {
        type = 'ad';
    } else {
        type = '#';
    }
    res.render('vaccination-centers', {name : req.user.name, type : type});
});


module.exports = router;