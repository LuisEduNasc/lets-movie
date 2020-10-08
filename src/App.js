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
        allPropOfMovies: null,
        current: null,
        isMobile: false,
        dimensions: {
          width: 0, 
          height: 0
        }
      }

      this.changeBottomDescription = this.changeBottomDescription.bind(this);
      this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    
    this.getListOfMovies();
  }

  updateWindowDimensions() {
    this.setState({ dimensions: {width: window.innerWidth, height: window.innerHeight} }, () => {
      if(this.state.dimensions.width < 768){
        this.setState({isMobile: true});
      } else {
        this.setState({isMobile: false});
      }
    });
  }

  getListOfMovies(page = 1) {
    fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=fe65f8e840e15d06c5c00bf13084da74&language=pt-BR&page=${page}`)
      .then(response => response.json())
      .then(movies => {
        this.setState({ movieList: movies.results, allPropOfMovies: movies});
      })
      .catch(error => console.log('error when fetch movies: ', error));
  };

  changeBottomDescription(movie) {
    this.setState({ current: movie });
  };

  render() {
    const { movieList, allPropOfMovies, current } = this.state;

    if (movieList.length) {
      return (
        <div className="App">
          <Header isMobile={ this.state.isMobile } />
          <Wrapper 
            isMobile={ this.state.isMobile } 
            allProp={allPropOfMovies} 
            movieList={movieList} 
            changeBottomDescription={this.changeBottomDescription}
          />
          <Footer isMobile={ this.state.isMobile } currentInfo={current} />
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
