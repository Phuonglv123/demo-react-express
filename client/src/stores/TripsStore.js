import {decorate} from "mobx";

class TripsStore {
    loading = false;
    error = undefined;

    trip = {
        locationFrom: '',
        locationTo: '',
        startTime: '',
        wifi: '',
        music: '',
        pet: '',
        food: '',
        drink: '',
        wetTowel: '',
        availableSeats: '',
        fee: '',
        endTime: '',
    }
}

decorate(TripsStore, {})

export default TripsStore;
