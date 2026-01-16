import { useState, type ChangeEvent } from "react";
import type {
  DailyDataProp,
  OutletContextProp,
  ParamAutomationProp,
} from "../data/dataProps/dataProps";

import "../LettronixTheme.css";
import { ParamGraph } from "../components/ParamGraph";
import { useLoaderData, useOutletContext } from "react-router";
import TitleCard from "../components/TitleCards";
import ImageClassCard from "../components/ImageClassCard";

function HistoryStatsRender() {
  const { preferenceData } = useOutletContext<OutletContextProp>();

  const { historyData, paramAutomationData } = useLoaderData<{
    historyData: DailyDataProp[];
    paramAutomationData: ParamAutomationProp[];
  }>();

  // console.log("HISTORY DATA", historyData);
  // console.log("PARAM AUTOMATION TORY DATA", paramAutomationData);

  const [loadData, setloadData] = useState<DailyDataProp>(
    historyData[historyData.length - 1],
  );

  const [indexNumber, setIndexNumber] = useState<number | string>(loadData.age);

  const [param, setParam] = useState("TDS");

  function inputTextHandler(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.value !== "") {
      const num = Number(e.target.value);
      console.log("SELECTED NUMBER: ", num);

      if (num >= 0 && num <= historyData.length - 1) {
        setloadData(historyData[num]);
        setIndexNumber(num);
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
          {`${label}`}
        </label>
      </>
    );
  }

  return (
    <>
      <div className="flex w-full flex-1 flex-col justify-center gap-2 overflow-hidden lg:gap-3 xl:flex-row xl:gap-10">
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
        <div className="main-card flex flex-[1_1_auto] flex-col xl:w-1/2 xl:overflow-hidden">
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
          <div className="max-h-[30vh] min-h-[30vh] w-full flex-1 sm:min-h-[50vh] xl:h-full xl:overflow-hidden">
            <ParamGraph
              historyData={historyData}
              paramAutomationData={paramAutomationData}
              param={param}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default HistoryStatsRender;
