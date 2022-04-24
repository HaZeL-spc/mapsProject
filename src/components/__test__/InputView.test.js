import React from "react";
import ReactDOM from "react-dom";
import InputView from "../InputView";
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
  const { getByTestId } = render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InputView totalData={[]} />} />
      </Routes>
    </BrowserRouter>
  );

  const cityStart = getByTestId("city-start");
  const streetStart = getByTestId("street-start");
  const streetNumberStart = getByTestId("street_number-start");
  const countryStart = getByTestId("country-start");

  const cityFinish = getByTestId("city-finish");
  const streetFinish = getByTestId("street-finish");
  const streetNumberFinish = getByTestId("street_number-finish");
  const countryFinish = getByTestId("country-finish");

  fireEvent.change(cityStart, { target: { value: "test" } });
  expect(cityStart.value).toBe("test");
  fireEvent.change(streetStart, { target: { value: "test" } });
  expect(streetStart.value).toBe("test");
  fireEvent.change(streetNumberStart, { target: { value: "test" } });
  expect(streetNumberStart.value).toBe("test");
  fireEvent.change(countryStart, { target: { value: "test" } });
  expect(countryStart.value).toBe("test");
  fireEvent.change(cityFinish, { target: { value: "test" } });
  expect(cityFinish.value).toBe("test");
  fireEvent.change(streetFinish, { target: { value: "test" } });
  expect(streetFinish.value).toBe("test");
  fireEvent.change(streetNumberFinish, { target: { value: "test" } });
  expect(streetNumberFinish.value).toBe("test");
  fireEvent.change(countryFinish, { target: { value: "test" } });
  expect(countryFinish.value).toBe("test");
  // console.log(renderer.root);
  //   expect(getByTestId(""))
  //   ReactDOM.createRoot(<InputView />, div);
});
