import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import {useState} from 'react';



const HomeSearch = (props) => {
  const [value, setValue] = useState('');
  return (

    <div className='home-search-container'>
      <Combobox
        style={{
          fontFamily: 'Poppins'
        }}
        onSelect={res => {
          setValue(res)
        }}
          >
        <ComboboxInput value={value}
          onChange={e => {
            setValue(e.target.value)
          }}
          className='home-search-input'
          disabled={false}
          placeholder="Search Movies"
        />
        <ComboboxPopover style={{ zIndex: 10 }}>

          {props.loc && props.loc.suggest.map(({ place_id, description }) =>
            <ComboboxOption key={place_id} value={description}>
            </ComboboxOption>
          )

          }

        </ComboboxPopover>
        
      </Combobox>
    </div>
  );
};
export default HomeSearch;