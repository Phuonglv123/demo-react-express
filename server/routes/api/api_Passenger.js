const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const validatorPassRegis = require('../../validations/passengerRegister');


//load model
const User = require('../../models/UserShareCar');
const Passenger = require('../../models/accountPassenger');


// route POST localhost:3000/api/passenger/register
router.post('/register', async (req, res) => {
    const {errors, isValid} = validatorPassRegis(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    // const {username, password, fullname, phone, birthday} = req.body;
    await User.findOne({username: req.body.username})
        .then(user => {
            if (user) {
                return res.json({msg: 'Username does exits'})
            } else {
                return User.findOne({phone: req.body.phone})
            }
        })
        .then(phone => {
            if (phone) {
                return res.json({msg: 'Phone does exits'})
            } else {
                const newUser = new User({
                    username: req.body.username,
                    password: req.body.password,
                    birthday: req.body.birthday,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    accountType: 'passenger',
                    isActive: true,
                    phone: req.body.phone,
                    email: req.body.email,
                });
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                const newPassenger = new Passenger({
                                    accountID: user._id,
                                    birthday: req.body.birthday,
                                    registerday: new Date().getTime(),
                                    numberOfTrips: 0
                                });
                                newPassenger.save()
                                    .then(passenger => {
                                        res.json({user, passenger})
                                    })
                            })
                    })
                })
            }
        })
        .catch(err => console.log(err));
});

router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({
        id: req.account._id,
        email: req.account.email,
        fullname: req.account.fullname,
        accountType: req.account.accountType,
        isActive: req.account.isActive
    })
});

//edit
router.post('/edit', passport.authenticate('jwt', {session: false}), (req, res) => {
    let {email, password, fullname, phone, birthday} = req.body;
    User.findById(req.user._id)
        .then(user => {
            if (user) {
                user.email = email,
                    user.password = password,
                    user.fullname = fullname,
                    user.birthday = birthday,
                    user.phone = phone,

                    user.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err))
            }
        })
})

module.exports = router;

