import AppContext from 'AppContext';
import { useContext } from 'react';

const FilmDetails = () => {

  const {
    app
  } = useContext(AppContext);

  const {
    Title,
    Year,
    Rated,
    Runtime,
    Genre,
    Actors,
    Plot,
    Language,
    Country,
    Awards,
    Poster,
  } = app.details;

  return (
    <div className='details-container'>
      <div className='details-movie-preface'>
        {Year}Year - 
        {Rated} Rated - 
        {Genre} Genre
      </div>
      <div className='details-movie-title'>
        {Title}Title
      </div>
      <div className='details-movie-title'>
        {Title}Title
      </div>
      <div className='details-movie-title'>
        {Title}Title
      </div>
    </div>
  );


};

export default FilmDetails;