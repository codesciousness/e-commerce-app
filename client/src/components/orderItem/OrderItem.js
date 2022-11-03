import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './OrderItem.css';
import { setProductId } from '../../features/products/productsSlice';

const OrderItem = ({ item }) => {
    const dispatch = useDispatch();
    const productId = item.product_id;

    const handleClick = () => {
        dispatch(setProductId(productId));
    };

    if (Object.entries(item).length === 0) return null;
    return (
        <section className="OrderItem">
            <img className="OrderItem__image" src={item.url} alt="" />
            <div className="OrderItem__info">
                <div className="OrderItem__container">
                    <p className="OrderItem__label">PRODUCT NAME</p>
                    <Link to={`/products/${productId}`}>
                        <h2 className="OrderItem__name" onClick={handleClick}>{item.name}</h2>
                    </Link>
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