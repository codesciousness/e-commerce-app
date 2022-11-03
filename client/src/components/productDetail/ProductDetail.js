import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './ProductDetail.css';
import Alert from '../../material-ui/Alert';
import Product from '../product/Product';
import Loader from '../loader/Loader';
import { loadProductById, selectProductId, selectProduct, selectLoadingProduct, selectLoadProductSuccess, selectLoadProductError, 
        clearProdsStatusUpdates } from '../../features/products/productsSlice';
import BackgroundImg from '../../resources/images/subtle-grey-pattern.png';

const ProductDetail = () => {
    const productId = useSelector(selectProductId);
    const product = useSelector(selectProduct);
    const loadingProduct = useSelector(selectLoadingProduct);
    const loadProductSuccess = useSelector(selectLoadProductSuccess);
    const loadProductError = useSelector(selectLoadProductError);
    const dispatch = useDispatch();

    const style = {
        backgroundImage: `url(${BackgroundImg})`
    };

    useEffect(() => {
        if (productId) {
            dispatch(loadProductById(productId));
        }
    }, [productId, dispatch]);

    useEffect(() => {
        if (loadProductSuccess) {
            dispatch(clearProdsStatusUpdates());
        }
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
        <section style={style} className="ProductDetail">
            <h2 className="ProductDetail__heading">Product Details</h2>
            {loadProductError && <Alert severity='error' msg={loadProductError} onClose={() => dispatch(clearProdsStatusUpdates())}/>}
            <Product product={product} display='details'/>
        </section>
    );
}

export default ProductDetail;