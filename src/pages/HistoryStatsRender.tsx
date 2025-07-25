import { useState, type ChangeEvent } from "react";
import type {
  DailyDataProp,
  OutletContextProp,
} from "../data/dataProps/dataProps";

import "../LettronixTheme.css";
import { useGraph } from "../hooks/useGraph";
import { useLoaderData, useOutletContext } from "react-router";

const card =
  "flex flex-col p-5 bg-lettronix-card-bg drop-shadow-all-fx font-Inter rounded-2xl border-0.25 border-lettronix-card-border gap-2";

const titleCard =
  "flex items-center justify-between border-b-1 border-lettronix-title-border pb-2";

const titleName = "font-medium text-xl tracking-widest";

const controlBtn =
  "rounded-[20px] text-[16px] py-2 px-1 drop-shadow-btn-fx active:drop-shadow-none hover:drop-shadow-all-fx active:inset-shadow-inward-all-fx active:animate-pulse[10] disabled:bg-lettronix-btn-disabled disabled:drop-shadow-none disabled:inset-shadow-inward-all-fx disabled:text-white disabled:cursor-events-none transition active:scale-99 duration-300";

function HistoryStatsRender() {
  const { preferenceData } = useOutletContext<OutletContextProp>();

  const historyData: DailyDataProp[] = useLoaderData();
  console.log("HISTORY DATA", historyData);
  const [loadData, setloadData] = useState<DailyDataProp>(
    historyData[historyData.length - 1]
  );
  const [indexNumber, setIndexNumber] = useState<number | string>(loadData.age);

  const [param, setParam] = useState("TDS");

  function inputTextHandler(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.value !== "") {
      const num = Number(e.target.value);

      if (num >= 1 && num <= historyData.length) {
        setIndexNumber(num);
        setloadData(historyData[num - 1]);
      } else {
        setIndexNumber(loadData.age);
      }

      setIndexNumber(e.target.value);
    } else setIndexNumber(e.target.value);
  }

  function ParamButtons({ label }: { label: string }) {
    const bgColorMap: Record<string, string> = {
      TDS: "bg-TDS-param",
      pH: "bg-pH-param",
      TEMPERATURE: "bg-TEMPERATURE-param",
      HUMIDITY: "bg-HUMIDITY-param",
    };

    return (
      <>
        <input
          type="radio"
          name="parameter"
          value={label}
          id={`${label} RADIO`}
          className="form-radio hidden"
        />
        <label
          htmlFor={`${label} RADIO`}
          className={`${controlBtn} flex flex-1 justify-center items-center ${bgColorMap[label]} hover:bg-lettronix-hover  active:${bgColorMap[label]}`}
          onClick={() => {
            setParam(label);
          }}
        >
          {`${label} READING`}
        </label>
      </>
    );
  }

  return (
    <>
      <div className="flex flex-1 w-full justify-center gap-10">
        {/* LEFT SIDE */}
        <div className={`${card} w-1/2 justify-between`}>
          {/* IMAGE AND CLASSIFICATION LINE */}
          <div className={`${titleCard}`}>
            <div className={`${titleName}`}>IMAGES AND CLASSIFICATION</div>
            <img src="src/assets/icons/stats-history-icon.svg" />
          </div>

          {/* DAYS - GROUP */}
          <div className=" flex flex-col justify-center gap-0">
            <div className="flex-1 font-bold text-2xl">SELECT A DAY</div>
            <div className="flex items-center justify-center ml-4 gap-5">
              {/* FUNCION HERE */}
              <input
                type="number"
                value={indexNumber}
                onChange={(e) => {
                  inputTextHandler(e);
                }}
                onBlur={() => setIndexNumber(loadData.age)}
                className="shrink-0 h-[72px] w-1/5 py-0 font-bold text-7xl  focus:bg-white 
                
                sm:h-[60px] sm:text-5xl  
                md:h-[72px] md:text-7xl 
                border-lettronix-title-border outline-0 drop-shadow-btn-fx border-0.5 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                text-center overflow-hidden text-ellipsis whitespace-nowrap transition-all duration-200 transformation-gpu ease-in-out "
              />
              <div className="flex flex-col w-full h-full text-[16px]">
                {/* PROGRESS BAR */}
                <div className="flex flex-1 h-4">
                  {/* FUNCION HERE  */}
                  <div className="flex-1 items-end bg-lettronix-progressbar-bg rounded-full color-let overflow-auto">
                    <div
                      style={{
                        width: `${Math.min(
                          (loadData.age /
                            (loadData.age > 30 ? loadData.age : 30)) *
                            100,
                          100
                        )}%`,
                      }}
                      className="h-full drop-shadow-lettronix-title-border
                       bg-lettronix-progressbar-fg overflow-visible rounded-full text-lettronix-progressbar-fg transition-all duration-1500 transformation-gpu ease-in-out"
                    ></div>
                  </div>
                </div>
                <div className="font-bold flex-1 ">START DATE TIME:</div>
                <div className="flex-1 text-center">
                  {preferenceData.date_time}
                </div>
              </div>
            </div>
          </div>
          {/* IMAGE + CLASSIFICATION */}
          <div
            className="flex flex-col flex-1 rounded-[15px] gap-0 border-1 border-lettronix-selected hover:scale-105 hover:animation-pulse transition-transform duration-5000
          "
          >
            <img
              src={loadData.pic}
              alt="LETTUCE PLANT"
              className="h-80 object-cover rounded-t-[15px]"
            />
            <div className="flex flex-col justify-center bg-lettronix-bg rounded-b-[15px] pb-2">
              <div className="flex-1 font-bold text-[16px] ml-5">
                CLASSIFICATION:
              </div>
              <div className="flex-1 font-regular text-2xl text-center tracking-wider transition-all duration-300">
                {loadData.classification === 4 && "NORMAL"}
                {loadData.classification === 3 && "SLIGHT DEFICIENCY"}
                {loadData.classification === 2 && "MODERATE DEFICIENCY"}
                {loadData.classification === 1 && "SEVERE DEFICIENCY"}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div
          className={`${card} flex-grow flex flex-col w-1/2  gap-4 justify-center xl:justify-start`}
        >
          {/* OVERVIEW LINE */}
          <div className={`${titleCard}`}>
            <div className={`${titleName}`}>SENSOR DATA LOG</div>
            <img src="src/assets/icons/stats-graph-param-icon.svg" />
          </div>

          {/* SELECT PARAMETR GROUP */}
          <div className="flex-grow-1 flex flex-col justify-center gap-2 ">
            <div className="font-bold text-2xl ">SELECT A PARAMETER:</div>
            <div className="grid grid-cols-2 grid-rows-2 mx-5 gap-2">
              {/* TDS */}
              <ParamButtons label="TDS" />
              <ParamButtons label="pH" />
              <ParamButtons label="TEMPERATURE" />
              <ParamButtons label="HUMIDITY" />
            </div>
          </div>
          {useGraph(historyData, param)}
        </div>
      </div>
    </>
  );
}

export default HistoryStatsRender;
