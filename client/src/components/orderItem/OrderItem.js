import React from 'react';
import './OrderItem.css';

const OrderItem = () => {
    return (
        <section className="OrderItem">
            <img className="OrderItem__image" src='https://source.unsplash.com/200x200/?product' alt="" />
            <div className="OrderItem__info">
                <div className="OrderItem__container">
                    <p className="OrderItem__label">PRODUCT NAME</p>
                    <h2 className="OrderItem__name">Item Name</h2>
                </div>
                <div className="OrderItem__container">
                    <p className="OrderItem__label">QUANTITY</p>
                    <p className="OrderItem__quantity">2</p>
                </div>
                <div className="OrderItem__container">
                    <p className="OrderItem__label">PRICE</p>
                    <p className="OrderItem__price">$56</p>
                </div>
                <div className="OrderItem__container">
                    <p className="OrderItem__label">ITEM TOTAL</p>
                    <p className="OrderItem__total">$112</p>
                </div>
            </div>
        </section>
    );
}

export default OrderItem;