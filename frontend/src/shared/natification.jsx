import React, { useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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

function CustomizedSnackbars(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const {
    show, message, style,
  } = props;

  useEffect(() => {
    if (show) {
      setOpen(true);
      setTimeout(() => {
        props.hideNatification();
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

CustomizedSnackbars.propTypes = {
  hideNatification: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  style: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  show: state.app.showNatification,
  message: state.app.messageNatification,
  style: state.app.styleNatification,
});

const mapDispatchToProps = (dispatch) => ({
  hideNatification: () => dispatch(hideNatification()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomizedSnackbars);
