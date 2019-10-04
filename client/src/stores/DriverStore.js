import {decorate, observable, autorun, action} from "mobx";
import DriverServices from "../services/DriverServices";

class DriverStore {
    loading = false;
    TripOfDriver = null;

    async getTripOfDriver(id) {
        this.loading = true;
        autorun(async () => {
            return await DriverServices.getTripOfDriver(id)
                .then(res => {
                    console.log(res)
                })
                .catch(e => {
                    console.log(e)
                })
        })
    }
}

decorate(DriverStore, {
    loading: observable,
    TripOfDriver: observable,
    getTripOfDriver: action
});

export default new DriverStore();
