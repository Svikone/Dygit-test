import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import qs from 'qs';
import PropTypes from 'prop-types';
import { getProducts } from '../../../store/main/product/actions';
import ProductCard from './card/card';
import history from '../../../shared/history';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
}));

const productStyle = {
  width: '700px',
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  margin: 'auto',
};

function Products(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [page, setPage] = React.useState(1);
  const products = useSelector((state) => state.products.data.products);
  const pages = useSelector((state) => +state.products.data.pages);

  useEffect(() => {
    const numberPage = +qs.parse(props.location.search, { ignoreQueryPrefix: true })
      .page;
    setPage(numberPage);
    dispatch(getProducts(numberPage || 1));
  }, []);

  const handleChange = (event, value) => {
    setPage(value);
    history.push({
      pathname: '/main/products',
      search: `?page=${value}`,
    });
    dispatch(getProducts(value || 1));
  };

  return (
    <div className="">
      {products.length ? (
        <div className="">
          <h1>All products</h1>
          <div className="container" style={productStyle}>
            {products.map((item) => (
              <ProductCard key={item._id} item={item} />
            ))}
            <div className={classes.root}>
              <Pagination
                count={pages}
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

Products.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Products;
