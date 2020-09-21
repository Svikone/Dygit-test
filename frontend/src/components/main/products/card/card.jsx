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
import environment from "../../../../environment/environment";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
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
          <Button size="small" color="primary">
            Edit
          </Button>
          <IconButton aria-label="delete" className="right">
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
}

export default ProductCard;
