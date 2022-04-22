import React from "react";
import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

const createRoutineMachineLayer = ({ startData, finishData }) => {
  console.log(startData, finishData);
  const instance = L.Routing.control({
    waypoints: [
      L.latLng(startData.lng, startData.lat),
      L.latLng(finishData.lng, finishData.lat),
    ],
    lineOptions: {
      styles: [{ color: "#6FA1EC", weight: 4 }],
    },
    createMarker: function () {
      return null;
    },
    show: false,
    addWaypoints: false,
    routeWhileDragging: false,
    draggableWaypoints: false,
    fitSelectedRoutes: false,
    showAlternatives: false,
  });
  console.log(instance);
  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
