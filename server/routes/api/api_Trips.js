const express = require('express');
const router = express.Router();
const passport = require('passport');

// load model
const User = require('../../models/UserShareCar');
const Passenger = require('../../models/accountPassenger');
const AccountDriver = require('../../models/accountDriver');
const Trips = require('../../models/trips');


router.get('/allroute', (req, res) => {
    Trips.find({}, function (err, data) {
        if (err) {
            console.log(err);
            return res.send(400, 'no list')
        } else {
            res.json(data)
        }
    })
});

router.post('/search', (req, res, next) => {
    let from = "^$";
    let to = '^$';
    if (req.body.locationFrom)
        from = req.body.locationFrom;
    to = req.body.locationTo;

    Trips.find({
        $or: [{locationFrom: {$regex: from, $options: 'i'}}, {
            locationTo: {
                $regex: to,
                $options: 'i'
            }
        }]
    }).exec(function (err, data) {
        if (err) {
            return res.json(err)
        } else {
            res.json(data)
            console.log(data)
        }
    });
});

// route    POST api/trips/create
// desc     Create a trip
// access   Private
router.post('/create', passport.authenticate('jwt', {session: false}), (req, res) => {
    const id = req.user.id;
    AccountDriver.findOne({accountID: id})
        .then(driver => {
            if (driver) {
                // options
                let options = {};
                options = {
                    ...options,
                    wifi: req.body.wifi,
                    music: req.body.music,
                    pet: req.body.pet,
                    food: req.body.food,
                    drink: req.body.drink,
                    wetTowel: req.body.wetTowel
                };

                const newTrip = new Trips({
                    driverID: driver.accountID,
                    locationFrom: req.body.locationFrom,
                    locationTo: req.body.locationTo,
                    startTime: req.body.startTime,
                    options,
                    availableSeats: req.body.availableSeats,
                    finish: false,
                    fee: req.body.fee,
                    endTime: req.body.endTime
                });

                newTrip.save()
                    .then(trip => {
                        res.json({trip})
                        console.log(trip)
                    })
                    .catch(err => console.log("Error", err))
            }
        })
});

// route    POST api/trips/book/:id
// desc     Book a trip
// access   Private
router.post('/book/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Passenger.findOne({accountID: req.user.id})
        .then(passenger => {
            Trips.findById(req.params.id)
                .then(trip => {
                    const newPassenger = {
                        accountID: passenger._id,
                        locationGetIn: req.body.locationGetIn,
                        locationGetOff: req.body.locationGetOff,
                        paymentMethod: req.body.paymentMethod,
                        numberOfBookingSeats: req.body.numberOfBookingSeats,
                        notes: req.body.notes
                    }
                    trip.passengers.push(newPassenger);

                    trip.save()
                        .then(trip => res.json({trip}))
                })
                .catch(err => console.log("Error: ", err))
        })
        .catch(err => console.log("Error: ", err))
});

// route    POST api/trips/finish/:id
// desc     Finish a trip
// access   Private
router.post('/finish/:id', passport.authenticate('jwt', {session: false}), (req, res) => {

    AccountDriver.findOne({accountID: req.user.id})
        .then(driver => {
            Trips.findById(req.params.id)
                .then(trip => {
                    if (trip.driverID === driver._id) {
                        driver.numberOfTrips += 1;
                        driver.save()
                            .then(() => {
                                trip.finish = true;
                                trip.save()
                                    .then(() => {
                                        res.json({finish: true, numberOfTrips: driver.numberOfTrips})
                                    })
                            })
                    }
                })
        })

});


// route    POST api/trips/rate/:id
// desc     Rate a trip
// access   Private
router.post('/rate/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Passenger.findOne({accountID: req.user.id})
        .then(passenger => {
            let passengerRate = {
                passengerID: passenger._id,
                rated: req.body.rated,
                comments: req.body.comments
            }
            console.log(passengerRate)
            Trip.findById(req.params.id)
                .then(trip => {
                    Driver.findById(trip.driverID)
                        .then(driver => {
                            driver.passengersRate.push(passengerRate)
                            driver.save()
                                .then(updatedDriver => res.json(updatedDriver))
                        })
                })
        })
})

module.exports = router;
