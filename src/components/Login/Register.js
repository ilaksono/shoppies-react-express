import { useState, useContext } from 'react';
import axios from 'axios';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import 'styles/Login.scss';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { useCookies } from 'react-cookie';


const initLogin = {
  username: '',
  email: '',
  errMsg: '',
  errType: ''
};
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
const LoginForm = ({ setModal, modal, authoriseReg }) => {

  
  const classes = useStyles();
  const [login, setLogin] = useState(initLogin);
  const [cookies, setCookie, removeCookie] = useCookies();

  const handleChange = (val, type) => {
    setLogin({
      ...login,
      errMsg: '',
      [type]: val,
      errType: ''
    });
  };

  const validate = () => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(login.email).toLowerCase()))
      return setLogin({ ...login, errMsg: 'Invalid email', password: '', errType: 'email' });
    const { email, username } = login;
    if (!email) {
      return setLogin({
        ...login,
        errMsg: 'Email cannot be empty',
        errType: 'email'
      });
    }
    if (!username) {
      return setLogin({
        ...login,
        errMsg: 'Username cannot be empty',
        errType: 'username'
      });
    }

    const err = authoriseReg(email, username);

    if (!Number.isNaN(err)) {
      setCookie('id', err, { path: '/' });
      return setCookie('username', username, { path: '/' });
    }
    setLogin({ ...login, errType: 'email', errMsg: err });
  };

  const handleClose = () => {
    setModal(prev => ({ ...prev, regOpen: false }));
  };

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        open={modal.regOpen}
      >
        <Fade in={modal.regOpen}>
          <form onSubmit={event => {
            event.preventDefault();
            validate();
          }
          }
            className='register-container'>
            <input type='email' placeholder='Email@gmail.com' value={login.email} onChange={(event) =>
              handleChange(event.target.value, 'email')} className={`user-input-item${login.errType === 'email' ? ' error-input' : ''}`} />
            <input type='password' placeholder='Password' value={login.password} onChange={(event) =>
              handleChange(event.target.value, 'password')} className={`user-input-item${login.errType === 'password' ? ' error-input' : ''}`} />
            <Button onClick={validate}
              variant='contained' color='primary'
              type='submit'
              style={{
                color: 'white',
                fontWeight: 'bold'
              }}
              className='user-input-btn'>Register</Button>
            {login.errMsg && <div className='error'>
              <i className="fas fa-exclamation-triangle"></i> {login.errMsg}
            </div>}
          </form>
        </Fade>
      </Modal>
    </>
  );
};

export default LoginForm;

/* <div className='login__container'>
  <form onSubmit={event => event.preventDefault()}>
    <label>I Am Login Form</label>
    <input name='email' type='email' value={login.email} onChange={event => handleChange('email', event.target.value)} />
    <input name='password' type='password'
      value={login.password}
      onChange={event =>
        handleChange('password', event.target.value)} />
    <Button onClick={validate} message='Login' confirm />
    {login.errMsg && <div>{login.errMsg}</div>}
  </form>
</div> */