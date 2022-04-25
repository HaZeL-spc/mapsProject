import React from "react";
import jsPDF from "jspdf";
import { DomEvent } from "leaflet";

const PdfDocument = ({ routeData, totalData, inputKmData }) => {
  const changePolishSigns = (text) => {
    text = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    text = text.toLowerCase();
    text = text.replace("ę", "e");
    text = text.replace("ó", "o");
    text = text.replace("ą", "a");
    text = text.replace("ś", "s");
    text = text.replace("ł", "l");
    text = text.replace("ż", "z");
    text = text.replace("ź", "z");
    text = text.replace("ć", "c");
    text = text.replace("ń", "n");

    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const pdfGenerate = () => {
    var doc = new jsPDF("p", "px", "a4", "false");
    // doc.addPage();

    const headerFontSize = 24;
    const textFontSize = 16;

    doc.setFontSize(30);
    doc.text(180, 30, "ROUTE");

    // START DATA
    let startData = totalData.start;
    doc.setFontSize(headerFontSize);
    doc.text(20, 60, "START");
    doc.setFontSize(textFontSize);
    doc.text(20, 80, `city: ${changePolishSigns(startData.city)}`);
    doc.text(
      20,
      100,
      `street: ${changePolishSigns(startData.street)} ${changePolishSigns(
        startData.street_number
      )}`
    );
    doc.text(20, 120, `country: ${changePolishSigns(startData.country)}`);

    // FINISH DATA
    let finishData = totalData.finish;
    doc.setFontSize(headerFontSize);
    doc.text(20, 160, "FINISH");
    doc.setFontSize(textFontSize);
    doc.text(20, 180, `city: ${changePolishSigns(finishData.city)}`);
    doc.text(
      20,
      200,
      `street: ${changePolishSigns(finishData.street)} ${changePolishSigns(
        finishData.street_number
      )}`
    );
    doc.text(20, 220, `country: ${changePolishSigns(finishData.country)}`);

    // ROUTE DATA
    doc.text(220, 60, `pln/km: ${inputKmData}`);
    doc.text(
      220,
      80,
      `distance: ${Math.round((routeData.distance / 1000) * 100) / 100} km`
    );
    doc.text(
      220,
      100,
      `time: ${Math.floor(routeData.time / 3600)} hour ${Math.round(
        (routeData.time % 3600) / 60
      )} minutes`
    );
    doc.text(
      220,
      120,
      `cost: ${
        Math.round(
          1.1 * (routeData.distance / 1000) * parseFloat(inputKmData) * 100
        ) / 100
      } pln`
    );
    doc.text(
      220,
      140,
      `how many days: ${Math.ceil(routeData.distance / 1000 / 800)} days`
    );

    doc.save(`${startData.city}_to_${finishData.city}.pdf`);
  };

  return (
    <>
      <button onClick={pdfGenerate} className="button-download-pdf">
        Download pdf
      </button>
    </>
  );
};

export default PdfDocument;
