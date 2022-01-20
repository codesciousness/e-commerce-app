import React from 'react';
import './Order.css';

const Order = ({ processing }) => {
    return (
        <section className="Order">
            <div className="Order__info">
                <h3 className="Order__id">Order Id: #24</h3>
                <p className="Order__date">Date: 12/31/2021</p>
                <p className="Order__status">Status: Shipped</p>
                { processing && <button className="Order__button">Cancel Order</button>}
            </div>
            <div className="Order__container">
                <img className="Order__image" src='https://source.unsplash.com/200x200/?product' alt="" />
                <div className="Order__address">
                    <h3 className="Order__shipping">Shipping Address</h3>
                    <p className="Order__fullname">John Smith</p>
                    <p className="Order__streetAddress">101 Ocean Drive</p>
                    <span className="Order__city">Key Largo, </span>
                    <span className="Order__state">FL </span>
                    <span className="Order__zipcode">33037</span>
                    <p className="Order__email">jsmith@vacations.com</p>
                </div>
                <div className="Order__payment">
                    <h3 className="Order__total">Order Total: $232</h3>
                    <p className="Order__payMethod">Payment Method: Visa</p>
                    <p className="Order__cardNum">Card Number: 0024</p>
                </div>
            </div>
        </section>
    );
}

export default Order;