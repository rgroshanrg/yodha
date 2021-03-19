const isLoggedIn = (req, res, next) => {
    console.log("Check - isLoggedIn [2]");
    if(req.user) {
        // if(req.user.semester === null) {
        //     // return res.redirect('/auth/signup/additional');
        // }
        next();
    } else {
        res.redirect('/auth/login');
    }
}

module.exports = isLoggedIn;