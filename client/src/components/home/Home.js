import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Home.css';
import Header from '../header/Header';
import Products from '../../features/products/Products';
import { session, selectUserId } from '../../features/users/usersSlice';

const Home = () => {
    const userId = useSelector(selectUserId);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!userId) {
            dispatch(session());
        }
    }, [userId, dispatch]);

    return (
        <section className="Home">
            <Header />
            <Products />
        </section>
    );
}

export default Home;