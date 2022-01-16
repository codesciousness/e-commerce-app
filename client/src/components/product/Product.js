import React from 'react';
import './Product.css';

const Product = ({ inCart }) => {
    if (inCart) {
        return (
            <section className="Product__inCart">
                <img className="Product__inCart__image" src='https://source.unsplash.com/200x200/?product' alt="" />
                <div className="Product__inCart__info">
                    <h2 className="Product__inCart__name">Product Name</h2>
                    <div className="Product__inCart__container">
                        <button className="Product__inCart__minus">-</button>
                        <input className="Product__inCart__quantity" type="number" name="quantity" min="0" max="100" />
                        <button className="Product__inCart__plus">+</button>
                    </div>
                    <p className="Product__inCart__price">$56</p>
                </div>
            </section>
        );
    }
    else {
        return (
            <section className="Product">
                <p className="Product__category">CATEGORY</p>
                <img className="Product__image" src='https://source.unsplash.com/250x250/?product' alt="" />
                <div className="Product__info">
                    <h2 className="Product__name">Product Name</h2>
                    <p className="Product__price">$56</p>
                    <button className="Product__button">Add to Cart</button>
                </div> 
            </section>
        );
    }
}

export default Product;