import React, { useEffect, useRef } from 'react';
import LoginWindow from './LoginWindow';
import RegisterWindow from './RegisterWindow';

const Auth = ({ openNavigation, setOpenNavigation }) => {
    const authWindow = useRef(null);
    const authPopup = useRef(null);

    useEffect(() => {
        document.querySelector('body').classList.add('disabled');

        return () => {
            document.querySelector('body').classList.remove('disabled');
        };
    }, []);

    const handleCloseWindow = e => {
        if (e.target === authPopup.current) setOpenNavigation(null);
    };

    const scrollWhenChange = () => {
        authPopup.current.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <>
            <div
                className="authentication__popup"
                onClick={handleCloseWindow}
                ref={authPopup}
            >
                <div className="authentication" ref={authWindow}>
                    <div className="authentication__close-container">
                        <div
                            className="authentication__close"
                            onClick={() => setOpenNavigation(null)}
                        >
                            <i className="fas fa-times"></i>
                        </div>
                    </div>
                    {openNavigation === 'login' ? (
                        <LoginWindow
                            setOpenNavigation={setOpenNavigation}
                            scrollWhenChange={scrollWhenChange}
                        />
                    ) : (
                        <RegisterWindow
                            setOpenNavigation={setOpenNavigation}
                            scrollWhenChange={scrollWhenChange}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default Auth;
