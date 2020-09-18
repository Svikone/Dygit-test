export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCTS_SUCCESS = "GET_PRODUCTS_SUCCESS";

export const getProducts = () => {
    return {
        type: GET_PRODUCTS,
    }
}

export const getProductsSuccess = (data) => {
    return {
        type: GET_PRODUCTS_SUCCESS,
        payload: data
    }
}