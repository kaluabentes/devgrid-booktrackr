import React from "react";
import PropTypes from "prop-types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import useContainerWidth from "hooks/useContainerWidth";

const PROP_TYPES = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      number: PropTypes.number,
    })
  ),
};

const DEFAULT_PROPS = {
  data: [
    { name: "Page A", quantity: 2 },
    { name: "Page B", quantity: 3 },
    { name: "Page C", quantity: 4 },
    { name: "Page D", quantity: 5 },
    { name: "Page E", quantity: 6 },
    { name: "Page F", quantity: 7 },
    { name: "Page G", quantity: 8 },
  ],
};

export default function ReportChart({ data }) {
  const width = useContainerWidth();

  return (
    <LineChart
      width={width}
      height={300}
      data={data}
      margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
    >
      <XAxis dataKey="name" />
      <YAxis allowDecimals={false} />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="quantity"
        stroke="#007bfe"
        strokeWidth={2}
      />
    </LineChart>
  );
}

ReportChart.propTypes = PROP_TYPES;
ReportChart.defaultProps = DEFAULT_PROPS;
