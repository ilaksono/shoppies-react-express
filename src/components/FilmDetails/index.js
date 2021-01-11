import AppContext from 'AppContext';
import { useContext } from 'react';
import GenreListItem from './GenreListItem';
import RatingTable from './RatingTable';
import { formatNum } from 'helpers';
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
    BoxOffice,
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
      parsedGenres = genreRatingArr.map((each, i) =>
        <GenreListItem text={each} key={i} />
      );
  }


  return (
    <div className='details-container'>
      {
        BoxOffice &&
        <div className='details-movie-preface'>
          {Year} &nbsp; | &nbsp;
        {formatNum(BoxOffice.slice(1).split(',').join(''))} &nbsp; | &nbsp;
        {Director}
        </div>
      }
      <div className='details-movie-title'>
        {Title}
      </div>

      <div className='details-movie-genre-container'>
        {parsedGenres}
      </div>
      <div className='details-movie-lang-container'>
        <span>{Country} &nbsp;</span><span className='separator'>|</span> <span>{Language} &nbsp;
        </span><span className='separator'>|</span>
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