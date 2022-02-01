import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const axios = require('axios');

export const loadUserById = createAsyncThunk('users/loadUserById',
async (userId) => {
    const response = await axios.get(`/users/${userId}`);
    return response.data;
});

export const registerUser = createAsyncThunk('users/registerUser',
async (newUser) => {
    const response = await axios.post('/users/register', newUser);
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
        registerUserError: false,
        updatingUser: false,
        updateUserError: false
    },
    reducers: {
        setUserId: (state, action) => {
            let userId = action.payload;
            state.userId = userId;
            return state;
        },
        clearUserId: (state) => {
            state = null;
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
        },
        [registerUser.pending]: (state, action) => {
            state.registeringUser = true;
            state.registerUserError = false;
        },
        [registerUser.fulfilled]: (state, action) => {
            state.registeringUser = false;
            state.registerUserError = false;
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
            state.updateUserError = false;
        },
        [updateUser.rejected]: (state, action) => {
            state.updatingUser = false;
            state.updateUserError = true;
        }
    }
});

export const { setUserId, clearUserId } = usersSlice.actions;
export default usersSlice.reducer;

export const selectUser = state => state.users.user;
export const selectUserId = state => state.users.userId;
export const selectLoadingUser = state => state.users.loadingUser;
export const selectLoadUserError = state => state.users.loadUserError;
export const selectRegisteringUser = state => state.users.registeringUser;
export const selectRegisterUserError = state => state.users.registerUserError;
export const selectUpdatingUser = state => state.users.updatingUser;
export const selectUpdateUserError = state => state.users.updateUserError;