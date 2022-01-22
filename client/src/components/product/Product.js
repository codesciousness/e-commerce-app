import React from 'react';
import './Product.css';
import { useDispatch } from 'react-redux';
import { setProduct } from '../../features/products/productsSlice';

const Product = ({ product, inCart }) => {
    const dispatch = useDispatch();

    const handleClick = ({ target, preventDefault }) => {
        preventDefault();
        dispatch(setProduct(target.id));
    };
    
    if (inCart) {
        return (
            <section className="Product__inCart">
                <img className="Product__inCart__image" src={`https://source.unsplash.com/200x200/?${product.category}`} alt="" />
                <div className="Product__inCart__info">
                    <div className="Product__inCart__container">
                        <p className="Product__inCart__label">PRODUCT NAME</p>
                        <h2 className="Product__inCart__name">{product.name}</h2>
                    </div>
                    <div className="Product__inCart__container">
                        <p className="Product__inCart__label">QUANTITY</p>
                        <div className="Product__inCart__quantity__container">
                            <button className="Product__inCart__button">-</button>
                            <input className="Product__inCart__quantity" type="number" name="quantity" min="0" max="100" />
                            <button className="Product__inCart__button">+</button>
                        </div>
                    </div>
                    <div className="Product__inCart__container">
                        <p className="Product__inCart__label">PRICE</p>
                        <p className="Product__inCart__price">{product.sell_price}</p>
                    </div>
                    <div className="Product__inCart__container">
                        <p className="Product__inCart__label">ITEM TOTAL</p>
                        <p className="Product__inCart__itemTotal">{product.item_total}</p>
                    </div>
                </div>
            </section>
        );
    }
    else {
        return (
            <section className="Product">
                <p className="Product__category">{product.category}</p>
                <img className="Product__image" src={`https://source.unsplash.com/250x250/?${product.category}`} alt="" />
                <div className="Product__info">
                    <h2 className="Product__name">{product.name}</h2>
                    <p className="Product__price">{product.sell_price}</p>
                    <button className="Product__button">Add to Cart</button>
                </div> 
            </section>
        );
    }
}

export default Product;