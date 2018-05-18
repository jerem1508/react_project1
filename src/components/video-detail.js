import React from 'react';

const VideoDetail = (props) => {
    let {title,overview} = props;

    return (
        <div>
            <h5>{title}</h5>
            <p>{overview}</p>
        </div>
    );
}

export default VideoDetail
