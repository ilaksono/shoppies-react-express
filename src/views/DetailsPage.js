import VideoEmbed from 'components/VideoEmbed';
import 'styles/DetailsPage.scss';
// import FilmDetails from 'components/FilmDetails';
import React, { useEffect, useContext, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import AppContext from 'AppContext';
import { CircularProgress } from '@material-ui/core';
// import OtherDetails from 'components/FilmDetails/OtherDetails';
const OtherDetails = React.lazy(() => import('components/FilmDetails/OtherDetails'));
const FilmDetails = React.lazy(() => import('components/FilmDetails'));

const DetailsPage = () => {
  const { id } = useParams();

  const { getMovieDetails, app } = useContext(AppContext);

  useEffect(() => {
    if (id)
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
              <Suspense fallback={<CircularProgress style={{ marginLeft: "36%" }} size={65} />}>

                <FilmDetails />
              </Suspense>
              <VideoEmbed yt={app.details.yt} />
            </div>
            <Suspense fallback={<CircularProgress style={{ marginLeft: "36%" }} size={65} />}>
              <OtherDetails />
            </Suspense>
          </>
      }
    </div>
  );
};

export default DetailsPage;