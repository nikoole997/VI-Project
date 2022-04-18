import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const CustomBarChart = (props) => {
  const [records, setRecords] = useState([]);
  useEffect(() => {
    if (props.records.length > 0) {
      setRecords(getGM());
    }
  }, []);

  const getGM = () => {
    var result1 = [];
    Object.values(
      props.records.reduce((acc, value) => {
        if (!acc[value[props.xAxis]]) {
          let obj = {};
          obj[props.xAxis] = value[props.xAxis];
          obj[props.lineKey] = 0;
          acc[value[props.xAxis]] = obj;
          result1.push(acc[value[props.xAxis]]);
        }
        acc[value[props.xAxis]][props.lineKey] += value[props.lineKey];
        return acc;
      }, {})
    );
    return result1;
  };

  return (
    <BarChart
      width={700}
      height={500}
      data={records}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={props.xAxis} />
      <YAxis dataKey={props.yAxis} />
      <Tooltip />
      <Legend />
      <Bar type="monotone" dataKey={props.lineKey} fill="#8884d8" />
    </BarChart>
  );
};
export default CustomBarChart;
