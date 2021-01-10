import AppContext from 'AppContext';
import { useContext, useState } from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const styles = {
  root: {
    color: 'white',
    fontWeight: 'bold',
    "&:hover": {
      color: 'rgb(253, 212, 166)'
    }
  }
};
const useStyles = makeStyles(styles);

const OtherDetails = () => {
  const classes = useStyles();
  const {
    app,
    setModal,
    removeNomFromList,
    addNomToList,
    handleNominate,
    setSnack
  } = useContext(AppContext);
  const [more, setMore] = useState(false);
  const {
    Actors,
    Plot,
    Language,
    Country,
    Awards,
    Poster,
    Director,
    Ratings,
    imdbID,
    Title,
    Year

  } = app.details;

  let bool;
  if (app.noms.length && imdbID) {
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
        addNomToList(Title, Year, imdbID);
        setSnack(prev => ({ ...prev, vote: true }));
      }
    } else
      return setModal(prev =>
        ({ ...prev, logOpen: true }));
  };


  return (
    <div className='other-details-container'>
      <div style={{ maxWidth: "400px" }}>
        <img src={Poster} style={{ display: "block", width: "100%", marginBottom: 10 }} alt="Poster">
        </img>
      </div>

      <div className="after-poster">
        <div className='actors-container'>
          {Actors}
        </div>

        <div className="details-movie-plot">
          {
            Plot && ((
              Plot.length > 60 ? (more ? Plot :
                Plot.slice(0, 60)) : Plot
            )
            )
          }
          {
            Plot &&
            (
              Plot.length > 60 &&
              <span className="read-more" onClick={() => setMore(prev => !prev)}>
                ... {!more ? "more" : "less"}
              </span>
            )

          }

        </div>
        <div style={{ color: "#00afc1" }} className='button-count-group'>
          <Button color={bool ? 'secondary' : 'primary'}
            variant='contained'
            className={classes.root}
            onClick={handleClick}
          >{bool ? 'Remove' : 'Vote'}</Button>
          <i style={{
            fontSize: 24,
            color: "#00acc1",
            marginLeft: 24
          }}
            className="fas fa-thumbs-up"></i>
          &nbsp;{app.details.count}
        </div>
      </div>
    </div>

  );

};

export default OtherDetails;