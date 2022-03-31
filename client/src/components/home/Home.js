import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './Home.css';
import Header from '../header/Header';
import Products from '../../features/products/Products';
import { session, clearUsersStatusUpdates } from '../../features/users/usersSlice';

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(session());
        dispatch(clearUsersStatusUpdates());
    }, [dispatch]);

    return (
        <section className="Home">
            <Header />
            <Products />
        </section>
    );
}

export default Home;