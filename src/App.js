import React, { Component } from 'react';

import './assets/css/fonts.css';
import './App.css';

import Header from './components/header/header.component';
import Footer from './components/footer/footer.component';
import Wrapper from './components/wrapper-content/wrapper-content.component';

class App extends Component {
  constructor() {
      super();

      this.state = {
        movieList: [],
        allPropOfMovies: null
      }
  }

  getListOfMovies(page = 1) {
    fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=fe65f8e840e15d06c5c00bf13084da74&language=pt-BR&page=${page}`)
      .then(response => response.json())
      .then(movies => {
        this.setState({ movieList: movies.results, allPropOfMovies: movies});
      })
      .catch(error => console.log('error when fetch movies: ', error));
  };

  componentDidMount() {
    this.getListOfMovies();
  }

  render() {
    const { movieList, allPropOfMovies } = this.state;

    if (movieList.length) {
      return (
        <div className="App">
          <Header />
          <Wrapper allProp={allPropOfMovies} movieList={movieList}/>
          <Footer />
        </div>
      );  
    } else {
      return (
        <div className="loading"></div>
      );
    }
  }
}

export default App;
