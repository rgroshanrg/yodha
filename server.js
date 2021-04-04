const express = require('express');
const server = express();
const flash = require('connect-flash');
const path = require('path');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const User = require('./utils/models/user-model');
const Inventory = require('./utils/models/inventory-model');

const keys = require('./config/keys');
const passportSetup = require('./config/passport-setup');

const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const feedbackRoutes = require('./routes/feedback-routes');
const mapsRoutes = require('./routes/maps-routes');
const inventoryRoutes = require('./routes/inventory-routes');
const covidReqRoutes = require('./routes/covid-request-routes');
const vaccinationReqRoutes = require('./routes/vaccination-request-routes');
const dashRoutes = require('./routes/dash-routes');
const faqRoutes = require('./routes/faq-routes');
const selfdiagRoutes = require('./routes/selfdiag-routes');

const isLoggedIn = require('./utils/middlewares/isLoggedIn');
const isNotLoggedIn = require('./utils/middlewares/isNotLoggedIn');
const { type } = require('os');


// View Engine Set
server.set('view engine', 'ejs');

server.use(cookieSession({
    name: 'session',
    maxAge: (24 * 60 * 60 * 1000),   // max age of session cookie - 1 days
    keys: [keys.SESSION.COOKIE_KEY]
}));

server.use(flash());


server.use(bodyParser.urlencoded({ extended: false }));
server.use(methodOverride('_method'));

// initialize passport
server.use(passport.initialize());
server.use(passport.session());


const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}

mongoose.connect(keys.MONGO.URI,connectionParams).then( () => {
        console.log('Connected to database ')
    }).catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

server.use(express.static(path.join(__dirname, '/public')));

//set up routes
server.use('/auth', authRoutes);
server.use('/profile', profileRoutes);
server.use('/feedback', feedbackRoutes);
server.use('/maps', mapsRoutes);
server.use('/inventory', inventoryRoutes);
server.use('/request-covid', covidReqRoutes);
server.use('/request-vaccination', vaccinationReqRoutes);
server.use('/dashboard', dashRoutes);
server.use('/faq', faqRoutes);
server.use('/self-diagnosis', selfdiagRoutes);


server.get('/faq', (req, res) => {
    res.render('faq');
})

server.get('/', (req, res) => {
    var isAuthenticated = false, type = '#', name = '';
    if(req.user) {
        isAuthenticated = true;
        if(req.user.isGeneralPublic === true) { type = 'gp'; } 
        else if(req.user.isHealthWorker === true) { type = 'hw'; } 
        else if(req.user.isGovtOfficial === true) { type = 'go'; } 
        else if(req.user.isAdmin === true) { type = 'ad'; }
        name = req.user.name;
    }
        res.render('index', {name: name, isAuthenticated : isAuthenticated, type : type});
});


server.listen( 3000, () => {
    console.log('Server has Started on PORT 3000');
})
