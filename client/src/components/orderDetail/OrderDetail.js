import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './OrderDetail.css';
import Order from '../order/Order';
import OrderItem from '../orderItem/OrderItem';
import Loader from '../loader/Loader';
import { loadOrderById, clearOrder, selectOrderId, selectOrder, selectOrders, selectLoadingOrder, selectLoadOrderError, 
        clearOrdersStatusUpdates } from '../../features/orders/ordersSlice';
import { selectUserId, selectLogoutSuccess } from '../../features/users/usersSlice';

const OrderDetail = () => {
    const dispatch = useDispatch();
    const orderId = useSelector(selectOrderId);
    const order = useSelector(selectOrder);
    const orders = useSelector(selectOrders);
    const loadingOrder = useSelector(selectLoadingOrder);
    const loadOrderError = useSelector(selectLoadOrderError);
    const userId  = useSelector(selectUserId);
    const logoutSuccess  = useSelector(selectLogoutSuccess);

    useEffect(() => {
        if (userId && orderId) {
            dispatch(loadOrderById({ userId, orderId }));
        }
    }, [userId, orderId, dispatch]);

    useEffect(() => {
        if (!orders.some(order => order.id === orderId)){
            dispatch(clearOrder());
        }
    }, [orders, orderId, dispatch]);

    useEffect(() => {
        if (logoutSuccess) {
            dispatch(clearOrder());
        }
        if (loadOrderError) {
            dispatch(clearOrdersStatusUpdates());
        }
    }, [logoutSuccess, loadOrderError, dispatch]);

    if (loadingOrder) {
        return (
            <section className="OrderDetail">
                <Loader />
            </section>
        );
    }
    if (loadOrderError) {
        return (
            <section className="OrderDetail">
                <p className="OrderDetail__error">An unexpected error has occurred.</p>
            </section>
        );
    }
    if (Object.entries(order).length === 0) return null;
    return (
        <section className="OrderDetail">
            <h2 className="OrderDetail__heading">Order Details</h2>
            <Order order={order.summary}/>
            <h2 className="OrderDetail__item__heading">Items Ordered</h2>
            <ul className="OrderDetail__list">
                {order.items.map(item => <li key={`${item.order_id}__${item.product_id}`}><OrderItem item={item}/></li>)}
            </ul>
        </section>
    );
}

export default OrderDetail;