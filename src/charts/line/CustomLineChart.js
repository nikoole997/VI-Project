import React, { PureComponent } from "react";
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
  return (
    <LineChart
      width={700}
      height={500}
      data={props.records}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={props.XAxis} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey={props.lineKey} stroke="#82ca9d" />
    </LineChart>
  );
};

export default CustomLineChart;
