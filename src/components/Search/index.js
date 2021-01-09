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

const styles = {
  root: {
    backgroundColor: 'white',
    color: 'black',
    '&:hover': {
      backgroundColor: 'grey'
    },
    height: '17.6px'
  }
};
const useStyles = makeStyles(styles);

const Search = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const [value, setValue] = useState('');

  const {
    getAutoResults,
    autoResults,
    resetAutoResults,
    getSearchResults
  } = useContext(AppContext);

  const handleClick = () => {
    getSearchResults(value);
    history.push(`/search?s=${value}`);
  };

  useEffect(() => {
    if (value)
      getAutoResults(value);
  }, [value]);

  return (
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
          }}
          className='search-input'
          disabled={false}
          style={{
            outline: 'none',
            border: 'none',
            width: '100%'
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
      <Button className={classes.root}
        onClick={handleClick}
      >
        <SearchIcon />
      </Button>
    </div>
  );
};
export default Search;