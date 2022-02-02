import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const axios = require('axios');

export const login = createAsyncThunk('auth/login',
async ({ username, password }) => {
    const response = await axios.post('/auth/login', { username, password });
    return response.data;
});

export const logout = createAsyncThunk('auth/logout',
async () => {
    const response = await axios.get('/auth/logout');
    return response.data;
});

export const googleLogin = createAsyncThunk('auth/googleLogin',
async () => {
    const response = await axios.get('/auth/google');
    return response.data;
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loggingIn: false,
        loginSuccess: false,
        loginError: false,
        loggingOut: false,
        logoutError: false,
        googleLoggingIn: false,
        googleLoginSuccess: false,
        googleLoginError: false
    },
    reducers: {},
    extraReducers: {
        [login.pending]: (state, action) => {
            state.loggingIn = true;
            state.loginError = false;
        },
        [login.fulfilled]: (state, action) => {
            state.loggingIn = false;
            state.loginSuccess = true;
            state.loginError = false;
            setTimeout(() => {state.loginSuccess = false}, 2.0*1000);
        },
        [login.rejected]: (state, action) => {
            state.loggingIn = false;
            state.loginError = true;
        },
        [logout.pending]: (state, action) => {
            state.loggingOut = true;
            state.logoutError = false;
        },
        [logout.fulfilled]: (state, action) => {
            state.loggingOut = false;
            state.logoutError = false;
        },
        [logout.rejected]: (state, action) => {
            state.loggingOut = false;
            state.logoutError = true;
        },
        [googleLogin.pending]: (state, action) => {
            state.googleLoggingIn = true;
            state.googleLoginError = false;
        },
        [googleLogin.fulfilled]: (state, action) => {
            state.googleLoggingIn = false;
            state.googleLoginSuccess = true;
            state.googleLoginError = false;
            setTimeout(() => {state.googleLoginSuccess = false}, 2.0*1000);
        },
        [googleLogin.rejected]: (state, action) => {
            state.googleLoggingIn = false;
            state.googleLoginError = true;
        }
    }
});

export default authSlice.reducer;

export const selectLoggingIn = state => state.auth.loggingIn;
export const selectLoginSuccess = state => state.auth.loginSuccess;
export const selectLoginError = state => state.auth.loginError;
export const selectLoggingOut = state => state.auth.loggingOut;
export const selectLogoutError = state => state.auth.logoutError;
export const selectGoogleLoggingIn = state => state.auth.googleLoggingIn;
export const selectGoogleLoginSuccess = state => state.auth.googleLoginSuccess;
export const selectGoogleLoginError = state => state.auth.googleLoginError;