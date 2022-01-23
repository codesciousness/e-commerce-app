import { createSlice } from '@reduxjs/toolkit';

const searchTermSlice = createSlice({
    name: 'searchTerm',
    initialState: '',
    reducers: {
        setSearchTerm: (state, action) => {
            state = action.payload;
            return state;
        },
        clearSearchTerm: (state) => {
            state = '';
            return state;
        }
    }
});

export const { setSearchTerm, clearSearchTerm } = searchTermSlice.actions;
export default searchTermSlice.reducer;

export const selectSearchTerm = state => state.searchTerm;