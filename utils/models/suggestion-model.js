const mongoose = require('mongoose');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const suggestionSchema = new Schema({
    _creater: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    date : {type: Date, default: Date.now},
    text : {type: String, default: null},
    isGeneralPublic: {type: Boolean, default: false},
    isHealthWorker: {type: Boolean, default: false}

    //flags
});

suggestionSchema.plugin(passportLocalMongoose);

const Suggestion = mongoose.model('suggestion', suggestionSchema);

module.exports = Suggestion;