const mongoose = require('mongoose');

const AccountDriverSchema = new mongoose.Schema({
    accountID: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    birthday: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    passportID: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: false
    },
    numberOfTrips: {
        type: Number,
        required: true
    },
    numberOfKms: {
        type: Number,
        required: false
    },
    carInfo: {
        model: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: false // will be true
        },
        manufacturingYear: {
            type: Number,
            required: true
        },
        licensePlate: {
            type: String,
            required: true
        },
        numberOfSeats: {
            type: Number,
            required: true
        }
    },
    registerDate: {
        type: String,
        required: true
    },
    // rewardPoints: {
    //     type: Number
    // },
    passengersRate: [{
        passengerID: {
            type: String,
            // required: true
        },
        passengerName: {
            type: String,
            // required: true
        },
        rated: {
            type: Number,
            // required: true
        },
        comments: {
            type: String,
        }
    }]
})

const AccountDriver = mongoose.model('AccountDriver', AccountDriverSchema);
module.exports = AccountDriver;
