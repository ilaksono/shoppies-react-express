import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { makeStyles } from "@material-ui/core/styles";
import 'styles/SearchResultsPage.scss';
import { useContext, useEffect, useRef } from 'react';
import AppContext from 'AppContext';
import ResultsList from 'components/Search/ResultsList';
import { useLocation } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import { CircularProgress } from '@material-ui/core';
import 'styles/Loading.scss';
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
    "&:hover": {
      color: 'black'
    }
  },
  paginationText: {
    font: 'white',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  }

};
const useStyles = makeStyles(styles);
const SearchResultsPage = () => {

  const location = useLocation();
  const {
    app,
    getSearchResults,
    page,
    goToPage,
    load,
    setSearchLoad,
    handleNominate,
    setModal,
    setSnack,
    addNomToList,
    removeNomFromList,
    getMovieDetails
  } = useContext(AppContext);

  const classes = useStyles();
  const useQuery = () => new URLSearchParams(location.search);
  let query = useQuery();
  useEffect(() => {
    if (!app.results.length && query.get('s')) {
      setSearchLoad(true);
      getSearchResults(query.get('s') || '');
    }
  }, []);
  const ref = useRef();
  const focusInput = () => {
    ref.current = document.querySelector('.search-input');
    ref.current.focus();
  };

  const handlePageChange = (e, val) => {
    setSearchLoad(true);
    goToPage(e, val);
    if (query.get('s')) {
      getSearchResults(query.get('s'), val);
    }
  };

  useEffect(() => {
    if (load.searchResults)
      setSearchLoad(false);
  }, [app]);

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
          load.searchResults ?
            <div className='center-loading'>
              <CircularProgress size={70} />
            </div>
            :
            (app.results.length > 0 ?
              <ResultsList arr={app.results}
                handleNominate={handleNominate}
                app={app}
                setModal={setModal}
                setSnack={setSnack}
                addNomToList={addNomToList}
                removeNomFromList={removeNomFromList}
                getMovieDetails={getMovieDetails}
              />
              : (!query.get('s') ?
                <div className='begin-search'>
                  Begin Your Journey <br />
                  <div
                    onClick={focusInput}
                    className={classes.hoverableText}>
                    Search A Title
                  </div>
                </div>
                :
                app.error ? <div className='blank-search'>
                  {app.error} </div> :
                  (load.searchResults ?
                    <CircularProgress />
                    :
                    <div className='blank-search'>
                      No Results
              </div>
                  )
              )
            )
        }
        <div style={{
          textAlign: 'center'
        }}>
          < Pagination count={Math.ceil(app.numRes / 10) || 1}
            className={classes.paginationText}
            color="primary"
            onChange={handlePageChange}
            page={page.current}
            variant='outlined'
          />

        </div>
      </CardBody>
    </Card>
  );
};
export default SearchResultsPage;