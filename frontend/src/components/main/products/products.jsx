import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { getProducts } from "../../../store/main/products/actions.js";
import environment from "../../../environment/environment";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

function Products(props) {
  useEffect(() => {
    props.getProducts();
    console.log(props.products);
  }, []);

  const classes = useStyles();
  return (
    <div className="">
      {props.products.length ? (
        <div className="">
          <h1>All products</h1>
          <div className="container">
            {props.products.map((item, i) => (
              <Card className={classes.root} key={i}>
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
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {item.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    Edit
                  </Button>
                </CardActions>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <h2>Empty</h2>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    products: state.products.product,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: () => dispatch(getProducts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
