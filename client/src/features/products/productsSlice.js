import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { selectSearchTerm } from '../searchTerm/searchTermSlice';
const axios = require('axios');

export const loadProductById = createAsyncThunk('products/loadProductById',
async (productId, { rejectWithValue }) => {
    try {
        const response = await axios.get(`/products/${productId}`);
        return response.data;
    }
    catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const loadProducts = createAsyncThunk('products/loadProducts',
async ({ category, sort }, { rejectWithValue }) => {
    try {
        if (category && sort) {
            const response = await axios.get(`/products?category=${category}&sort=${sort}`);
            return response.data;
        }
        else if (category) {
            const response = await axios.get(`/products?category=${category}`);
            return response.data;
        }
        else if (sort) {
            const response = await axios.get(`/products?sort=${sort}`);
            return response.data;
        }
        else {
            const response = await axios.get(`/products`);
            return response.data;
        }
    }
    catch (err) {
        return rejectWithValue(err.response.data);
    }
});

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        productId: null,
        product: {},
        products: [],
        loadingProduct: false,
        loadProductSuccess: false,
        loadProductError: false,
        loadingProducts: false,
        loadProductsSuccess: false,
        loadProductsError: false
    },
    reducers: {
        setProductId: (state, action) => {
            state.productId = action.payload;
            return state;
        },
        clearProduct: (state) => {
            state.productId = null;
            state.product = {};
            return state;
        },
        clearProdsStatusUpdates: (state) => {
            state.loadProductSuccess = false;
            state.loadProductError = false;
            state.loadProductsSuccess = false;
            state.loadProductsError = false;
            return state;
        }
    },
    extraReducers: {
        [loadProductById.pending]: (state, action) => {
            state.loadingProduct = true;
            state.loadProductSuccess = false;
            state.loadProductError = false;
        },
        [loadProductById.fulfilled]: (state, action) => {
            state.loadingProduct = false;
            state.loadProductSuccess = true;
            state.loadProductError = false;
            state.product = action.payload;
        },
        [loadProductById.rejected]: (state, action) => {
            state.loadingProduct = false;
            state.loadProductSuccess = false;
            state.loadProductError = action.payload;
        },
        [loadProducts.pending]: (state, action) => {
            state.loadingProducts = true;
            state.loadProductsSuccess = false;
            state.loadProductsError = false;
        },
        [loadProducts.fulfilled]: (state, action) => {
            state.loadingProducts = false;
            state.loadProductsSuccess = true;
            state.loadProductsError = false;
            state.products = action.payload;
        },
        [loadProducts.rejected]: (state, action) => {
            state.loadingProducts = false;
            state.loadProductsSuccess = false;
            state.loadProductsError = action.payload;
        }
    }
});

export const { setProductId, clearProduct, clearProdsStatusUpdates } = productsSlice.actions;
export default productsSlice.reducer;

export const selectProductId = state => state.products.productId;
export const selectProduct = state => state.products.product;
export const selectProducts = state => state.products.products;
export const selectLoadingProduct = state => state.products.loadingProduct;
export const selectLoadProductSuccess = state => state.products.loadProductSuccess;
export const selectLoadProductError = state => state.products.loadProductError;
export const selectLoadingProducts = state => state.products.loadingProducts;
export const selectLoadProductsSuccess = state => state.products.loadProductsSuccess;
export const selectLoadProductsError = state => state.products.loadProductsError;

export const selectFilteredProducts = state => {
    const searchTerm = selectSearchTerm(state);
    let products = selectProducts(state);
    if (searchTerm) {
        products = products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    return products;
};