import React from 'react';
import { Player } from 'video-react';

const ElementVideo = ({ video }) => {
    return (
        <div className="element__content">
            <Player>
                <source src={video} />
            </Player>
        </div>
    );
};

export default ElementVideo;
