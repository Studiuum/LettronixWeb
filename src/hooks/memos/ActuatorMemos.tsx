import { memo, useEffect, useState } from "react";
import { supabase } from "../../supabase";

/* =========================
   SUPABASE ACTION
========================= */
export async function HandleBTNClicks(label: string, value: number) {
  let change = "status";

  if (label.includes("PUMP")) change = "pump_status";
  else if (label.includes("LIGHT")) change = "light_status";
  else if (label.includes("FOLIAR")) change = "run_foliar";
  else if (label.includes("SPRINKLER")) change = "run_sprinkler";
  else if (label.includes("DRAIN")) change = "run_drain";
  else if (label.includes("MIX")) change = "run_mix";
  else if (label.includes("RECLASSIFICATION"))
    change = "plant_reclassification";

  change = change.replace(" ", "");

  const { error } = await supabase
    .from("rpi_control")
    .update({ [change]: value })
    .eq("id", 1);

  if (error) console.error("ERROR OCCURED: ", error);
}

/* =========================
   CONFIRM DIALOG
========================= */
type ConfirmDialogProps = {
  open: boolean;
  label: string;
  value: number;
  onConfirm: (label: string, value: number) => void;
  onCancel: () => void;
};

export function ConfirmDialog({
  open,
  label,
  value,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const shouldAutoConfirm =
    open &&
    (label.includes("PUMP") ||
      label.includes("LIGHT") ||
      label.includes("PAUSE"));

  useEffect(() => {
    if (shouldAutoConfirm) {
      onConfirm(label, value);
    }
  }, [shouldAutoConfirm, label, value, onConfirm]);

  if (!open || shouldAutoConfirm) return null;

  let message = `Are you sure you want to turn <b>${label
    .replace("START", "")
    .trim()}</b> on?`;

  let message2 = "This action <b>IRREVERSIBLE!</b>";

  if (label.includes("RESUME")) {
    message2 = "Re-check <b>WIRE & PIPE</b> connection first";
  }

  const btnClass =
    "duration:500 flex-1 rounded-[8px] bg-none px-[20px] py-[8px] font-semibold text-green-800 outline-1 outline-green-800 transition-all duration-300 hover:bg-green-800 hover:text-green-300 focus-visible:outline-4 active:bg-green-700 sm:rounded-[12px]";

  return (
    <div
      className="fixed inset-0 z-999 flex items-center justify-center bg-[rgba(0,0,0,0.5)]"
      onClick={onCancel}
    >
      <div
        className="flex flex-col gap-5 rounded-lg bg-lettronix-bg p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <h3 className="font-semibold tracking-[0.125rem] text-green-900">
            CONFIRM
          </h3>
          <div>
            <p dangerouslySetInnerHTML={{ __html: message }} />
            <p dangerouslySetInnerHTML={{ __html: message2 }} />
          </div>
        </div>

        <div className="flex gap-3">
          <button className={btnClass} onClick={onCancel}>
            NO
          </button>
          <button className={btnClass} onClick={() => onConfirm(label, value)}>
            YES
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================
   MAIN BUTTON
========================= */
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
    const [open, setOpen] = useState(false);

    return (
      <>
        <button
          disabled={!isActive}
          onClick={() => setOpen(true)}
          className={`${
            label.includes("START") || label.includes("RESUME")
              ? "w-[14.5ch] sm:w-[16ch]"
              : ""
          } disabled:text-opacity-[20%] rounded-[10px] bg-green-800 px-[0.5rem] py-[0.5rem] text-[0.625rem] font-medium whitespace-nowrap text-green-100 duration-300 hover:bg-green-700 focus-visible:bg-green-900 focus-visible:outline-5 focus-visible:outline-green-700 active:bg-green-900 active:outline-none disabled:pointer-events-none disabled:bg-disabled-main-btn disabled:text-green-900/30 sm:rounded-[12px] sm:px-[1rem] sm:py-[0.625rem] sm:text-[0.875rem] sm:font-semibold md:text-[0.875rem] xl:px-5 xl:py-[0.625rem]`}
        >
          {label}
        </button>

        <ConfirmDialog
          open={open}
          label={label}
          value={val}
          onCancel={() => setOpen(false)}
          onConfirm={(label, value) => {
            setOpen(false);
            HandleBTNClicks(label, value);
          }}
        />
      </>
    );
  },
);

/* =========================
   OTHER BUTTON
========================= */
export const MemoOtherBtn = memo(
  ({
    label,
    isActive,
    val,
  }: {
    label: string;
    isActive: boolean;
    val: number;
  }) => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <button
          disabled={!isActive}
          onClick={() => setOpen(true)}
          className="duration:500 flex-1 rounded-[8px] bg-green-200 px-[20px] py-[8px] font-semibold text-green-800 outline-1 outline-green-800 transition-all duration-300 hover:bg-green-600 focus-visible:outline-4 active:bg-green-700 disabled:pointer-events-none disabled:bg-disabled-main-btn disabled:text-green-800/30 disabled:outline-2 sm:rounded-[12px]"
        >
          {label}
        </button>

        <ConfirmDialog
          open={open}
          label={label}
          value={val}
          onCancel={() => setOpen(false)}
          onConfirm={(label, value) => {
            setOpen(false);
            HandleBTNClicks(label, value);
          }}
        />
      </>
    );
  },
);
