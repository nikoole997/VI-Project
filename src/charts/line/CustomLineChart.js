import React, { useEffect, useState } from "react";
import LimitNumeric from "../limits/limitNumeric";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const CustomLineChart = (props) => {
  const [records, setRecords] = useState([]);
  const [xAxis] = useState(props.xAxis);
  const [lineKey] = useState(props.lineKey);
  const [minX, setMinX] = useState("");
  const [minY, setMinY] = useState("");
  const [maxX, setMaxX] = useState("");
  const [maxY, setMaxY] = useState("");

  useEffect(() => {
    if (props.records.length > 0) {
      setRecords(groupByAverage(props.xAxis, props.lineKey));
    }
  }, []);

  const groupByAverage = (groupByValue, averageValue) => {
    let averageValues = props.records.reduce((previousValue, currentValue) => {
      if (!previousValue[currentValue[groupByValue]]) {
        previousValue[currentValue[groupByValue]] = {
          ...currentValue,
          count: 1,
        };
        return previousValue;
      }
      previousValue[currentValue[groupByValue]][averageValue] +=
        currentValue[averageValue];
      previousValue[currentValue[groupByValue]].count += 1;
      return previousValue;
    }, {});
    let results = Object.keys(averageValues).map(function (x) {
      const item = averageValues[x];
      let obj = {};
      obj[xAxis] = item[groupByValue];
      obj[lineKey] = item[averageValue] / item.count;
      return obj;
    });

    return results;
  };

  const setFilterList = (minX, maxX, minY, maxY) => {
    let sortedList = props.records.sort((a, b) =>
      a[xAxis] > b[xAxis] ? 1 : -1
    );

    if (minX != "") {
      sortedList = sortedList.filter((elem) => elem[xAxis] >= minX);
    }

    if (maxX != "") {
      sortedList = sortedList.filter((elem) => elem[xAxis] <= maxX);
    }

    if (maxY != "") {
      sortedList = sortedList.filter((elem) => elem[lineKey] <= maxY);
    }

    if (minY != "") {
      sortedList = sortedList.filter((elem) => elem[lineKey] >= minY);
    }
    setRecords(sortedList);
  };

  const filterChart = (min, max, axis) => {
    if (axis == "X") {
      setMinX(min);
      setMaxX(max);
      setFilterList(min, max, minY, maxY);
    } else if (axis == "Y") {
      setMinY(min);
      setMaxY(max);
      setFilterList(minX, maxX, min, max);
    }
  };

  return (
    <div className="d-block">
      <p className="title-paragraph bold">
        {props.xAxis} vs {props.lineKey}
      </p>
      <div className="d-flex flex-row align-items-center">
        <LineChart
          width={750}
          height={600}
          data={records}
          margin={{
            top: 30,
            right: 30,
            left: 20,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxis} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={lineKey} stroke={props.color} />
        </LineChart>
        <div className="d-block">
          <LimitNumeric
            min={minY}
            max={maxY}
            title={lineKey}
            filterChart={filterChart}
            axis={"Y"}
          />

          <LimitNumeric
            min={minX}
            max={maxX}
            title={xAxis}
            filterChart={filterChart}
            axis={"X"}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomLineChart;
