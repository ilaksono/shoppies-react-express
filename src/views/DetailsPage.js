import VideoEmbed from 'components/VideoEmbed';
import 'styles/DetailsPage.scss';
import React, { useEffect, useContext, Suspense, useRef } from 'react';
import { useParams } from 'react-router-dom';
import AppContext from 'AppContext';
import { CircularProgress } from '@material-ui/core';
import ResultsList from 'components/Search/ResultsList';

const OtherDetails = React.lazy(() => import('components/FilmDetails/OtherDetails'));
const FilmDetails = React.lazy(() => import('components/FilmDetails'));

const DetailsPage = () => {
  const { id } = useParams();

  const { getMovieDetails, app, handleNominate, setModal, setSnack,
    addNomToList, removeNomFromList,
  } = useContext(AppContext);

  useEffect(() => {
    if (id)
      getMovieDetails(id);
  }, []);

  const ref = useRef();
  const focusInput = () => {
    ref.current = document.querySelector('.search-input');
    ref.current.focus();
  };

  return (
    <div className='details-layout'>
      {
        !id ? (
          app.results.length > 0 ?
            <>
              <div style={{
                width: "100%",
                textAlign: "center",
                fontSize: '24px',
                color: "whitesmoke",
                marginBottom: 15
              }}>
                Select a movie to see details
          </div>
              <ResultsList arr={app.results}
                handleNominate={handleNominate}
                app={app}
                setModal={setModal}
                setSnack={setSnack}
                addNomToList={addNomToList}
                removeNomFromList={removeNomFromList}
                getMovieDetails={getMovieDetails}
              />
            </>
            :
            <div style={{
              textAlign: 'center'
            }}>
              <span><h4 onClick={focusInput} style={{
                cursor: 'pointer'
              }}
              className='hoverable-text'
              >Search </h4>
               for a movie to see details</span>
        </div>
        )
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