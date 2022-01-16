import React from 'react';
import './Cart.css';
import Product from '../../components/product/Product';

const Cart = () => {
    return (
        <section className="Cart">
            <Product inCart={true} />
            <Product inCart={true} />
            <Product inCart={true} />
            <div className="Cart__info">
                <p className="Cart__subtotal">Subtotal: $100</p>
                <button className="Cart__checkout__button">Go to Checkout</button>
            </div>
        </section>
    );
}

export default Cart;