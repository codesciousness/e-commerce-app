import React, { useState, useEffect } from 'react';
import './Products.css';
import Product from '../../components/product/Product';
import Loader from '../../components/loader/Loader';
import { useSelector, useDispatch } from 'react-redux';
import { selectProducts, selectLoadingProducts, selectLoadProductsError, loadProducts } from './productsSlice';

const Products = () => {
    const categories = [];
    const sortOptions = ['lowest', 'highest'];
    const [category, setCategory] = useState('');
    const [sort, setSort] = useState('');
    const dispatch = useDispatch();
    const products = useSelector(selectProducts);
    const loadingProducts = useSelector(selectLoadingProducts);
    const loadProductsError = useSelector(selectLoadProductsError);

    products.forEach(product => {
        if(!categories.includes(product.category)) {
            categories.push(product.category);
        }
    });

    const handleClick = ({ target, preventDefault }) => {
        preventDefault();
        setSort(target.id);
    };

    const handleChange = ({ target }) => {
        if (target.name === "category") {
            setCategory(target.value);
        }
        if (target.name === "sort") {
            setSort(target.value);
        }
        console.log(category, sort);
    };

    useEffect(() => {
        dispatch(loadProducts({ category, sort }));
    }, [category, sort, dispatch]);

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
                <span className="Products__label">Category:</span>
                <select className="Products__category" name="category" onChange={handleChange}>
                    {categories.map(category => <option key={category} value={category}>{category}</option>)}
                </select>
                <span className="Products__label">Sort:</span>
                <select className="Products__sort" name="sort" onChange={handleChange}>
                    {sortOptions.map(sortOpt => <option key={sortOpt} value={sortOpt}>{sortOpt}</option>)}
                </select>
            </div>
            <ul className="Products__list">
                {products.map(product => <li key={product.id}><Product product={product} /></li>)}
            </ul>
        </section>
    );
}

export default Products;