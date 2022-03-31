import React from 'react';
import './ProductLoader.css';

const ProductLoader = () => {
    return (
        <section className="ProductLoader">
            <p className="ProductLoader__category">Electronics</p>
            <div className="ProductLoader__image"></div>
            <div className="ProductLoader__info">
            <h2 className="ProductLoader__name">Wireless Compact Keyboard</h2>
                <p className="ProductLoader__price">$63.86</p>
                <button className="ProductLoader__button">Add to Cart <i className="fas fa-cart-plus fa-lg"></i></button>
            </div> 
        </section>
    );
}

export default ProductLoader;