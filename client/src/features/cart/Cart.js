import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Cart.css';
import Product from '../../components/product/Product';
import Loader from '../../components/loader/Loader';
import { createCart, loadCart, checkout, selectCartId, selectCart, selectCreatingCart, selectCreateCartError,
        selectLoadingCart, selectLoadCartError, selectCheckingout, selectCheckoutError, clearCartStatusUpdates } from './cartSlice';
import { selectUserId } from '../users/usersSlice';

const Cart = ({ inCheckout, address, payment }) => {
    const cart = useSelector(selectCart);
    const cartId = useSelector(selectCartId);
    const dispatch = useDispatch();
    const creatingCart = useSelector(selectCreatingCart);
    const createCartError = useSelector(selectCreateCartError);
    const loadingCart = useSelector(selectLoadingCart);
    const loadCartError = useSelector(selectLoadCartError);
    const checkingout = useSelector(selectCheckingout);
    const checkoutError = useSelector(selectCheckoutError);
    const userId = useSelector(selectUserId);

    const handleClick = () => {
        if (inCheckout && cart.items.length !== 0) {
            dispatch(checkout({ cartId, address, payment }));
        }
    };

    useEffect(() => {
        if (!cartId) {
            dispatch(createCart({ userId }));
        }
        else {
            dispatch(loadCart(cartId));
        }
        if (createCartError || loadCartError || checkoutError) {
            dispatch(clearCartStatusUpdates());
        }
    }, [cartId, userId, createCartError, loadCartError, checkoutError, dispatch]);

    if (creatingCart || loadingCart || checkingout) {
        return (
            <section className="Cart">
                <Loader />
            </section>
        );
    }
    if (createCartError || loadCartError || checkoutError) {
        return (
            <section className="Cart">
                <p className="Cart__error">An unexpected error has occurred.</p>
            </section>
        );
    }
    if (cart.items) {
        return (
            <section className="Cart">
                <h2 className="Cart__heading">Items in Cart</h2>
                {cart.items.map((cartItem, i) => <Product product={cartItem} inCart={true} key={cart.items[i].product_id}/>)}
                <div className="Cart__info">
                    <p className="Cart__subtotal">{`Subtotal: $${cart.subtotal}`}</p>
                    <button className="Cart__checkout__button" onClick={handleClick}>{inCheckout ? 'Place Order' : 'Go to Checkout'}</button>
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