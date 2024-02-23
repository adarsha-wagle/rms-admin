import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from 'axios';

import { BASE_URL } from '../config/base_url';

const initialState = {
  isCategoryListLoading: false,
  categoryListError: null,
  categoryList: [
    {
      _id: '65cc51268084e1c0152f8b31',
      name: 'Biryani King',
      description: 'Nepali authentic Drinks',
      imageLink: [],
    },
    {
      _id: '65cc537b1a25bc8006953b4f',
      name: 'Drinks',
      description: 'Nepali authentic Drinks',
      imageLink: [],
    },
    {
      _id: '65cc5776fdde8d4c15ec5987',
      name: 'Drinks',
      description: 'Nepali authentic Drinks',
      imageLink: [],
    },
    {
      _id: '65cc57c6b09faa99459284ae',
      name: 'Drinks',
      description: 'Nepali authentic Drinks',
      imageLink: [],
    },
    {
      _id: '65cc586764d5629908597a5f',
      name: 'Drinks',
      description: 'Nepali authentic Drinks',
      imageLink: [],
    },
    {
      _id: '65cc597ba348b87c7caaf0db',
      name: 'Drinks',
      description: 'Nepali authentic Drinks',
      imageLink: [],
    },
    {
      _id: '65cc618fdd920b6c80cdc486',
      name: 'Drinks',
      description: 'Nepali authentic Drinks',
      imageLink: [],
    },
    {
      _id: '65cc6a29fb53d33a8acfc79c',
      name: 'Drinks',
      description: 'Nepali authentic Drinks',
      imageLink: [],
    },
    {
      _id: '65cc6a5004a3f70e647c559e',
      name: 'Drinks',
      description: 'Nepali authentic Drinks',
      imageLink: [],
    },
    {
      _id: '65ccc3048c36961c0b46b524',
      name: 'Bhat',
      description: 'Nepali authentic Bhat',
      imageLink: [],
    },
    {
      _id: '65d321099e3938cdc8145265',
      name: 'Coffee',
      description: 'Handmade coffe from himalayan Region',
      imageLink: [],
    },
    {
      _id: '65d327d890b7c1b2096686c5',
      name: 'Beer',
      description: 'Handmade coffe from himalayan Region',
      imageLink: [],
    },
    {
      _id: '65d33978d1acaa314ddca83c',
      name: 'Wine',
      description: 'Handmade coffe from himalayan Region',
      imageLink: [],
    },
    {
      _id: '65d5b17d206a096deb919992',
      name: 'Coffee',
      description: 'Handmade coffee from himalayan Region',
      imageLink: [],
    },
    {
      _id: '65d5b344cadae1e154715584',
      name: 'Coffee',
      description: 'Handmade coffee from himalayan Region',
      imageLink: [],
    },
    {
      _id: '65d5b346cadae1e154715586',
      name: 'Coffee',
      description: 'Handmade coffee from himalayan Region',
      imageLink: [],
    },
    {
      _id: '65d5b347cadae1e154715588',
      name: 'Coffee',
      description: 'Handmade coffee from himalayan Region',
      imageLink: [],
    },
    {
      _id: '65d5b359cadae1e15471558a',
      name: 'Chiyus',
      description: 'Handmade coffee from himalayan Region',
      imageLink: [],
    },
  ],

  // states when adding new category
  isCategoryLoading: false,
  categoryError: null,

  isFoodItemLoading: false,
  foodItemError: null,
  foodItemList: [],
};

export const fetchCategoryListAsync = createAsyncThunk(
  'menu/fetchCategoryListAsync',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/private/menu/category`, {
        withCredentials: true,
      });
      console.log('category list response ', response);
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
export const fetchFoodItemListAsync = createAsyncThunk(
  'menu/fetchFoodItemListAsync',
  async ({ categoryId }, { rejectWithValue }) => {
    try {
      console.log('categoryid for food item', categoryId);
      const response = await axios.get(`${BASE_URL}/private/menu/item/${categoryId}`, {
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

export const addNewCategoryAsync = createAsyncThunk(
  'menu/addNewCategoryAsync',
  async (data, { rejectWithValue }) => {
    try {
      console.log(data);
      const response = await axios.post(`${BASE_URL}/private/menu/category`, data, {
        withCredentials: true,
      });
      if (response.status === 200) {
        toast.success('🍜 Category Added Successfully!', {
          position: 'top-right',
          autoClose: 1200,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        return response.data;
      }
    } catch (err) {
      const errorMessage = err?.response?.data?.error || 'Failed to add category';
      toast.error(`🍜 ${errorMessage}`, {
        position: 'top-right',
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      return rejectWithValue(errorMessage);
    }
    return undefined;
  }
);
export const editCategoryAsync = createAsyncThunk(
  'menu/editCategoryAsync',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${BASE_URL}/private/menu/category`, data, {
        withCredentials: true,
      });
      if (response.status === 200) {
        toast.success('🍜 Category Edited Successfully!', {
          position: 'top-right',
          autoClose: 1200,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        return response.data;
      }
    } catch (err) {
      const errorMessage = err?.response?.data?.error || 'Failed to edit category';
      toast.error(`🍜 ${errorMessage}`, {
        position: 'top-right',
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      return rejectWithValue(errorMessage);
    }
    return undefined;
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
        toast.success('🍜 Item Added Successfully!', {
          position: 'top-right',
          autoClose: 1200,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        return response.data;
      }
    } catch (err) {
      const errorMessage = err?.response?.data?.error || 'Failed to add item';
      toast.error(`🍜 ${errorMessage}`, {
        position: 'top-right',
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      return rejectWithValue(errorMessage);
    }
    return undefined;
  }
);

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryListAsync.pending, (state) => {
        state.isCategoryListLoading = true;
      })
      .addCase(fetchCategoryListAsync.fulfilled, (state, action) => {
        state.isCategoryListLoading = false;
        state.categoryList = action.payload?.data;
      })
      .addCase(fetchCategoryListAsync.rejected, (state, action) => {
        state.isCategoryListLoading = false;
        state.categoryListError = action.payload;
      })
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
      .addCase(addNewCategoryAsync.pending, (state) => {
        state.isCategoryLoading = true;
      })
      .addCase(addNewCategoryAsync.fulfilled, (state, action) => {
        state.isCategoryLoading = false;
        const newCategory = {
          id: action.payload?.data?._id,
          name: action.payload?.data?.name,
        };
        state.categoryList = [...state.categoryList, newCategory];
      })
      .addCase(addNewCategoryAsync.rejected, (state, action) => {
        state.isCategoryLoading = false;
        state.categoryError = action.payload;
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
      .addCase(editCategoryAsync.pending, (state) => {
        state.isCategoryLoading = true;
      })
      .addCase(editCategoryAsync.fulfilled, (state, action) => {
        state.isCategoryLoading = false;
        const newCategory = {
          id: action.payload?.data?._id,
          name: action.payload?.data?.name,
        };
        const indexToUpdate = state.categoryList.findIndex(
          (category) => category.id === newCategory.id
        );

        if (indexToUpdate !== -1) {
          state.categoryList[indexToUpdate] = newCategory;
        } else {
          state.categoryList = [...state.categoryList, newCategory];
        }
      })
      .addCase(editCategoryAsync.rejected, (state, action) => {
        state.isCategoryLoading = false;
        state.categoryError = action.payload;
      });
  },
});

export default menuSlice.reducer;
