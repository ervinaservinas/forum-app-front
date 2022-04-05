import React from 'react';

const YoutubeVideoIFrame = ({ videoLink }) => {

    return (
        <>
            <iframe width="300"
                    title="YouTube video player"
                    height="230" src={videoLink}
                    sandbox="allow-scripts allow-same-origin allow-presentation">
            </iframe>
        </>

    );
}

export default YoutubeVideoIFrame;
