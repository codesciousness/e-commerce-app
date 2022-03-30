import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './Order.css';
import Error from '../error/Error';
import { cancelOrder, setOrderId, clearOrder, selectOrders, selectCancelOrderError } from '../../features/orders/ordersSlice';
import { selectUserId } from '../../features/users/usersSlice';

const Order = ({ order }) => {
    const cancelOrderError = useSelector(selectCancelOrderError);
    const orders = useSelector(selectOrders);
    const userId = useSelector(selectUserId);
    const date = order.date.slice(5,7) + '/' + order.date.slice(8,10) +'/' + order.date.slice(0,4);
    const payMethod = order.pay_method[0].toUpperCase() + order.pay_method.slice(1);
    const orderId = order.order_id;
    const dispatch = useDispatch();

    const handleOrderClick = () => {
        dispatch(setOrderId(orderId));
    };

    const handleButtonClick = () => {
        dispatch(cancelOrder({ userId, orderId }));
    };

    useEffect(() => {
        if (!orders.some(order => order.order_id === orderId)){
            dispatch(clearOrder());
        }
    }, [orders, orderId, dispatch]);

    if (Object.entries(order).length === 0) return null;
    return (
        <section className="Order">
            {cancelOrderError && <Error msg={cancelOrderError}/>}
            <div className="Order__info">
                <Link to={`/orders/${orderId}`}><h3 className="Order__id" onClick={handleOrderClick}>Order Id: {orderId}</h3></Link>
                <p className="Order__date">Date: {date}</p>
                <p className="Order__status">Status: {order.status}</p>
                {order.status === 'processing' && <button className="Order__button" onClick={handleButtonClick}>Cancel Order</button>}
            </div>
            <div className="Order__container">
                <img className="Order__image" src={order.url} alt="" />
                <div className="Order__address">
                    <h3 className="Order__shipping__info">Shipping Address</h3>
                    <p className="Order__fullname">{order.shipto_name}</p>
                    <p className="Order__streetAddress">{order.shipto_street}</p>
                    <span className="Order__city">{order.shipto_city}, </span>
                    <span className="Order__state">{order.shipto_state} </span>
                    <span className="Order__zipcode">{order.shipto_zipcode}</span>
                    <p className="Order__email">{order.email}</p>
                </div>
                <div className="Order__payment">
                    <h3 className="Order__total">Order Total: {order.total}</h3>
                    <p className="Order__payMethod">Payment Method: {payMethod}</p>
                    <p className="Order__cardNum">Card Number: *{order.card_num}</p>
                </div>
            </div>
        </section>
    );
}

export default Order;