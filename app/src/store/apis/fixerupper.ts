import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Booking, BookingRequest, Response, Location } from '../../common';

export const fixerupperApi = createApi({
  reducerPath: 'fixerupperApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_API_HOST}api/` }),
  tagTypes: ['Booking', 'Location'],
  endpoints: builder => ({
    getBookings: builder.query<Booking[], void>({
      query: () => 'bookings',
      providesTags: ['Booking']
    }),
    addBooking: builder.mutation<Response, BookingRequest>({
      query: (body) => ({
        method: 'POST',
        url: 'bookings',
        body
      }),
      invalidatesTags: ['Booking']
    }),
    deleteBooking: builder.mutation<Response, string>({
      query: (id) => ({
        method: 'DELETE',
        url: `bookings/${id}`,
      }),
      invalidatesTags: ['Booking']
    }),
    getLocations: builder.query<Location[], void>({
      query: () => 'locations',
      providesTags: ['Location']
    })
  })
})

export const { useGetBookingsQuery, useAddBookingMutation, useDeleteBookingMutation, useGetLocationsQuery } = fixerupperApi
