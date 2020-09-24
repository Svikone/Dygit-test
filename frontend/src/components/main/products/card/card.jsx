import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";
import environment from "../../../../environment/environment";
import { connect } from "react-redux";
import { deleteProduct } from "../../../../store/main/product/actions";

const useStyles = makeStyles({
  root: {
    width: 345,
    marginTop: "10px",
  },
});

function ProductCard(props) {
  const classes = useStyles();
  return (
    <div className="">
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="140"
            image={`${environment.apiUrl}/file/uploads/${props.item.url_img}`}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.item.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.item.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Link to={`/main/edit/product/${props.item._id}`}>
            <Button size="small" color="primary">
              Edit
            </Button>
          </Link>
          <IconButton
            aria-label="delete"
            className="right"
            onClick={() => props.deleteProduct(props.item._id)}
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  deleteProduct: (id) => dispatch(deleteProduct(id)),
});

export default connect(null, mapDispatchToProps)(ProductCard);
