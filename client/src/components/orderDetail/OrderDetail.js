import React from 'react';
import './OrderDetail.css';
import Order from '../order/Order';
import OrderItem from '../orderItem/OrderItem';

const OrderDetail = () => {
    return (
        <section className="OrderDetail">
            <h2 className="OrderDetail__heading">Order Details</h2>
            <Order processing={true}/>
            <h2 className="OrderDetail__item__heading">Items Ordered</h2>
            <OrderItem />
            <OrderItem />
            <OrderItem />
        </section>
    );
}

export default OrderDetail;