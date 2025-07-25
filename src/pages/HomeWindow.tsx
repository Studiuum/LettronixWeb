import { MemoHum, MemopH, MemoTDS, MemoTemp } from "../hooks/memos/SensorMemos";
import "../LettronixTheme.css";
import { MemoTank } from "../hooks/memos/TankLevelMemos";
import { MemoBtn } from "../hooks/memos/ActuatorMemos";
import { useLoaderData, useOutletContext } from "react-router";
import type {
  OutletContextProp,
  SensorDataProp,
} from "../data/dataProps/dataProps";
import { useSensor } from "../hooks/useSensor";

import type { FC } from "react";
import TitleCard from "../components/TitleCards";

const card =
  "flex flex-col p-3 sm:p-4 md:p-5 min-1024-768:p-3 gap-2 rounded-2xl border-lettronix-card-border bg-lettronix-card-bg drop-shadow-all-fx font-Inter";

const titleCard =
  "flex items-center justify-between border-b-1 border-lettronix-title-border pb-1 md:pb-2";

const titleName =
  "font-medium text-[14px] sm:text-[16px] md:text-xl tracking-widest";
const icon = "w-4 h-4 sm:w-5 sm:h-5 md:w-auto md:h-auto";

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
        src={`src/assets/icons/${fileName}-reading-icon.svg`}
        className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12"
      />
      <div className="large-body-sub-title flex">{label}</div>
      <Func value={value} />
    </div>
  );
}

function HomeWindowRender() {
  const { contextData, preferenceData } = useOutletContext<OutletContextProp>();
  const rpiControlData = contextData.values;

  // SENSOR DATA AND PREFERENCE DATA
  const initialSensorData = useLoaderData();
  // // SENSOR DATA
  const sensorData: SensorDataProp = useSensor(initialSensorData);

  return (
    <>
      <div className="flex min-h-0 flex-grow flex-col justify-center gap-2 lg:gap-3 xl:flex-row xl:gap-10 min-1024-768:flex-row">
        {/* LEFT SIDE */}
        <div
          className={`main-card flex-grow justify-between xl:w-1/2 xl:justify-start min-1024-768:w-1/2`}
        >
          {/* OVERVIEW LINE */}
          <TitleCard label={"overview"} />

          {/* DAYS - GROUP */}
          <div className="justfiy-start flex flex-grow-0 flex-col gap-0">
            <div className="large-body-sub-title">
              {/* sm:text-[1rem] md:flex-1 md:text-2xl */}
              DAY
            </div>
            <div className="ml-2 flex h-full gap-2 md:ml-4 md:gap-5">
              {/* FUNCION HERE */}
              <div className="h2-day-number">
                {/* {preferenceData.age} */}
                99
              </div>
              <div className="flex w-full flex-1 flex-col justify-center text-[12px] md:text-[16px]">
                {/* PROGRESS BAR */}
                <div className="flex h-4 flex-1">
                  {/* FUNCION HERE  */}
                  <div className="color-let flex-1 overflow-hidden rounded-full bg-lettronix-progressbar-bg">
                    <div
                      style={{
                        width: `${Math.min(
                          (preferenceData.age /
                            (preferenceData.age > 30
                              ? preferenceData.age
                              : 30)) *
                            100,
                          100,
                        )}%`,
                      }}
                      className="transformation-gpu h-full rounded-full bg-lettronix-progressbar-fg p-0.5 text-lettronix-progressbar-fg transition-all duration-1500 ease-in-out"
                    ></div>
                  </div>
                </div>
                <div className="flex-1 text-[12px] font-bold sm:text-[14px] lg:text-[16px]">
                  START DATE TIME:
                </div>
                <div className="flex-1 text-center text-[12px] sm:text-[14px] lg:text-[16px]">
                  {preferenceData.date_time}
                </div>
              </div>
            </div>
          </div>
          {/* IMAGE + CLASSIFICATION */}
          <div className="hover:animation-pulse flex flex-grow flex-col gap-0 rounded-[8px] border-1 border-lettronix-selected transition-transform duration-5000 hover:scale-105 md:rounded-[15px] md:hover:scale-103">
            <img
              src={"src/assets/WIN_20250331_18_16_58_Pro.jpg"}
              // {preferenceData.lettuce_pic_url}
              alt={"src/assets/WIN_20250331_18_16_58_Pro.jpg"}
              className="h-65 flex-grow rounded-t-[8px] object-cover sm:h-100 md:h-140 md:rounded-t-[15px] lg:h-160 xl:h-80 min-1024-768:h-65"
            />
            <div className="flex flex-col justify-center rounded-b-[8px] bg-lettronix-bg md:rounded-b-[15px] md:pb-2 xl:flex-grow min-1024-768:flex-grow-0">
              <div className="ml-2 flex-1 text-[12px] font-bold sm:text-[14px] md:ml-5 md:text-[16px]">
                CLASSIFICATION:
              </div>
              <div className="font-regular flex-1 text-center text-[14px] tracking-wider sm:text-[16px] md:text-2xl">
                {preferenceData.lettuce_classify === 4 && "NORMAL"}
                {preferenceData.lettuce_classify === 3 && "SLIGHT DEFICIENCY"}
                {preferenceData.lettuce_classify === 2 && "MODERATE DEFICIENCY"}
                {preferenceData.lettuce_classify === 1 && "SEVERE DEFICIENCY"}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col gap-2 md:justify-between lg:gap-3 xl:w-1/2 min-1024-768:w-1/2">
          {/* SENSOR READINGS */}
          <div className={`main-card`}>
            {/* SENSOR READINGS LINE */}
            <TitleCard label={"sensor readings"} />
            <div className="flex flex-1 flex-row items-center justify-center gap-0">
              <RenderSensorReadingsCard label="TDS" value={9999} />
              <RenderSensorReadingsCard label="pH" value={99.99} />
              <RenderSensorReadingsCard label="TEMP" value={99.99} />
              <RenderSensorReadingsCard label="HUM" value={99.99} />
            </div>
          </div>
          {/* WATER LEVEL SENSOR */}
          <div className="@container/water_level flex flex-1">
            <div className="main-card @container/water_levels grid flex-1 grid-cols-2 grid-rows-5 gap-x-5 gap-y-0 rounded-[15px]">
              {/* WATER LEVEL SENSOR LINE */}
              <TitleCard classNames={"col-span-2"} label={"tank level"} />
              <MemoTank
                label="NUTRIENT TANK"
                value={sensorData.nutrient_tank}
              />
              <MemoTank label="FOLIAR TANK" value={sensorData.foliar_tank} />
              <MemoTank label="CALCIUM TANK" value={sensorData.cal_tank} />
              <MemoTank label="NPK TANK" value={sensorData.npk_tank} />
              <MemoTank label="MAG TANK" value={sensorData.mag_tank} />
              <MemoTank label="pH UP TANK" value={sensorData.ph_up_tank} />
              <MemoTank label="pH DOWN TANK" value={sensorData.ph_up_tank} />
              <MemoTank label="CAL-MAG TANK" value={sensorData.cal_mag_tank} />
            </div>
          </div>
          <div className={`main-card`}>
            {/* SENSOR READINGS LINE */}
            {/* WATER LEVEL SENSOR LINE */}
            <TitleCard label={"main control"} />
            <div className="flex flex-row items-center justify-center gap-3 sm:gap-7 md:mx-10">
              <MemoBtn
                label="START CYCLE"
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
