import React, { useEffect, useState } from "react";
import L from "leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "../css/MainPage.css";
import { Link } from "react-router-dom";
import InputView from "../components/InputView";
import world from "../images/world.png";
import car from "../images/car.png";

// setup
const provider = new OpenStreetMapProvider();
// search
// const results = await provider.search({ query: input.value });

const MainPage = ({ setTotalData, totalData }) => {
  return (
    <div className="main-page-container">
      <InputView setTotalData={setTotalData} totalData={totalData} />
      <div className="main-page-images">
        {/* <div className="car-world-image"></div> */}
        <img src={car} className="car-image" />
        <img src={world} className="world-image" />
      </div>
    </div>
  );
};

export default MainPage;
