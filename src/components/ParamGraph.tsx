import type {
  DailyDataProp,
  ParamAutomationProp,
} from "../data/dataProps/dataProps";
import Chart from "react-apexcharts";

export function ParamGraph({
  historyData,
  paramAutomationData,
  param,
}: {
  historyData: DailyDataProp[];
  paramAutomationData: ParamAutomationProp[];
  param: string;
}) {
  function convertTime24to12(time24: string) {
    const [hrStr, minStr] = time24.split(":");
    let hr = parseInt(hrStr, 10);
    const min = parseInt(minStr, 10);
    const period = hr >= 12 ? "PM" : "AM";
    let hour12 = hr % 12;
    if (hour12 === 0) hour12 = 12;
    return `${hour12}:${min.toString().padStart(2, "0")} ${period}`;
  }

  // Select color and data
  let color = "#000";
  let contrast = "#000";
  let dataGraph: number[] = [];

  switch (param) {
    case "TDS":
      color = "#5eead4";
      contrast = "#008080";
      dataGraph = historyData.map((row) => row.tds);
      break;
    case "pH":
      color = "#f9a8d4";
      contrast = "#c0006f";
      dataGraph = historyData.map((row) => row.pH);
      break;
    case "TEMPERATURE":
      color = "#fcd34d";
      contrast = "#b37400";
      dataGraph = historyData.map((row) => row.temp);
      break;
    case "HUMIDITY":
      color = "#7dd3fc";
      contrast = "#0055a5";
      dataGraph = historyData.map((row) => row.hum);
      break;
  }

  const x = historyData.map((row) => row.age);

  // Compute discrete markers for automation points
  const discreteMarkers = historyData.flatMap((row, idx) => {
    const match = paramAutomationData.find(
      (item) => item.sensor === param && Number(item.day) === Number(row.age),
    );
    if (match) {
      return [
        {
          seriesIndex: 0, // always 0 for single series chart
          dataPointIndex: idx,
          size: 8,
          fillColor: contrast,
          strokeColor: color,
          strokeWidth: 2,
          hover: { size: 15 },
        },
      ];
    }
    return [];
  });

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
          zoom: { enabled: false },
          animations: {
            enabled: true,
            speed: 50,
            animateGradually: { enabled: true, delay: 500 },
            dynamicAnimation: { enabled: true, speed: 350 },
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
        markers: {
          size: 0, // hide default markers
          strokeColors: color,
          strokeWidth: 5,
          strokeOpacity: 0,
          shape: "circle",
          discrete: discreteMarkers,
        },
        title: {
          text: param.concat(" Reading"),
          align: "center",
          style: { fontSize: "16px", fontFamily: "Inter", fontWeight: "light" },
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
          enabled: dataGraph[0] !== -1,
          fillSeriesColor: true,
          marker: { show: true },
          custom: ({ series, seriesIndex, dataPointIndex }) => {
            const value = series[seriesIndex][dataPointIndex];
            const day = historyData[dataPointIndex]?.age;
            const updatedParamAutomationList = paramAutomationData.filter(
              (row) => row.sensor === param && row.day == day,
            );

            let paramUnit = "";
            if (param === "TDS") paramUnit = "ppm";
            if (param === "TEMPERATURE") paramUnit = "°C";
            if (param === "HUMIDITY") paramUnit = "%";

            const automationHTML = updatedParamAutomationList.length
              ? updatedParamAutomationList
                  .map(
                    (item, x) => `<div ${
                      x + 1 === updatedParamAutomationList.length
                        ? ""
                        : `style="margin:5px 0;border-bottom:2px solid rgba(0,0,0,0.125)"`
                    }>
                      <div><b>TIME:</b> ${convertTime24to12(item.time)}</div>
                      <div><b>READ:</b> ${item.reading} ${paramUnit}</div>
                      <div><b>ACT:</b> ${item.action}</div>
                    </div>`,
                  )
                  .join("")
              : "";

            let stringVal;
            if (param === "TDS") stringVal = `${value} ppm`;
            if (param === "pH") stringVal = value.toString();
            if (param === "TEMPERATURE") stringVal = `${value}°C`;
            if (param === "HUMIDITY") stringVal = `${value} %`;

            return `
              <div style="display:flex;flex-direction:column;align-items:center;background-color:transparent;font-family:Inter;border-radius:10px;min-width:110px;white-space:nowrap;">
                <div style="width:100%;text-align:left;background-color:${color};padding:4px 6px;border-top-left-radius:6px;border-top-right-radius:6px;box-shadow:0px 2px 2px rgba(0,0,0,0.4);">
                  <b>Day:</b>${day}
                </div>
                <div style="text-align:start;width:100%;padding:5px 10px;background-color:rgba(0,0,0,0.5);border-bottom-left-radius:6px;border-bottom-right-radius:6px;color:${color};">
                  <div><b>AVG:</b> ${stringVal}</div>
                  ${
                    updatedParamAutomationList.length > 0
                      ? `<div style="border-top:2px solid rgba(255,255,255,0.5)">${automationHTML}</div>`
                      : ""
                  }
                </div>
              </div>
            `;
          },
        },
        colors: [color],
        stroke: { curve: "smooth", lineCap: "round", width: 3 },
        dataLabels: { enabled: false },
      }}
      series={[{ name: param, data: dataGraph }]}
      type="area"
      height="100%"
      width="100%"
    />
  );
}
