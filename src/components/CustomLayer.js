import { useEffect, useState, useRef } from "react";
import { Marker, useMap } from "react-leaflet";
import { useLeaflet } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { Icon, FeatureGroup } from "leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { latLngBounds } from "leaflet";

function CustomLayer({ startData, finishData }) {
  const map = useMap();

  useEffect(() => {
    let markerBounds = latLngBounds([]);
    markerBounds.extend([startData.lng, startData.lat]);
    markerBounds.extend([finishData.lng, finishData.lat]);

    if (startData.lat != "" && finishData.lat != "") {
      console.log(markerBounds);
      map.flyToBounds(markerBounds);
    }
  }, []);

  return (
    <>
      <Marker
        position={[startData.lng, startData.lat]}
        icon={
          new Icon({
            iconUrl: markerIconPng,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          })
        }
      />
      <Marker
        position={[finishData.lng, finishData.lat]}
        icon={
          new Icon({
            iconUrl: markerIconPng,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          })
        }
      />
    </>
  );
}

export default CustomLayer;
