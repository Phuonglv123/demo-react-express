const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/key');

//load model
const User = require('../../models/UserShareCar');
const Passenger = require('../../models/accountPassenger');
const AccountDriver = require('../../models/accountDriver');

router.get('/', (req, res, next) => {
    res.json({msg: 'login test'})
})

router.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    await User.findOne({username: username})
        .then(user => {
            if (!user) {
                return res.status(404).json({errors: "username or password is correct"})
            } else {
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if (isMatch) {

                            var payload = {
                                id: user._id,
                                username: user.username,
                                phone: user.phone,
                                isActive: user.isActive,
                            };

                            jwt.sign(
                                payload,
                                keys.secretOrKey,
                                {expiresIn: '60s'},
                                (err, token) => {
                                    console.log("payload 2:", payload)
                                    res.json({
                                        payload,
                                        user,
                                        success: true,
                                        token: 'Bearer ' + token
                                    })
                                }
                            )
                        } else {
                            return res.status(404).json({
                                code: 400,
                                message: null,
                                detail: {
                                    globalErrors:
                                        "Unable to log in with provided credentials."
                                }
                            })
                        }
                    })
            }
        })
})

module.exports = router;
