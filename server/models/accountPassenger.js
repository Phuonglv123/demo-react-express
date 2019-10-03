const mongoose = require('mongoose');

const AccountPassengerSchema = new mongoose.Schema({
    accountID:{
        type: String,
        required: true
    },
    birthday:{
        type: String,
        required: true,
    },
    registerday:{
        type: Date,
        required: true
    },
    numberOfTrips:{
        type: Number,
        required: true
    }
})

module.exports = user = mongoose.model('AccountPassenger',AccountPassengerSchema);
