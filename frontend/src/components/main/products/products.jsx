import React, { useEffect } from 'react';
import { connect } from 'react-redux';
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
  const { products, pages } = props;
  const classes = useStyles();
  const [page, setPage] = React.useState(1);

  useEffect(() => {
    const numberPage = +qs.parse(props.location.search, { ignoreQueryPrefix: true })
      .page;
    setPage(numberPage);
    props.getProducts(numberPage || 1);
  }, []);

  const handleChange = (event, value) => {
    setPage(value);
    history.push({
      pathname: '/main/products',
      search: `?page=${value}`,
    });
    props.getProducts(value || 1);
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
  getProducts: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string,
      name: PropTypes.string,
      url_img: PropTypes.string,
      userId: PropTypes.string,
      _id: PropTypes.string,
    }),
  ).isRequired,
  pages: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  products: state.products.data.products,
  pages: +state.products.data.pages,
  page: state.products.data.page,
});

const mapDispatchToProps = (dispatch) => ({
  getProducts: (page) => dispatch(getProducts(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
