import React from 'react';
//import ReactDOM from 'react-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import countryList from 'react-select-country-list'
import './style.css';


class MoviesList extends React.Component {
  state = {
      moviesList: ['tt2294629'],
      searchTerm: '',
      selectedGenres: [],
      selectedActors : [],
      selectedAwards : [],
      selectedDirector : '',
      selectedCountry : '',
  };

  handleChangeGenres = (selectedOption) => {
    const selectedGenres = [];
    for (const genre of selectedOption) {
        selectedGenres.push(genre.value)
    }
    this.setState({selectedGenres : selectedGenres});
    console.log(`Genres selected:`, selectedGenres);
  }

  handleChangeActors = (selectedOption) => {
    const selectedActors = [];
    for (const actor of selectedOption) {
        selectedActors.push(actor.value)
    }
    this.setState({selectedActors : selectedActors});
    console.log(`Actors selected:`, selectedActors);
  }

  handleChangeDirector = (selectedOption) => {
    if (selectedOption == null){
        this.setState({selectedDirector : ""});
    }else {
        this.setState({selectedDirector : selectedOption.value});
    }
    
    console.log(`Director selected:`, selectedOption);
  }

  handleChangeAward = (selectedOption) => {
    const selectedAwards = [];
    for (const award of selectedOption) {
        selectedAwards.push(award.value)
    }
    this.setState({selectedAwards : selectedAwards});
    console.log(`Actors selected:`, selectedAwards);
  }

  handleChangeCountry = (selectedOption) => {
    if (selectedOption == null){
        this.setState({selectedCountry : ""});
    }else {
        this.setState({selectedCountry : selectedOption.label});
    }
    
    console.log(`Country selected:`, selectedOption);
  }

  search = event => {
      event.preventDefault();
      axios
          .get(
              `https://www.omdbapi.com/?apikey=756abb2f&s=${
                  this.state.searchTerm
              }&plot=full`
          )
          .then(res => res.data)
          .then(res => {
              if (!res.Search) {
                  this.setState({ moviesList: [] });
                  return;
              }

              const moviesList = res.Search.map(movie => movie.imdbID);
              this.setState({
                  moviesList
              });
          });
      axios
         .post('http://localhost:3000/',
                this.getParams(), {headers: {"Access-Control-Allow-Origin": "*"}}
          )
          .then(function (response) {
            console.log("hello",response);
          })
          .catch(function (error) {
            console.log(error);
          });
  };

  handleChange = event => {
      this.setState({
          searchTerm: event.target.value
      });
  };

  getParams = () => {
      var params = {};
      params['Genres'] = this.state.selectedGenres
      params['Actors'] = this.state.selectedActors
      params['Director'] = this.state.selectedDirector
      params['Country'] = this.state.selectedCountry
      params['Awards'] = this.state.selectedAwards
      return(JSON.stringify(params));
  }

  componentDidMount(){
    const countries = countryList().getData();
    this.setState({countries : countries});
  }
  //componentDidUpdate(){
    //const axios = require('axios').default;
    //console.log('params',this.getParams())
    
    //const searchTerm = "hello"
    
    
    
  //}

  

