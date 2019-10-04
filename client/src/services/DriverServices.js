import BaseAPI from "./BaseAPI";

class DriverServices extends BaseAPI {
    async getTripOfDriver(id) {
        const res = await this.apiCall({
            url: `driver/managerTrip/${id}`,
            method: 'GET'
        });
        return res;
    }
}

export default new DriverServices();
