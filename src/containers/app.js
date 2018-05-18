import React, { Component } from 'react';
import SearchBar from '../components/search-bar';
import VideoDetail from '../components/video-detail';
import VideoList from './video-list';
import Axios from 'axios';

const API_END_POINT = "https://api.themoviedb.org/3/"
const POPULAR_MOVIES_URL = "discover/movie?language=fr&sort_by=popularity.desc&include_adult=false&append_to_response=images"
const API_KEY = "57b74aae9661eedaa5570f59c565d6bb"

class App extends Component{
    constructor(props){
        super(props);
        this.state = {moviesList:{}, currentMovie:{}};
    }

    componentWillMount(){
        this.initMovies();
    }

    initMovies(){
        Axios.get(`${API_END_POINT}${POPULAR_MOVIES_URL}&api_key=${API_KEY}`).then(function (response){
            this.setState( {currentMovie:response.data.results[0], moviesList:response.data.results.slice(1,6)} )
        }.bind(this));
    }

    render (){
        const renderVideoList = () => {
            if( this.state.moviesList.length >= 5 ){
                return <VideoList moviesList={this.state.moviesList}/>
            }
        }
        return (
            <div>
                <SearchBar />
                {renderVideoList()}
                <VideoDetail title={this.state.currentMovie.title} overview={this.state.currentMovie.overview} />
            </div>
        );
    }
}

export default App;
