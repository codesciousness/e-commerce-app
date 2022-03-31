import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './OrderDetail.css';
import Order from '../order/Order';
import OrderItem from '../orderItem/OrderItem';
import Loader from '../loader/Loader';
import Error from '../error/Error';
import { loadOrderById, selectOrderId, selectOrder, selectLoadingOrder, selectLoadOrderSuccess, selectLoadOrderError, 
        clearOrdersStatusUpdates } from '../../features/orders/ordersSlice';
import { selectUserId } from '../../features/users/usersSlice';

const OrderDetail = () => {
    const orderId = useSelector(selectOrderId);
    const order = useSelector(selectOrder);
    const loadingOrder = useSelector(selectLoadingOrder);
    const loadOrderSuccess = useSelector(selectLoadOrderSuccess);
    const loadOrderError = useSelector(selectLoadOrderError);
    const userId  = useSelector(selectUserId);
    const dispatch = useDispatch();

    useEffect(() => {
        if (userId && orderId) {
            dispatch(loadOrderById({ userId, orderId }));
        }
    }, [userId, orderId, dispatch]);

    useEffect(() => {
        if (loadOrderSuccess) {
            dispatch(clearOrdersStatusUpdates());
        }
    }, [loadOrderSuccess, dispatch]);

    if (loadingOrder) {
        return (
            <section className="OrderDetail">
                <Loader />
            </section>
        );
    }
    if (Object.entries(order).length === 0) return null;
    return (
        <section className="OrderDetail">
            <h2 className="OrderDetail__heading">Order Details</h2>
            {loadOrderError && <Error msg={loadOrderError}/>}
            <Order order={order.summary}/>
            <h2 className="OrderDetail__item__heading">Items Ordered</h2>
            <ul className="OrderDetail__list">
                {order.items.map(item => <li key={`${item.order_id}__${item.product_id}`}><OrderItem item={item}/></li>)}
            </ul>
        </section>
    );
}

export default OrderDetail;