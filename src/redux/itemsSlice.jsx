import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from 'src/config/base_url';

const initialState = {
  isDeleteCategoryLoading: false,
  isEditCategoryLoading: false,

  isDeleteFoodItemLoading: false,
  isEditFoodItemLoading: false,
};

export const deleteCategoryById = createAsyncThunk(
  'items/deleteCategoryById',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/order/stats`, { withCredentials: true });
      if (response.status === 200) {
        return response.data;
      }
    } catch (err) {
      const errorMessage = err?.response?.data?.message || 'Unable To get';

      return rejectWithValue(errorMessage);
    }
    return '';
  }
);
export const deleteFoodItemById = createAsyncThunk(
  'items/deleteFoodItemById',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/order/stats`, { withCredentials: true });
      if (response.status === 200) {
        return response.data;
      }
    } catch (err) {
      const errorMessage = err?.response?.data?.message || 'Unable To get';

      return rejectWithValue(errorMessage);
    }
    return '';
  }
);
export const editCategoryById = createAsyncThunk(
  'items/editCategoryById',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/order/stats`, { withCredentials: true });
      if (response.status === 200) {
        return response.data;
      }
    } catch (err) {
      const errorMessage = err?.response?.data?.message || 'Unable To get';

      return rejectWithValue(errorMessage);
    }
    return '';
  }
);
export const editFoodItemById = createAsyncThunk(
  'items/editFoodItemById',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/order/stats`, { withCredentials: true });
      if (response.status === 200) {
        return response.data;
      }
    } catch (err) {
      const errorMessage = err?.response?.data?.message || 'Unable To get';

      return rejectWithValue(errorMessage);
    }
    return '';
  }
);

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(deleteCategoryById.pending, (state, action) => {
        state.isDeleteCategoryLoading = true;
      })
      .addCase(deleteCategoryById.fulfilled, (state, action) => {
        state.isDeleteCategoryLoading = false;
      })
      .addCase(deleteCategoryById.rejected, (state) => {
        state.isDeleteCategoryLoading = false;
      })
      .addCase(deleteFoodItemById.pending, (state, action) => {
        state.isDeleteFoodItemLoading = true;
      })
      .addCase(deleteFoodItemById.fulfilled, (state, action) => {
        state.isDeleteFoodItemLoading = false;
      })
      .addCase(deleteFoodItemById.rejected, (state) => {
        state.isDeleteFoodItemLoading = false;
      })
      .addCase(editCategoryById.pending, (state, action) => {
        state.isEditCategoryLoading = true;
      })
      .addCase(editCategoryById.fulfilled, (state, action) => {
        state.isEditCategoryLoading = false;
      })
      .addCase(editCategoryById.rejected, (state) => {
        state.isEditCategoryLoading = false;
      })
      .addCase(editFoodItemById.pending, (state, action) => {
        state.isEditFoodItemLoading = true;
      })
      .addCase(editFoodItemById.fulfilled, (state, action) => {
        state.isEditFoodItemLoading = false;
      })
      .addCase(editFoodItemById.rejected, (state) => {
        state.isEditFoodItemLoading = false;
      });
  },
});

export default itemsSlice.reducer;
