import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    color: "white",
    fontWeight: 'bold',
    "&:hover": {
      color: 'rgb(253, 212, 166)'
    }
  },
  unroot: {
    color: 'black',
    fontWeight: 'bold',
    "&:hover": {
      color: 'rgb(253, 212, 166)'
    }
  }
};
const useStyles = makeStyles(styles);
const ResultsListItem = ({ imdbID, Poster,
  Title, Type, Year, handleNominate, app, setModal,
  setSnack, addNomToList, removeNomFromList, getMovieDetails }) => {

  const history = useHistory();
  const classes = useStyles();

  let bool;
  if (app.noms.length) {
    bool = app.noms.some((each) => each.imdbid === imdbID);
  }

  const handleClick = () => {
    if (app.id) {
      handleNominate(Title, Year, imdbID);
      if (bool) {
        removeNomFromList(imdbID);
        setSnack(prev => ({ ...prev, unvote: true }));
      }
      else {
        if (app.noms.length >= 5) return setSnack(prev => ({ ...prev, limit: true }));
        addNomToList(Title, Year, imdbID);
        setSnack(prev => ({ ...prev, vote: true }));
      }
    }
    else setModal(prev => ({ ...prev, logOpen: true }));
  };


  let imgURL = Poster;
  if (imgURL === 'N/A')
    imgURL = '/img-src/film.png';
  return (
    <div className="result-card">
      <img
        onClick={() => {
          if (imdbID !== app.lastIMDB)
            getMovieDetails(imdbID);
          history.push(`/films/${imdbID}`);
        }}
        src={imgURL} alt="Poster"
        style={{ width: "100%", cursor: 'pointer' }}
        loading='lazy'
      />
      <div className="result-container">
        <h3
          onClick={() => {
            if (imdbID !== app.lastIMDB)
              getMovieDetails(imdbID);
            history.push(`/films/${imdbID}`);
          }}
        ><b>{Title}</b></h3>
        <p className='card-result-footer'><div>{Year}</div>
          <Button className={!bool ? classes.root : classes.unroot}
            onClick={handleClick}
            color={bool ? 'secondary' : 'primary'}
            variant='contained'
            size={window.innerWidth > 560 ? 'default' : 'small'}

            >
            {bool ? 'Remove' : 'Vote'}
          </Button></p>
      </div>
    </div>
  );
};
export default ResultsListItem;