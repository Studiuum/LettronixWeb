import type { ChangeEvent } from "react";
import type {
  DailyDataProp,
  PreferencesProp,
} from "../data/dataProps/dataProps";

export default function ImageClassCard({
  preferenceData,
  indexNumber,
  setIndexNumber,
  loadData,
  inputTextHandler,
}: {
  preferenceData: PreferencesProp;
  indexNumber?: number | string;
  setIndexNumber?: (val: number) => void;
  loadData?: DailyDataProp;
  inputTextHandler?: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  const age = loadData ? loadData.age : preferenceData.age;
  const classification = loadData
    ? loadData.classification
    : preferenceData.lettuce_classify;
  return (
    <>
      <div className="flex flex-grow-0 flex-col justify-start gap-0">
        <div className="large-body-sub-title">
          {/* sm:text-[1rem] md:flex-1 md:text-2xl */}
          {loadData ? "SELECT A DAY" : "DAY"}
        </div>
        <div className="ml-2 flex h-full gap-2 md:ml-4 md:gap-5">
          {/* FUNCION HERE */}
          <input
            type="number"
            value={indexNumber != undefined ? indexNumber : age}
            onChange={
              inputTextHandler
                ? (e) => {
                    inputTextHandler(e);
                  }
                : () => {}
            }
            onBlur={setIndexNumber ? () => setIndexNumber(age) : () => {}}
            disabled={loadData ? false : true}
            className="focus: border-0.5 w-[2.5ch] flex-shrink transform-gpu appearance-none overflow-hidden border-lettronix-title-border py-0 text-center text-5xl leading-none font-bold text-ellipsis whitespace-nowrap outline-0 drop-shadow-btn-fx transition-all duration-200 ease-in-out focus:bg-white sm:h-[60px] sm:text-6xl md:h-[72px] md:text-7xl xl:text-[4.6875rem]"
          />
          {/* {preferenceData.age} */}
          {/* 99 */}

          <div className="flex w-full flex-1 flex-col justify-center text-[0.625rem] sm:text-[14px] lg:text-[16px]">
            {/* PROGRESS BAR */}
            <div className="flex h-4 flex-1">
              {/* FUNCION HERE  */}
              <div className="flex-1 overflow-hidden rounded-full bg-green-700">
                <div
                  style={{
                    width: `${Math.min(
                      (age / (age > 30 ? age : 30)) * 100,
                      100,
                    )}%`,
                  }}
                  className="transformation-gpu h-full rounded-full bg-green-900 p-0.5 text-lettronix-progressbar-fg transition-all duration-1500 ease-in-out"
                ></div>
              </div>
            </div>
            <div className="flex-1 font-bold">START DATE TIME:</div>
            <div className="flex-1 text-center">{preferenceData.date_time}</div>
          </div>
        </div>
      </div>

      {/* IMAGE + CLASSIFICATION */}
      <div className="flex flex-1 flex-col overflow-hidden rounded-[8px] border-1 border-lettronix-selected transition-transform duration-5000 hover:scale-105 md:rounded-[15px] md:hover:scale-103">
        {/* Image block */}
        <div className="flex flex-col overflow-hidden sm:h-125 md:h-110 xl:flex-1">
          <img
            src={loadData ? loadData.pic : preferenceData.lettuce_pic_url}
            alt="LETTUCE PLANT"
            className="h-full w-full object-cover object-center"
          />
        </div>

        {/* Text block */}
        <div className="flex flex-none flex-col justify-center gap-1 rounded-b-[8px] p-2 md:rounded-b-[15px]">
          <div className="text-[12px] font-bold sm:text-[14px] md:text-[16px]">
            CLASSIFICATION:
          </div>
          <div className="text-center text-[14px] tracking-wider sm:text-[16px] md:text-2xl">
            {classification === 4 && "NORMAL"}
            {classification === 3 && "SLIGHT DEFICIENCY"}
            {classification === 2 && "MODERATE DEFICIENCY"}
            {classification === 1 && "SEVERE DEFICIENCY"}
          </div>
        </div>
      </div>
    </>
  );
}
