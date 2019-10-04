import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {withRouter} from 'react-router-dom';
import Auth from "../../services/Auth";
import DriverStore from "../../stores/DriverStore";

class DriverScene extends Component {

    async componentDidMount(): void {
        const id = Auth.loadUser().id;
        await DriverStore.getTripOfDriver(id);
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
