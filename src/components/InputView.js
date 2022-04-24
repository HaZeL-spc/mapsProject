import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "../css/MainPage.css";
import { Link } from "react-router-dom";

// setup
const provider = new OpenStreetMapProvider();
// search
// const results = await provider.search({ query: input.value });

const InputView = ({ setTotalData, totalData }) => {
  const [selectChosen, setSelectChosen] = useState(0);
  let navigate = useNavigate();
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
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // on load show default option "show history"
    setSelectChosen(-1);
  }, []);

  const handelChangeStart = (e) => {
    const { name, value } = e.target;
    if (value !== "" && e.target.classList.contains("wrong-data")) {
      e.target.classList.remove("wrong-data");
    }

    setStartPlaceInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handelChangeFinish = (e) => {
    const { name, value } = e.target;
    if (value !== "" && e.target.classList.contains("wrong-data")) {
      e.target.classList.remove("wrong-data");
    }

    setFinishPlaceInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getData = async (data, textData) => {
    let stringData = `${data.city}, ${data.street} ${data.street_number}, ${data.country}`;
    // for (const [key, value] of Object.entries(data)) {
    //   stringData = stringData + value + ", ";
    // }
    // stringData = stringData.slice(0, -2);
    console.log(stringData);

    const results = await provider.search({
      query: stringData,
    });
    console.log(results);

    // checks if data downloaded is correct
    if (results.length === 0) {
      setErrorMessage("couldn't find " + textData + " location");
      return;
    }

    let resultsData = { lat: results[0].x, lng: results[0].y };

    sessionStorage.setItem(textData, JSON.stringify(resultsData));
    return resultsData;
  };

  const handleSubmit = async (e) => {
    let isGood = true;
    e.preventDefault();

    // style inputs who have wrong data
    for (let key in startPlaceInput) {
      console.log(startPlaceInput[key]);
      if (startPlaceInput[key] === "") {
        document.getElementById(`start-${key}`).classList.add("wrong-data");
        isGood = false;
      }
    }

    for (let key in finishPlaceInput) {
      if (finishPlaceInput[key] === "") {
        document.getElementById(`finish-${key}`).classList.add("wrong-data");
        isGood = false;
      }
    }

    // if none of the data is empty continue otherwise return
    if (isGood) {
      let results1 = await getData(startPlaceInput, "start");
      let results2 = await getData(finishPlaceInput, "finish");

      //complete data with inputs
      for (let key in startPlaceInput) {
        results1[key] = startPlaceInput[key];
      }
      for (let key in finishPlaceInput) {
        results2[key] = finishPlaceInput[key];
      }

      setTotalData((state) => [
        { start: results1, finish: results2 },
        ...state,
      ]);

      navigate("/map", { replace: true });
    }
  };

  const changeSelect = (e) => {
    setSelectChosen(e.target.value);
    let index = e.target.value;
    if (index >= 0) {
      // autocomplete chosen history element
      setStartPlaceInput({
        city: totalData[index]["start"]["city"],
        street: totalData[index]["start"]["street"],
        street_number: totalData[index]["start"]["street_number"],
        country: totalData[index]["start"]["country"],
      });
      setFinishPlaceInput({
        city: totalData[index]["finish"]["city"],
        street: totalData[index]["finish"]["street"],
        street_number: totalData[index]["finish"]["street_number"],
        country: totalData[index]["finish"]["country"],
      });
    }
  };

  console.log(totalData);

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-container-address-data">
        <select
          size={1}
          className="form-select form-select-lg mb-3"
          aria-label=".form-select-lg example"
          onChange={changeSelect}
          value={selectChosen}
        >
          <option selected value={-1} className="select-value">
            show history
          </option>
          {totalData.map((element, index) => (
            <option value={index} className="select-value">
              {element["start"]["city"]} -&gt; {element["finish"]["city"]}
            </option>
          ))}
        </select>
        <div className="text-input-container">
          <h2 className="input-header">Start</h2>
          <div className="start-place-input-container">
            <input
              placeholder="city"
              type="text"
              id="start-city"
              value={startPlaceInput["city"]}
              onChange={handelChangeStart}
              name="city"
              data-testid="city-start"
            />
            <input
              placeholder="street"
              type="text"
              id="start-street"
              value={startPlaceInput["street"]}
              onChange={handelChangeStart}
              name="street"
              data-testid="street-start"
            />
            <input
              placeholder="street_number"
              type="text"
              id="start-street_number"
              value={startPlaceInput["street_number"]}
              onChange={handelChangeStart}
              name="street_number"
              data-testid="street_number-start"
            />
            <input
              placeholder="country"
              type="text"
              id="start-country"
              value={startPlaceInput["country"]}
              onChange={handelChangeStart}
              name="country"
              data-testid="country-start"
            />
          </div>
          <h2 className="input-header">Finish</h2>
          <div className="finish-place-input-container">
            <input
              placeholder="city"
              type="text"
              id="finish-city"
              value={finishPlaceInput["city"]}
              onChange={handelChangeFinish}
              name="city"
              data-testid="city-finish"
            />
            <input
              placeholder="street"
              type="text"
              id="finish-street"
              value={finishPlaceInput["street"]}
              onChange={handelChangeFinish}
              name="street"
              data-testid="street-finish"
            />
            <input
              placeholder="street_number"
              type="text"
              id="finish-street_number"
              value={finishPlaceInput["street_number"]}
              onChange={handelChangeFinish}
              name="street_number"
              data-testid="street_number-finish"
            />
            <input
              placeholder="country"
              type="text"
              id="finish-country"
              value={finishPlaceInput["country"]}
              onChange={handelChangeFinish}
              name="country"
              data-testid="country-finish"
            />
          </div>
        </div>
        <input className="input-submit-button" type="submit" value="send" />
        <h3 className="error-message">{errorMessage}</h3>
      </form>
    </div>
  );
};

export default InputView;
