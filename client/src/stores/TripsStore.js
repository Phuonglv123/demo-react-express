import {action, decorate, observable, autorun} from "mobx";
import TripServices from "../services/TripServices";

class TripsStore {
    loading = false;
    error = undefined;

    AllTrips = [];

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
    };

    onChange(value, name) {
        switch (name) {
            case 'locationFrom':
                return this.trip.locationFrom = value;
            case 'locationTo':
                return this.trip.locationTo = value;
            case 'startTime':
                return this.trip.startTime = value;
            case 'wifi':
                return this.trip.wifi = value;
            case 'music':
                return this.trip.music = value;
            case 'pet':
                return this.trip.pet = value;
            case 'food':
                return this.trip.food = value;
            case 'drink':
                return this.trip.drink = value;
            case 'wetTowel':
                return this.trip.wetTowel = value;
            case 'availableSeats':
                return this.trip.availableSeats = value;
            case 'fee':
                return this.trip.fee = value;
            case 'endTime':
                return this.trip.endTime = value;
            default:
        }
    }

    async getAllTrips() {
        this.loading = true;
        autorun(async () => {
            return await TripServices.getAllRoute()
                .then(res => {
                    this.AllTrips = res;
                })
                .catch(error => {
                    this.error = error;
                })
        })
    }

    getTest() {
        autorun(async () => {
            return await TripServices.getAllRoute()
                .then(res => {
                    this.AllTrips = res;
                })
        })
    }

}

decorate(TripsStore, {
    loading: observable,
    error: observable,
    AllTrips: observable,
    getAllTrips: action,
});

export default new TripsStore();
