import React from 'react';

const CreatePostInput = ({
    title,
    name,
    type,
    value,
    handleChangeData,
    error,
}) => {
    return (
        <div className="create-post__item">
            <div className="create-post__item-title">{title}</div>
            <input
                type={type}
                name={name}
                className="create-post__input"
                value={value}
                onChange={handleChangeData}
            />
            {error && <div className="settings__error">{error}</div>}
        </div>
    );
};

export default CreatePostInput;
