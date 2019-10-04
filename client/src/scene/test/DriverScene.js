import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {withRouter} from 'react-router-dom';
import Auth from "../../services/Auth";
import DriverServices from "../../services/DriverServices";

class DriverScene extends Component {
    async componentDidMount(): void {
        const id = Auth.loadUser().id;
        const res =await DriverServices.getTripOfDriver(id);
        console.log(res)
    }

    render() {
        return (
            <div>
                DriverScene
            </div>
        );
    }
}

export default inject('DriverStore')(withRouter(observer(DriverScene)))
