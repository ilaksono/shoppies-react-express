import 'styles/AnalysisPage.scss';
import React, { useContext, Suspense, useEffect } from 'react';
import AppContext from 'AppContext';
import { CircularProgress } from '@material-ui/core';
import Options from 'components/Analysis/Options';
import PieChart from 'components/Charts/PieChart';
import BarChart from 'components/Charts/BarChart';

const Analysis = React.lazy(() => import('components/Analysis'));
const UserAverage = React.lazy(() => import('components/Analysis/UserAverage'));
const TopTable = React.lazy(() => import('components/Analysis/TopTable'));

const AnalysisPage = () => {
  const {
    dash,
    getCountryData,
  } = useContext(AppContext);
  useEffect(() => {
    getCountryData();
    //eslint-disable-next-line
  }, []);

  return (
    <div className='analysis-layout'>
      <div className='analysis-primary-a'>
        <div className="summary-container">
          <Suspense fallback={<CircularProgress />}>
            <Analysis />
          </Suspense>
        </div>
        <Options />
      </div>
      <div className='analysis-primary-b'>

        <div className='pie-chart-container'>
          <PieChart data={dash.country}/>
        </div>
        <div className="top-table-container">
          <TopTable/>
        </div>
      </div>
      <div className='analysis-primary-c'>

        <div className='user-average-container'>
          <UserAverage />
        </div>
        <div className='bar-chart-container'>
          <BarChart dash={dash}/>
        </div>
      </div>
    </div>
  );
};
export default AnalysisPage;