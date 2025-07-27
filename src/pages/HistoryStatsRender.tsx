import { useState, type ChangeEvent } from "react";
import type {
  DailyDataProp,
  OutletContextProp,
} from "../data/dataProps/dataProps";

import "../LettronixTheme.css";
import { ParamGraph } from "../components/ParamGraph";
import { useLoaderData, useOutletContext } from "react-router";
import TitleCard from "../components/TitleCards";
import ImageClassCard from "../components/ImageClassCard";

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
    historyData[historyData.length - 1],
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
    const borderColorMap: Record<string, string> = {
      TDS: "border-TDS-param",
      pH: "border-pH-param",
      TEMPERATURE: "border-TEMPERATURE-param",
      HUMIDITY: "border-HUMIDITY-param",
    };

    const activeColorMap: Record<string, string> = {
      TDS: "active:bg-TDS-param",
      pH: "active:bg-pH-param",
      TEMPERATURE: "active:bg-TEMPERATURE-param",
      HUMIDITY: "active:bg-HUMIDITY-param",
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
          className={`rounded-[10px] border-3 ${borderColorMap[label]} ${activeColorMap[label]} px-[0.5rem] py-[0.5rem] text-center text-[0.625rem] font-medium hover:outline-2 active:outline-none sm:rounded-[12px] sm:px-[1rem] sm:py-[0.625rem] sm:text-[0.875rem] md:text-[0.875rem] xl:px-3 xl:py-[0.625rem]`}
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
      <div className="flex h-full w-full flex-1 flex-grow justify-center gap-10 overflow-hidden bg-violet-600">
        {/* LEFT SIDE */}
        <div className="main-card flex-grow justify-start overflow-hidden xl:w-1/2">
          {/* IMAGE AND CLASSIFICATION LINE */}
          <TitleCard label={"images and classification"} />
          <ImageClassCard
            preferenceData={preferenceData}
            indexNumber={indexNumber}
            setIndexNumber={setIndexNumber}
            loadData={loadData}
            inputTextHandler={inputTextHandler}
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="main-card flex flex-grow flex-col overflow-hidden xl:w-1/2">
          {/* OVERVIEW LINE */}
          <TitleCard label={"sensor data log"} />

          {/* SELECT PARAMETR GROUP */}
          <div className="flex flex-shrink-0 flex-col justify-center gap-2">
            <div className="large-body-sub-title">SELECT A PARAMETER:</div>
            <div className="mx-5 grid grid-cols-2 grid-rows-2 gap-2">
              {/* TDS */}
              <ParamButtons label="TDS" />
              <ParamButtons label="pH" />
              <ParamButtons label="TEMPERATURE" />
              <ParamButtons label="HUMIDITY" />
            </div>
          </div>
          <div className="h-full w-full flex-1 overflow-hidden">
            <ParamGraph historyData={historyData} param={param} />
          </div>
        </div>
      </div>
    </>
  );
}

export default HistoryStatsRender;
