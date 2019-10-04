import React, {Component} from 'react';
import MyLayout from "../../component/MyLayout/MyLayout";
import {inject, observer} from "mobx-react";
import {withRouter} from 'react-router-dom';

class HomeScene extends Component {
    async componentDidMount(): void {
        await this.props.TripsStore.getAllTrips();
        await this.props.TripsStore.getTest();
    }

    render() {
        return (
            <MyLayout>
                <h1>Home</h1>
            </MyLayout>
        );
    }
}

export default inject('TripsStore')(withRouter(observer(HomeScene)))
