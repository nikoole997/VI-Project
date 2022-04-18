import React, { useState, useEffect } from "react";
import "./App.css";
import CustomLineChart from "./charts/line/CustomLineChart";
import CustomBarChart from "./charts/bar/CustomBarChart";
import CustomPieChart from "./charts/pie/CustomPieChart";

const App = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    getRecords();
  }, []);

  const getRecords = async () => {
    await fetch("/excelFile")
      .then((res) => res.json())
      .then((records) => {
        changeMonth(records);
      });
  };

  const changeMonth = (records) => {
    let newRecords = records.map((el) => {
      el.MoSold = getMonth(el.MoSold);
      return el;
    });

    setRecords(newRecords);
  };

  const getMonth = (p_m) => {
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
  };

  return (
    <>
      {records && records.length > 0 && (
        <div>
          <div className="App">
            <header className="App-header">Dashboard HousePricing</header>
          </div>
          <div className="box1">
            <div className="show-chart" style={{ width: "50%" }}>
              <CustomLineChart
                records={records}
                xAxis="LotArea"
                lineKey="SalePrice"
                color="#07BF03"
              />
            </div>
            <div className="d-block" style={{ width: "24%" }}>
              <div className="show-chart d-flex justify-content-center">
                <CustomPieChart
                  color="#07BF03"
                  field={"SaleCondition"}
                  records={records}
                />
              </div>
              <div className="show-chart d-flex justify-content-center">
                <CustomPieChart
                  color="#FB3A0F"
                  field={"SaleType"}
                  records={records}
                />
              </div>
            </div>
            <div className="d-block" style={{ width: "24%" }}>
              <div className="show-chart d-flex justify-content-center">
                <CustomPieChart
                  color="#00A4F9"
                  field={"LotConfig"}
                  records={records}
                />
              </div>
              <div className="show-chart d-flex justify-content-center">
                <CustomPieChart
                  color="#F38D33"
                  field={"HouseStyle"}
                  records={records}
                />
              </div>
            </div>
          </div>
          <div className="box1">
            <div className="show-chart">
              <CustomBarChart
                records={records}
                lineKey="SalePrice"
                xAxis="YrSold"
                yAxis="SalePrice"
              />
            </div>
            <div className="show-chart">
              <CustomBarChart
                records={records}
                xAxis="MoSold"
                yAxis="SalePrice"
                lineKey="SalePrice"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
