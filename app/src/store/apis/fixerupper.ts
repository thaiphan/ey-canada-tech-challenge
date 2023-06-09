import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Booking } from '../../common';

export const fixerupperApi = createApi({
  reducerPath: 'fixerupperApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_API_HOST}api/` }),
  tagTypes: ['Booking'],
  endpoints: builder => ({
    getBookings: builder.query<Booking[], void>({
      query: () => 'getBookings',
      providesTags: ['Booking']
    }),
    deleteBooking: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        method: 'GET',
        url: 'deleteBooking',
        params: {
          id
        }
      }),
      invalidatesTags: ['Booking']
    })
  })
})

export const { useGetBookingsQuery, useDeleteBookingMutation } = fixerupperApi
