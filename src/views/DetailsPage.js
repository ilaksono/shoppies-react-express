import VideoEmbed from 'components/VideoEmbed';
import 'styles/DetailsPage.scss';
import FilmDetails from 'components/FilmDetails';
import OtherDetails from 'components/OtherDetails';
const DetailsPage = () => {

  return (
    <div className='details-layout'>
      <div>
        <FilmDetails />
        <VideoEmbed />

      </div>
      <OtherDetails />
    </div>
  );
};

export default DetailsPage;