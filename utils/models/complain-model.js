const mongoose = require('mongoose');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const complainSchema = new Schema({
    _creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    date : {type: Date, default: Date.now},
    text : {type: String, default: null},
    isGeneralPublic: {type: Boolean, default: false},
    isHealthWorker: {type: Boolean, default: false}

    //flags
});

complainSchema.plugin(passportLocalMongoose);

const Complain = mongoose.model('complain', complainSchema);

module.exports = Complain;