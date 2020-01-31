import React from 'react';

const TagsInput = ({
    name,
    value,
    handleChangeData,
    onEnter,
    addedTags,
    onRemove,
    error,
}) => {
    const tags = addedTags.map((tag, index) => (
        <div
            key={index}
            className="create-post__tag"
            onClick={() => onRemove(index)}
        >
            {tag}
        </div>
    ));

    return (
        <div className="create-post__item">
            <div className="create-post__item-title">Tagi</div>
            <input
                type="text"
                name={name}
                className="create-post__input"
                value={value}
                onChange={handleChangeData}
                onKeyPress={onEnter}
                disabled={tags.length >= 3 ? true : false}
                placeholder={
                    tags.length >= 3
                        ? 'Możesz dodać maksymalnie 3 tagi'
                        : 'Potwierdź wciskając enter'
                }
            />
            {error && <div className="settings__error">{error}</div>}
            {tags && <div className="create-post__tags">{tags}</div>}
        </div>
    );
};

export default TagsInput;
