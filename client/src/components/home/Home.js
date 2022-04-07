import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Home.css';
import Header from '../header/Header';
import Products from '../../features/products/Products';
import { session, selectUserId, selectSessionSuccess, clearUsersStatusUpdates } from '../../features/users/usersSlice';

const Home = () => {
    const userId = useSelector(selectUserId);
    const sessionSuccess = useSelector(selectSessionSuccess);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!userId) {
            dispatch(session());
        }
        if (sessionSuccess) {
            dispatch(clearUsersStatusUpdates());
        }
    }, [userId, sessionSuccess, dispatch]);

    return (
        <section className="Home">
            <Header />
            <Products />
        </section>
    );
}

export default Home;