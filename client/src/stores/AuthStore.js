import {action, decorate, observable} from "mobx";
import Auth from "../services/Auth";

class AuthStore {
    loading = false;
    error = null;

    user = {
        username: '',
        password: '',
        confirmedpassword: '',
        firstname: '',
        lastname: '',
        phone: '',
        birthday: '',
        email: '',
    };

    setUsername(username) {
        this.user.username = username;
    }

    setPassword(password) {
        this.user.password = password;
    }

    onChange(value, name) {
        switch (name) {
            case 'username':
                return this.user.username = value;
            case 'password':
                return this.user.password = value;
            case 'confirmedpassword':
                return this.user.confirmedpassword = value;
            case 'firstname':
                return this.user.firstname = value;
            case 'lastname':
                return this.user.lastname = value;
            case 'phone':
                return this.user.phone = value;
            case 'birthday':
                return this.user.birthday = value;
            case 'email':
                return this.user.email = value;
            default:
        }
    }

    async login({username, password}) {
        this.loading = true;
        this.error = undefined;
        return await Auth.login({username, password})
            .then(res => {
                Auth.saveUser(res.token);
            })
            .catch(error => {
                console.log(error)
            })
    }

    async registerPassenger({username, password, confirmedpassword, firstname, lastname, phone, birthday, email}) {
        this.loading = true;
        this.error = undefined;
        return await Auth.regiterPassenger({
            username,
            password,
            confirmedpassword,
            firstname,
            lastname,
            phone,
            birthday,
            email
        })
            .then(res => {
                console.log(res)
            })
            .catch(error => {
                console.log(error)
            })
    }

    async registerDriver({username, password, firstname, lastname, phone, birthday, email}) {
        this.loading = true;
        this.error = undefined;
        return await Auth.regiterDriver({
            username, password, firstname, lastname, phone, birthday, email
        })
            .then(res => {
                console.log(res)
            })
            .catch(error => {
                console.log(error)
            })
    }
}

decorate(AuthStore, {
    setUsername: action,
    setPassword: action,
    login: action,
    loading: observable,
    error: observable,
    values: observable,
    loginBase: observable,
    registerBase: observable
});

export default new AuthStore();
