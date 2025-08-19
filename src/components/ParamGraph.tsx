import { useMemo } from "react";
import type { DailyDataProp } from "../data/dataProps/dataProps";

import Chart from "react-apexcharts";

// /* PARAMETER COLORS */
//   --color-TDS-param: #5eead4;
//   --color-pH-param: #f9a8d4;
//   --color-TEMP-param: #fcd34d;
//   --color-HUM-param: #7dd3fc;

export function ParamGraph({
  historyData,
  param,
}: {
  historyData: DailyDataProp[];
  param: string;
}) {
  const [color, dataGraph] = useMemo(() => {
    switch (param) {
      case "TDS":
        return ["#5eead4", historyData.map((row) => row.tds)];
      case "pH":
        return ["#f9a8d4", historyData.map((row) => row.pH)];
      case "TEMPERATURE":
        return ["#fcd34d", historyData.map((row) => row.temp)];
      case "HUMIDITY":
        return ["#7dd3fc", historyData.map((row) => row.hum)];
      default:
        return ["#000000", []];
    }
  }, [param, historyData]);

  const x = useMemo(() => historyData.map((row) => row.age), [historyData]);

  return (
    <Chart
      options={{
        chart: {
          type: "area",
          height: "100%",
          width: "100%",
          toolbar: {
            show: true,
            tools: { download: false, zoom: false, pan: false },
          },
          animations: {
            enabled: true,
            speed: 50,
            animateGradually: {
              enabled: true,
              delay: 500,
            },
            dynamicAnimation: {
              enabled: true,
              speed: 350,
            },
          },
        },
        yaxis: {
          title: {
            text: param,
            style: {
              color: "#000000",
              fontFamily: "Inter",
              fontWeight: "medium",
              fontSize: "13",
            },
          },
        },
        xaxis: {
          title: {
            offsetX: 0,
            offsetY: 0,
            text: "DAYS",

            style: {
              color: "#000000",
              fontFamily: "Inter",
              fontWeight: "medium",
              fontSize: "13",
            },
          },
          categories: x,
          labels: { show: false },
          tooltip: { enabled: false },
        },

        title: {
          text: param.concat(" Reading"),
          align: "center",
          style: {
            fontSize: "16px",
            fontFamily: "Inter",
            fontWeight: "light",
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 0.5,
            opacityFrom: 0.3,
            opacityTo: 0.5,
            stops: [0, 90, 100],
          },
        },
        tooltip: {
          enabled: true,
          fillSeriesColor: true,
          marker: { show: true },
          custom: function ({ series, seriesIndex, dataPointIndex }) {
            const value = series[seriesIndex][dataPointIndex];
            const category = dataPointIndex + 1;

            let stringVal;
            if (param === "TDS") stringVal = `${value} ppm`;
            if (param === "pH") stringVal = value.toString();
            if (param === "TEMPERATURE") stringVal = `${value}°C`;
            if (param === "HUMIDITY") stringVal = `${value} %`;

            return `
    <div
      style="
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: transparent;
        font-family: Inter;
        border-radius: 10px;
        min-width: 110px;
        box-sizing: border-box;
        white-space: nowrap;
      "
    >
      <div
        style="
          width: 100%;
          text-align: left;
          background-color: ${color};
          padding: 4px 6px;
          border-top-left-radius: 6px;
          border-top-right-radius: 6px;
          box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.4);
        "
      >
        Day: ${category}
      </div>
      <div
        style="
          text-align: center;
          width: 100%;
          padding: 6px 5px;
          background-color: rgba(0, 0, 0, 0.5);
          border-bottom-left-radius: 6px;
          border-bottom-right-radius: 6px;
          color: ${color};
          font-weight: bold;
        "
      >
        ${stringVal}
      </div>
    </div>
  `;
          },
        },
        colors: [color], // Optional: blue
        stroke: {
          curve: "smooth",
          lineCap: "round",
          width: 3,
        },
        dataLabels: { enabled: false },
      }}
      series={[
        {
          name: param,
          data: dataGraph,
        },
      ]}
      type="area"
      height={"100%"}
      width={"100%"}
    />
  );
}
