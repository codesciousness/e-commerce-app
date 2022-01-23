import React, { useState, useEffect } from 'react';
import './Products.css';
import Product from '../../components/product/Product';
import SearchTerm from '../searchTerm/SearchTerm';
import Loader from '../../components/loader/Loader';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilteredProducts, selectLoadingProducts, selectLoadProductsError, loadProducts } from './productsSlice';
import { selectSearchTerm } from '../searchTerm/searchTermSlice';

const Products = () => {
    const categories = ['', 'Automotive', 'Beauty', 'Books', 'Computers', 'Electronics', 'Games', 'Grocery', 'Health', 'Home', 'Kids', 'Sports', 'Tools', 'Toys'];
    const sortOptions = ['', 'lowest', 'highest'];
    const [category, setCategory] = useState('');
    const [sort, setSort] = useState('');
    const dispatch = useDispatch();
    const searchTerm = useSelector(selectSearchTerm);
    const products = useSelector(selectFilteredProducts);
    const loadingProducts = useSelector(selectLoadingProducts);
    const loadProductsError = useSelector(selectLoadProductsError);

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

    if (loadingProducts) {
        return (
            <section className="Products">
                <Loader />
            </section>
        );
    }
    if (loadProductsError) {
        return (
            <section className="Products">
                <p className="Products__error">An unexpected error has occurred.</p>
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
                {products.map(product => <li key={product.id}><Product product={product} /></li>)}
            </ul>
        </section>
    );
}

export default Products;