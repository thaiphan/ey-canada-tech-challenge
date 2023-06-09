import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Booking } from '../../common';

export const fixerupperApi = createApi({
  reducerPath: 'fixerupperApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/api/' }),
  endpoints: builder => ({
    getBookings: builder.query<Booking[], void>({
      query: () => 'getBookings'
    })
  })
})

export const { useGetBookingsQuery } = fixerupperApi
