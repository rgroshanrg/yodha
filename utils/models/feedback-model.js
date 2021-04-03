const mongoose = require('mongoose');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    _creator: {type: mongoose.Schema.Types.ObjectId},
    date : {type: Date, default: Date.now},
    message : {type: String, default: null},
    isGeneralPublic: {type: Boolean, default: false},
    isHealthWorker: {type: Boolean, default: false},
    subject: {type: String, default: null},
    email: {type: String},
    name: {type: String}

    //flags
});

feedbackSchema.plugin(passportLocalMongoose);

const Feedback = mongoose.model('feedback', feedbackSchema);

module.exports = Feedback;