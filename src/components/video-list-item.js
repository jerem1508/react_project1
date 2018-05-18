import React from 'react';

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500/";

const VideoListItem = (props) => {
    let {movie} = props;

    return (
        <li>
            <img height="100px" src={`${IMG_BASE_URL}${movie.poster_path}`}/>
            <h5>{movie.title}</h5>
        </li>
    )
}

export default VideoListItem
