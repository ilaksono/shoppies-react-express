import 'styles/NavBar.scss';
import AppContext from 'AppContext';
import { useContext, useState } from 'react';
import 'styles/Animations.scss';
import { useLocation, useHistory } from 'react-router-dom';
import Logo from 'components/Logo';
import { Button } from '@material-ui/core';
import Register from 'components/Login/Register';
import Login from 'components/Login';
import MenuIcon from '@material-ui/icons/Menu';
import Search from 'components/Search';

const initAnim = {
  mainSpin: false,
  meSpin: false,
  mailSpin: false,
  newsSpin: false,
};


const initMod = {
  regOpen: false,
  logOpen: false
};

const NavBar = ({ handleDrawerToggle }) => {
  const location = useLocation();
  const [modal, setModal] = useState(initMod);
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const {
    app,
    authoriseReg,
    authoriseLog
  } = useContext(AppContext);
  const history = useHistory();


  return (
    <>
      <nav className='nav-container'>


        <div
          className={location.pathname === '/home' ? 'selected' : 'not-selected'}
        >
          <div className='nav-logo' onClick={() => history.push('/home')}>
            <Logo />

          </div>
        </div>
        {/* <div className={location.pathname === '/search' ? 'selected' : 'not-selected'}>
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
        </div> */}
        {
          location.pathname !== '/home' &&
          <Search />
        }
        {
          !app.id &&
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
              onClick={() => setModal(prev => ({ ...prev, logOpen: true }))}
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
              onClick={() => setModal(prev => ({ ...prev, regOpen: true }))}
            >
              Register
            </Button>
          </div>
        }
        <div className='hamburger-btn'
          onClick={handleDrawerToggle}
        >
          <MenuIcon color='primary' />
        </div>
      </nav >

      {
        modal.regOpen &&
        <Register setModal={setModal}
          modal={modal}
          authoriseReg={authoriseReg}
        />
      }
      {
        modal.logOpen &&
        <Login setModal={setModal}
          modal={modal}
          authoriseLog={authoriseLog}
        />
      }
    </>
  );

};

export default NavBar;
