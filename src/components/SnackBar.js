import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { SnackbarContent } from '@material-ui/core';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100px',
    '& > * + *': {
      margin: theme.spacing(0),
      padding: theme.spacing(0),
    },
  },
}));


const SnackBar = (props) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    props.setSnackbar({
      reg: false, 
      log: false, 
      out: false,
      vote: false,
      unvote: false
    });
    setState({ ...state, open: false });
  };

  return (
    <div /* className={classes.root} */ >
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