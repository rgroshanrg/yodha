const mongoose = require('mongoose');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const inventorySchema = new Schema({
    _creator: {type: mongoose.Schema.Types.ObjectId},
    date : {type: Date, default: Date.now},
    upiref : {type: String, default: null},
    address : {type: String, default: null},
    pin : {type: String, default: null},
    name : {type: String, default: null},
    phone : {type: String, default: null},
    email: {type: String},
    name: {type: String}
});

inventorySchema.plugin(passportLocalMongoose);

const Inventory = mongoose.model('inventory', inventorySchema);

module.exports = Inventory;