import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const axios = require('axios');

export const createCart = createAsyncThunk('cart/createCart',
async ({ userId = null }) => {
    const response = await axios.post('/cart', { userId });
    const cartId = response.data.id;
    localStorage.cartId = cartId;
    return cartId;
});

export const loadCart = createAsyncThunk('cart/loadCart',
async (cartId) => {
    const response = await axios.get(`/cart/${cartId}`);
    const cart = response.data;
    return cart;
});

export const updateCart = createAsyncThunk('cart/updateCart',
async ({ cartId, productId, cartQuantity }) => {
    if (cartId && productId && cartQuantity) {
        const response = await axios.put(`/cart/${cartId}`, { productId, cartQuantity });
        return response.data;
    }
});

export const checkout = createAsyncThunk('cart/checkout',
async (cartId) => {
    const response = await axios.post(`/cart/${cartId}/checkout`);
    return response.data;
});

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartId: localStorage.cartId,
        cart: {},
        creatingCart: false,
        createCartError: false,
        loadingCart: false,
        loadCartError: false,
        updatingCart: false,
        updateCartError: false,
        checkingout: false,
        checkoutError: false
    },
    reducers: {},
    extraReducers: {
        [createCart.pending]: (state, action) => {
            state.creatingCart = true;
            state.createCartError = false;
        },
        [createCart.fulfilled]: (state, action) => {
            state.creatingCart = false;
            state.createCartError = false;
            state.cartId = action.payload;
        },
        [createCart.rejected]: (state, action) => {
            state.creatingCart = false;
            state.createCartError = true;
        },
        [loadCart.pending]: (state, action) => {
            state.loadingCart = true;
            state.loadCartError = false;
        },
        [loadCart.fulfilled]: (state, action) => {
            state.loadingCart = false;
            state.loadCartError = false;
            state.cart = action.payload;
        },
        [loadCart.rejected]: (state, action) => {
            state.loadingCart = false;
            state.loadCartError = true;
        },
        [updateCart.pending]: (state, action) => {
            state.updatingCart = true;
            state.updateCartError = false;
        },
        [updateCart.fulfilled]: (state, action) => {
            state.updatingCart = false;
            state.updateCartError = false;
        },
        [updateCart.rejected]: (state, action) => {
            state.updatingCart = false;
            state.updateCartError = true;
        },
        [checkout.pending]: (state, action) => {
            state.checkingout = true;
            state.checkoutError = false;
        },
        [checkout.fulfilled]: (state, action) => {
            state.checkingout = false;
            state.checkoutError = false;
        },
        [checkout.rejected]: (state, action) => {
            state.checkingout = false;
            state.checkoutError = true;
        }
    }
});

export default cartSlice.reducer;

export const selectCartId = state => state.cart.cartId;
export const selectCart = state => state.cart.cart;
export const selectCreatingCart = state => state.cart.creatingCart;
export const selectCreateCartError = state => state.cart.createCartError;
export const selectLoadingCart = state => state.cart.loadingCart;
export const selectLoadCartError = state => state.cart.loadCartError;
export const selectUpdatingCart = state => state.cart.updatingCart;
export const selectUpdateCartError = state => state.cart.updateCartError;
export const selectCheckingout = state => state.cart.checkout;
export const selectCheckoutError = state => state.cart.checkoutError;