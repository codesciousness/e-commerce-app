import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import './Cart.css';
import Product from '../../components/product/Product';
import Loader from '../../components/loader/Loader';
import Error from '../../components/error/Error';
import { loadCart, checkout, setCartId, selectCartId, selectCart, selectLoadingCart, selectLoadCartError, selectCheckingout,
        selectCheckoutSuccess, clearCartStatusUpdates } from './cartSlice';
import { selectUserId, selectUser } from '../users/usersSlice';

const Cart = ({ inCheckout, address, payment }) => {
    const cart = useSelector(selectCart);
    const cartId = useSelector(selectCartId);
    const loadingCart = useSelector(selectLoadingCart);
    const loadCartError = useSelector(selectLoadCartError);
    const checkingout = useSelector(selectCheckingout);
    const checkoutSuccess = useSelector(selectCheckoutSuccess);
    const userId = useSelector(selectUserId);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    let navigate = useNavigate();
    let Button;

    const handleClick = () => {
        if (inCheckout && cart.items.length !== 0) {
            dispatch(checkout({ cartId, userId, address, payment }));
        }
    };

    if (inCheckout) {
        Button = <button className="Cart__checkout__button" onClick={handleClick}>Place Order</button>  
    }
    else {
        Button = <Link to="checkout"><button className="Cart__checkout__button">Go to Checkout</button></Link>
    }

    useEffect(() => {
        if (!userId) {
            navigate('/login');
        }
        else {
            dispatch(setCartId(user.cart_id));
            dispatch(loadCart({ cartId, userId }));
        }
    }, [cartId, userId, user, dispatch, navigate]);

    useEffect(() => {
        if (checkoutSuccess) {
            dispatch(loadCart({ cartId, userId }));
        }
        if (loadCartError) {
            dispatch(clearCartStatusUpdates());
        }
    }, [cartId, userId, loadCartError, checkoutSuccess, dispatch]);

    if (loadingCart || checkingout) {
        return (
            <section className="Cart">
                <Loader />
            </section>
        );
    }
    if (cart.items) {
        return (
            <section className="Cart">
                <h2 className="Cart__heading">Items in Cart</h2>
                {loadCartError && <Error msg={loadCartError}/>}
                {cart.items.map((cartItem, i) => <Product product={cartItem} inCart={true} key={cart.items[i].product_id}/>)}
                <div className="Cart__info">
                    <p className="Cart__subtotal">{`Subtotal: $${cart.subtotal}`}</p>
                    {Button}
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