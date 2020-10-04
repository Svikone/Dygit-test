import React, { useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { hideNatification } from '../store/app/actions';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function CustomizedSnackbars() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const show = useSelector((state) => state.app.showNatification);
  const message = useSelector((state) => state.app.messageNatification);
  const style = useSelector((state) => state.app.styleNatification);

  useEffect(() => {
    if (show) {
      setOpen(true);
      setTimeout(() => {
        dispatch(hideNatification());
        setOpen(false);
      }, 6000);
    }
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar open={open} onClose={handleClose}>
        <Alert onClose={handleClose} severity={style}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default CustomizedSnackbars;
