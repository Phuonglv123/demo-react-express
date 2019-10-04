import axios from 'axios';

export default class BaseAPI {

    setToken() {
        const token = localStorage.getItem('AUTH');
        return token;
    }


    async apiCall(option: Option) {
        option.method = option.hasOwnProperty('method') ? option.method : 'GET';
        option.params = option.hasOwnProperty('params') ? option.params : null;
        option.returnRaw = option.hasOwnProperty('returnRaw') ? option.returnRaw : false;
        if (option.params) {
            for (let key in option.params) {
                if (option.params[key] === null) {
                    delete option.params[key]
                }
                if (option.params[key] === '') {
                    delete option.params[key]
                }
            }
        }
        try {
            const res = await axios({
                method: option.method,
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded',
                    'Authorization': this.setToken(),
                },
                url: `/api/${option.url}`,
                data: option.params,
                validateStatus: status => {
                    return true;
                },
            });
            if (res.status >= 300) {
                alert('error 300')
            }
            if (res.status === 401) {
                alert('error 401');
                return res.data;
                // window.location = AppUrl.login();
            }
            if (option.returnRaw) {
                return res
            } else {
                return res.data;
            }
        } catch (e) {
            alert('error ');
            return {
                data: null,
                error: {}
            }
        }
    }
}

export type Option = {
    url: string,
    method: string,
    returnRaw: boolean,
    params: Object
}
