import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SnackBar = (props) => {
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal } = state;

  const handleClose = () => {
    props.setSnackbar({
      reg: false, 
      log: false, 
      out: false,
      vote: false,
      unvote: false,
      limit: false
    });
    setState({ ...state, open: false });
  };

  return (
    <div >
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={props.open}
        onClose={handleClose}
        ClickAwayListenerProps={handleClose}
        style={{ height:'40px',marginTop: '100px', zIndex:10}}
        key={vertical + horizontal}>
        <Alert onClose={handleClose} severity="success">
          { props.message }
        </Alert>
      </Snackbar>
    </div>
  );
}

export default SnackBar;