import { apiSlice } from './apiSlice';
import { logOut } from '../actions/auth_slice.test';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    checkAuthAsync: builder.query({
      query: () => '/user/isLoggedIn',
      transformResponse: (response) => response?.data,
    }),
    loginRestaurantAsync: builder.mutation({
      query: (data) => ({
        url: '/user/login',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response) => response?.data,
    }),
    registerRestaurantAsync: builder.mutation({
      query: (data) => ({
        url: '/user/register',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response) => response?.data,
    }),
    sendLogout: builder.mutation({
      query: () => ({
        url: '/user/logout',
        method: 'POST',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          dispatch(logOut());
          setTimeout(() => {
            dispatch(apiSlice.util.resetApiState());
          }, 1000);
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const {
  useCheckAuthAsyncQuery,
  useLoginRestaurantAsyncMutation,
  useRegisterRestaurantAsyncMutation,
  useLogoutAsyncMutation,
} = authApiSlice;
