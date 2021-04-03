const mongoose = require('mongoose');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const covidreqSchema = new Schema({
    reqBy: {type: mongoose.Schema.Types.ObjectId},
    date : {type: Date, default: Date.now},
    phoneNo : {type: String, default: null},
    age : {type: String, default: null},
    gender : {type: String, default: null},
    email: {type: String},
    name: {type: String}
    //flags
});

covidreqSchema.plugin(passportLocalMongoose);

const Covidreq = mongoose.model('covidreq', covidreqSchema);

module.exports = Covidreq;