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
import {useCookies} from 'react-cookie';
import ConfirmModal from 'components/Login/ConfirmModal';
import {makeStyles} from '@material-ui/core/styles';
import SnackBar from 'components/SnackBar';

const styles = {
  root: {
    fontWeight:'bold'
  }
}

const initAnim = {
  mainSpin: false,
  meSpin: false,
  mailSpin: false,
  newsSpin: false,
};

const useStyles = makeStyles(styles)
// const initMod = {
//   regOpen: false,
//   logOpen: false
// };

const NavBar = ({ handleDrawerToggle }) => {
  const location = useLocation();
  const [cookies, setCookie, removeCookie] = useCookies();
  const [out, setOut] = useState(false);
  const classes = useStyles();
  const {
    app,
    authoriseReg,
    authoriseLog,
    modal,
    setModal,
    logout,
    snack,
    setSnack
  } = useContext(AppContext);
  const history = useHistory();

  
  const popConfirm = () => {
    setOut(true);
  }
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
          !app.id ?
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
            <Button color="secondary"
                variant="contained"
                style={{
                  // position: 'fixed',
                  color: '#222',
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
            :
            <Button color='secondary' 
            variant='contained'
            className={classes.root}
            onClick={popConfirm}>
              Sign out
          </Button>
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
          setSnack={setSnack}

        />
      }
      {
        modal.logOpen &&
        <Login setModal={setModal}
          modal={modal}
          authoriseLog={authoriseLog}
          setSnack={setSnack}
        />
      }
      {
        out &&
        <ConfirmModal logout={logout} 
        modal={out} 
        setModal={setOut}
          setSnack={setSnack}
        />

      }
      {
        snack.reg &&
        <SnackBar message='Successfully Registered!' 
        open={snack.reg} setSnackbar={setSnack}/>

      }
      {
        snack.log &&
        <SnackBar message='Successfully Logged In!' 
        open={snack.log} setSnackbar={setSnack} />

      }
      {
        snack.out &&
        <SnackBar message='Successfully Logged Out!' 
        open={snack.out} setSnackbar={setSnack} />

      }
      {
        snack.vote &&
        <SnackBar message='Successfully Voted!'
          open={snack.vote} setSnackbar={setSnack} />

      }
      {
        snack.unvote &&
        <SnackBar message='Successfully Removed!'
          open={snack.unvote} setSnackbar={setSnack} />

      }
    </>
  );

};

export default NavBar;
