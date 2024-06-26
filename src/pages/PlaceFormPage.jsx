import { Navigate, useParams } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import Perks from "../components/Perks";
import PhotosUploader from "../components/PhotosUploader";
import { useEffect, useState } from "react";
import axios from "axios";
export default function PlaceFormPage() {
  const {id} = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [kind, setKind] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState("1");
  const [price,setPrice] = useState(100);
  const [redirect, setRedirect] = useState(false);
  useEffect(()=>{
    if(!id){
      return;
    }
    axios.get('/places/'+id).then(response =>{
      const {data} = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setKind(data.kind);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    })
  },[id])
  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }
  function inputDescription(text) {
    return <p className=" text-gray-500 text-sm">{text}</p>;
  }
  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }
  async function savePlace(ev) {
    ev.preventDefault();
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      kind,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests, price
    };
    if(id){
      //update
      await axios.put("/places", {
        id,
        ...placeData
      });
      setRedirect(true);
    }else{
      //new place
      await axios.post("/places", placeData);
      setRedirect(true);
    }
  }
  if(redirect){
    return <Navigate to={"/account/places"} />;
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={savePlace}>
        {preInput("Title", "Title for your place")}
        <input
          type="text"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          placeholder="title, for example"
        />
        {preInput("Address", "Address for your place")}
        <input
          type="text"
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
          placeholder="adress"
        />
        {preInput("Photos", "more = better")}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        {preInput("Description", "depcription of the place")}
        <textarea
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />
        {preInput("Kind", "Select the kind of your place")}
        <select
          className="border rounded-2xl"
          value={kind}
          onChange={(ev) => setKind(ev.target.value)}
        >
          <option value="Hotel">Hotel</option>
          <option value="Villa">Villa</option>
          <option value="Farm">Farm</option>
          <option value="Restaurant">Restaurant</option>
        </select>

        {preInput("Perk", "select all the perk of your place")}
        <div className="mt-2 grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <Perks selected={perks} onChange={setPerks} />
        </div>
        {preInput("Extra info", "house,rule,etc")}
        <textarea
          value={extraInfo}
          onChange={(ev) => setExtraInfo(ev.target.value)}
        />
        {preInput("Check in&out time", "Check in and check out ")}
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mt-2 -mb-1">Check in time</h3>
            <input
              type="text"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check out time</h3>
            <input
              type="text"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Max number of guests</h3>
            <input
              type="number"
              value={maxGuests}
              onChange={(ev) => setMaxGuests(ev.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Price per night</h3>
            <input
              type="number"
              value={price}
              onChange={(ev) => setPrice(ev.target.value)}
            />
          </div>
        </div>
        <button className="primary my-4">Save</button>
      </form>
    </div>
  );
}
