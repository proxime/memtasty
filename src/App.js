import React, { useState } from 'react';
import './scss/main.scss';
import './tools/fontawesome-free-5.12.0-web/css/all.css';

import Navigation from './navigation/Navigation';
import Auth from './components/Auth/Auth';

const App = () => {
    const [openNavigation, setOpenNavigation] = useState(null);

    return (
        <>
            <Navigation setOpenNavigation={setOpenNavigation} />
            {openNavigation && (
                <Auth
                    openNavigation={openNavigation}
                    setOpenNavigation={setOpenNavigation}
                />
            )}
        </>
    );
};

export default App;
