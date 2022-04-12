import React, { useState, useEffect } from "react";
import "./App.css";
import CustomLineChart from "./charts/line/CustomLineChart";
import CustomBarChart from "./charts/bar/CustomBarChart";

const App = () => {
  const [records, setRecords] = useState([]);
  const getRecords = async () => {
    await fetch("/excelFile")
      .then((res) => res.json())
      .then((records) => setRecords(records));
  };

  getRecords();
  return (
    <>
      <div className="App">
        <header className="App-header">Dashboard</header>
      </div>
      <div class="box1">
        <CustomLineChart
          records={records}
          xAxis="LotArea"
          lineKey="SalePrice"
        />
        <CustomBarChart />
      </div>
    </>
  );
};

export default App;
