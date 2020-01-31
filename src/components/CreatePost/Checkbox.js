import React from 'react';

const Checkbox = ({ checked, name, handleChangeData }) => {
    return (
        <div className="create-post__item" style={{ marginRight: 30 }}>
            <div className="create-post__item-title">18+</div>
            <label>
                <input
                    name={name}
                    type="checkbox"
                    style={{ display: 'none' }}
                    checked={checked}
                    onChange={handleChangeData}
                ></input>
                <div className="create-post__checkbox">
                    {checked && <i className="fas fa-check"></i>}
                </div>
            </label>
        </div>
    );
};

export default Checkbox;
