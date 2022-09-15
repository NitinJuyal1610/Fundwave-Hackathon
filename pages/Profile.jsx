import React, { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import Navbar from "./components/Navbar";
import { useMoralisQuery } from "react-moralis";
import Demo from './Demo'
const Moralis = require("moralis-v1");

import Papa from "papaparse";
import { useNewMoralisObject } from "react-moralis";

// Allowed extensions for input file
const allowedExtensions = ["csv"];

const Profile = () => {
  const { data, isFetching } = useMoralisQuery(
    "Analytics",
    (query) => query.select("PAGE", "PERIOD_DATE", "PERIOD_TYPE", "VISITS "),
    [],
    { autoFetch: false }
  );
  const { logout, isAuthenticated, user } = useMoralis();
  const { save } = useNewMoralisObject("analytics");

  const [error, setError] = useState("");

  const [file, setFile] = useState("");
  const [dataFetch, setDataFetch] = useState([]);

  const handleFileChange = (e) => {
    setError("");

    if (e.target.files.length) {
      const inputFile = e.target.files[0];

      const fileExtension = inputFile?.type.split("/")[1];
      if (!allowedExtensions.includes(fileExtension)) {
        setError("Please input a csv file");
        return;
      }

      setFile(inputFile);
    }
  };

  const getJson = () => {
    console.log(data);
  };

  const FileUpload = (temp) => {
    const Analytics = Moralis.Object.extend("Analytics");

    const analytics = new Analytics();
    const { PAGE, PERIOD_DATE, PERIOD_TYPE, VISITS } = temp;
    analytics.save({
      PAGE,
      PERIOD_DATE,
      PERIOD_TYPE,
      VISITS,
    });
  };
  const handleParse = () => {
    if (!file) return setError("Enter a valid file");

    const reader = new FileReader();

    reader.onload = async ({ target }) => {
      const csv = Papa.parse(target.result, { header: true });
      const parsedData = csv?.data;
      setDataFetch(parsedData)
      console.log(parsedData);
      parsedData.map((temp) => {
        FileUpload(temp);
      });
    };
    reader.readAsText(file);
  };
  return (
    <div>
      <Navbar />
      <label htmlFor="csvInput" style={{ display: "block" }}>
        Enter CSV File
      </label>
      <input
        onChange={handleFileChange}
        id="csvInput"
        name="file"
        type="File"
      />

      <div>
        <button onClick={handleParse}>Display</button>
        <button onClick={getJson}>getJson</button>
      </div>
      <Demo data={dataFetch}/>
    </div>
  );
};

export default Profile;
