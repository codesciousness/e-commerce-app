import React from 'react';
import './Checkout.css';
import Cart from '../../features/cart/Cart';

const Checkout = () => {
    return (
        <section className="Checkout">
            <form className="Checkout__form" method="post" action="/cart/cartId/checkout">
                <div className="Checkout__address">
                    <h2 className="Checkout__address__heading">Ship To Address</h2>
                    <label className="Checkout__label" for="fullNname">FULL NAME</label>
                    <input className="Checkout__input" id="fullName" name="fullName" placeholder="Full Name" pattern="[A-Za-z]" required />
                    <label className="Checkout__label" for="streetAddress">STREET ADDRESS</label>
                    <input className="Checkout__input" id="streetAddress" name="streetAddress" placeholder="Street Address" required />
                    <label className="Checkout__label" for="city">CITY</label>
                    <input className="Checkout__input" id="city" name="city" placeholder="City" required />
                    <label className="Checkout__label" for="state">STATE</label>
                    <input className="Checkout__input" id="state" name="state" placeholder="State" required />
                    <label className="Checkout__label" for="zipcode">ZIP CODE</label>
                    <input className="Checkout__input" id="zipcode" name="zipcode" placeholder="Zip Code" required />
                    <label className="Checkout__label" for="email">EMAIL</label>
                    <input className="Checkout__input" id="email" name="email" placeholder="Enter your email address" type="email" required />
                </div>
                <div className="Checkout__payment">
                    <h2 className="Checkout__payment__heading">Payment Information</h2>
                    <label className="Checkout__label" for="cardNum">CARD NUMBER</label>
                    <input className="Checkout__input" id="cardNum" name="cardNum" placeholder="Enter your card number" required />
                    <label className="Checkout__label" for="payMethod">CARD TYPE</label>
                    <input className="Checkout__input" id="payMethod" name="payMethod" required />
                    <label className="Checkout__label" for="cardExp">EXPIRATION DATE</label>
                    <input className="Checkout__input" id="cardExp" name="cardExp" required />
                    <label className="Checkout__label" for="cardCVV">SECURITY CODE</label>
                    <input className="Checkout__input" id="cardCVV" name="cardCVV" required />
                </div>
            </form>
            <Cart inCheckout={true}/>
        </section>
    );
}

export default Checkout;