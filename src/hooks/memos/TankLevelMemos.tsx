import { memo } from "react";

export const MemoTank = memo(
  ({ label, value }: { label: string; value: boolean }) => {
    const path = value
      ? "src/assets/icons/waterlevel-good-icon.svg"
      : "src/assets/icons/waterlevel-bad-icon.svg";
    return (
      <>
        <div className="flex flex-row items-center justify-between">
          <div className="text-s">{label}</div>
          <img src={path} />
        </div>
      </>
    );
  }
);
