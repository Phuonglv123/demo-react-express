const validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validatorPassRegis(data) {
    let errors = {};

    data.username = !isEmpty(data.username) ? data.username : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.confirmedpassword = !isEmpty(data.confirmedpassword) ? data.confirmedpassword : "";
    data.firstname = !isEmpty(data.firstname) ? data.firstname : "";
    data.lastname = !isEmpty(data.lastname) ? data.lastname : "";
    data.phone = !isEmpty(data.phone) ? data.phone : "";
    data.birthday = !isEmpty(data.birthday) ? data.birthday : "";


    if (validator.isEmpty(data.username)) {
        errors.username = 'Email is valid'
    }
    if (validator.isEmpty(data.password)) {
        errors.password = 'Password is valid';

    }
    if (!validator.isLength(data.password, {min: 6})) {
        errors.password = 'Enter fill up 6 words';
    }
    if (validator.isEmpty(data.confirmedpassword)) {
        errors.confirmedpassword = 'conf Password is valid';
    }
    if (!validator.equals(data.password, data.confirmedpassword)) {
        errors.confirmedpassword = 'Password is match';
    }
    if (validator.isEmpty(data.firstname)) {
        errors.firstname = 'firstname is valid';

    }
    if (validator.isEmpty(data.lastname)) {
        errors.lastname = 'lastname is valid';

    }
    if (validator.isEmpty(data.phone)) {
        errors.phone = 'Phone is valid';
    }
    if (!validator.isLength(data.phone, {min: 10})) {
        errors.phone = 'Enter fill up 10 word';
    }
    if (validator.isEmpty(data.birthday)) {
        errors.birthday = 'Birthday is valid';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }

}
