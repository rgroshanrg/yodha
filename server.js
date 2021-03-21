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

const keys = require('./config/keys');
const passportSetup = require('./config/passport-setup');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const isLoggedIn = require('./utils/middlewares/isLoggedIn');
const isNotLoggedIn = require('./utils/middlewares/isNotLoggedIn');




// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://covweb:jDF74nZUCxTGUKn@cov-web.uygus.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });








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

// MongoDB Database Connection
// mongoose.connect(keys.MONGO.URI, () => {
//      console.log("DataBase Connected");
// })


server.use(express.static(path.join(__dirname, '/public')));

//set up routes
server.use('/auth', authRoutes);
server.use('/profile', profileRoutes);

server.get('/', isLoggedIn, (req, res) => {
    res.render('index', {name: req.user.name});
});


server.listen( 3000, () => {
    console.log('Server has Started on PORT 3000');
})
