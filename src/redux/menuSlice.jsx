import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { throwToastSuccess, throwToastError } from 'src/utils/throw_toast';
import { BASE_URL } from '../config/base_url';

const initialState = {
  isCategoryListLoading: false,
  categoryListError: null,
  categoryList: [],

  // states when adding new category
  isAddCategoryLoading: false,

  isFoodItemLoading: false,
  foodItemError: null,
  foodItemList: [],

  isDeleteCategoryLoading: false,
  isEditCategoryLoading: false,

  isDeleteFoodItemLoading: false,
  isEditFoodItemLoading: false,
  isEditFoodItemImageLoading: false,
};

// -------------- START CATEGORY CRUD -----------------------
export const fetchCategoryListAsync = createAsyncThunk(
  'menu/fetchCategoryListAsync',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/private/menu/category`, {
        withCredentials: true,
      });
      console.log('category list response ', response);
      if (response.status === 200) {
        return response.data.data;
      }
    } catch (err) {
      const errorMessage = err?.response?.data?.error || 'Could not fetch';
      return rejectWithValue(errorMessage);
    }
    return '';
  }
);
export const addNewCategoryAsync = createAsyncThunk(
  'menu/addNewCategoryAsync',
  async (data, { rejectWithValue }) => {
    try {
      console.log(data);
      const response = await axios.post(`${BASE_URL}/private/menu/category`, data, {
        withCredentials: true,
      });
      if (response.status === 200) {
        throwToastSuccess('🍜 Category Added Successfully!');

        return response.data;
      }
    } catch (err) {
      const errorMessage = err?.response?.data?.error || 'Failed to add category';
      throwToastError(errorMessage);
      return rejectWithValue(errorMessage);
    }
    return undefined;
  }
);
export const editCategoryById = createAsyncThunk(
  'items/editCategoryById',
  async ({ categoryId, name }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/private/menu/category/${categoryId}`,
        { name },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        throwToastSuccess('Category Edited');
        console.log('response', response);
        return response.data?.data;
      }
    } catch (err) {
      const errorMessage = err?.response?.data?.message || 'Unable To get';
      throwToastError(errorMessage);
      return rejectWithValue(errorMessage);
    }
    return '';
  }
);
export const deleteCategoryById = createAsyncThunk(
  'items/deleteCategoryById',
  async ({ categoryId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/private/menu/category/${categoryId}`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        throwToastSuccess('Category Deleted');
        return categoryId;
      }
    } catch (err) {
      const errorMessage = err?.response?.data?.message || 'Unable to delete';
      throwToastError(errorMessage);
      return rejectWithValue(errorMessage);
    }
    return '';
  }
);

// ---------------- END CATEGORY CRUD -------------------

// ---------------- START FOOD ITEM CRUD -----------------------

export const fetchFoodItemListAsync = createAsyncThunk(
  'menu/fetchFoodItemListAsync',
  async ({ categoryId }, { rejectWithValue }) => {
    try {
      console.log('categoryid for food item', categoryId);
      const response = await axios.get(`${BASE_URL}/private/menu/${categoryId}/items`, {
        withCredentials: true,
      });
      console.log(response);
      if (response.status === 200) {
        return response.data;
      }
    } catch (err) {
      const errorMessage = err?.response?.data?.error || 'Something went wrong';
      return rejectWithValue(errorMessage);
    }
    return '';
  }
);

export const addNewFoodItem = createAsyncThunk(
  'menu/addNewFoodItem',
  async (formData, { rejectWithValue }) => {
    console.log([...formData.entries()]);

    try {
      const response = await axios.post(`${BASE_URL}/private/menu/item`, formData, {
        withCredentials: true,
      });
      console.log('new item response', response);
      if (response.status === 200) {
        throwToastSuccess('🍜 Item Added Successfully!');

        return response.data;
      }
    } catch (err) {
      const errorMessage = err?.response?.data?.error || 'Failed to add item';
      throwToastError(errorMessage);
      return rejectWithValue(errorMessage);
    }
    return undefined;
  }
);

export const deleteFoodItemById = createAsyncThunk(
  'items/deleteFoodItemById',
  async ({ foodItemId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/private/menu/item/${foodItemId}`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        throwToastSuccess('Item Deleted');
        return foodItemId;
      }
    } catch (err) {
      const errorMessage = err?.response?.data?.message || 'Unable to delete';
      throwToastError(errorMessage);
      return rejectWithValue(errorMessage);
    }
    return '';
  }
);

export const editFoodItemById = createAsyncThunk(
  'items/editFoodItemById',
  async ({ foodItemId, changedData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/private/menu/item/${foodItemId}`,
        { ...changedData },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        throwToastSuccess('Item Edited');
        return response.data?.data;
      }
    } catch (err) {
      const errorMessage = err?.response?.data?.message || 'Unable to edit';
      throwToastError(errorMessage);
      return rejectWithValue(errorMessage);
    }
    return '';
  }
);
export const editFoodItemImageById = createAsyncThunk(
  'items/editFoodItemImageById',
  async ({ formData, foodItemId }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/private/menu/item/${foodItemId}/image`,
        formData,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        throwToastSuccess('Image Updated');
        return response.data?.data;
      }
    } catch (err) {
      const errorMessage = err?.response?.data?.message || 'Unable to edit';
      throwToastError(errorMessage);
      return rejectWithValue(errorMessage);
    }
    return '';
  }
);

