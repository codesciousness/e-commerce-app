import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { selectSearchTerm } from '../searchTerm/searchTermSlice';
const axios = require('axios');

export const loadProductById = createAsyncThunk('products/loadProductById',
async (productId) => {
    const response = await axios.get(`/products/${productId}`);
    const json = await response.json();
    return json;
});

export const loadProducts = createAsyncThunk('products/loadProducts',
async ({ category, sort }) => {
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
});

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        product: null,
        products: [],
        loadingProduct: false,
        loadProductError: false,
        loadingProducts: false,
        loadProductsError: false
    },
    reducers: {
        setProduct: (state, action) => {
            let productId = action.payload;
            state.product = productId;
            return state;
        }
    },
    extraReducers: {
        [loadProductById.pending]: (state, action) => {
            state.loadingProduct = true;
            state.loadProductError = false;
        },
        [loadProductById.fulfilled]: (state, action) => {
            state.loadingProduct = false;
            state.loadProductError = false;
            state.product = action.payload;
        },
        [loadProductById.rejected]: (state, action) => {
            state.loadingProduct = false;
            state.loadProductError = true;
        },
        [loadProducts.pending]: (state, action) => {
            state.loadingProducts = true;
            state.loadProductsError = false;
        },
        [loadProducts.fulfilled]: (state, action) => {
            state.loadingProducts = false;
            state.loadProductsError = false;
            state.products = action.payload;
        },
        [loadProducts.rejected]: (state, action) => {
            state.loadingProducts = false;
            state.loadProductsError = true;
        }
    }
});

export const { setProduct } = productsSlice.actions;
export default productsSlice.reducer;

export const selectProduct = state => state.products.product;
export const selectProducts = state => state.products.products;
export const selectLoadingProduct = state => state.products.loadingProduct;
export const selectLoadProductError = state => state.products.loadProductError;
export const selectLoadingProducts = state => state.products.loadingProducts;
export const selectLoadProductsError = state => state.products.loadProductsError;

export const selectFilteredProducts = state => {
    const searchTerm = selectSearchTerm(state);
    let products = selectProducts(state);
    if (searchTerm) {
        products = products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    return products;
};