import React from 'react';

const ImageUploader = ({ handleDrop, handleSelectFile, error }) => {
    const handleDragOver = e => {
        e.preventDefault();
    };

    return (
        <div className="create-post__file-container">
            <label
                className="create-post__file-content"
                onDragOver={handleDragOver}
                onDrop={e => handleDrop(e)}
            >
                <div className="create-post__file-icon">
                    <i className="fas fa-file-upload"></i>
                </div>
                <div>
                    <div className="create-post__file-text">
                        Przeciągnij obrazek lub
                    </div>
                    <input
                        type="file"
                        name="file"
                        style={{ display: 'none' }}
                        accept="video/mp4,image/jpeg,image/png,image/gif,video/webm"
                        onChange={handleSelectFile}
                    />
                </div>
                <div className="create-post__file-button">Wybierz plik</div>
                {error && (
                    <div className="create-post__file-error">{error}</div>
                )}
            </label>
        </div>
    );
};

export default ImageUploader;
