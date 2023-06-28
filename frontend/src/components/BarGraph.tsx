import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type DataItem = {
  id: number;
  month: number;
  year: number;
  total_value: number;
  created_at: string;
  updated_at: string;
};

function BarGraph({ data }: { data: any }) {
  // Step 1: Extract month and total_value values
  const extractedData = data.map((item: DataItem) => ({
    month: item.month,
    total_value: item.total_value,
  }));

  // Step 2: Create an array of all months
  const allMonths = Array.from({ length: 12 }, (_, index) => index + 1);

  // Step 3: Populate the data array with total_value values
  const chartData = allMonths.map((month) => {
    const foundData = extractedData.find(
      (item: { month: number }) => item.month === month
    );
    return {
      month,
      total_value: foundData ? foundData.total_value : 0,
    };
  });

  return (
    <div className="bar-chart-div">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total_value" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarGraph;
