import React, { useEffect, useState } from "react";
import L from "leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "../css/MainPage.css";
import { Link } from "react-router-dom";

// setup
const provider = new OpenStreetMapProvider();
// search
// const results = await provider.search({ query: input.value });

const MainPage = ({
  startPlaceInput,
  setStartPlaceInput,
  finishPlaceInput,
  setFinishPlaceInput,
}) => {
  const handelChangeStart = (e) => {
    const { name, value } = e.target;
    setStartPlaceInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handelChangeFinish = (e) => {
    const { name, value } = e.target;
    setFinishPlaceInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  console.log(startPlaceInput, finishPlaceInput);

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-container-address-data">
        <div className="text-input-container">
          <div className="start-place-input-container">
            <input
              type="text"
              value={startPlaceInput["city"]}
              onChange={handelChangeStart}
              name="city"
            />
            <input
              type="text"
              value={startPlaceInput["street"]}
              onChange={handelChangeStart}
              name="street"
            />
            <input
              type="text"
              value={startPlaceInput["street_number"]}
              onChange={handelChangeStart}
              name="street_number"
            />
            <input
              type="text"
              value={startPlaceInput["country"]}
              onChange={handelChangeStart}
              name="country"
            />
          </div>
          <div className="blank-space"></div>
          <div className="finish-place-input-container">
            <input
              type="text"
              value={finishPlaceInput["city"]}
              onChange={handelChangeFinish}
              name="city"
            />
            <input
              type="text"
              value={finishPlaceInput["street"]}
              onChange={handelChangeFinish}
              name="street"
            />
            <input
              type="text"
              value={finishPlaceInput["street_number"]}
              onChange={handelChangeFinish}
              name="street_number"
            />
            <input
              type="text"
              value={finishPlaceInput["country"]}
              onChange={handelChangeFinish}
              name="country"
            />
          </div>
        </div>
        <Link to="map">
          <input type="submit" value="send" />
        </Link>
      </form>
    </div>
  );
};

export default MainPage;
