// import { useMap } from "react-leaflet/hooks";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import { Routes, Route, Link } from "react-router-dom";
import MainPage from "./pages/MainPage";
import MapPage from "./pages/MapPage";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [totalData, setTotalData] = useState([]);

  useEffect(() => {
    console.log(totalData);
  }, [totalData]);

  console.log(process.env.PUBLIC_URL);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <MainPage setTotalData={setTotalData} totalData={totalData} />
          }
        />
        <Route path="/map" element={<MapPage totalData={totalData} />} />
      </Routes>
    </div>
  );
}

export default App;
