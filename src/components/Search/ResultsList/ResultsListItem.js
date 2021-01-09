import {useHistory} from 'react-router-dom';
import {Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const styles = {
  root: {
    color: "white",
    fontWeight:'bold'
  }
}
const useStyles = makeStyles(styles);
const ResultsListItem = ({ imdbID, Poster, Title, Type, Year }) => {
  const history = useHistory();
  const classes = useStyles();

  let imgURL = Poster;
  if(imgURL === 'N/A')
    imgURL = '/img-src/film.png' 
  return (
    <div className="result-card">
      <img
      onClick={() => history.push(`/films/${imdbID}`)} 
      src={imgURL} alt="Poster" 
      style={{width:"100%", cursor:'pointer'}} 
      />
      <div className="result-container">
        <h4><b>{Title}</b></h4>
        <p className='card-result-footer'><div>{Year}</div> <Button className={classes.root} color='primary' variant='contained'>Vote</Button></p>
      </div>
    </div>
  );
}
export default ResultsListItem;