import React from 'react';
import './Product.css';

const Product = ({ inCart }) => {
    if (inCart) {
        return (
            <section className="Product__inCart">
                <img className="Product__inCart__image" src='https://source.unsplash.com/200x200/?product' alt="" />
                <div className="Product__inCart__info">
                    <div className="Product__inCart__container">
                        <p className="Product__inCart__label">PRODUCT NAME</p>
                        <h2 className="Product__inCart__name">Product Name</h2>
                    </div>
                    <div className="Product__inCart__container">
                        <p className="Product__inCart__label">QUANTITY</p>
                        <div className="Product__inCart__quantity__container">
                            <button className="Product__inCart__button">-</button>
                            <input className="Product__inCart__quantity" type="number" name="quantity" min="0" max="100" />
                            <button className="Product__inCart__button">+</button>
                        </div>
                    </div>
                    <div className="Product__inCart__container">
                        <p className="Product__inCart__label">PRICE</p>
                        <p className="Product__inCart__price">$56</p>
                    </div>
                    <div className="Product__inCart__container">
                        <p className="Product__inCart__label">ITEM TOTAL</p>
                        <p className="Product__inCart__itemTotal">$112</p>
                    </div>
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