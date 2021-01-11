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
import 'styles/Search.scss';
const styles = {
  root: {
    backgroundColor: 'white',
    color: 'black',
    '&:hover': {
      backgroundColor: 'grey'
    },
    maxWidth: '40px',
    height: window.innerWidth > 560 ? '26px' : '16px',
    padding: 0
  }
};
const useStyles = makeStyles(styles);

const Search = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const [value, setValue] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const {
    getAutoResults,
    autoResults,
    resetAutoResults,
    getSearchResults,
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
    } else {
      setErrMsg('Search a title');
    }
  };

  useEffect(() => {
    if (value)
      getAutoResults(value);
  }, [value]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>

      <div className='search-container'>
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
            className='search-input'
            disabled={false}
            style={{
              outline: 'none',
              border: 'none',
              width: '100%'
            }}
            type={window.innerWidth > 560 ? '' : 'search'}
            placeholder="Search Movies"
          />
          <ComboboxPopover style={{
            zIndex: autoResults.length > 0 ? 10 : -1,
          }}>
            {autoResults.length > 0 && autoResults.map(({ Title, Year, imdbID }) => {
              if (Title !== value)
                return (
                  <ComboboxOption key={imdbID} value={`${Title} - ${Year}`}>
                  </ComboboxOption>
                );
            }
            )}
          </ComboboxPopover>
        </Combobox>
        <form onSubmit={e => handleClick(e)}>

          <Button className={classes.root}
            type='submit'
          // onClick={handleClick}
          >
            <SearchIcon 
            fontSize={window.innerWidth > 560 ? 'default' : 'small'}
            />
          </Button>
        </form>

      </div>
      <div style={{ textAlign: 'center', fontFamily: 'Poppins', height: "1em" }}>

        {errMsg && errMsg}
      </div>
    </div>
  );
};
export default Search;