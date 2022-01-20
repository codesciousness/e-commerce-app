import React from 'react';
import './Orders.css';
import Order from '../../components/order/Order';

const Orders = () => {
    return (
        <section className="Orders">
            <h2 className="Orders__heading">Order History</h2>
            <Order />
            <Order />
            <Order />
        </section>
    );
}

export default Orders;