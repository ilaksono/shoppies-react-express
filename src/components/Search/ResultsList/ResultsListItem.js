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
  setSnack, addNomToList, removeNomFromList }) => {

  const history = useHistory();
  const classes = useStyles();

  let bool;
  if (app.noms.length) {
    bool = app.noms.some((each) => each.imdbID === imdbID);
  }
  
  const handleClick = () => {
    if (app.id > 0) {
      handleNominate(Title, Year, imdbID);
      if (bool) {
        removeNomFromList(imdbID);
        setSnack(prev => ({...prev, unvote: true}))
      }
      else {
        addNomToList(Title, Year, imdbID);
        setSnack(prev => ({ ...prev, vote: true }))

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
        onClick={() => history.push(`/films/${imdbID}`)}
        src={imgURL} alt="Poster"
        style={{ width: "100%", cursor: 'pointer' }}
        loading='lazy'
      />
      <div className="result-container">
        <h4><b>{Title}</b></h4>
        <p className='card-result-footer'><div>{Year}</div>
          <Button className={!bool ? classes.root : classes.unroot}
            onClick={handleClick}
            color={bool ? 'secondary' : 'primary'}
            variant='contained'>
            {bool ? 'Remove' : 'Vote'}
          </Button></p>
      </div>
    </div>
  );
};
export default ResultsListItem;