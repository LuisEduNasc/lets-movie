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
        current: null,
        isMobile: false,
        otherProps: null,
        dimensions: {
          width: 0, 
          height: 0
        }
      }

      this.changeBottomDescription = this.changeBottomDescription.bind(this);
      this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
      this.getListOfMovies = this.getListOfMovies.bind(this);
      this.searchFor = this.searchFor.bind(this);
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

  searchFor(term) {
    let prepSearchTerm = term.replace(/\s+/g, '+');

    if (prepSearchTerm.length > 1)
      fetch(`https://api.themoviedb.org/3/search/movie?api_key=fe65f8e840e15d06c5c00bf13084da74&language=pt-BR&query=${prepSearchTerm}`)
      .then(response => response.json())
      .then(movies => {
        if (movies.results.length) {
          this.setState({ movieList: movies.results, otherProps: movies });
        }
      })
      .catch(error => console.log('error when fetch movies: ', error));
    
    if (!term) {
      this.getListOfMovies(1, true);
    }
  }

  getListOfMovies(page = 1, refresh) {
    fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=fe65f8e840e15d06c5c00bf13084da74&language=pt-BR&page=${page}`)
      .then(response => response.json())
      .then(movies => {
        if (movies.results.length && !refresh) {
          this.setState({ movieList: this.state.movieList.concat(movies.results), otherProps: movies });
        } else if (movies.results.length && refresh) {
          this.setState({ movieList: movies.results, otherProps: movies });
        }
      })
      .catch(error => console.log('error when fetch movies: ', error));
  };

  changeBottomDescription(movie) {
    this.setState({ current: movie });
  };

  render() {
    const { movieList, current, otherProps } = this.state;

    if (movieList.length) {
      return (
        <div className="App">
          <Header isMobile={ this.state.isMobile } searchFor={ e => this.searchFor(e.target.value) }/>
          <Wrapper 
            isMobile={ this.state.isMobile }
            movieList={movieList} 
            changeBottomDescription={this.changeBottomDescription}
            getListOfMovies={this.getListOfMovies}
            otherProps={otherProps}
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
