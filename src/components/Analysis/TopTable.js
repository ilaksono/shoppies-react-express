import StickyTable from 'components/StickyTable';
import AppContext from 'AppContext';
import { useContext } from 'react';

const lookup = {
  "votes": "Votes",
  "revenueD": "High Revenue",
  "revenueA": "Low Revenue"
};

const TopTable = () => {
  const {
    dash,
    getMovieDetails,
    resetDetails

  } = useContext(AppContext);
  const key = Object.keys(dash.options).find((key) => {
    if (dash.options[key])
      return key;
    return false;
  });
  return (
    <>
      <h3>Top Films - {lookup[key]}</h3>
      <StickyTable
        data={dash.data}
        getMovieDetails={getMovieDetails}
        resetDetails={resetDetails}
      />
    </>
  );
};

export default TopTable;