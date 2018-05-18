import React from 'react';
import VideoListItem from '../components/video-list-item'

const VideoList = (props) => {
    const {moviesList} = props;
    console.log({moviesList});
    //const movies = ["f1","f2","f3"];
    return (
        <div>
            <ul>
                {
                    moviesList.map(movie => {
                        return <VideoListItem key={movie.id} movie={movie} />
                    })
                }
            </ul>
        </div>
    );
}

export default VideoList;
