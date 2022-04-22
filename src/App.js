// import { useMap } from "react-leaflet/hooks";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import { Routes, Route, Link } from "react-router-dom";
import MainPage from "./pages/MainPage";
import MapPage from "./pages/MapPage";
import { useState } from "react";

function App() {
  const [startPlaceInput, setStartPlaceInput] = useState({
    city: "",
    street: "",
    street_number: "",
    country: "",
  });
  const [finishPlaceInput, setFinishPlaceInput] = useState({
    city: "",
    street: "",
    street_number: "",
    country: "",
  });

  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainPage
            startPlaceInput={startPlaceInput}
            setStartPlaceInput={setStartPlaceInput}
            finishPlaceInput={finishPlaceInput}
            setFinishPlaceInput={setFinishPlaceInput}
          />
        }
      />
      <Route
        path="map"
        element={
          <MapPage
            startPlaceInput={startPlaceInput}
            finishPlaceInput={finishPlaceInput}
          />
        }
      />
    </Routes>
  );
}

export default App;
