import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { Marker, Popup } from "react-leaflet";
// import { useMap } from "react-leaflet/hooks";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { Icon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomLayer from "../components/CustomLayer";
import RoutingMachine from "../components/RoutingMachine";
import "../css/MapPage.css";

const provider = new OpenStreetMapProvider();

function MapPage({ totalData }) {
  const [startData, setStartData] = useState({});
  const [finishData, setFinishData] = useState({});
  let navigate = useNavigate();

  useEffect(() => {
    setStartData(JSON.parse(sessionStorage.getItem("startData")));
    setFinishData(JSON.parse(sessionStorage.getItem("finishData")));
    // setStartData(totalData["start"]);
    // setFinishData(totalData["finish"]);
    window.onunload = deleteSession;
  }, []);

  const deleteSession = () => {
    sessionStorage.removeItem("startData");
    sessionStorage.removeItem("finishData");
  };

  const changePage = () => {
    navigate("/", { changed: true });
  };

  console.log(totalData);

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
            <RoutingMachine startData={startData} finishData={finishData} />
          </>
        )}
      </MapContainer>
      <button className="button-default-style" onClick={changePage}>
        Back To Main Page
      </button>
    </div>
  );
}

export default MapPage;
