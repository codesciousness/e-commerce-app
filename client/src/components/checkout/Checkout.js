import React, { useState } from 'react';
import './Checkout.css';
import Cart from '../../features/cart/Cart';

const Checkout = () => {
    const [shipToName, setShipToName] = useState('');
    const [shipToStreet, setShipToStreet] = useState('');
    const [shipToCity, setShipToCity] = useState('');
    const [shipToState, setShipToState] = useState('');
    const [shipToZip, setShipToZip] = useState('');
    const [email, setEmail] = useState('');
    const [cardNum, setCardNum] = useState('');
    const [payMethod, setPayMethod] = useState('');
    const [cardExp, setCardExp] = useState('');
    const [cardCVV, setCardCVV] = useState('');

    const address = {
        shipToName,
        shipToStreet,
        shipToCity,
        shipToState,
        shipToZip,
        email
    };

    const payment = {
        paySuccess: true,
        cardNum,
        payMethod,
        cardExp,
        cardCVV
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
        }
        else if (target.name === "payMethod") {
            setPayMethod(target.value);
        }
        else if (target.name === "cardExp") {
            setCardExp(target.value);
        }
        else if (target.name === "cardCVV") {
            setCardCVV(target.value);
        }
    };

    return (
        <section className="Checkout">
            <form className="Checkout__form" method="post" action="/cart/cartId/checkout">
                <div className="Checkout__address">
                    <h2 className="Checkout__address__heading">Ship To Address</h2>
                    <label className="Checkout__label" for="shipToName">FULL NAME</label>
                    <input className="Checkout__input" id="shipToName" name="shipToName" placeholder="Full Name" pattern="[A-Za-z]" required
                    value={shipToName} onChange={handleChange}/>
                    <label className="Checkout__label" for="shipToStreet">STREET ADDRESS</label>
                    <input className="Checkout__input" id="shipToStreet" name="shipToStreet" placeholder="Street Address" required
                    value={shipToStreet} onChange={handleChange}/>
                    <label className="Checkout__label" for="shipToCity">CITY</label>
                    <input className="Checkout__input" id="shipToCity" name="shipToCity" placeholder="City" required
                    value={shipToCity} onChange={handleChange}/>
                    <label className="Checkout__label" for="shipToState">STATE</label>
                    <input className="Checkout__input" id="shipToState" name="shipToState" placeholder="State" required
                    value={shipToState} onChange={handleChange}/>
                    <label className="Checkout__label" for="shipToZip">ZIP CODE</label>
                    <input className="Checkout__input" id="shipToZip" name="shipToZip" placeholder="Zip Code" required
                    value={shipToZip} onChange={handleChange}/>
                    <label className="Checkout__label" for="email">EMAIL</label>
                    <input className="Checkout__input" id="email" name="email" placeholder="Enter your email address" type="email" required
                    value={email} onChange={handleChange}/>
                </div>
                <div className="Checkout__payment">
                    <h2 className="Checkout__payment__heading">Payment Information</h2>
                    <label className="Checkout__label" for="cardNum">CARD NUMBER</label>
                    <input className="Checkout__input" id="cardNum" name="cardNum" placeholder="Enter your card number" required
                    value={cardNum} onChange={handleChange}/>
                    <label className="Checkout__label" for="payMethod">CARD TYPE</label>
                    <input className="Checkout__input" id="payMethod" name="payMethod" required
                    value={payMethod} onChange={handleChange}/>
                    <label className="Checkout__label" for="cardExp">EXPIRATION DATE</label>
                    <input className="Checkout__input" id="cardExp" name="cardExp" required
                    value={cardExp} onChange={handleChange}/>
                    <label className="Checkout__label" for="cardCVV">SECURITY CODE</label>
                    <input className="Checkout__input" id="cardCVV" name="cardCVV" required
                    value={cardCVV} onChange={handleChange}/>
                </div>
            </form>
            <Cart inCheckout={true} address={address} payment={payment}/>
        </section>
    );
}

export default Checkout;