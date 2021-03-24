const mongoose = require('mongoose');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    _creater: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    date : {type: Date, default: Date.now},
    upiRef : {type: String, default: null},
    paidAmount : {type: String, default: null},
    address : {type: String, default: null},
    equipments : [String]
    //flags
});

transactionSchema.plugin(passportLocalMongoose);

const Transaction = mongoose.model('transaction', transactionSchema);

module.exports = Transaction;