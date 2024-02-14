import { createReducer, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    categories: [],
    loading: false,
    error: null,
};

export const fetchCategoriesList = createAsyncThunk('categories/fetchCategories', async () => {
    const response = await axios.get('https://localhost:7187/api/Categories');
    return response.data;
});

const categoriesReducer = createReducer(initialState, (builder) => {
    builder.addCase(fetchCategoriesList.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(fetchCategoriesList.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
    })
    .addCase(fetchCategoriesList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
    });
});

export default categoriesReducer;
