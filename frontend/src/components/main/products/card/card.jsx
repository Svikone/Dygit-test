import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  IconButton,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import environment from '../../../../environment/environment';
import { deleteProduct } from '../../../../store/main/product/actions';

const useStyles = makeStyles({
  root: {
    width: 345,
    marginTop: '10px',
  },
});

function ProductCard(props) {
  const { item } = props;
  const classes = useStyles();
  return (
    <div className="">
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="140"
            image={`${environment.apiUrl}/file/uploads/${item.url_img}`}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {item.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {item.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Link to={`/main/edit/product/${item._id}`}>
            <Button size="small" color="primary">
              Edit
            </Button>
          </Link>
          <IconButton
            aria-label="delete"
            className="right"
            onClick={() => props.deleteProduct(item._id)}
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
}

ProductCard.propTypes = {
  deleteProduct: PropTypes.func.isRequired,
  item: PropTypes.shape({
    description: PropTypes.string,
    name: PropTypes.string,
    url_img: PropTypes.string,
    userId: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  deleteProduct: (id) => dispatch(deleteProduct(id)),
});

export default connect(null, mapDispatchToProps)(ProductCard);
