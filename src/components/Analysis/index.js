import { useContext, useEffect } from 'react';
import AppContext from 'AppContext';
import {CircularProgress} from '@material-ui/core'
const lookup = {
  "num_usr": "Users",
  "num_vot": "Votes",
  "num_mov": "Movies",
};


const Analysis = () => {
  const {
    getSummary,
    dash
  } = useContext(AppContext);

  let parsedHead = [];
  let parsedBody = [];
  if (dash.summary.num_vot) {
    parsedHead = (Object.keys(lookup)).map((prop) =>
      <td key={prop}>
        {lookup[prop]}
      </td>
    );
    parsedBody = (Object.keys(lookup)).map(prop =>
      <td key={prop}>
        <strong>{dash.summary[prop]}</strong>
      </td>
    );
  }

  useEffect(() => {
    getSummary();
  }, []);

  return (
    <>
      <h3>Dashboard</h3>
      {
        dash.summary.num_mov > 0 ?
        <table className='summary-table'>
          <thead>
            <tr>{parsedHead}</tr>

          </thead>
          <tbody>

            <tr>{parsedBody}</tr>
          </tbody>
        </table>
        :
        <CircularProgress/>
      }
    </>
  );
};

export default Analysis;