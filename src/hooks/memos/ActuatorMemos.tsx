import { memo } from "react";

import { supabase } from "../../supabase";

async function HandleBTNClicks(label: string, value: number) {
  let change = "status";

  // FIXED: use label.includes(...) instead of "TEXT".includes(label)
  if (label.includes("PUMP")) change = "pump_status";
  else if (label.includes("LIGHT")) change = "light_status";
  else if (label.includes("FOLIAR")) change = "run_foliar"; // fixed casing
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
          className={`px-[20px] py-[10px] rounded-[20px] drop-shadow-btn-fx bg-lettronix-btn 
            hover:bg-lettronix-hover hover:drop-shadow-all-fx 
            active:bg-lettronix-selected active:drop-shadow-none active:inset-shadow-inward-all-fx 
         
            disabled:bg-lettronix-btn-disabled disabled:drop-shadow-none disabled:inset-shadow-inward-all-fx disabled:text-white disabled:pointer-events-none disaled:scale-10 
            transition  duration-300"`}
        >
          {label}
        </button>
      </>
    );
  }
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
          className={`flex-1 px-[20px] py-[8px] rounded-[20px] drop-shadow-btn-fx bg-lettronix-btn
            hover:bg-lettronix-hover hover:drop-shadow-all-fx 
            active:bg-lettronix-selected active:drop-shadow-none active:inset-shadow-inward-all-fx 

            disabled:bg-lettronix-btn-disabled disabled:drop-shadow-none disabled:inset-shadow-inward-all-fx disabled:text-white disabled:pointer-events-none disaled:scale-10 
            transition  duration-300"`}
        >
          {label}
        </button>
      </>
    );
  }
);
