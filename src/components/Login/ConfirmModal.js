import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import 'styles/Login.scss';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { useCookies } from 'react-cookie';

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
const ConfirmModal = ({ setModal, modal, logout, setSnack }) => {

  const classes = useStyles();
  //eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies();
  const handleLogout = () => {
    const arr = ['id', 'username'];
    logout();
    setSnack(prev => ({ ...prev, out: true }));
    arr.forEach((cook) => removeCookie(cook));
    handleClose();
  };
  const handleClose = () => {
    setModal(false);
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
        open={modal}
      >
        <Fade in={modal}>

          <form onSubmit={event => {
            event.preventDefault();
            handleLogout();
          }}
            className='register-container'
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div style={{
              fontFamily: 'Poppins',
              marginBottom: 12
            }}>
              Confirm Logout?
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              width: "100%"
            }}>
              <Button onClick={() => setModal(false)}
                variant='contained'
                className='user-input-btn'
                color='default'
                style={{
                  color: 'black',
                  fontWeight: 'bold'
                }}
              >Cancel</Button>
              <Button
                variant='contained' color='primary'
                type='submit'
                className='user-input-btn'
                style={{
                  color: 'white',
                  fontWeight: 'bold'
                }}
              >OK</Button>

            </div>

          </form>
        </Fade>
      </Modal>
    </>
  );
};

export default ConfirmModal;
