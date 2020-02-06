import React, { useState, useEffect } from 'react';

import ElementVideo from '../Elements/ElementVideo';

const UploadedImage = ({ file, fileError, handleSelectFile }) => {
    const [fileSrc, setFileSrc] = useState('');

    const readFileUrl = file => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setFileSrc(reader.result);
        };
    };

    useEffect(() => {
        if (file) {
            readFileUrl(file);
        }
    }, [file]);

    if (!fileSrc) return null;

    return (
        <>
            <div className="create-post__selected-image">
                {file.type === 'video/mp4' || file.type === 'video/webm' ? (
                    <ElementVideo video={fileSrc} />
                ) : (
                    <img src={fileSrc} alt="" />
                )}
            </div>
            {fileError && (
                <div className="create-post__file-error">{fileError}</div>
            )}
            <label>
                <input
                    type="file"
                    name="file"
                    style={{ display: 'none' }}
                    accept="video/mp4,image/jpeg,image/png,image/gif,video/webm"
                    onChange={handleSelectFile}
                />
                <div className="create-post__select-new-image">Zmień obraz</div>
            </label>
        </>
    );
};

export default UploadedImage;
