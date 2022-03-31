import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './ProductDetail.css';
import Product from '../product/Product';
import Loader from '../loader/Loader';
import Error from '../error/Error';
import { loadProductById, selectProductId, selectProduct, selectLoadingProduct, selectLoadProductSuccess, selectLoadProductError, 
        clearProdsStatusUpdates } from '../../features/products/productsSlice';

const ProductDetail = () => {
    const productId = useSelector(selectProductId);
    const product = useSelector(selectProduct);
    const loadingProduct = useSelector(selectLoadingProduct);
    const loadProductSuccess = useSelector(selectLoadProductSuccess);
    const loadProductError = useSelector(selectLoadProductError);
    const dispatch = useDispatch();

    useEffect(() => {
        if (productId) {
            dispatch(loadProductById(productId));
        }
    }, [productId, dispatch]);

    useEffect(() => {
        if (loadProductSuccess) {
            dispatch(clearProdsStatusUpdates());
        }
        return () => dispatch(clearProdsStatusUpdates());
    }, [loadProductSuccess, dispatch]);

    if (loadingProduct) {
        return (
            <section className="ProductDetail">
                <Loader />
            </section>
        );
    }
    if (Object.entries(product).length === 0) return null;
    return (
        <section className="ProductDetail">
            <h2 className="ProductDetail__heading">Product Details</h2>
            {loadProductError && <Error msg={loadProductError}/>}
            <Product product={product} display='details'/>
        </section>
    );
}

export default ProductDetail;