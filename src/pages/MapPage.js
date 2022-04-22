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
import { useSearchParams } from "react-router-dom";
import CustomLayer from "../components/CustomLayer";
import RoutingMachine from "../components/RoutingMachine";

const provider = new OpenStreetMapProvider();

function App({ startPlaceInput, finishPlaceInput }) {
  const [startData, setStartData] = useState({ lat: "", lng: "" });
  const [finishData, setFinishData] = useState({ lat: "", lng: "" });

  useEffect(() => {
    getData(startPlaceInput, setStartData);
    getData(finishPlaceInput, setFinishData);
  }, []);

  const getData = async (data, setData) => {
    let stringData = "";
    for (const [key, value] of Object.entries(data)) {
      stringData = stringData + value + ", ";
    }
    stringData = stringData.slice(0, -2);
    console.log(stringData);

    const results = await provider.search({
      query: stringData,
    });
    let resultsData = { lat: results[0].x, lng: results[0].y };
    setData(resultsData);
    console.log(resultsData);
  };

  console.log(startData, finishData);

  return (
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
  );
}

export default App;
