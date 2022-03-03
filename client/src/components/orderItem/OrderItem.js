import React from 'react';
import './OrderItem.css';

const OrderItem = ({ item }) => {
    if (Object.entries(item).length === 0) return null;
    return (
        <section className="OrderItem">
            <img className="OrderItem__image" src='https://source.unsplash.com/200x200/?product' alt="" />
            <div className="OrderItem__info">
                <div className="OrderItem__container">
                    <p className="OrderItem__label">PRODUCT NAME</p>
                    <h2 className="OrderItem__name">{item.name}</h2>
                </div>
                <div className="OrderItem__container">
                    <p className="OrderItem__label">QUANTITY</p>
                    <p className="OrderItem__quantity">{item.order_quantity}</p>
                </div>
                <div className="OrderItem__container">
                    <p className="OrderItem__label">PRICE</p>
                    <p className="OrderItem__price">{item.item_price}</p>
                </div>
                <div className="OrderItem__container">
                    <p className="OrderItem__label">ITEM TOTAL</p>
                    <p className="OrderItem__total">${item.item_total}</p>
                </div>
            </div>
        </section>
    );
}

export default OrderItem;