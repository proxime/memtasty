import React from 'react';

const categories = {
    funny: 'Śmieszne',
    animals: 'Zwierzęta',
    automotive: 'Motoryzacja',
    games: 'Gry',
    sport: 'Sport',
    ask: 'Pytanie',
    politics: 'Polityka',
};

const SelectInput = ({ name, value, handleChangeData, error }) => {
    const options = () => {
        let component = [];
        for (const key in categories) {
            component.push(
                <option key={key} value={key}>
                    {categories[key]}
                </option>
            );
        }
        return component;
    };

    return (
        <div className="create-post__item" style={{ flexGrow: 1 }}>
            <div className="create-post__item-title">Kategoria</div>
            <label>
                <select
                    name={name}
                    className="create-post__input"
                    value={value}
                    onChange={handleChangeData}
                >
                    <option value="">--Wybierz Kategorię--</option>
                    {options()}
                </select>
            </label>
            {error && <div className="settings__error">{error}</div>}
        </div>
    );
};

export default SelectInput;
