import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Booking, BookingRequest } from '../../common';

export const fixerupperApi = createApi({
  reducerPath: 'fixerupperApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_API_HOST}api/` }),
  tagTypes: ['Booking'],
  endpoints: builder => ({
    getBookings: builder.query<Booking[], void>({
      query: () => 'getBookings',
      providesTags: ['Booking']
    }),
    addBooking: builder.mutation<{ message: string }, BookingRequest>({
      query: (body) => ({
        method: 'POST',
        url: 'addBooking',
        body
      }),
      invalidatesTags: ['Booking']
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

export const { useGetBookingsQuery, useAddBookingMutation, useDeleteBookingMutation } = fixerupperApi
