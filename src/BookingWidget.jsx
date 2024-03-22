import { useState } from "react";
import {differenceInCalendarDays} from 'date-fns'

export default function BookingWidget({place}) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState("1");
  let numberOfNights = 0;
  if(checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(new Date (checkOut),new Date (checkIn));
  }
  
  return (
    <div className="bg-white shadow shadow-black p-4 rounded-2xl">
      <div className="text-2xl text-center mb-4">
        Price: ${place.price} per night
      </div>
      <div className=" border mt-4 rounded-2xl">
        <div className="flex">
          <div className="flex-1 py-3 px-4">
            <label className="mr-4">Check in:</label>
            <input
              type="date"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
            />
          </div>
          <div className="flex-1 py-3 px-4 border-l">
            <label className="mr-4">Check out:</label>
            <input
              type="date"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
            />
          </div>
        </div>
        <div className="py-3 px-4 border-t">
          <label>Number of guests:</label>
          <input
            type="number"
            value={numberOfGuests}
            onChange={(ev) => setNumberOfGuests(ev.target.value)}
          />
        </div>
      </div>
      <button className="primary mt-4">
        Book this place
        {numberOfNights > 0 && <span> ${numberOfNights * place.price}</span>}
      </button>
    </div>
  );
}
