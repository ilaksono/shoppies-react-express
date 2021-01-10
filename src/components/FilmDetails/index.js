import AppContext from 'AppContext';
import { useContext } from 'react';
import GenreListItem from './GenreListItem';
import RatingTable from './RatingTable';

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
    imdbVotes,
    Director,
    Ratings
  } = app.details;



  let parsedGenres;
  if (Genre) {
    const genreRatingArr = [...Genre.split(', '), Rated];
    if (Genre.split(', ').length)
      parsedGenres = genreRatingArr.map((each) =>
        <GenreListItem text={each} />
      );
  }


  return (
    <div className='details-container'>
      <div className='details-movie-preface'>
        {Year} &nbsp; | &nbsp;
        {Rated} &nbsp; | &nbsp;
        {Director}
      </div>
      <div className='details-movie-title'>
        {Title}
      </div>

      <div className='details-movie-genre-container'>
        {parsedGenres}
      </div>
      <div className='details-movie-lang-container'>
        <span>{Country} &nbsp;<span className='separator'>|</span></span> <span>{Language} &nbsp;
        <span className='separator'>|</span></span>
        <span>{Runtime}</span>
      </div>
      {
        Ratings &&
        <div className='details-table-container'>
          <RatingTable arr={Ratings} />
        </div>
      }
      <div style={{
        marginLeft: 8,
        color: "grey"
      }}>
        {imdbVotes} IMDB Votes
      </div>

    </div>
  );


};

export default FilmDetails;