import 'styles/HomePage.scss';
import { Button } from "@material-ui/core";
import HomeSearch from 'components/Search/HomeSearch';

const HomePage = () => {

  return (
    <div className='home-layout'>
      <div className='background-image-wrapper'
      >
      </div>
      <div
        className='background-image-fade'>
      </div>
      <HomeSearch />

    </div>
  );
};

export default HomePage;