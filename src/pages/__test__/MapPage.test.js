import React from "react";
import ReactDOM from "react-dom";
import MapPage from "../MapPage";
import { render, fireEvent } from "@testing-library/react";
import TestRenderer from "react-test-renderer";
import { Router, Route, BrowserRouter, Routes } from "react-router-dom";

it("changes input correctly", () => {
  // const renderer = TestRenderer.create(
  //   <BrowserRouter>
  //     <Routes>
  //       <Route path="/" element={<InputView totalData={[]} />} />
  //     </Routes>
  //   </BrowserRouter>
  // );
  // const { getByTestId } = TestRenderer.create(
  //   <BrowserRouter>
  //     <Routes>
  //       <Route path="map" element={<MapPage totalData={[]} />} />
  //     </Routes>
  //   </BrowserRouter>
  // );
  // const inputKM = getByTestId("input-km");
  // console.log(renderer.root);
  //   expect(getByTestId(""))
  //   ReactDOM.createRoot(<InputView />, div);
});
