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
      selectedActor : '',
      selectedAwards : [],
      selectedDirector : '',
      selectedCountry : '',
      selectedYear : 0,
      submit : false,
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
    if (selectedOption == null){
        this.setState({selectedActor : ""});
    }else {
        this.setState({selectedActor : selectedOption.value});
        console.log(`Actors selected:`, selectedOption.value);
    }
    
    
    
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
        this.setState({selectedCountry : selectedOption.value});
    }
    
    console.log(`Country selected:`, selectedOption);
  }


  search = event => {
      event.preventDefault();
      this.setState({submit : true})    
  };

//   handleChange = event => {
//       this.setState({
//           searchTerm: event.target.value
//       });
//   };

  handleChangeYear = event => {
    this.setState({
        selectedYear: event.target.value
    });
};

  getParams = () => {
      var params = {};
      params['Genres'] = this.state.selectedGenres
      params['Actor'] = this.state.selectedActor
      params['Director'] = this.state.selectedDirector
      params['Country'] = this.state.selectedCountry
      //params['Awards'] = this.state.selectedAwards
      params['Year'] = this.state.selectedYear
      return(JSON.stringify(params));
  }

  componentDidMount(){
    const countries = countryList().getData();
    this.setState({countries : countries});
  }


  componentDidUpdate(){
    if (this.state.submit){
        const axios = require('axios').default;

        var vm = this;
        axios
            .post('http://localhost:3000/',
                    this.getParams(), {headers: {"Access-Control-Allow-Origin": "*"}}
            )
            .then(function (response) {
                console.log("hello",response.data);
                console.log("state", vm.state)
                vm.setState({moviesList : response.data})
            })
            .catch(function (error) {
                console.log(error);
            });
        this.setState({submit : false})
    }
    
    
    
  }

  

  render() {
      
      const { moviesList } = this.state;
      const GenreOptions = [
        { value: 'action', label: 'Action' },
        { value: 'adventure', label: 'Adventure' },
        { value: 'biographical', label: 'Biography' },
        { value: 'comedy', label: 'Comedy' },
        { value: 'drama', label: 'Drama' },
        { value: 'historical', label: 'History' },
        { value: 'horror', label: 'Horror' },
        { value: 'romance', label: 'Romance' },
        { value: 'gangster', label: 'Gangster' },
        { value: 'war', label: 'War' },
        { value: 'fantasy', label: 'Fantasy' },
        { value: 'buddy', label: 'Buddy' },
      ]
      const CountriesOptions = [
          {value: 0, label: 'United States'},
          {value: 1, label: 'Italy'},
          {value: 2, label: 'France'},
          {value: 3, label: 'India'},
          {value: 4, label: 'Germany'},
          {value: 5, label: 'England'},
          {value: 6, label: 'Canada'},
          {value: 7, label: 'Japan'},
          {value: 8, label: 'Spain'},
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
                    isClearable
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
                
              {/* <form>
              <CreatableSelect
                    isMulti
                    onChange={this.handleChangeAward}
                    options={AwardOptions}
                    placeholder="Récompense"
                    closeMenuOnSelect = {true}
                />
              </form> */}
              <form>
              <Select 
                    options={CountriesOptions} 
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
              <form>
              <input 
                    placeholder='Année de sortie'
                    type='number'
                    min={1950}
                    max={2050}
                    onChange={this.handleChangeYear}
                    />
              </form>
              <form onSubmit={this.search}>
                  <Button as="input" type="submit" value="Submit" />
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
      console.log(this.state.movieData)
      var {
          Title,
          Released,
          Genre,
          Plot,
          Poster,
          imdbRating,
          Country,
          Actors,
          Director
      } = this.state.movieData;

      if (!Poster || Poster === 'N/A') {
          return null;
      }
      Genre = Genre.split(', ').slice(0,6);
      Actors = Actors.split(', ').slice(0,4);

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
                  <div>
                  <small>Director: {Director}</small>
                  </div>
                  <div>
                  <small>Country: {Country}</small> 
                  </div>
                  <h4>Rating: {imdbRating} / 10</h4>
                  <p>{Plot && Plot.substr(0, 350)}</p>
                  <div className="tags-container">
                      Actors :
                      {Actors && Actors.map(a => <span>{a}</span>)}
                  </div>
                  <div className="tags-container">
                  Genres :
                      {Genre && Genre.map(g => <span>{g}</span>)}
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
