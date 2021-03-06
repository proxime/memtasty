import React from 'react';
import './scss/main.scss';
import './tools/fontawesome-free-5.12.0-web/css/all.css';
import 'video-react/dist/video-react.css';

import Navigation from './navigation/Navigation';
import Auth from './components/Auth/Auth';
import Section from './components/Section';
import Alert from './components/Alert';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import * as appListeners from './appListeners';

appListeners.authStateListener();

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Navigation />
                <Alert />
                <Auth />
                <Section />
            </Router>
        </Provider>
    );
};

export default App;
