import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const axios = require('axios');

export const loadOrderById = createAsyncThunk('orders/loadOrderById',
async ({ userId, orderId }, { rejectWithValue }) => {
    try {
        const response = await axios.get(`/users/${userId}/orders/${orderId}`);
        return response.data;
    }
    catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const loadOrders = createAsyncThunk('orders/loadOrders',
async ({ userId, sort }, { rejectWithValue }) => {
    try {
        if (sort) {
            const response = await axios.get(`/users/${userId}/orders?sort=${sort}`);
            return response.data;
        }
        else {
            const response = await axios.get(`/users/${userId}/orders?sort=newest`);
            return response.data;
        }
    }
    catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const cancelOrder = createAsyncThunk('orders/cancelOrder',
async ({ userId, orderId }, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`/users/${userId}/orders/${orderId}`);
        return response.data;
    }
    catch (err) {
        return rejectWithValue(err.response.data);
    }
});

const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        orderId: null,
        order: {},
        orders: [],
        loadingOrder: false,
        loadOrderSuccess: false,
        loadOrderError: false,
        loadingOrders: false,
        loadOrdersSuccess: false,
        loadOrdersError: false,
        cancelingOrder: false,
        cancelOrderSuccess: false,
        cancelOrderError: false,
    },
    reducers: {
        setOrderId: (state, action) => {
            state.orderId = action.payload;
            return state;
        },
        clearOrder: (state) => {
            state.orderId = null;
            state.order = {};
            return state;
        },
        resetOrders: (state) => {
            state.orders = [];
            return state;
        },
        clearOrdersStatusUpdates: (state) => {
            state.loadOrderSuccess = false;
            state.loadOrderError = false;
            state.loadOrdersSuccess = false;
            state.loadOrdersError = false;
            state.cancelOrderSuccess = false;
            state.cancelOrderError = false;
            return state;
        }
    },
    extraReducers: {
        [loadOrderById.pending]: (state, action) => {
            state.loadingOrder = true;
            state.loadOrderSuccess = false;
            state.loadOrderError = false;
        },
        [loadOrderById.fulfilled]: (state, action) => {
            state.loadingOrder = false;
            state.loadOrderSuccess = true;
            state.loadOrderError = false;
            state.order = action.payload;
        },
        [loadOrderById.rejected]: (state, action) => {
            state.loadingOrder = false;
            state.loadOrderSuccess = false;
            state.loadOrderError = action.payload;
            state.orderId = null;
            state.order = {};
        },
        [loadOrders.pending]: (state, action) => {
            state.loadingOrders = true;
            state.loadOrdersSuccess = false;
            state.loadOrdersError = false;
        },
        [loadOrders.fulfilled]: (state, action) => {
            state.loadingOrders = false;
            state.loadOrdersSuccess = true;
            state.loadOrdersError = false;
            state.orders = action.payload;
        },
        [loadOrders.rejected]: (state, action) => {
            state.loadingOrders = false;
            state.loadOrdersSuccess = false;
            state.loadOrdersError = action.payload;
        },
        [cancelOrder.pending]: (state, action) => {
            state.cancelingOrder = true;
            state.cancelOrderSuccess = false;
            state.cancelOrderError = false;
        },
        [cancelOrder.fulfilled]: (state, action) => {
            state.cancelingOrder = false;
            state.cancelOrderSuccess = true;
            state.cancelOrderError = false;
        },
        [cancelOrder.rejected]: (state, action) => {
            state.cancelingOrder = false;
            state.cancelOrderSuccess = false;
            state.cancelOrderError = action.payload;
        }
    }
});

export const { setOrderId, clearOrder, resetOrders, clearOrdersStatusUpdates } = ordersSlice.actions;
export default ordersSlice.reducer;

export const selectOrderId = state => state.orders.orderId;
export const selectOrder = state => state.orders.order;
export const selectOrders = state => state.orders.orders;
export const selectLoadingOrder = state => state.orders.loadingOrder;
export const selectLoadOrderSuccess = state => state.orders.loadOrderSuccess;
export const selectLoadOrderError = state => state.orders.loadOrderError;
export const selectLoadingOrders = state => state.orders.loadingOrders;
export const selectLoadOrdersSuccess = state => state.orders.loadOrdersSuccess;
export const selectLoadOrdersError = state => state.orders.loadOrdersError;
export const selectCancelingOrder = state => state.orders.cancelingOrder;
export const selectCancelOrderSuccess = state => state.orders.cancelOrderSuccess;
export const selectCancelOrderError = state => state.orders.cancelOrderError;