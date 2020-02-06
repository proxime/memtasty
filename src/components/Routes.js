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
            <Route path="/user" component={User} />
            <Route path="/profile/:id" component={Profile} />
            <Route path="/create" exact component={CreatePost} />
            <Route path="/post/:id" exact component={Post} />
            <Route path="/mainPost/:id" exact component={Post} />,
            <Route path="/waiting" exact component={WaitingRoom} />
            <Route path="/waiting/:id" exact component={WaitingRoom} />
            <Route path="/:id" exact component={Home} />
            <Route path="/" exact component={Home} />
        </Switch>
    );
};

export default Routes;
