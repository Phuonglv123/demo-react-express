import {decorate, observable, autorun, action} from "mobx";
import DriverServices from "../services/DriverServices";

class DriverStore {
    loading = false;
    error = undefined;

    TripOfDriver = null;

    async getTripOfDriver(id) {
        this.loading = true;
        autorun(async () => {
            return await DriverServices.getTripOfDriver(id)
                .then(res => {
                    this.TripOfDriver = res;
                })
                .catch(e => {
                    this.error = e
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
