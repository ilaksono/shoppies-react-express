import 'styles/NavBar.scss';
import AppContext from 'AppContext';
import { useContext, useState } from 'react';
import 'styles/Animations.scss';
import { useLocation } from 'react-router-dom';
import Logo from 'components/Logo';
import { Button } from '@material-ui/core';
const initAnim = {
  mainSpin: false,
  meSpin: false,
  mailSpin: false,
  newsSpin: false,
};

const NavBar = () => {
  const location = useLocation();
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  return (
    <nav className='nav-container'>

      <div
        className={location.pathname === '/' ? 'selected' : 'not-selected'}
      >
        <div className='nav-logo'>
          <Logo />

        </div>
      </div>
      <div className={location.pathname === '/search' ? 'selected' : 'not-selected'}>
        <div className='nav-logo'>
          <i className="fas fa-briefcase"></i>
        </div>
      </div>
      <div
        className={location.pathname.match(/^\/user/) ? 'selected' : 'not-selected'}
      >
        <div className='nav-logo'>

          <i className="fas fa-paper-plane nav-logo"></i>
        </div>
      </div>
      <div
        className={location.pathname === '/analytics' ? 'selected' : 'not-selected'}
      >
        <div>

          <Button color="primary"
            variant="contained"
            style={{
              // position: 'fixed',
              color: 'white',
              // top: '0',
              fontWeight: 'bold',
              transform: 'none',
              // margin: '25px',
              // right: '0',
              zIndex: 1
            }}
          >
            Sign In
    </Button>
    &nbsp;
          <Button color="primary"
            variant="contained"
            style={{
              // position: 'fixed',
              color: 'white',
              // top: '0',
              fontWeight: 'bold',
              transform: 'none',
              // margin: '25px',
              // right: '0',
              zIndex: 1
            }}
          >
            Register
    </Button>
        </div>
      </div>
    </nav >
  );

};

export default NavBar;
