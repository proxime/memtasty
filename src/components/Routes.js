import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home/Home';
import User from './User/User';
import CreatePost from './CreatePost/CreatePost.js';
import WaitingRoom from './WaitingRoom';
import Profile from './Profile';
import Post from './Post/Post';

const Routes = () => {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/waiting" exact component={WaitingRoom} />
            <Route path="/waiting/:id" exact component={WaitingRoom} />
            <Route path="/user" component={User} />
            <Route path="/profile/:id" component={Profile} />
            <Route path="/create" component={CreatePost} />
            <Route path="/post/:id" component={Post} />
        </Switch>
    );
};

export default Routes;
