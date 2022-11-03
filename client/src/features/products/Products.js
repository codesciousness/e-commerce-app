import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Products.css';
import Alert from '../../material-ui/Alert';
import Product from '../../components/product/Product';
import SearchTerm from '../searchTerm/SearchTerm';
import ProductLoader from '../../components/productLoader/ProductLoader';
import { loadProducts, selectFilteredProducts, selectLoadingProducts, selectLoadProductsSuccess, selectLoadProductsError,
        clearProdsStatusUpdates } from './productsSlice';
import { selectSearchTerm } from '../searchTerm/searchTermSlice';

const Products = () => {
    const categories = ['', 'Automotive', 'Beauty', 'Books', 'Electronics', 'Games', 'Garden', 'Grocery', 'Home', 'Fashion', 'Toys'];
    const sortOptions = ['', 'lowest', 'highest'];
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const [category, setCategory] = useState('');
    const [sort, setSort] = useState('');
    const products = useSelector(selectFilteredProducts);
    const searchTerm = useSelector(selectSearchTerm);
    const loadingProducts = useSelector(selectLoadingProducts);
    const loadProductsSuccess = useSelector(selectLoadProductsSuccess);
    const loadProductsError = useSelector(selectLoadProductsError);
    const dispatch = useDispatch();

    const handleChange = ({ target }) => {
        if (target.name === "category") {
            setCategory(target.value);
        }
        if (target.name === "sort") {
            setSort(target.value);
        }
    };

    useEffect(() => {
        dispatch(loadProducts({ category, sort }));
    }, [category, sort, searchTerm, dispatch]);

    useEffect(() => {
        if (loadProductsSuccess) {
            dispatch(clearProdsStatusUpdates());
        }
    }, [loadProductsSuccess, dispatch]);

    if (loadingProducts) {
        return (
            <section className="Products">
                <ul className="Products__list">
                    {arr.map(num => <li key={num}><ProductLoader /></li>)}
                </ul>
            </section>
        );
    }
    return (
        <section className="Products">
            <div className="Products__container">
                <SearchTerm />
                <span className="Products__label">Category:</span>
                <select className="Products__category" name="category" value={category} onChange={handleChange}>
                    {categories.map((category, i) => <option key={`${category}__${i}`} value={category}>{category}</option>)}
                </select>
                <span className="Products__label">Sort:</span>
                <select className="Products__sort" name="sort" value={sort} onChange={handleChange}>
                    {sortOptions.map((sortOpt, i) => <option key={`${sortOpt}__${i}`} value={sortOpt}>{sortOpt}</option>)}
                </select>
            </div>
            <ul className="Products__list">
                {loadProductsError && <Alert severity='error' msg={loadProductsError} onClose={() => dispatch(clearProdsStatusUpdates())}/>}
                {products.map(product => <li key={product.product_id}><Product product={product} /></li>)}
            </ul>
        </section>
    );
}

export default Products;