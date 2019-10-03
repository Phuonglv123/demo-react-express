import React from 'react';
import {Redirect, Route} from 'react-router-dom';


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
