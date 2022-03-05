import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import './Orders.css';
import Order from '../../components/order/Order';
import Loader from '../../components/loader/Loader';
import { loadOrders, resetOrders, selectOrders, selectLoadingOrders, selectLoadOrdersError, selectCancelOrderSuccess, 
        clearOrdersStatusUpdates } from './ordersSlice';
import { selectUserId, selectLoginSuccess, selectLogoutSuccess, selectGoogleLoginSuccess } from '../users/usersSlice';
import { selectCheckoutSuccess } from '../cart/cartSlice';

const Orders = () => {
    const sortOptions = ['', 'oldest', 'newest'];
    const [sort, setSort] = useState('');
    const dispatch = useDispatch();
    const orders = useSelector(selectOrders);
    const loadingOrders = useSelector(selectLoadingOrders);
    const loadOrdersError = useSelector(selectLoadOrdersError);
    const cancelOrderSuccess = useSelector(selectCancelOrderSuccess);
    const userId = useSelector(selectUserId);
    const loginSuccess = useSelector(selectLoginSuccess);
    const logoutSuccess = useSelector(selectLogoutSuccess);
    const googleLoginSuccess = useSelector(selectGoogleLoginSuccess);
    const checkoutSuccess = useSelector(selectCheckoutSuccess);
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
        if (cancelOrderSuccess || loginSuccess || googleLoginSuccess || checkoutSuccess) {
            dispatch(loadOrders({ userId, sort }));
        }
        if (logoutSuccess) {
            dispatch(resetOrders());
        }
        if (loadOrdersError || cancelOrderSuccess) {
            dispatch(clearOrdersStatusUpdates());
        }
    }, [sort, loadOrdersError, cancelOrderSuccess, userId, loginSuccess, logoutSuccess, googleLoginSuccess, checkoutSuccess, dispatch]);

    if (loadingOrders) {
        return (
            <section className="Orders">
                <Loader />
            </section>
        );
    }
    if (loadOrdersError) {
        return (
            <section className="Orders">
                <p className="Orders__error">An unexpected error has occurred.</p>
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
                {orders.map(order => <li key={order.id}><Order order={order}/></li>)}
            </ul>
        </section>
    );
}

export default Orders;