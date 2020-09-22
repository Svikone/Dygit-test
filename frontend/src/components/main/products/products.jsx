import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getProducts } from '../../../store/main/product/actions.js';
import ProductCard from './card/card';

function Products(props) {
  useEffect(() => {
    props.getProducts();
  }, []);

  return (
    <div className="">
      {props.products.length ? (
        <div className="">
          <h1>All products</h1>
          <div className="container">
            {props.products.map((item, i) => (
              <ProductCard key={item._id} item={item} />
            ))}
          </div>
        </div>
      ) : (
        <h2>Empty</h2>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  products: state.products.products,
});

const mapDispatchToProps = (dispatch) => ({
  getProducts: () => dispatch(getProducts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
