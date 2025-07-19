import { useEffect, useState, type ChangeEvent } from "react";
import type { DailyDataProp } from "../data/dataProps/dataProps";
import { useHistory } from "../hooks/useHistory";
import { usePreferences } from "../hooks/usePreferences";
import "../LettronixTheme.css";

const card =
  "flex flex-col p-5 bg-lettronix-card-bg drop-shadow-all-fx font-Inter rounded-2xl border-0.25 border-lettronix-card-border gap-2";

const titleCard =
  "flex items-center justify-between border-b-1 border-lettronix-title-border pb-2";

const titleName = "font-medium text-xl tracking-widest";

const controlBtn =
  "px-[20px] py-[10px] rounded-[20px] text-xl drop-shadow-btn-fx active:drop-shadow-none hover:drop-shadow-all-fx active:inset-shadow-inward-all-fx active:animate-pulse[10] disabled:bg-lettronix-btn-disabled disabled:drop-shadow-none disabled:inset-shadow-inward-all-fx disabled:text-white disabled:cursor-events-none transition active:scale-99 duration-300";

function HistoryStatsRender() {
  const { historyData, loadData, setloadData, indexNumber, setIndexNumber } =
    useHistory();
  const prefeferenceData = usePreferences();
  console.log(loadData);
  console.log(loadData.pic);

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

  return (
    <>
      <div className="flex flex-1 w-full h-full justify-center gap-10">
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
                className="shrink-0 h-[72px] w-1/5 py-0 font-bold text-7xl text-center overflow-hidden text-ellipsis whitespace-nowrap focus:bg-white 
                drop-shadow-btn-fx border-0.5 border-lettronix-title-border outline-0 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                transsition-all duration-200"
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
                      className="h-full
                       bg-lettronix-progressbar-fg overflow-visible rounded-full text-lettronix-progressbar-fg transition-all duration-1500 transformation-gpu ease-in-out"
                    ></div>
                  </div>
                </div>
                <div className="font-bold flex-1 ">START DATE TIME:</div>
                <div className="flex-1 text-center">
                  {prefeferenceData.date_time}
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
        <div className={`${card} flex flex-col w-1/2  gap-3 justify-center`}>
          {/* OVERVIEW LINE */}
          <div className={`${titleCard}`}>
            <div className={`${titleName}`}>SENSOR DATA LOG</div>
            <img src="src/assets/icons/stats-graph-param-icon.svg" />
          </div>

          {/* SELECT PARAMETR GROUP */}
          <div className="flex flex-col justify-center gap-2 ">
            <div className="font-bold text-2xl ">SELECT A PARAMETER:</div>
            <div className="flex flex-col mx-10 gap-2">
              {/* TDS */}
              <input
                type="radio"
                name="parameter"
                value="TDS"
                id="TDS RADIO"
                className="form-radio hidden"
              />
              <label
                htmlFor="TDS RADIO"
                className={`${controlBtn} flex justify-center bg-TDS-param hover:bg-lettronix-hover  active:bg-TDS-param`}
              >
                TDS READING
              </label>
              {/* TDS */}
              <input
                type="radio"
                name="parameter"
                value="pH"
                id="pH RADIO"
                className="form-radio hidden"
              />
              <label
                htmlFor="pH RADIO"
                className={`${controlBtn} flex justify-center bg-pH-param hover:bg-lettronix-hover  active:bg-pH-param`}
              >
                pH READING
              </label>
              {/* TEMP */}
              <input
                type="radio"
                name="parameter"
                value="TEMP"
                id="TEMP RADIO"
                className="form-radio hidden"
              />
              <label
                htmlFor="TEMP RADIO"
                className={`${controlBtn} flex justify-center bg-TEMP-param hover:bg-lettronix-hover  active:bg-TEMP-param`}
              >
                TEMPERATURE READING
              </label>
              {/* HUM */}
              <input
                type="radio"
                name="parameter"
                value="HUM"
                id="HUM RADIO"
                className="form-radio hidden"
              />
              <label
                htmlFor="HUM RADIO"
                className={`${controlBtn} flex justify-center bg-HUM-param hover:bg-lettronix-hover  active:bg-HUM-param`}
              >
                HUMIDITY READING
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HistoryStatsRender;
