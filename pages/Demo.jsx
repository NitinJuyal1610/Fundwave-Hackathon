import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { VictoryTheme,VictoryBar, VictoryChart, VictoryAxis } from 'victory';
const data = [
    {quarter: 1, earnings: 7500},
    {quarter: 2, earnings: 16500},
    {quarter: 3, earnings: 3750},
    {quarter: 4, earnings: 17500}
  ];
const Demo = () => {
  const router = useRouter();
  

  return (
    <div style={{ height: "500px", }}>
      <VictoryChart
        // adding the material theme provided with Victory
        theme={VictoryTheme.material}
        domainPadding={20}
      >
        <VictoryAxis
          tickValues={[1, 2, 3, 4]}
          tickFormat={["careers", "home", "docs", "contact"]}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={(x) => (`${x / 1000}k`)}
        />
        <VictoryBar
          data={data}
          x="quarter"
          y="earnings"
        />
      </VictoryChart>
    </div>
  );
};

export default Demo;
