import React from 'react';

const Input = props => {
    return (
        <div className="authentication__input-container">
            <label>
                <p className="authentication__input-title">{props.text}</p>
                <input
                    className="authentication__input"
                    type={props.type}
                    name={props.name}
                    onChange={props.onChange}
                    value={props.value}
                />
            </label>
        </div>
    );
};

export default Input;
