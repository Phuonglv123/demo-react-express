const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const validatorPassRegis = require('../../validations/passengerRegister');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, 'ultils/images/')
    }
});

const upload = multer({storage: storage});


// load model
const User = require('../../models/UserShareCar');
const AccountDriver = require('../../models/accountDriver');
const Trip = require('../../models/trips');

// test
router.get('/', (req, res) => {
    res.json({msg: 'success'})
});

// route    POST localhost:4000/api/driver/register
// desc     register new driver
// access   PUBLIC
router.post('/register', async (req, res) => {

    const {errors, isValid} = validatorPassRegis(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const {username, password, firstname, lastname, phone, birthday, email} = req.body;
    await User.findOne({username: username})
        .then(accountdriver => {
            if (accountdriver) {
                res.json({msg: "username is does exits"});
            } else {
                return User.findOne({phone: phone});
            }
        })
        .then(phone => {
            if (phone) {
                res.json({msg: "Phone is does exits "})
            } else {
                const NewaccountDriver = new User({
                    username,
                    password,
                    firstname,
                    lastname,
                    birthday,
                    email,
                    accountType: 'driver',
                    isActive: true,
                    phone: req.body.phone
                });
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) return console.log(err);
                    bcrypt.hash(NewaccountDriver.password, salt, (err, hash) => {
                        if (err) return console.log(err);
                        NewaccountDriver.password = hash;
                        NewaccountDriver.save()
                            .then(accountdriver => {
                                res.json({accountdriver});
                            })
                    })
                })
            }
        })
        .catch(err => console.log(err));
});


router.get('/detail/:id', (req, res) => {
    const errors = {};
    const id = req.params.id;
    AccountDriver.findById(id)
        .then(user => {
            AccountDriver.findOne({accountID: id})
                .then(accountdriver => {
                    if (!accountdriver) {
                        errors.noProfile = 'There is no profile for this driver'
                        return res.status(404).json(errors);
                    } else {
                        res.json(accountdriver);
                    }
                })
        })

});

router.get('/managerTrip/:id/', (req, res) => {
    const errors = {};
    const id = req.params.id;
    Trip.findById(id)
        .then(trips => {
            Trip.find({driverID: id})
                .then(myTrips => {
                    if (!myTrips) {
                        errors.noTrips = 'There is no trips for this driver';
                        return res.status(404).json(errors);
                    } else {
                        res.json(myTrips)
                    }
                })
        })
});

// route    POST localhost:4000/api/driver/detail
// desc     register new account
// access   PUBLIC

router.post('/detail', upload.single('avatarDriver'), passport.authenticate('jwt', {session: false}), (req, res) => {
    const id = req.user.id;
    const {birthday, gender, address, passportID, company, modelCar, manufacturingYearCar, licensePlateCar, numberOfSeatsCar, avatarDriver} = req.body;
    AccountDriver.findOne({accountID: id})
        .then(account => {
            if (account) {
                return res.json({msg: "Driver have created"})
            } else {
                const newDriver = new AccountDriver({
                    accountID: id, gender, birthday, address, passportID, company, registerDate: new Date().getTime(),
                    numberOfTrips: 0, avatarDriver, modelCar, manufacturingYearCar, licensePlateCar, numberOfSeatsCar
                });
                newDriver.save()
                    .then(driver => {
                        res.json({driver});
                        console.log(driver)
                    })
                    .catch(err => console.log(err));
            }
        })
});


module.exports = router;
