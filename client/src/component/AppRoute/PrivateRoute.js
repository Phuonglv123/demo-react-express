import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import jwt_decode from "jwt-decode";


export const PrivateRoute = ({component: Component, props, ...rest}) => {
    const token = localStorage.getItem('AUTH');
    return (
        <Route {...rest} render={p => (
            token
                ? <Component {...p} {...props} />
                : <Redirect to={{pathname: '/login', state: {from: p.location}}}/>
        )}/>
    );
};

export const DriverRoute = ({component: Component, props, ...rest}) => {
    const token = localStorage.getItem('AUTH');
    const role = jwt_decode(token);
    return (
        <Route {...rest} render={p => (
            token && role.accountType === 'driver'
                ? <Component {...p} {...props} />
                : <Redirect to={{pathname: '/', state: {from: p.location}}}/>
        )}/>
    );
};
