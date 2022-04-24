// import { useMap } from "react-leaflet/hooks";

import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { Icon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CustomLayer from "../components/CustomLayer";
import RoutingMachine from "../components/RoutingMachine";
import "../css/MapPage.css";
import PdfDocument from "../components/PdfDocument";

const provider = new OpenStreetMapProvider();

function MapPage({ totalData }) {
  const [startData, setStartData] = useState({});
  const [finishData, setFinishData] = useState({});
  const [inputKm, setInputKm] = useState("");
  const [routeData, setRouteData] = useState({
    distance: 0,
    time: 0,
    instructions: [],
  });
  const inputKmRef = useRef();
  const [inputKmData, setInputKmData] = useState("");
  const [isOkayInput, setIsOkayInput] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    setStartData(JSON.parse(sessionStorage.getItem("start")));
    setFinishData(JSON.parse(sessionStorage.getItem("finish")));
    // setStartData(totalData["start"]);
    // setFinishData(totalData["finish"]);
    window.onunload = deleteSession;
  }, []);

  const deleteSession = () => {
    sessionStorage.removeItem("start");
    sessionStorage.removeItem("finish");
  };

  const changePage = () => {
    navigate("/mapsProject", { changed: true });
  };

  const checkCorrectnessInput = (e) => {
    // if (inputKmRef.current.classList.contains("wrong-data"))
    if (isNaN(inputKm)) {
      inputKmRef.current.classList.add("wrong-data");
      // setInputKmData(inputKm)
      setInputKmData("");
      setIsOkayInput(false);
      return;
    }

    if (inputKmRef.current.classList.contains("wrong-data")) {
      inputKmRef.current.classList.remove("wrong-data");
    }
    setIsOkayInput(true);
    setInputKmData(inputKm);
  };

  return (
    <div className="map-container">
      <MapContainer center={[51.505, -0.09]} zoom={3} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {startData["lng"] !== "" && finishData["lng"] !== "" && (
          <>
            <CustomLayer startData={startData} finishData={finishData} />
            <RoutingMachine
              startData={startData}
              finishData={finishData}
              setRouteData={setRouteData}
            />
          </>
        )}
      </MapContainer>
      <div className="main-container-map-page">
        <div className="input-data-container">
          <div className="input-container">
            <input
              type="text"
              value={inputKm}
              onChange={(e) => setInputKm(e.target.value)}
              className="input-km"
              placeholder="pln/km"
              ref={inputKmRef}
              data-testid="input-km"
            />
            <button
              className="button-default-style input-km-submit"
              onClick={checkCorrectnessInput}
            >
              Submit
            </button>
          </div>
          <div className="results-container">
            <div className="results-headers">
              <h3 className="header">Distance:</h3>
              <h3 className="header">Time:</h3>
              <h3 className="header">Cost:</h3>
              <h3 className="header">How many days:</h3>
            </div>
            <div className="results-data">
              {isOkayInput && (
                <>
                  <h3 className="header">
                    {Math.round((routeData.distance / 1000) * 100) / 100} km
                  </h3>
                  <h3 className="header">
                    {Math.floor(routeData.time / 3600)} h{" "}
                    {Math.round((routeData.time % 3600) / 60)} min
                  </h3>
                  <h3 className="header">
                    {Math.round(
                      (routeData.distance / 1000) *
                        parseFloat(inputKmData) *
                        100
                    ) / 100}{" "}
                    pln
                  </h3>
                  <h3 className="header">
                    {Math.ceil(routeData.distance / 1000 / 800)} days
                  </h3>
                </>
              )}
            </div>
          </div>
          {isOkayInput && (
            <PdfDocument
              routeData={routeData}
              totalData={totalData[0]}
              inputKmData={inputKmData}
            />
          )}
        </div>
        <button className="button-default-style" onClick={changePage}>
          Back To Main Page
        </button>
      </div>
    </div>
  );
}

export default MapPage;
