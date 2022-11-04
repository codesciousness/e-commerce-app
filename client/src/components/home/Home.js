import React from 'react';
import './Home.css';
import Header from '../header/Header';
import Products from '../../features/products/Products';

const Home = () => {
    return (
        <section className="Home">
            <Header />
            <Products />
        </section>
    );
}

export default Home;