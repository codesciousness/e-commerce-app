import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import './Orders.css';
import Order from '../../components/order/Order';
import Loader from '../../components/loader/Loader';
import Error from '../../components/error/Error';
import { loadOrders, resetOrders, selectOrders, selectLoadingOrders, selectLoadOrdersSuccess, selectLoadOrdersError,
        selectCancelOrderSuccess, clearOrdersStatusUpdates } from './ordersSlice';
import { selectUserId, selectLoginSuccess, selectLogoutSuccess } from '../users/usersSlice';
import { selectCheckoutSuccess } from '../cart/cartSlice';

const Orders = () => {
    const sortOptions = ['', 'oldest', 'newest'];
    const [sort, setSort] = useState('');
    const orders = useSelector(selectOrders);
    const loadingOrders = useSelector(selectLoadingOrders);
    const loadOrdersSuccess = useSelector(selectLoadOrdersSuccess);
    const loadOrdersError = useSelector(selectLoadOrdersError);
    const cancelOrderSuccess = useSelector(selectCancelOrderSuccess);
    const userId = useSelector(selectUserId);
    const loginSuccess = useSelector(selectLoginSuccess);
    const logoutSuccess = useSelector(selectLogoutSuccess);
    const checkoutSuccess = useSelector(selectCheckoutSuccess);
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const handleChange = ({ target }) => {
        setSort(target.value);
    };

    useEffect(() => {
        if (!userId) {
            navigate('/login');
        }
        else {
            dispatch(loadOrders({ userId, sort }));
        }
    }, [sort, userId, dispatch, navigate]);

    useEffect(() => {
        if (cancelOrderSuccess || loginSuccess || checkoutSuccess) {
            dispatch(loadOrders({ userId, sort }));
        }
        if (logoutSuccess) {
            dispatch(resetOrders());
        }
        if (loadOrdersSuccess || cancelOrderSuccess) {
            dispatch(clearOrdersStatusUpdates());
        }
    }, [sort, loadOrdersSuccess, cancelOrderSuccess, userId, loginSuccess, logoutSuccess, checkoutSuccess, dispatch]);

    if (loadingOrders) {
        return (
            <section className="Orders">
                <Loader />
            </section>
        );
    }
    if (!orders.length) {
        return (
            <section className="Orders">
                <h2 className="Orders__heading">Order History</h2>
                <p className="Orders__content">No order history.</p>
            </section>
        );
    }
    return (
        <section className="Orders">
            <h2 className="Orders__heading">Order History</h2>
            <div className="Orders__container">
                <span className="Orders__label">Sort:</span>
                <select className="Orders__sort" name="sort" value={sort} onChange={handleChange}>
                    {sortOptions.map((sortOpt, i) => <option key={`${sortOpt}__${i}`} value={sortOpt}>{sortOpt}</option>)}
                </select>
            </div>
            <ul className="Orders__list">
                {loadOrdersError && <Error msg={loadOrdersError}/>}
                {orders.map(order => <li key={order.order_id}><Order order={order}/></li>)}
            </ul>
        </section>
    );
}

export default Orders;