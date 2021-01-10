import VideoEmbed from 'components/VideoEmbed';
import 'styles/DetailsPage.scss';
import FilmDetails from 'components/FilmDetails';
import React, { useEffect, useContext, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import AppContext from 'AppContext';
import { CircularProgress } from '@material-ui/core';
// import OtherDetails from 'components/FilmDetails/OtherDetails';
const OtherDetails = React.lazy(() => import('components/FilmDetails/OtherDetails'));

const DetailsPage = () => {
  const { id } = useParams();

  const { getMovieDetails, app } = useContext(AppContext);

  useEffect(() => {
    getMovieDetails(id);
  }, []);

  return (
    <div className='details-layout'>
      {
        !id ?
          <div style={{
            textAlign: 'center'
          }}>
            Search for a movie to see details
        </div>
          :
          <>
            <div className='partial-details-container'>
              <FilmDetails />
              <VideoEmbed yt={app.details.yt} />
            </div>
            <Suspense fallback={<CircularProgress />}>
              <OtherDetails />
            </Suspense>
          </>
      }
    </div>
  );
};

export default DetailsPage;