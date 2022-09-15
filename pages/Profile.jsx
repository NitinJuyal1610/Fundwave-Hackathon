import React, { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import Navbar from "./components/Navbar";
import { useMoralisQuery } from "react-moralis";

import styles from "../styles/Register.module.css";
import Demo from "./Demo";
const Moralis = require("moralis-v1");

import Papa from "papaparse";

// Allowed extensions for input file
const allowedExtensions = ["csv"];

const Profile = () => {
  const [file, setFile] = useState("");

  const { fetch } = useMoralisQuery(
    "Analytics",
    (query) => query.select("id"),
    [],
    { autoFetch: false }
  );
  const { logout, isAuthenticated, user } = useMoralis();

  const [error, setError] = useState("");
  const [vis, setVis] = useState(false);

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
    fetch({
      onSuccess: (monster) => {
        console.log(monster.get(""));
      },
    });
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
      setDataFetch(parsedData);
      console.log(parsedData);
      parsedData.map((temp) => {
        FileUpload(temp);
      });

      setVis(true);
    };
    reader.readAsText(file);
  };
  return (
    <div>
      <Navbar />
      <div
        style={{
          position: "absolute",
          top: "50vh",
          left: "10vh",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
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
        </div>
      </div>

      <div hidden={!vis}>
        <Demo data={dataFetch} />
      </div>
    </div>
  );
};

export default Profile;
