import React from 'react';
import {
    Player,
    BigPlayButton,
    ControlBar,
    PlaybackRateMenuButton,
} from 'video-react';

const ElementVideo = ({ video }) => {
    return (
        <div className="element__video-content">
            <Player fluid={false} width="auto" height="auto" src={video}>
                <BigPlayButton position="center" />
                <ControlBar>
                    <PlaybackRateMenuButton rates={[2, 1.5, 1, 0.5]} />
                </ControlBar>
            </Player>
        </div>
    );
};

export default ElementVideo;
