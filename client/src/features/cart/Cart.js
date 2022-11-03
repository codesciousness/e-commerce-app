import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import './Cart.css';
import TextInput from '../../material-ui/TextInput';
import Alert from '../../material-ui/Alert';
import Button from '../../material-ui/Button';
import Product from '../../components/product/Product';
import Loader from '../../components/loader/Loader';
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
    let button;

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
        if (target.name === "fullname") {
            setShipToName(target.value);
        }
        else if (target.name === "streetaddress") {
            setShipToStreet(target.value);
        }
        else if (target.name === "city") {
            setShipToCity(target.value);
        }
        else if (target.name === "state") {
            setShipToState(target.value);
        }
        else if (target.name === "zipcode") {
            setShipToZip(target.value);
        }
        else if (target.name === "email") {
            setEmail(target.value);
        }
        else if (target.name === "verifycardnumber") {
            setCardNum(target.value);
            setPayMethod(creditCardType(cardNum));
        }
    };

    if (inCheckout) {
        button = <Button name="Place Order" size="large" disabled={!stripe} onClick={handleClick}/>
    }
    else {
        button = <Link to="/cart/checkout"><Button name="Go to Checkout" size="large" onClick={() => setInCheckout(true)}/></Link>
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
                    <TextInput name="Full Name" value={shipToName} onChange={handleChange}/>
                    <TextInput name="Street Address" value={shipToStreet} onChange={handleChange}/>
                    <TextInput name="City" value={shipToCity} onChange={handleChange}/>
                    <TextInput name="State" value={shipToState} onChange={handleChange}/>
                    <TextInput name="Zip Code" value={shipToZip} onChange={handleChange}/>
                    <TextInput name="Email" value={email} type="email" onChange={handleChange}/>
                </div>
                <div className="Cart__payment">
                    <h2 className="Cart__payment__heading">Payment Information</h2>
                    <CardNumberElement className="Cart__input" id="cardNumStripe" name="cardNumStripe" required/>
                    <TextInput name="Verify Card Number" value={cardNum} placeholder="Re-enter your card number" onChange={handleChange}/>
                    <TextInput name="Card Type" value={payMethod} onChange={handleChange}/>
                    <CardExpiryElement className="Cart__input" id="cardExp" name="cardExp" required/>
                    <CardCvcElement className="Cart__input" id="cardCVC" name="cardCVC" required/>
                </div>
                {checkoutError && <Alert severity='error' msg={checkoutError} onClose={() => dispatch(clearCartStatusUpdates())}/>}
            </form>}
            {cart.items ? <section className="Cart__items">
                <h2 className="Cart__items__heading">Items in Cart</h2>
                {loadCartError && <Alert severity='error' msg={loadCartError} onClose={() => dispatch(clearCartStatusUpdates())}/>}
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
                    {button}
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