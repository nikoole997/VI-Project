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
      <div className="box1">
        <CustomLineChart
          records={records}
          xAxis="LotArea"
          lineKey="SalePrice"
        />
        
        <CustomBarChart
           records={getG(records)} 
           lineKey="SalePrice"
        /> 
      </div>
    </>
  );
};
var result = [];
const getG = (array) => Object.values(array.reduce((acc,value)=>{
  if (!acc[value.YrSold] ){
    acc[value.YrSold] = { YrSold: value.YrSold, SalePrice: 0 };
    result.push(acc[value.YrSold]);
  }
  acc[value.YrSold].SalePrice += value.SalePrice;
  return acc;

 },{}));

export default App;
