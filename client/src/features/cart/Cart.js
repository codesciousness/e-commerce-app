import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Cart.css';
import Product from '../../components/product/Product';
import Loader from '../../components/loader/Loader';
import { createCart, selectCartId, selectCart, selectLoadingCart, selectLoadCartError,
        selectCreatingCart, selectCreateCartError, selectUpdatingCart, selectUpdateCartError,
        selectCheckingout, selectCheckoutError } from './cartSlice';

const Cart = ({ inCheckout }) => {
    const cart = useSelector(selectCart);
    const cartId = useSelector(selectCartId);
    const [cartItems, setCartItems] = useState(cart);
    const dispatch = useDispatch();

    const handleClick = ({ target }) => {
        setCartItems();
    };

    useEffect(() => {
        if (cartId === null) dispatch(createCart({}));
    }, []);
    

    if (cartId) {
        return (
            <section className="Cart">
                <h2 className="Cart__heading">Items in Cart</h2>
                {cart.map(cartItem => <Product product={cartItem} inCart={true}/>)}
                <div className="Cart__info">
                    <p className="Cart__subtotal">Subtotal: $100</p>
                    <button className="Cart__checkout__button">{inCheckout ? 'Place Order' : 'Go to Checkout'}</button>
                </div>
            </section>
        );
    }
    else {
        return (
            <section className="Cart">
                <h2 className="Cart__heading">Items in Cart</h2>
                Your cart is empty.
            </section>
        );
    } 
}

export default Cart;