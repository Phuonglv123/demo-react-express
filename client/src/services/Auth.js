import axios from 'axios';
import jwt_decode from "jwt-decode";

class Auth {
    constructor() {
        this.loadUser();
    }

    async login(params) {
        try {
            const res = await axios({
                method: 'POST',
                header: {
                    'Content-type': 'application/json',
                },
                url: `/api/home/login`,
                data: params,
                validateStatus: status => {
                    return true;
                },
            });
            return res.data;
        } catch (e) {
            console.log(e);
        }
    }

    async regiterPassenger(params) {
        try {
            const res = await axios({
                method: 'POST',
                header: {
                    'Content-type': 'application/json',
                },
                url: `/api/passenger/register`,
                data: params,
                validateStatus: status => {
                    return true;
                },
            });
            return res.data;
        } catch (e) {
            console.log(e);
        }
    }

    async regiterDriver(params) {
        try {
            const res = await axios({
                method: 'POST',
                header: {
                    'Content-type': 'application/json',
                },
                url: `/api/driver/register`,
                data: params,
                validateStatus: status => {
                    return true;
                },
            });
            return res.data;
        } catch (e) {
            console.log(e);
        }
    }

    logout() {
        localStorage.removeItem('AUTH');
    }

    saveUser(user) {
        try {
            if (user) {
                localStorage.setItem('AUTH', JSON.stringify(user));
            }
        } catch (e) {
            console.log(e);
        }
    }

    loadUser() {
        try {
            const token = localStorage.getItem('AUTH');
            return jwt_decode(token);
        } catch (e) {
            console.log(e);
        }

    }
}

export default new Auth();
