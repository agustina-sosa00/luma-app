import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const appServices = createApi({
  reducerPath: 'appServices',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://lumaapp-26-default-rtdb.firebaseio.com/',
  }),
  endpoints: (builder) => ({
    getCategories: builder.query<any, void>({
      query: () => 'categories.json',
    }),
    getPlaces: builder.query<any, void>({
      query: () => 'places.json',
    }),
  }),
});

export const { useGetCategoriesQuery, useGetPlacesQuery } = appServices;
