import React from 'react';
import './Product.css';

const Product = () => {
    return (
        <section className="Product">
            <p className="Product__category">CATEGORY</p>
            <img className="Product__image" src='https://source.unsplash.com/250x250/?product' alt="" />
            <div className="Product__info">
                <h2 className="Product__name">Product Name</h2>
                <p className="Product__price">$56</p>
            </div> 
        </section>
    );
}

export default Product;