// ----------------------- END FOOD ITEM CRUD -----------------------

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  extraReducers: (builder) => {
    builder
      // -------------- START CATEGORY CRUD -----------------------

      .addCase(fetchCategoryListAsync.pending, (state) => {
        state.isCategoryListLoading = true;
      })
      .addCase(fetchCategoryListAsync.fulfilled, (state, action) => {
        state.isCategoryListLoading = false;
        state.categoryList = action.payload;
      })
      .addCase(fetchCategoryListAsync.rejected, (state, action) => {
        state.isCategoryListLoading = false;
        state.categoryListError = action.payload;
      })
      .addCase(addNewCategoryAsync.pending, (state) => {
        state.isAddCategoryLoading = true;
      })
      .addCase(addNewCategoryAsync.fulfilled, (state, action) => {
        state.isAddCategoryLoading = false;
        const newCategory = {
          id: action.payload?.data?._id,
          name: action.payload?.data?.name,
        };
        state.categoryList = [...state.categoryList, newCategory];
      })
      .addCase(addNewCategoryAsync.rejected, (state, action) => {
        state.isAddCategoryLoading = false;
      })
      .addCase(deleteCategoryById.pending, (state, action) => {
        state.isDeleteCategoryLoading = true;
      })
      .addCase(deleteCategoryById.fulfilled, (state, action) => {
        const categoryId = action.payload;
        state.categoryList = state.categoryList.filter((category) => category._id !== categoryId);
        state.isDeleteCategoryLoading = false;
      })
      .addCase(deleteCategoryById.rejected, (state) => {
        state.isDeleteCategoryLoading = false;
      })
      .addCase(editCategoryById.pending, (state, action) => {
        state.isEditCategoryLoading = true;
      })
      .addCase(editCategoryById.fulfilled, (state, action) => {
        state.isEditCategoryLoading = false;
        const { _id: id, name } = action.payload;
        state.categoryList = state.categoryList.map((category) =>
          category._id === id ? { ...category, name } : category
        );
      })
      .addCase(editCategoryById.rejected, (state) => {
        state.isEditCategoryLoading = false;
      })

      // ---------------- END CATEGORY CRUD -------------------

      // ---------------- START FOOD ITEM CRUD -----------------------

      .addCase(fetchFoodItemListAsync.pending, (state) => {
        state.isFoodItemLoading = true;
      })
      .addCase(fetchFoodItemListAsync.fulfilled, (state, action) => {
        state.isFoodItemLoading = false;
        state.foodItemList = action.payload?.data;
      })
      .addCase(fetchFoodItemListAsync.rejected, (state, action) => {
        state.isFoodItemLoading = false;
        state.foodItemError = action.payload?.data;
      })

      .addCase(addNewFoodItem.pending, (state) => {
        state.isFoodItemLoading = true;
      })
      .addCase(addNewFoodItem.fulfilled, (state, action) => {
        state.isFoodItemLoading = false;
      })
      .addCase(addNewFoodItem.rejected, (state, action) => {
        state.isFoodItemLoading = false;
        state.foodItemError = action.payload;
      })
      .addCase(editFoodItemById.pending, (state, action) => {
        state.isEditFoodItemLoading = true;
      })
      .addCase(editFoodItemById.fulfilled, (state, action) => {
        state.isEditFoodItemLoading = false;
        const { _id, ...restData } = action.payload;

        state.foodItemList = state.foodItemList.map((foodItem) =>
          foodItem._id === _id ? { _id, ...restData } : foodItem
        );
      })
      .addCase(editFoodItemById.rejected, (state) => {
        state.isEditFoodItemLoading = false;
      })
      .addCase(deleteFoodItemById.pending, (state) => {
        state.isDeleteFoodItemLoading = true;
      })
      .addCase(deleteFoodItemById.fulfilled, (state, action) => {
        const foodItemId = action.payload;
        state.foodItemList = state.foodItemList.filter((foodItem) => foodItem?._id !== foodItemId);
        state.isDeleteFoodItemLoading = false;
      })
      .addCase(deleteFoodItemById.rejected, (state) => {
        state.isDeleteFoodItemLoading = false;
      })
      .addCase(editFoodItemImageById.pending, (state) => {
        state.isEditFoodItemImageLoading = true;
      })
      .addCase(editFoodItemImageById.fulfilled, (state, action) => {
        const { _id, imageLink } = action.payload;
        state.foodItemList = state.foodItemList.map((foodItem) =>
          foodItem._id === _id ? { ...foodItem, imageLink } : foodItem
        );
        state.isEditFoodItemImageLoading = false;
      })
      .addCase(editFoodItemImageById.rejected, (state) => {
        state.isEditFoodItemImageLoading = false;
      });

    // ----------------------- END FOOD ITEM CRUD -----------------------
  },
});

export default menuSlice.reducer;
