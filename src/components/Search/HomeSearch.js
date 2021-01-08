import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { useState, useContext, useEffect } from 'react';
import AppContext from 'AppContext';
import { Button} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import {makeStyles} from '@material-ui/core/styles';
const styles = {
  root: {
    backgroundColor: 'white',
    color: 'black',
    '&:hover': {
      backgroundColor:'grey'
    },
    height: '57.6px'
  }
};
const useStyles = makeStyles(styles);
const HomeSearch = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState('');
  const { getAutoResults,
    autoResults
  } = useContext(AppContext);

  useEffect(() => {
    if (value)
      getAutoResults(value);
  }, [value]);

  return (
    <div className='home-search-container'>
      <Combobox
        style={{
          fontFamily: 'Poppins',
          border: 'none',
          outline: 'none'
        }}
        onSelect={res => {
          setValue(res);
        }}
      >
        <ComboboxInput value={value}
          onChange={e => {
            setValue(e.target.value);
          }}
          className='home-search-input'
          disabled={false}
          style={{
            outline: 'none',
            border: 'none'
          }}
          placeholder="Search Movies"
        />
        <ComboboxPopover style={{
          zIndex: autoResults.length > 0 ? 10 : -1,
        }}>

          {autoResults.length > 0 && autoResults.map(({ Title, Year, imdbID }) =>
            <ComboboxOption key={imdbID} value={`${Title} - ${Year}`}>
            </ComboboxOption>
          )
          }

        </ComboboxPopover>

      </Combobox>
      <Button className={classes.root}>
        <SearchIcon />
      </Button>
    </div>
  );
};
export default HomeSearch;