  render() {
      
      const { moviesList } = this.state;
      const GenreOptions = [
        { value: 'action', label: 'Action' },
        { value: 'adventure', label: 'Adventure' },
        { value: 'animation', label: 'Animation' },
        { value: 'biography', label: 'Biography' },
        { value: 'comedy', label: 'Comedy' },
        { value: 'crime', label: 'Crime' },
        { value: 'documentary', label: 'Documentary' },
        { value: 'drama', label: 'Drama' },
        { value: 'family', label: 'Family' },
        { value: 'fantasy', label: 'Fantasy' },
        { value: 'film noir', label: 'Film Noir' },
        { value: 'history', label: 'History' },
        { value: 'horror', label: 'Horror' },
        { value: 'musical', label: 'Musical' },
        { value: 'mystery', label: 'Mystery' },
        { value: 'romance', label: 'Romance' },
        { value: 'Mystery', label: 'Mystery' },
        { value: 'sci-fi', label: 'Sci-Fi' },
        { value: 'short film', label: 'Short Film' },
        { value: 'sport', label: 'Sport' },
        { value: 'superhero', label: 'Superhero' },
        { value: 'thriller', label: 'Thriller' },
        { value: 'war', label: 'War' },
        { value: 'western', label: 'Western' },
      ]
      
      const ActorsOptions = [
        { value: 'daniel craig', label: 'Daniel Craig' },
        { value: 'steve carell', label: 'Steve Carell' },
        { value: 'Merryl Streep', label: 'Merryl Streep' }
      ]

      const AwardOptions = [
        { value: 'oscar', label: 'Oscar' },
        { value: 'golden globe', label: 'Golden Globe' },
        { value: 'palm dor', label: "Palm d'or" }
      ]
      const DirectorOptions = []

      return (
          <div>
              <form onSubmit={this.search}>
                  <input
                      placeholder="Search for a movie"
                      onChange={this.handleChange}
                  />
                  <Button as="input" type="submit" value="Submit" />
              </form>
              <form>
              <Select
                  className="basic-single"
                  classNamePrefix="select"
                  //defaultValue={GenreOptions[0]}
                  isMulti
                  onChange={this.handleChangeGenres}
                  isDisabled={false}
                  isLoading={false}
                  isClearable={true}
                  isRtl={false}
                  isSearchable={true}
                  name="color"
                  options={GenreOptions}
                  placeholder="Genre"
                  closeMenuOnSelect = {true}
                />
              </form>
              <form>
              <CreatableSelect
                    isMulti
                    onChange={this.handleChangeActors}
                    options={ActorsOptions}
                    placeholder="Acteurs"
                    closeMenuOnSelect = {true}
                />
              </form>
              <form>
              <CreatableSelect
                    isClearable
                    onChange={this.handleChangeDirector}
                    options={DirectorOptions}
                    placeholder="Réalisateur"
                    closeMenuOnSelect = {true}
                />
              </form>

              <form>
              <CreatableSelect
                    isMulti
                    onChange={this.handleChangeAward}
                    options={AwardOptions}
                    placeholder="Récompense"
                    closeMenuOnSelect = {true}
                />
              </form>
              <form>
              <Select 
                    options={this.state.countries} 
                    onChange={this.handleChangeCountry} 
                    placeholder="Nationalité"
                    closeMenuOnSelect = {true}
                    isDisabled={false}
                    isLoading={false}
                    isClearable={true}
                    isRtl={false}
                    isSearchable={true}
              />
              </form>
              
              {moviesList.length > 0 ? (
                  moviesList.map(movie => (
                      <MovieCard movieID={movie} key={movie} />
                  ))
              ) : (
                  <p>
                      Couldn't find any movie. Please search again using
                      another search criteria.
                  </p>
              )}
          </div>
      );
  }
}

class MovieCard extends React.Component {
  state = {
      movieData: {}
  };

  componentDidMount() {
      axios
          .get(
              `https://www.omdbapi.com/?apikey=756abb2f&i=${
                  this.props.movieID
              }&plot=full`
          )
          .then(res => res.data)
          .then(res => {
              this.setState({ movieData: res });
          });
  }

  render() {
      const {
          Title,
          Released,
          Genre,
          Plot,
          Poster,
          imdbRating
      } = this.state.movieData;

      if (!Poster || Poster === 'N/A') {
          return null;
      }

      return (
          <div className="movie-card-container">
              <div className="image-container">
                  <div
                      className="bg-image"
                      style={{ backgroundImage: `url(${Poster})` }}
                  />
              </div>
              <div className="movie-info">
                  <h2>Movie Details</h2>
                  <div>
                      <h1>{Title}</h1>
                      <small>Released Date: {Released}</small>
                  </div>
                  <h4>Rating: {imdbRating} / 10</h4>
                  <p>{Plot && Plot.substr(0, 350)}</p>
                  <div className="tags-container">
                      {Genre && Genre.split(', ').map(g => <span>{g}</span>)}
                  </div>
              </div>
          </div>
      );
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <center>
      <h1>Movie Search App</h1>
      </center>
      <div id="app">
      <MoviesList />
      </div>

      
      
    </div>
  );
}

export default App;
