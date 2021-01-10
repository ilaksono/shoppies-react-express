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
    height: '57.6px',
  }
};
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
            className='home-search-input'
            disabled={false}
            style={{
              outline: 'none',
              border: 'none',
              maxWidth: '460px',
              width: '96.6%'
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

          <Button type='submit' className={classes.root}
          // onClick={handleClick}
          >
            <SearchIcon />
          </Button>
        </form>
      </div>
      {errMsg &&
        <div
          style={{
            backgroundColor: '#222',
            color: 'white',
            position: 'relative',
            top: '200px',
            textAlign: 'center',
            width: 240,
            justifySelf: 'center',
            padding: '10px',
            font: "1.4em 'Poppins'",
            alignSelf: 'center',
            left: 'calc(50% - 130px + 130px)'
          }}
        >
          {errMsg}
      </div>
      }
    </>
  );
};
export default HomeSearch;