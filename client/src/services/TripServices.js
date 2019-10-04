import BaseAPI from "./BaseAPI";

class TripServices extends BaseAPI {
    async getAllRoute() {
        const res = await this.apiCall({
            url: 'trip/allroute',
            method: 'GET',
        });
        return res;
    }
}

export default new TripServices();
