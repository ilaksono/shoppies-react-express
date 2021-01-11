import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { useState, useContext, useEffect } from 'react';
import AppContext from 'AppContext';
import { Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const styles = theme => ({
  root: {
    backgroundColor: 'white',
    color: 'black',
    fontSize: "36px",
    '&:hover': {
      backgroundColor: 'grey'
    },
    height: '57.6px',
    [theme.breakpoints.up('md')]: {
      marginLeft: "50%"
    }
  }
});
const useStyles = makeStyles(styles);
const HomeSearch = (props) => {

  const history = useHistory();
  const classes = useStyles();
  const [errMsg, setErrMsg] = useState('');
  const [value, setValue] = useState('');
  const {
    getAutoResults,
    autoResults,
    getSearchResults,
    resetAutoResults,
    resetPagination,
    setSearchLoad
  } = useContext(AppContext);

  const handleClick = (e) => {
    e.preventDefault();
    if (value) {
      setSearchLoad(true);
      resetPagination();
      getSearchResults(value);
      history.push(`/search?s=${value}`);
    } else
      setErrMsg('Field can\'t be empty');
  };

  useEffect(() => {
    if (value)
      getAutoResults(value);
  }, [value]);

  return (
    <>
      <div className='home-search-container'>

        <Combobox
          style={{
            fontFamily: 'Poppins',
            border: 'none',
            outline: 'none'
          }}
          onSelect={res => {
            setValue(res.slice(0, -7));
            resetAutoResults();
          }}
        >
          <ComboboxInput value={value}
            onChange={e => {
              setValue(e.target.value);
              setErrMsg('');
            }}
            disabled={false}
            type={window.innerWidth > 560 ? '' : 'search'}
            className='home-search-input'
            style={{
              outline: 'none',
              border: 'none',
              maxWidth: '460px',
              width: '96.6%',
            }}
            placeholder="Search Movies"
          />
          <ComboboxPopover style={{
            zIndex: autoResults.length > 0 ? 10 : -1,
          }}>

            {autoResults.length > 0 && autoResults.map(({ Title, Year, imdbID }) =>
              <ComboboxOption key={imdbID} value={`${Title} - ${Year}`}>
              </ComboboxOption>
            )}
          </ComboboxPopover>

        </Combobox>
        <form onSubmit={e => handleClick(e)}>

          <Button type='submit'
            className={classes.root}
          >
            <SearchIcon fontSize='large' />
          </Button>
        </form>
      </div>
      {errMsg &&
        <div
          style={{
            backgroundColor: '#222',
            color: 'white',
            position: 'relative',
            top: window.innerWidth > 520 ? '200px' : 'calc(0.6 * vh)',
            textAlign: 'center',
            width: 240,
            justifySelf: 'center',
            padding: '10px',
            font: "1.4em 'Poppins'",
            alignSelf: 'center',
            left: window.innerWidth > 959 ? 'calc(50% - 130px + 130px)' : 'calc(50% - 130px)'
          }}

        >
          {errMsg}
        </div>
      }
    </>
  );
};
export default HomeSearch;