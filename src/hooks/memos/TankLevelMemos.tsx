import { memo } from "react";

export const MemoTank = memo(
  ({ label, value }: { label: string; value: boolean }) => {
    const path = value
      ? "src/assets/icons/waterlevel-good-icon.svg"
      : "src/assets/icons/waterlevel-bad-icon.svg";
    return (
      <>
        <div className="flex flex-row items-center justify-between md:w-auto md:h-auto">
          <div className="text-[12px] sm:text-[14px] md:text-s lg:text-[18px]">
            {label}
          </div>
          <img
            src={path}
            className="w-4 h-4 center sm:w-5 sm:h-5 md:w-auto md:h-auto"
          />
        </div>
      </>
    );
  }
);
