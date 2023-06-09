import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <div className="row">
        <div className="col h1">
          <Link to="/">
            <img
              src="img/university-background.jpg"
              alt=""
              width={200}
              height={50}
            />
          </Link>
          Welcome to Fixer-Upper Bookings
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Link
            to="/list"
            style={{
              color: "blue",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            List Bookings
          </Link>
        </div>
        <div className="col">
          <Link
            to="/add"
            style={{
              color: "blue",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            Create Booking
          </Link>
        </div>
      </div>
    </>
  );
}
