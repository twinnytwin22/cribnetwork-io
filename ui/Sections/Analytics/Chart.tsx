"use client";

import { AreaChart, Text, Title } from "@tremor/react";

const data = [
  {
    Month: "Jan 21",
    Sales: 2890,
    Profit: 2400,
  },
  {
    Month: "Feb 21",
    Sales: 1890,
    Profit: 1398,
  },
  {
    Month: "Jan 22",
    Sales: 3890,
    Profit: 2980,
  },
];

export default function Example() {
  return (
    <div className="mt-8 text-black dark:text-white bg-white dark:bg-black border border-zinc-300 rounded p-4 dark:border-zinc-800">
      <Title className="text-black dark:text-white">Performance</Title>
      <Text className="text-black dark:text-white">
        Comparison between Sales and Profit
      </Text>
      <AreaChart
        className="mt-4 h-80 text-black dark:text-white"
        data={data}
        categories={["Sales", "Profit"]}
        index="Month"
        colors={["indigo", "fuchsia"]}
        valueFormatter={(number: number) =>
          `$ ${Intl.NumberFormat("us").format(number).toString()}`
        }
        yAxisWidth={60}
      />
    </div>
  );
}
