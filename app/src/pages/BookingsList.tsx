import moment from "moment";
import {
  useDeleteBookingMutation,
  useGetBookingsQuery,
} from "../store/apis/fixerupper";

export default function BookingsList() {
  const { data: bookings } = useGetBookingsQuery();

  const [deleteBooking] = useDeleteBookingMutation();

  return (
    <>
      <div className="row">
        <div className="col h4">Booking Date</div>
        <div className="col h4">Booking Location</div>
        <div className="col h4">Booked By</div>
        <div className="col"></div>
      </div>
      {bookings?.map((booking) => {
        return (
          <div
            key={booking.id}
            className="row"
            style={{ border: "1px solid black" }}
          >
            <div className="col">
              {moment(booking.bookingDate).toDate().toDateString()}
            </div>
            <div className="col">{booking.location}</div>
            <div className="col">{booking.username}</div>
            <div
              className="col btn btn-success"
              onClick={() => {
                deleteBooking(booking.id);
              }}
            >
              Delete
            </div>
          </div>
        );
      })}
    </>
  );
}
