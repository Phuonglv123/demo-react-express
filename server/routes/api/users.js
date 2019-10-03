// const express = require('express');
// const router = express.Router();
//
// const UserShareCar = require('../../models/UserShareCar');
//
//
// router.get('/detail/:id', (req, res) => {
//     const errors = {};
//     const id = req.params.id;
//     UserShareCar.findById(id)
//         .then(user => {
//             UserShareCar.findOne({accountID: id})
//                 .then(UserShareCar => {
//                     if (!UserShareCar) {
//                         errors.noProfile = 'There is no profile for this driver'
//                         return res.status(404).json(errors);
//                     } else {
//                         res.json(UserShareCar);
//                     }
//                 })
//         })
//
// });
//
// module.exports = user;
