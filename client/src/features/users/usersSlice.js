import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const axios = require('axios');

export const loadUserById = createAsyncThunk('users/loadUserById',
async (userId, { rejectWithValue }) => {
    try {
        const response = await axios.get(`/users/${userId}`);
        return response.data;
    }
    catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const registerUser = createAsyncThunk('users/registerUser',
async ({ firstName, lastName, email, username, password }, { rejectWithValue }) => {
    try {
        const response = await axios.post('/users/register', { firstName, lastName, email, username, password });
        return response.data;
    }
    catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const updateUser = createAsyncThunk('users/updateUser',
async ({ userId, userProfile }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`/users/${userId}`, { userProfile });
        return response.data;
    }
    catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const changePassword = createAsyncThunk('users/changePassword',
async ({ userId, password }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`/users/${userId}/password`, { password });
        return response.data;
    }
    catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const login = createAsyncThunk('users/login',
async ({ username, password }, { rejectWithValue }) => {
    try {
        const response = await axios.post('/auth/login', { username, password });
        return response.data;
    }
    catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const logout = createAsyncThunk('users/logout',
async () => {
    const response = await axios.get('/auth/logout');
    return response.data;
});

export const googleLogin = createAsyncThunk('users/googleLogin',
async () => {
    window.location = '/auth/google';
});

export const session = createAsyncThunk('users/session',
async () => {
    const response = await axios.get('/auth/session');
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
        updateUserError: false,
        changingPassword: false,
        changePasswordSuccess: false,
        changePasswordError: false,
        loggingIn: false,
        loginSuccess: false,
        loginError: false,
        loggingOut: false,
        logoutSuccess: false,
        logoutError: false,
        gettingSession: false,
        sessionSuccess: false,
        sessionError: false
    },
    reducers: {
        clearUsersStatusUpdates: (state) => {
            state.loadUserError = false;
            state.registerUserSuccess = false;
            state.registerUserError = false;
            state.updateUserSuccess = false;
            state.updateUserError = false;
            state.changePasswordSuccess = false;
            state.changePasswordError = false;
            state.loginSuccess = false;
            state.loginError = false;
            state.logoutSuccess = false;
            state.logoutError = false;
            state.sessionSuccess = false;
            state.sessionError = false;
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
            state.loadUserError = action.payload;
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
            state.userId = action.payload.user_id;
        },
        [registerUser.rejected]: (state, action) => {
            state.registeringUser = false;
            state.registerUserError = action.payload;
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
            state.updateUserError = action.payload;
        },
        [changePassword.pending]: (state, action) => {
            state.changingPassword = true;
            state.changePasswordError = false;
        },
        [changePassword.fulfilled]: (state, action) => {
            state.changingPassword = false;
            state.changePasswordSuccess = true;
            state.changePasswordError = false;
        },
        [changePassword.rejected]: (state, action) => {
            state.changingPassword = false;
            state.changePasswordError = action.payload;
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
            state.userId = action.payload.user_id;
        },
        [login.rejected]: (state, action) => {
            state.loggingIn = false;
            state.loginError = action.payload;
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
        [session.pending]: (state, action) => {
            state.gettingSession = true;
            state.sessionError = false;
        },
        [session.fulfilled]: (state, action) => {
            state.gettingSession = false;
            state.sessionSuccess = true;
            state.sessionError = false;
            state.user = action.payload;
            state.userId = action.payload.user_id;
        },
        [session.rejected]: (state, action) => {
            state.gettingSession = false;
            state.sessionError = true;
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
export const selectChangingPassword = state => state.users.changingPassword;
export const selectChangePasswordSuccess = state => state.users.changePasswordSuccess;
export const selectChangePasswordError = state => state.users.changePasswordError;
export const selectLoggingIn = state => state.users.loggingIn;
export const selectLoginSuccess = state => state.users.loginSuccess;
export const selectLoginError = state => state.users.loginError;
export const selectLoggingOut = state => state.users.loggingOut;
export const selectLogoutSuccess = state => state.users.logoutSuccess;
export const selectLogoutError = state => state.users.logoutError;
export const selectGettingSession = state => state.users.gettingSession;
export const selectSessionSuccess = state => state.users.sessionSuccess;
export const selectSessionError = state => state.users.sessionError;