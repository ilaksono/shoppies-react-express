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
    Released,
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
    </div>
  );


};

export default FilmDetails;