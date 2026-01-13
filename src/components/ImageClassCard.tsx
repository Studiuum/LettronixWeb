import type { ChangeEvent } from "react";
import type {
  DailyDataProp,
  PreferencesProp,
} from "../data/dataProps/dataProps";
import { HandleBTNClicks } from "../hooks/memos/ActuatorMemos";

function imageBlock(pic: string) {
  return (
    <>
      {/* Image block */}
      <div className="flex flex-col overflow-hidden sm:h-125 md:h-110 xl:flex-1">
        <img
          src={pic}
          alt="LETTUCE PLANT"
          className="h-full w-full object-cover object-center"
        />
      </div>
    </>
  );
}

function EmptyImage() {
  return (
    <>
      <div className="bg-red flex h-60 flex-col items-center justify-center overflow-hidden bg-gray-200 text-gray-400 sm:h-125 md:h-110">
        <div className="flex items-center justify-center">
          <svg
            className="h-[50%] w-[50%] lg:block"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M3.464 3.464C2 4.93 2 7.286 2 12s0 7.071 1.464 8.535C4.93 22 7.286 22 12 22s7.071 0 8.535-1.465C22 19.072 22 16.714 22 12s0-7.071-1.465-8.536C19.072 2 16.714 2 12 2S4.929 2 3.464 3.464"
              clipRule="evenodd"
              opacity="0.5"
            />
            <path
              fill="currentColor"
              d="M8.504 13.177a1.55 1.55 0 0 0-2.183-.073l-.81.753a.75.75 0 0 1-1.021-1.1l.81-.752a3.05 3.05 0 0 1 4.296.143l2.647 2.81a.795.795 0 0 0 1.054.092a3.07 3.07 0 0 1 3.953.241l2.268 2.167a.75.75 0 0 1-1.036 1.084l-2.268-2.166a1.57 1.57 0 0 0-2.02-.123a2.295 2.295 0 0 1-3.043-.266zM18 8a2 2 0 1 1-4 0a2 2 0 0 1 4 0"
            />
          </svg>
        </div>
      </div>
    </>
  );
}
export default function ImageClassCard({
  preferenceData,
  indexNumber,
  setIndexNumber,
  loadData,
  inputTextHandler,
  main = false,
}: {
  preferenceData: PreferencesProp;
  indexNumber?: number | string;
  setIndexNumber?: (val: number) => void;
  loadData?: DailyDataProp;
  inputTextHandler?: (e: ChangeEvent<HTMLInputElement>) => void;
  main?: boolean;
}) {
  const age = loadData ? loadData.age : preferenceData.age;
  const classification = loadData
    ? loadData.classification
    : preferenceData.lettuce_classify;
  const pic = loadData ? loadData.pic : preferenceData.lettuce_pic_url;

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
        {/* IMAGE BLOCK */}
        {pic === "" || !pic ? EmptyImage() : imageBlock(pic)}
        {/* Text block */}
        <div className="flex flex-none flex-col justify-center gap-1 rounded-b-[8px] p-2 md:rounded-b-[15px]">
          <div className="flex flex-1 flex-row items-center justify-between">
            <div className="text-[12px] font-bold sm:text-[14px] md:text-[16px]">
              CLASSIFICATION:
            </div>
            {main ? (
              <button
                className="mx-1 flex items-center justify-center rounded-full bg-amber-50 outline-0 transition-colors hover:bg-green-700 active:bg-green-900 md:mx-2"
                title="Refresh"
                onClick={() => HandleBTNClicks("RECLASSIFICATION", 1)} // <-- uses your useState
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="md:x-[24px] h-[18px] text-green-900 active:text-green-700 md:h-full lg:h-full lg:p-[0.5px]"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 20q-3.35 0-5.675-2.325T4 12t2.325-5.675T12 4q1.725 0 3.3.712T18 6.75V5q0-.425.288-.712T19 4t.713.288T20 5v5q0 .425-.288.713T19 11h-5q-.425 0-.712-.288T13 10t.288-.712T14 9h3.2q-.8-1.4-2.187-2.2T12 6Q9.5 6 7.75 7.75T6 12t1.75 4.25T12 18q1.7 0 3.113-.862t2.187-2.313q.2-.35.563-.487t.737-.013q.4.125.575.525t-.025.75q-1.025 2-2.925 3.2T12 20"
                  ></path>
                </svg>
              </button>
            ) : (
              ""
            )}
          </div>
          <div className="text-center text-[14px] tracking-wider sm:text-[16px] md:text-2xl">
            {classification === 0
              ? "NORMAL"
              : classification === 1 ||
                  classification === 2 ||
                  classification === 3
                ? " DEFICIENT"
                : "NOT YET CLASSIFIED"}
          </div>
        </div>
      </div>
    </>
  );
}
