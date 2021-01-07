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
  password: '',
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
const LoginForm = props => {

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
    const { email, password } = login;
    if (!email || !password) {
      if (!email) {
        return setLogin({
          ...login,
          password: '',
          errMsg: 'Email cannot be empty',
          errType: 'email'
        });
      }
      else if (!password) {
        return setLogin({
          ...login,
          password: '',
          errMsg: 'Password cannot be empty',
          errType: 'password'

        });
      }
    }

    axios.post("/api/users/login", { email, password })
      .then((response) => {
        console.log(response);
        if (response.data.username) {
          const arrayOfLikes = [];
          const arrayOfFavs = [];
          response.data.likes.forEach(like => arrayOfLikes.push(like.id));
          response.data.favs.forEach(favs => arrayOfFavs.push(favs.venue_id));
          setCookie('user_id', response.data.user_id, { path: "/" });
          setCookie('username', response.data.username, { path: "/" });
          setCookie('profile_pic', response.data.profile_pic, { path: "/" });
          authorizeUser(response.data.username,
            response.data.profile_pic,
            response.data.user_id,
            arrayOfLikes,
            arrayOfFavs);
          const currentUser = {
            username: response.data.username,
            profile_pic: response.data.profile_pic
          };
          setLogin(currentUser);
          props.setModal(prev => ({ ...prev, logOpen: false }));
        } else if (response.data === "password incorrect") {
          setLogin({ ...login, errMsg: 'password is incorrect!', errType: 'password' });
        } else if (response.data === "email does not exist") {
          setLogin({ ...login, errMsg: 'Invalid email!', errType: 'email' });
        }
      });
  };

  const handleClose = () => {
    props.setModal(prev => ({ ...prev, logOpen: false }));
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
        open={props.modal.logOpen}
      >
        <Fade in={props.modal.logOpen}>
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
              className='user-input-btn'>Login</Button>
            {login.errMsg && <div className='error'>
              <i class="fas fa-exclamation-triangle"></i> {login.errMsg}
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