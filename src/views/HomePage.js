import 'styles/HomePage.scss';
import { Button } from "@material-ui/core";
const HomePage = () => {

  return (
    <div className='home-layout'>
      <div className='background-image-wrapper'
      >
      </div>
      <div
        className='background-image-fade'>

      </div>
      <Button color="primary"
        variant="contained"
        style={{
          position: 'fixed',
          color: 'white',
          top:'0',
          fontWeight: 'bold',
          transform:'none',
          margin:'25px',
          right:'0',
          zIndex: 1
        }}
      >
        Sign In
</Button>
    </div>
  );
};

export default HomePage;