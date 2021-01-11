import { Radio } from '@material-ui/core';
import { useContext, useEffect } from 'react';
import AppContext from 'AppContext';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const options = {
  "votes": "Most Votes",
  "revenueD": "High Revenue",
  "revenueA": "Low Revenue"
};
const lookup = {
  "votes": function() {
    return (
      <i className="fas fa-award hoverable-icon"
        style={{ fontSize: 24, color: 'inherit' }}></i>
    )
  }(),
  "revenueD": function() {
    return (
      <i className="fas fa-money-check-alt hoverable-icon"
        style={{ fontSize: 24, color: 'green' }}></i>
    )
  }(),
  "revenueA": function () {
    return (
      <i className="fas fa-money-check-alt hoverable-icon"
        style={{ fontSize: 24, color: 'red' }}></i>
    );
  }()
}

const Options = () => {

  const { dash, chooseOption,
    getGraphData } = useContext(AppContext);

  const handleChange = (val) => {
    chooseOption(val);
    getGraphData()
  };
  useEffect(() => {
    getGraphData()
  }, [])
  const parsedSwitches = Object.keys(options).map(prop =>
    <div className='each-switch'>
      <FormControlLabel control={<Radio
        checked={dash.options[prop]}
        onChange={() => handleChange(prop)}
        name={prop}
        color='primary'
      />}
        labelPlacement="top"
        key={prop}
        // label={options[prop]}
        label={lookup[prop]}
      />
    </div>

  );

  return (
    <div className='options-container'>
      <h3>
        Data Options
      </h3>
      <div className='switch-container'>
        {parsedSwitches}
      </div>
    </div>
  );

};
export default Options;