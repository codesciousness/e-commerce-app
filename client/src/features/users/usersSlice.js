import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const axios = require('axios');

export const loadUserById = createAsyncThunk('users/loadUserById',
async (userId) => {
    const response = await axios.get(`/users/${userId}`);
    return response.data;
});

export const registerUser = createAsyncThunk('users/registerUser',
async ({ firstName, lastName, email, username, password }) => {
    const response = await axios.post('/users/register', { firstName, lastName, email, username, password });
    //login({ username, password });
    return response.data;
});

export const updateUser = createAsyncThunk('users/updateUser',
async ({ userId, user }) => {
    const response = await axios.put(`/users/${userId}`, user);
    return response.data;
});

export const login = createAsyncThunk('users/login',
async ({ username, password }) => {
    const response = await axios.post('/auth/login', { username, password });
    return response.data;
});

export const logout = createAsyncThunk('users/logout',
async () => {
    const response = await axios.get('/auth/logout');
    return response.data;
});

export const googleLogin = createAsyncThunk('users/googleLogin',
async () => {
    window.location = 'http://localhost:4001/auth/google';
});

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        userId: null,
        user: {},
        loadingUser: false,
        loadUserError: false,
        registeringUser: false,
        registerUserSuccess: false,
        registerUserError: false,
        updatingUser: false,
        updateUserSuccess: false,
        updateUserError: false,
        loggingIn: false,
        loginSuccess: false,
        loginError: false,
        loggingOut: false,
        logoutSuccess: false,
        logoutError: false,
        googleLoggingIn: false,
        googleLoginSuccess: false,
        googleLoginError: false
    },
    reducers: {
        clearUsersStatusUpdates: (state) => {
            state.loadUserError = false;
            state.registerUserSuccess = false;
            state.registerUserError = false;
            state.updateUserSuccess = false;
            state.updateUserError = false;
            state.loginSuccess = false;
            state.loginError = false;
            state.logoutSuccess = false;
            state.logoutError = false;
            state.googleLoginSuccess = false;
            state.googleLoginError = false;
            return state;
        }
    },
    extraReducers: {
        [loadUserById.pending]: (state, action) => {
            state.loadingUser = true;
            state.loadUserError = false;
        },
        [loadUserById.fulfilled]: (state, action) => {
            state.loadingUser = false;
            state.loadUserError = false;
            state.user = action.payload;
        },
        [loadUserById.rejected]: (state, action) => {
            state.loadingUser = false;
            state.loadUserError = true;
            state.user = {};
        },
        [registerUser.pending]: (state, action) => {
            state.registeringUser = true;
            state.registerUserError = false;
        },
        [registerUser.fulfilled]: (state, action) => {
            state.registeringUser = false;
            state.registerUserSuccess = true;
            state.registerUserError = false;
            state.user = action.payload;
            state.userId = action.payload.id;
        },
        [registerUser.rejected]: (state, action) => {
            state.registeringUser = false;
            state.registerUserError = true;
        },
        [updateUser.pending]: (state, action) => {
            state.updatingUser = true;
            state.updateUserError = false;
        },
        [updateUser.fulfilled]: (state, action) => {
            state.updatingUser = false;
            state.updateUserSuccess = true;
            state.updateUserError = false;
            state.user = action.payload;
        },
        [updateUser.rejected]: (state, action) => {
            state.updatingUser = false;
            state.updateUserError = true;
        },
        [login.pending]: (state, action) => {
            state.loggingIn = true;
            state.loginError = false;
        },
        [login.fulfilled]: (state, action) => {
            state.loggingIn = false;
            state.loginSuccess = true;
            state.loginError = false;
            state.user = action.payload;
            state.userId = action.payload.id;
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
            state.logoutSuccess = true;
            state.logoutError = false;
            state.user = {};
            state.userId = null;
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
        },
        [googleLogin.rejected]: (state, action) => {
            state.googleLoggingIn = false;
            state.googleLoginError = true;
        }
    }
});

export const { clearUsersStatusUpdates } = usersSlice.actions;
export default usersSlice.reducer;

export const selectUser = state => state.users.user;
export const selectUserId = state => state.users.userId;
export const selectLoadingUser = state => state.users.loadingUser;
export const selectLoadUserError = state => state.users.loadUserError;
export const selectRegisteringUser = state => state.users.registeringUser;
export const selectRegisterUserSuccess = state => state.users.registerUserSuccess;
export const selectRegisterUserError = state => state.users.registerUserError;
export const selectUpdatingUser = state => state.users.updatingUser;
export const selectUpdateUserSuccess = state => state.users.updateUserSuccess;
export const selectUpdateUserError = state => state.users.updateUserError;
export const selectLoggingIn = state => state.users.loggingIn;
export const selectLoginSuccess = state => state.users.loginSuccess;
export const selectLoginError = state => state.users.loginError;
export const selectLoggingOut = state => state.users.loggingOut;
export const selectLogoutSuccess = state => state.users.logoutSuccess;
export const selectLogoutError = state => state.users.logoutError;
export const selectGoogleLoggingIn = state => state.users.googleLoggingIn;
export const selectGoogleLoginSuccess = state => state.users.googleLoginSuccess;
export const selectGoogleLoginError = state => state.users.googleLoginError;