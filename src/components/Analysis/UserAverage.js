import 'styles/Charts.scss';
import AppContext from 'AppContext';
import { useContext } from 'react';

const UserAverage = () => {

  const { dash } = useContext(AppContext);
  let avg = 0;
  let parsedBars = [];
  if (dash.summary.num_vot && dash.summary.num_usr)
    avg = Math.floor((dash.summary.num_vot / dash.summary.num_usr) * 10) / 10;
  for (let i = 0; (i < 10 && i < (avg * 2)); i++) {
    parsedBars.push(
      <div key={i} className='each-bar' 
      style={{
        backgroundColor: avg < 1.7
          ? 'rgba(255, 39, 23, 0.582)'
          : (avg < 3.5 ? 'rgba(253, 212, 166, 0.582)'
            : 'rgba(129, 204, 129, 0.582)'),
        boxShadow: `4px 0 6px -2px ${avg < 1.7 ? 'rgba(255, 39, 23, 0.582)'
          : (avg < 3.5 ? 'rgba(253, 212, 166, 0.582)'
            : 'rgba(129, 204, 129, 0.582)')}`,     
      }}>
      </div>
    );
  }
  return (
    <>
      <h3>Votes per Person</h3>
  <div style={{textAlign: 'center'}}>{avg} / 5</div>
      <div className="outer-container"
        style={{
          boxShadow: `0 0 4px 1px ${avg < 1.7
            ? 'rgba(255, 39, 23, 0.582)'
            : (avg < 3.5 ? 'rgba(253, 212, 166, 0.582)'
              : 'rgba(129, 204, 129, 0.582)')}`
        }}
      >
        <div className='inner-container'>
          {parsedBars}
        </div>
      </div>
    </>
  );
};
export default UserAverage;