import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Cart from '../../features/cart/Cart';

const PUBLIC_KEY = 'pk_test_51KgtigBC10Y7MemjnYRSkhy6WrL1UQKZzNDPERJIKE7VmaegxKqkUEwuvRgVPytyORAaWWtqgMETNyrq1S2413DM00Ts5Pl4ih';

const stripe = loadStripe(PUBLIC_KEY);

const StripeContainer = () => {
    return (
        <Elements stripe={stripe}>
            <Cart />
        </Elements>
    );
}

export default StripeContainer;