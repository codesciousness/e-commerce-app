import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const axios = require('axios');

export const loadCart = createAsyncThunk('cart/loadCart',
async ({ cartId, userId }) => {
    const response = await axios.get(`/users/${userId}/cart/${cartId}`);
    const cart = response.data;
    return cart;
});

export const updateCart = createAsyncThunk('cart/updateCart',
async ({ cartId, userId, productId, cartQuantity }) => {
    const response = await axios.put(`/users/${userId}/cart/${cartId}`, { userId, productId, cartQuantity });
    return response.data;
});

export const checkout = createAsyncThunk('cart/checkout',
async ({ cartId, userId, address, payment }) => {
    const response = await axios.post(`/users/${userId}/cart/${cartId}/checkout`, { userId, address, payment });
    return response.data;
});

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartId: null,
        cart: {},
        loadingCart: false,
        loadCartError: false,
        updatingCart: false,
        updateCartError: false,
        checkingout: false,
        checkoutSuccess: false,
        checkoutError: false
    },
    reducers: {
        setCartId: (state, action) => {
            state.cartId = action.payload;
            return state;
        },
        clearCart: (state) => {
            state.cartId = null;
            state.cart = {};
            return state;
        },
        clearCartStatusUpdates: (state) => {
            state.loadCartError = false;
            state.updateCartError = false;
            state.checkoutSuccess = false;
            state.checkoutError = false;
            return state;
        }
    },
    extraReducers: {
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
            state.cart = {};
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
            state.checkoutSuccess = true;
            state.checkoutError = false;
        },
        [checkout.rejected]: (state, action) => {
            state.checkingout = false;
            state.checkoutError = true;
        }
    }
});

export const { setCartId, clearCart, clearCartStatusUpdates } = cartSlice.actions;
export default cartSlice.reducer;

export const selectCartId = state => state.cart.cartId;
export const selectCart = state => state.cart.cart;
export const selectLoadingCart = state => state.cart.loadingCart;
export const selectLoadCartError = state => state.cart.loadCartError;
export const selectUpdatingCart = state => state.cart.updatingCart;
export const selectUpdateCartError = state => state.cart.updateCartError;
export const selectCheckingout = state => state.cart.checkout;
export const selectCheckoutSuccess = state => state.cart.checkoutSuccess;
export const selectCheckoutError = state => state.cart.checkoutError;