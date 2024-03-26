import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AddressLink from "../components/AddressLink";
import PlaceGallery from "../components/PlaceGallery";
import BookingDate from "../components/BookingDate";

export default function BookingPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  useEffect(() => {
    if (id) {
      axios.get("/bookings").then((response) => {
        const foundBooking = response.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);
  if (!booking) {
    return "";
  }
  return (
    <div className="my-8">
      <h1 className="text-3xl -mx-8 px-8 py-4">{booking.place.title}</h1>
      <AddressLink className="flex my-2 ">{booking.place.address}</AddressLink>
      <div className="bg-gray-200 p-6 my-6 rounded-2xl flex justify-between items-center">
        <div>
          <h2 className="text-2xl mb-4">Your booking information:</h2>
          <BookingDate booking={booking} />
        </div>
        <div className="bg-primary text-white rounded-2xl p-6">
          <div>Total price:</div>
          <div className="text-3xl">${booking.price}</div>
        </div>
      </div>
      <PlaceGallery place={booking.place} />
    </div>
  );
}
