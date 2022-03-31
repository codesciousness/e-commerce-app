import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import './Cart.css';
import Product from '../../components/product/Product';
import Loader from '../../components/loader/Loader';
import Error from '../../components/error/Error';
import { loadCart, checkout, setCartId, selectCartId, selectCart, selectLoadingCart, selectLoadCartError, selectCheckingout,
        selectCheckoutSuccess, selectCheckoutError, clearCartStatusUpdates } from './cartSlice';
import { selectUserId, selectUser } from '../users/usersSlice';
import { creditCardType } from '../../util/credit-card';

const Cart = () => {
    const cart = useSelector(selectCart);
    const cartId = useSelector(selectCartId);
    const loadingCart = useSelector(selectLoadingCart);
    const loadCartError = useSelector(selectLoadCartError);
    const checkingout = useSelector(selectCheckingout);
    const checkoutSuccess = useSelector(selectCheckoutSuccess);
    const checkoutError = useSelector(selectCheckoutError);
    const userId = useSelector(selectUserId);
    const user = useSelector(selectUser);
    const [shipToName, setShipToName] = useState(user.first_name + ' ' + user.last_name);
    const [shipToStreet, setShipToStreet] = useState(user.street_address);
    const [shipToCity, setShipToCity] = useState(user.city);
    const [shipToState, setShipToState] = useState(user.state);
    const [shipToZip, setShipToZip] = useState(user.zip_code);
    const [email, setEmail] = useState(user.email);
    const [cardNum, setCardNum] = useState('');
    const [payMethod, setPayMethod] = useState('');
    const [inCheckout, setInCheckout] = useState(false);
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const location = useLocation();
    const stripe = useStripe();
    const elements = useElements();
    let Button;

    const address = {
        shipToName,
        shipToStreet,
        shipToCity,
        shipToState,
        shipToZip,
        email
    };

    const handleClick = async () => {
        if (!stripe || !elements) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardNumberElement),
            billing_details: {
                name: shipToName,
                email
            }
        })
        if (!error) {
            const { stripeId } = paymentMethod;
            const amount = (cart.subtotal + (cart.subtotal * 0.0825) + 9.99).toFixed(2);
            const paymentInfo = {
                cardNum,
                payMethod,
                stripeId,
                amount
            };
            dispatch(checkout({ cartId, userId, address, paymentInfo }));
        }
    };

    const handleChange = ({ target }) => {
        if (target.name === "shipToName") {
            setShipToName(target.value);
        }
        else if (target.name === "shipToStreet") {
            setShipToStreet(target.value);
        }
        else if (target.name === "shipToCity") {
            setShipToCity(target.value);
        }
        else if (target.name === "shipToState") {
            setShipToState(target.value);
        }
        else if (target.name === "shipToZip") {
            setShipToZip(target.value);
        }
        else if (target.name === "email") {
            setEmail(target.value);
        }
        else if (target.name === "cardNum") {
            setCardNum(target.value);
            setPayMethod(creditCardType(target.value));
        }
    };

    if (inCheckout) {
        Button = <button className="Cart__checkout__button" onClick={handleClick} disabled={!stripe}>Place Order</button>
    }
    else {
        Button = <Link to="/cart/checkout"><button className="Cart__checkout__button" onClick={() => setInCheckout(true)}>Go to Checkout</button></Link>
    }

    useEffect(() => {
        return () => dispatch(clearCartStatusUpdates());
    }, [dispatch]);

    useEffect(() => {
        if (!userId) {
            navigate('/login');
        }
        else {
            dispatch(setCartId(user.cart_id));
            dispatch(loadCart({ cartId, userId }));
        }
        if (location.pathname !== '/cart/checkout') {
            setInCheckout(false);
        }
    }, [cartId, userId, user, location, dispatch, navigate]);

    useEffect(() => {
        if (checkoutSuccess) {
            setShipToName('');
            setShipToStreet('');
            setShipToCity('');
            setShipToState('');
            setShipToZip('');
            setEmail('');
            setCardNum('');
            setPayMethod('');
            dispatch(loadCart({ cartId, userId }));
            setTimeout(() => {
                navigate("/orders");
                dispatch(clearCartStatusUpdates());
            }, 3000);
        }
    }, [checkoutSuccess, cartId, userId, dispatch, navigate]);

    if (checkoutSuccess) {
        return (
            <section className="Cart">
                <p className="Cart__success">Your order has been placed!</p>
            </section>
        );
    }
    if (loadingCart || checkingout) {
        return (
            <section className="Cart">
                <Loader />
            </section>
        );
    }
    return (
        <section className="Cart">
            {inCheckout && <form className="Cart__form" method="post" action="">
                <div className="Cart__address">
                    <h2 className="Cart__address__heading">Ship To Address</h2>
                    <label className="Cart__label" for="shipToName">FULL NAME</label>
                    <input className="Cart__input" id="shipToName" name="shipToName" placeholder="Full Name" pattern="[A-Za-z]" required
                    value={shipToName} onChange={handleChange}/>
                    <label className="Cart__label" for="shipToStreet">STREET ADDRESS</label>
                    <input className="Cart__input" id="shipToStreet" name="shipToStreet" placeholder="Street Address" required
                    value={shipToStreet} onChange={handleChange}/>
                    <label className="Cart__label" for="shipToCity">CITY</label>
                    <input className="Cart__input" id="shipToCity" name="shipToCity" placeholder="City" required
                    value={shipToCity} onChange={handleChange}/>
                    <label className="Cart__label" for="shipToState">STATE</label>
                    <input className="Cart__input" id="shipToState" name="shipToState" placeholder="State" required
                    value={shipToState} onChange={handleChange}/>
                    <label className="Cart__label" for="shipToZip">ZIP CODE</label>
                    <input className="Cart__input" id="shipToZip" name="shipToZip" placeholder="Zip Code" required
                    value={shipToZip} onChange={handleChange}/>
                    <label className="Cart__label" for="email">EMAIL</label>
                    <input className="Cart__input" id="email" name="email" placeholder="Enter your email address" type="email" required
                    value={email} onChange={handleChange}/>
                </div>
                <div className="Cart__payment">
                    <h2 className="Cart__payment__heading">Payment Information</h2>
                    <label className="Cart__label" for="cardNumStripe">CARD NUMBER</label>
                    <CardNumberElement className="Cart__input" id="cardNumStripe" name="cardNumStripe" required/>
                    <label className="Cart__label" for="cardNum">RE-ENTER CARD NUMBER</label>
                    <input className="Cart__input" id="cardNum" name="cardNum" required value={cardNum} onChange={handleChange}/>
                    <label className="Cart__label" for="payMethod">CARD TYPE</label>
                    <input className="Cart__input" id="payMethod" name="payMethod" required value={payMethod} readOnly/>
                    <label className="Cart__label" for="cardExp">EXPIRATION DATE</label>
                    <CardExpiryElement className="Cart__input" id="cardExp" name="cardExp" required/>
                    <label className="Cart__label" for="cardCVC">SECURITY CODE</label>
                    <CardCvcElement className="Cart__input" id="cardCVC" name="cardCVC" required/>
                </div>
                {checkoutError && <Error msg={checkoutError}/>}
            </form>}
            {cart.items ? <section className="Cart__items">
                <h2 className="Cart__items__heading">Items in Cart</h2>
                {loadCartError && <Error msg={loadCartError}/>}
                {cart.items.map((cartItem, i) => <Product product={cartItem} display='inCart' key={cart.items[i].product_id}/>)}
                <div className="Cart__info">
                    {inCheckout ? 
                    <div className="Cart__info__details">
                        <div className="Cart__info__pay__details">
                            <p className="Cart__shipping">Shipping: $9.99</p>
                            <p className="Cart__tax">{`Tax: $${(cart.subtotal * 0.0825).toFixed(2)}`}</p>
                            <p className="Cart__subtotal">{`Subtotal: $${cart.subtotal.toFixed(2)}`}</p>
                        </div>
                        <p className="Cart__total">{`Total: $${(cart.subtotal + (cart.subtotal * 0.0825) + 9.99).toFixed(2)}`}</p>
                    </div> :
                    <p className="Cart__subtotal">{`Subtotal: $${cart.subtotal.toFixed(2)}`}</p>}
                    {Button}
                </div>
            </section> :
            <section className="Cart__items">
                <h2 className="Cart__items__heading">Items in Cart</h2>
                Your cart is empty.
            </section>}
        </section>
    );
}

export default Cart;