
// Refactor to be discriminated union type
export type Response = {
  error: string;
  message: string
}

export interface BookingRequest {
  username: string
  bookingDate: Date
  location: string
}

export interface Booking {
  id: string
  username: string
  bookingDate: string
  createdDate: string
  location: string
}
