import React, {Component} from 'react';
import './App.css';
import promiseFinally from 'promise.prototype.finally';
import AuthStore from './stores/AuthStore';
import {Provider} from "mobx-react";
import {HashRouter, Route, Switch} from "react-router-dom";
import LoginScene from "./scene/LoginScene/LoginScene";
import {PrivateRoute} from "./component/AppRoute/PrivateRoute";
import HomeScene from "./scene/HomeScene/HomeScene";
import RegisterScene from "./scene/RegisterScene/RegisterScene";

const stores = {
    AuthStore
};

// For easier debugging
window._____APP_STATE_____ = stores;
promiseFinally.shim();


class App extends Component {

    render() {
        return (
            <Provider {...stores}>
                <HashRouter>
                    <Switch>
                        <Route path='/login' exact={true} component={LoginScene}/>
                        <Route path='/register' component={RegisterScene}/>
                        <PrivateRoute path='/' component={HomeScene}/>
                    </Switch>
                </HashRouter>
            </Provider>
        );
    }
}

export default App;
