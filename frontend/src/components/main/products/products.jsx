import React, { useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import qs from "qs";
import { getProducts } from "../../../store/main/product/actions";
import ProductCard from "./card/card";
import history from "../../../shared/history";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
}));

const productStyle = {
  width: "700px",
  display: "flex",
  justifyContent: "space-between",
  flexWrap: "wrap",
  margin: "auto",
};

function Products(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(1);

  useEffect(() => {
    const page = +qs.parse(props.location.search, { ignoreQueryPrefix: true })
      .page;
    setPage(page);
    props.getProducts(page || 1);
  }, []);

  const handleChange = (event, value) => {
    setPage(value);
    history.push({
      pathname: "/main/products",
      search: `?page=${value}`,
    });
    props.getProducts(value || 1);
  };

  return (
    <div className="">
      {props.products.length ? (
        <div className="">
          <h1>All products</h1>
          <div className="container" style={productStyle}>
            {props.products.map((item, i) => (
              <ProductCard key={item._id} item={item} />
            ))}
            <div className={classes.root}>
              <Pagination
                count={props.pages}
                page={page}
                onChange={handleChange}
                color="primary"
              />
            </div>
          </div>
        </div>
      ) : (
        <h2>Empty</h2>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  products: state.products.data.products,
  pages: state.products.data.pages,
  page: state.products.data.page,
});

const mapDispatchToProps = (dispatch) => ({
  getProducts: (page) => dispatch(getProducts(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
