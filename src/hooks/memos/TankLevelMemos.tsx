import { memo } from "react";

export const MemoTank = memo(
  ({ label, value }: { label: string; value: boolean }) => {
    const path = value
      ? "src/assets/icons/waterlevel-good-icon.svg"
      : "src/assets/icons/waterlevel-bad-icon.svg";
    return (
      <>
        <div className="flex flex-row items-center justify-between md:h-auto md:w-auto">
          <div className="md:text-s text-[0.625rem] font-[400] sm:text-[0.875rem] lg:text-[1rem]">
            {label}
          </div>
          <img
            src={path}
            className="center h-4 w-4 sm:h-5 sm:w-5 md:h-auto md:w-auto"
          />
        </div>
      </>
    );
  },
);
