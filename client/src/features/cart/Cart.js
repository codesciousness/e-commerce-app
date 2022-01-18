import React from 'react';
import './Cart.css';
import Product from '../../components/product/Product';

const Cart = ({ inCheckout }) => {
    return (
        <section className="Cart">
            <h2 className="Cart__heading">Items in Cart</h2>
            <Product inCart={true}/>
            <Product inCart={true}/>
            <Product inCart={true}/>
            <div className="Cart__info">
                <p className="Cart__subtotal">Subtotal: $100</p>
                <button className="Cart__checkout__button">{inCheckout ? 'Place Order' : 'Go to Checkout'}</button>
            </div>
        </section>
    );
}

export default Cart;