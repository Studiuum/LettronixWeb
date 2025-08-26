import { MemoHum, MemopH, MemoTDS, MemoTemp } from "../hooks/memos/SensorMemos";
import "../LettronixTheme.css";
import { MemoTank } from "../hooks/memos/TankLevelMemos";
import { MemoBtn } from "../hooks/memos/ActuatorMemos";
import { useLoaderData, useOutletContext } from "react-router";
import type { OutletContextProp } from "../data/dataProps/dataProps";
import { useSensor } from "../hooks/useSensor";

import { useEffect, type FC } from "react";
import TitleCard from "../components/TitleCards";
import ImageClassCard from "../components/ImageClassCard";

function RenderSensorReadingsCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  let fileName: string;
  let Func: FC<{ value: any }>;

  if (label === "TEMP") {
    fileName = "temperature";
    Func = MemoTemp;
  } else if (label == "HUM") {
    fileName = "humidity";
    Func = MemoHum;
  } else {
    fileName = label;
    if (label === "TDS") {
      Func = MemoTDS;
    } else {
      Func = MemopH;
    }
  }
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-1 font-bold md:gap-2">
      <img
        src={`/assets/icons/${fileName}-reading-icon.svg`}
        alt={`${fileName} icon`}
        className="h-8 w-8 overflow-auto sm:h-10 sm:w-10 md:h-12 md:w-12"
      />
      <div className="large-body-sub-title flex whitespace-nowrap">{label}</div>
      <Func value={value} />
    </div>
  );
}

function HomeWindowRender() {
  const { contextData, preferenceData, setArraySetupRealtime } =
    useOutletContext<OutletContextProp>();
  const rpiControlData = contextData.values;

  // SENSOR DATA AND PREFERENCE DATA
  const initialSensorData = useLoaderData();
  // // SENSOR DATA
  const { rpiSensorData, setupSensorRealtime } = useSensor(initialSensorData);

  // ATTACHED THE SETUPREALTIME CONNECTION TO ENABLE RECONNECTION
  useEffect(() => {
    console.log("SENSOR REALTIME LISTENER ATTACHED TO RECONNECTION");
    setArraySetupRealtime((prev: (() => void)[]) => [
      ...prev,
      setupSensorRealtime,
    ]);
    return () => {
      console.log("SENSOR REALTIME LISTENER REMOVED TO RECONNECTION");
      setArraySetupRealtime((prev: (() => void)[]) =>
        prev.filter((x) => {
          return x !== setupSensorRealtime;
        }),
      );
    };
  }, []);

  return (
    <>
      <div className="flex w-full flex-1 flex-col justify-center gap-2 overflow-hidden lg:gap-3 xl:flex-row xl:gap-10">
        {/* <div className="flex w-full flex-1 justify-center gap-10"> */}
        {/* LEFT SIDE */}
        <div className="main-card flex-grow justify-start overflow-hidden xl:w-1/2">
          {/* OVERVIEW LINE */}
          <TitleCard label={"overview"} />
          <ImageClassCard preferenceData={preferenceData} />
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-grow flex-col gap-2 md:justify-between lg:gap-3 xl:w-1/2">
          {/* SENSOR READINGS */}
          <div className={`main-card flex-[1_1_auto]`}>
            {/* SENSOR READINGS LINE */}
            <TitleCard label={"sensor readings"} />
            <div className="flex flex-1 flex-row items-center justify-center gap-0">
              <RenderSensorReadingsCard label="TDS" value={rpiSensorData.tds} />
              <RenderSensorReadingsCard label="pH" value={rpiSensorData.pH} />
              <RenderSensorReadingsCard
                label="TEMP"
                value={rpiSensorData.temp}
              />
              <RenderSensorReadingsCard label="HUM" value={rpiSensorData.hum} />
            </div>
          </div>
          {/* WATER LEVEL SENSOR */}
          <div className="main-card flex flex-[3_1_auto] flex-col">
            <TitleCard classNames={"col-span-2"} label={"tank level"} />
            <div className="grid flex-1 grid-cols-2 grid-rows-4 gap-x-5 gap-y-0 rounded-[15px]">
              {/* WATER LEVEL SENSOR LINE */}
              <MemoTank
                label="Nutrient Tank"
                value={rpiSensorData.nutrient_tank}
              />
              <MemoTank label="Foliar Tank" value={rpiSensorData.foliar_tank} />
              <MemoTank label="Calcium Tank" value={rpiSensorData.cal_tank} />
              <MemoTank label="NPK Tank" value={rpiSensorData.npk_tank} />
              <MemoTank label="Magnesium Tank" value={rpiSensorData.mag_tank} />
              <MemoTank label="pH Up Tank" value={rpiSensorData.ph_up_tank} />
              <MemoTank label="pH Down Tank" value={rpiSensorData.ph_up_tank} />
              <MemoTank
                label="CAL-MAG Tank"
                value={rpiSensorData.cal_mag_tank}
              />
            </div>
          </div>
          <div className={`main-card flex-[1_1_auto`}>
            {/* SENSOR READINGS LINE */}
            {/* WATER LEVEL SENSOR LINE */}
            <TitleCard label={"main control"} />
            <div className="flex flex-row items-center justify-center gap-3 px-0 sm:gap-3">
              <MemoBtn
                label={`${rpiControlData.status === 3 ? "RESUME" : "START"} CYCLE`}
                isActive={
                  rpiControlData.status === 3 || rpiControlData.status == 1
                }
                val={2}
              />
              <MemoBtn
                label="PAUSE"
                isActive={rpiControlData.status === 2}
                val={3}
              />
              <MemoBtn
                label="END CYCLE"
                isActive={rpiControlData.status === 3}
                val={1}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeWindowRender;
