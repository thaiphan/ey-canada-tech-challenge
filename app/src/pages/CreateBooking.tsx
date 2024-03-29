import { useState } from "react";
import {
  useAddBookingMutation,
  useGetLocationsQuery,
} from "../store/apis/fixerupper";

export default function CreateBooking() {
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [addBooking] = useAddBookingMutation();

  const { data: locations } = useGetLocationsQuery();

  function showError(msg: string) {
    setErrorMsg(msg);
    document.getElementById("error-message")!.style.display = msg
      ? "block"
      : "none";
  }

  function showSuccess(msg: string) {
    setSuccessMsg(msg);
    document.getElementById("success-message")!.style.display = msg
      ? "block"
      : "none";
  }

  return (
    <>
      <div className="row">
        <div className="col h4">Booking Date</div>
        <div className="col">
          <input type="date" id="date" />
        </div>
      </div>
      <div className="row">
        <div className="col h4">Booking Location</div>
        <div className="col">
          <select id="location">
            {locations?.map((loc) => {
              return <option key={loc.id}>{loc.location}</option>;
            })}
          </select>
        </div>
      </div>
      <div className="row">
        <div className="col h4">Booked By</div>
        <div className="col">
          <input type="text" id="booked-by"></input>
        </div>
      </div>
      <div className="row">
        <div className="col"></div>
        <div className="col">
          <div
            className="btn btn-primary"
            onClick={() => {
              showError("");
              showSuccess("");

              const bookingDate = new Date(
                (document.getElementById("date") as HTMLInputElement).value
              );
              const username = (
                document.getElementById("booked-by") as HTMLInputElement
              ).value;
              const location = (
                document.getElementById("location") as HTMLSelectElement
              ).value;

              if (bookingDate < new Date()) {
                showError("Cannot book in the past!");
                return;
              }

              if (!username) {
                showError("No username provided!");
                return;
              }

              addBooking({
                bookingDate,
                username,
                location,
              })
                .unwrap()
                .then((data) => {
                  if (data.error) {
                    showError(data.error);
                  } else {
                    showSuccess(data.message);
                  }
                });
            }}
          >
            Add
          </div>
        </div>
      </div>
      <div className="row">
        <div
          className="col alert alert-danger"
          id="error-message"
          style={{ display: "none" }}
        >
          {errorMsg}
        </div>
      </div>
      <div className="row">
        <div
          className="col alert alert-success"
          id="success-message"
          style={{ display: "none" }}
        >
          {successMsg}
        </div>
      </div>
    </>
  );
}
