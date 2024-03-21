export default function BookingWidget(place){
    return (
      <div className="bg-white shadow shadow-black p-4 rounded-2xl">
        <div className="text-2xl text-center mb-4">
          Price: ${place.price} per night
        </div>
        <div className=" border mt-4 rounded-2xl">
          <div className="flex">
            <div className="flex-1 py-3 px-4">
              <label className="mr-4">Check in:</label>
              <input type="date" />
            </div>
            <div className="flex-1 py-3 px-4 border-l">
              <label className="mr-4">Check out:</label>
              <input type="date" />
            </div>
          </div>
          <div className="py-3 px-4 border-t">
            <label>Number of guests:</label>
            <input type="number" value={1} />
          </div>
        </div>
        <button className="primary mt-4">Book this place</button>
      </div>
    );
}