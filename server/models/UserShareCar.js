const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    accountType: {
        type: String, // 1 driver, 2: passenger
        required: true,
        // default: 2
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    }
});

const UserShareCar = mongoose.model('UserShareCar.js', UserSchema);
module.exports = UserShareCar;
