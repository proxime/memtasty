import React from 'react';

const TextArea = ({ value, handleChangeData, name, error }) => {
    return (
        <div className="create-post__item">
            <div className="create-post__item-title">
                Dodatkowy opis (opcjonalny)
            </div>
            <textarea
                name={name}
                className="create-post__desc-input"
                value={value}
                onChange={handleChangeData}
            ></textarea>
            {error && <div className="settings__error">{error}</div>}
        </div>
    );
};

export default TextArea;
