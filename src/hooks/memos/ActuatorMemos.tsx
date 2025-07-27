import { memo } from "react";

import { supabase } from "../../supabase";

async function HandleBTNClicks(label: string, value: number) {
  let change = "status";

  // FIXED: use label.includes(...) instead of "TEXT".includes(label)
  if (label.includes("PUMP")) change = "pump_status";
  else if (label.includes("LIGHT")) change = "light_status";
  else if (label.includes("FOLIAR"))
    change = "run_foliar"; // fixed casing
  else if (label.includes("SPRINKLER"))
    change = "run_sprinkler"; // fixed casing
  else if (label.includes("DRAIN")) change = "run_drain";
  else if (label.includes("MIX")) change = "run_mix";
  console.log("CHANGE:", change, "WITH VALUE: ", value);
  change.replace(" ", "");
  const { data, error } = await supabase
    .from("rpi_control")
    .update({ [change]: value })
    .eq("id", 1)
    .select();
  console.log(data, error);
}

export const MemoBtn = memo(
  ({
    label,
    isActive,
    val,
  }: {
    label: string;
    isActive: boolean;
    val: number;
  }) => {
    return (
      <>
        <button
          disabled={!isActive}
          onClick={() => HandleBTNClicks(label, val)}
          className={`${label.includes("START") || label.includes("RESUME") ? "w-[14.5ch] sm:w-[16ch]" : ""} disabled:text-opacity-[20%] rounded-[10px] bg-green-800 px-[0.5rem] py-[0.5rem] text-[0.625rem] font-medium text-green-100 duration-300 hover:bg-green-700 focus-visible:bg-green-900 focus-visible:outline-5 focus-visible:outline-green-700 active:bg-green-900 active:outline-none disabled:pointer-events-none disabled:bg-disabled-main-btn disabled:text-green-900/30 sm:rounded-[12px] sm:px-[1rem] sm:py-[0.625rem] sm:text-[0.875rem] sm:font-semibold md:text-[0.875rem] xl:px-5 xl:py-[0.625rem]`}
        >
          {label}
        </button>
      </>
    );
  },
);

export const MemoOtherBtn = memo(
  ({
    label,
    isActive,
    val,
  }: {
    label: string;
    isActive: boolean;
    val: number;
    setVal: (x: number) => void;
  }) => {
    return (
      <>
        <button
          disabled={!isActive}
          onClick={() => HandleBTNClicks(label, val)}
          className="disaled:scale-10 duration:500 flex-1 rounded-[8px] bg-green-200 px-[20px] py-[8px] font-semibold text-green-800 outline-1 outline-green-800 transition-all duration-300 hover:bg-green-600 focus-visible:outline-4 active:bg-green-700 disabled:pointer-events-none disabled:bg-disabled-main-btn disabled:text-green-800/30 disabled:outline-2 sm:rounded-[12px]"
        >
          {label}
        </button>
      </>
    );
  },
);
