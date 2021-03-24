const mongoose = require('mongoose');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, default: null},
    email: {type: String},
    googleID: {type: String, default: null},

    name: {type: String, default:null},

    hash: {type: String},
    salt: {type: String},

    //flags
    hasVerifiedEmail: {type: Boolean, default: false},
    isGeneralPublic : {type: Boolean, default: false},
    isHealthWorker : {type: Boolean, default: false},
    isGovtOfficial : {type: Boolean, default: false},
    isAdmin : {type: Boolean, default: false}
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('user', userSchema);

module.exports = User;