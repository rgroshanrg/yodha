// const mongoose = require('mongoose');
// const passport = require('passport');
// const passportLocalMongoose = require('passport-local-mongoose');
// const Schema = mongoose.Schema;

// const userSchema = new Schema({
//     username: {type: String, default: null},
//     email: {type: String},
//     googleID: {type: String, default: null},

//     name: {type: String, default:null},
    
//     hash: {type: String},
//     salt: {type: String},

//     //flags
//     hasVerifiedEmail: {type: Boolean, default: false}
// }); 

// userSchema.plugin(passportLocalMongoose);

// const User = mongoose.model('user', userSchema);

// module.exports = User;


const mongoose = require('mongoose');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, default: null},
    email: {type: String},
    googleID: {type: String, default: null},

    name: {type: String, default:null},
    rollNo: {type: String, default: null},

    age: {type: Number, default: null},
    gender: {type: String, default: null},
    college: {type: String, default: null},
    semester: {type: Number, default: null},
    group: {type: String, default: null},
    stream: {type: String, default: null},

    profilePicURL: {type: String, default: null},

    hash: {type: String},
    salt: {type: String},

    //flags
    hasVerifiedEmail: {type: Boolean, default: false}
}); 

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('user', userSchema);

module.exports = User;