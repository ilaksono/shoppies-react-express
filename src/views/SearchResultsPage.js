import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { makeStyles } from "@material-ui/core/styles";
import 'styles/SearchResultsPage.scss';
import { useContext, useEffect, useRef } from 'react';
import AppContext from 'AppContext';
import ResultsList from 'components/Search/ResultsList';
import { useLocation } from 'react-router-dom';

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Poppins', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  hoverableText: {
    cursor: 'pointer',
    color: 'grey',
    "&:hover":{ 
      color: 'black' 
    }
  }

};
const useStyles = makeStyles(styles);
const SearchResultsPage = () => {

  const location = useLocation();
  const {
    app,
    getSearchResults
  } = useContext(AppContext);

  const classes = useStyles();
  const useQuery = () => new URLSearchParams(location.search);
  let query = useQuery();
  useEffect(() => {
    if (!app.results.length)
      getSearchResults(query.get('s') || '');
  }, []);
  const ref = useRef();
  const focusInput = () => {
    ref.current = document.querySelector('.search-input');
    ref.current.focus();
  };

  return (
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Search Results</h4>
        <p className={classes.cardCategoryWhite}>
          Vote to Nominate, or Select to view details
            </p>
      </CardHeader>
      <CardBody>
        {
          app.results.length > 0 ?
            <ResultsList arr={app.results} />
            : (!query.get('s') ?
              <div className='begin-search'>
                Begin Your Journey <br />
                <div 
                onClick={focusInput}
                className={classes.hoverableText}>
                  Search A Title
                  </div>
              </div>
              : <div className='blank-search'>
                No Results
              </div>
            )

        }
      </CardBody>
    </Card>
  );
};
export default SearchResultsPage;