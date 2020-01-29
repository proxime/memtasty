import React from 'react';

const ChangePassword = ({
    handleChangeData,
    passwordsData: { newPassword, newPassword2 },
    validateErrors,
}) => {
    return (
        <div className="settings__password-change">
            <div className="settings__item">
                <div className="settings__title">Nowe hasło</div>
                <input
                    type="password"
                    name="newPassword"
                    className="settings__password-input"
                    value={newPassword}
                    onChange={handleChangeData}
                />
                {validateErrors.newPassword && (
                    <div className="settings__error">
                        {validateErrors.newPassword}
                    </div>
                )}
            </div>
            <div className="settings__item">
                <div className="settings__title">Powtórz nowe hasło</div>
                <input
                    type="password"
                    name="newPassword2"
                    className="settings__password-input"
                    value={newPassword2}
                    onChange={handleChangeData}
                />
                {validateErrors.newPassword2 && (
                    <div className="settings__error">
                        {validateErrors.newPassword2}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChangePassword;
