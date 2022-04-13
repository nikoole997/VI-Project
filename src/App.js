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
           xAxis="YrSold"
           yAxis="SalePrice"
           lineKey="SalePrice"
        /> 
      <div className="box1">
      <CustomBarChart
           records={getGM(records)} 
           xAxis="MoSold"
           yAxis="SalePrice"
           lineKey="SalePrice"
        /> 
      </div>
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

function getMonth (p_m) {
var month;
  switch (p_m) {
  case 1:
    month = "Jan";
    break;
  case 2:
    month = "Feb";
    break;
  case 3:
    month = "Mar";
    break;
  case 4:
    month = "Apr";
    break;
  case 5:
    month = "May";
    break;
  case 6:
    month = "Jun";
    break;
  case 7:
    month = "Jul";
    break;
  case 8:
    month = "Aug";
    break;
  case 9:
    month = "Sep";
    break;
  case 10:
    month = "Oct";
    break;
  case 11:
    month = "Nov";
    break;
  case 12:
    month = "Dec";
    break;
 } 
 return month;
}


var result1 = [];
const getGM = (array) => Object.values(array.reduce((acc,value)=>{
  var monthDes;
  if (!acc[value.MoSold] ){
    monthDes = getMonth(value.MoSold);
    acc[value.MoSold] = { MoSold: monthDes, SalePrice: 0 };
    result1.push(acc[value.MoSold]);
  }
  acc[value.MoSold].SalePrice += value.SalePrice;
  return acc;

 },{}));

export default App;
