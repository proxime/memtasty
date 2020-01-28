import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home/Home';
import User from './User/User';

const Routes = () => {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/user" component={User} />
        </Switch>
    );
};

export default Routes;
