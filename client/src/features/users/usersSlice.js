import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login } from '../auth/authSlice';
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
        updateUserError: false
    },
    reducers: {
        setUser: (state, action) => {
            console.log(action.payload);
            let user = action.payload;
            let userId = user.id;
            state.user = user;
            state.userId = userId;
            return state;
        },
        clearUser: (state) => {
            state.user = {};
            state.userId = null;
            console.log(state.user);
            return state;
        },
        clearUsersStatusUpdates: (state) => {
            state.loadUserError = false;
            state.registerUserSuccess = false;
            state.registerUserError = false;
            state.updateUserSuccess = false;
            state.updateUserError = false;
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
        }
    }
});

export const { setUser, clearUser, clearUsersStatusUpdates } = usersSlice.actions;
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