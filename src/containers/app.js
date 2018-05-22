import React, { Component } from 'react';
import SearchBar from '../components/search-bar';
import VideoList from './video-list';
import VideoDetail from '../components/video-detail';
import Video from '../components/video';
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
            this.setState( {currentMovie:response.data.results[0], moviesList:response.data.results.slice(1,6)}, function(){
              this.applyVideoToCurrrentMovie();
            });
        }.bind(this));
    }

    applyVideoToCurrrentMovie(){
      Axios.get(`${API_END_POINT}movie/${this.state.currentMovie.id}/videos?api_key=${API_KEY}&append_to_response=video`).then(function (response){
          const youtubeKey = response.data.results[0].key;
          let newCurrentMovieState = this.state.currentMovie;
          newCurrentMovieState.videoId = youtubeKey;
          this.setState({currentMovie : newCurrentMovieState});
      }.bind(this));
    }

    receiveCallBack (movie){
      this.setState({currentMovie: movie}, function(){
        this.applyVideoToCurrrentMovie();
      })
    }

    render (){
        const renderVideoList = () => {
            if( this.state.moviesList.length >= 5 ){
                return <VideoList moviesList={this.state.moviesList} callback={this.receiveCallBack.bind(this)}/>
            }
        }
        return (
            <div>
                <div className="search_bar">
                  <SearchBar />
                </div>
                <div className="row">
                  <div className="col-md-8">
                    <Video videoId={this.state.currentMovie.videoId}/>
                    <VideoDetail title={this.state.currentMovie.title} overview={this.state.currentMovie.overview} />
                  </div>
                  <div className="col-md-4">
                    {renderVideoList()}
                  </div>

                </div>
            </div>
        );
    }
}

export default App;
