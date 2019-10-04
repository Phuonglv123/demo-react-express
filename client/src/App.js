import React, {Component} from 'react';
import './App.css';
import promiseFinally from 'promise.prototype.finally';
import AuthStore from './stores/AuthStore';
import TripsStore from './stores/TripsStore';
import DriverStore from './stores/DriverStore';
import {Provider} from "mobx-react";
import {createBrowserHistory} from "history";
import {Router, Route, Switch} from "react-router-dom";
import LoginScene from "./scene/LoginScene/LoginScene";
import {DriverRoute, PrivateRoute} from "./component/AppRoute/PrivateRoute";
import HomeScene from "./scene/HomeScene/HomeScene";
import RegisterScene from "./scene/RegisterScene/RegisterScene";
import PassengerScene from "./scene/test/PassengerScene";
import DriverScene from "./scene/test/DriverScene";
import NotFound404 from "./scene/404Notfound/NotFound404";

const stores = {
    AuthStore,
    TripsStore,
    DriverStore
};

// For easier debugging
window._____APP_STATE_____ = stores;
promiseFinally.shim();


class App extends Component {

    render() {
        const history = createBrowserHistory();
        return (
            <Provider {...stores}>
                <Router history={history}>
                    <Switch>
                        <Route path='/login' exact={true} component={LoginScene}/>
                        <Route path='/register' exact={true} component={RegisterScene}/>
                        <PrivateRoute path='/' exact={true} component={HomeScene}/>
                        <PrivateRoute path='/passenger' exact={true} component={PassengerScene} ARIA='passenger'/>
                        <DriverRoute path='/driver' exact={true} component={DriverScene} ARIA='driver'/>
                        <Route component={NotFound404}/>
                    </Switch>
                </Router>
            </Provider>
        );
    }
}

export default App;
