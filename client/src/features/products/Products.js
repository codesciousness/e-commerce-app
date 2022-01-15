import React from 'react';
import './Products.css';
import Product from '../../components/product/Product';

const Products = () => {
    return (
        <section className="Products">
            <Product />
            <Product />
            <Product />
        </section>
    );
}

export default Products;