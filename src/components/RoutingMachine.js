import React from "react";
import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

const createRoutineMachineLayer = ({ startData, finishData, setRouteData }) => {
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

  instance.on("routesfound", function (e) {
    var routes = e.routes;
    var summary = routes[0].summary;
    setRouteData({
      distance: summary.totalDistance,
      time: summary.totalTime,
      route: routes[0].instructions,
    });
    // alert distance and time in km and minutes
    // alert('Total distance is ' + summary.totalDistance / 1000 + ' km and total time is ' + Math.round(summary.totalTime % 3600 / 60) + ' minutes');
  });
  // alert distance and time in km and minutes
  console.log(instance);
  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
