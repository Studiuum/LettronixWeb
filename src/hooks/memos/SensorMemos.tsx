import { memo } from "react";

export const MemoHeaderStatus = memo(({ status }: { status: number }) => {
  let color: string = "text-status-active";

  if (status === 1) color = "text-status-stop";
  if (status === 2) color = "text-status-active";
  if (status === 3) color = "text-status-pause";

  return (
    <svg
      className={`flex justify-center items-center w-2 h-2 md:w-3 md:h-3 xl:w-4 xl:h-4 ${color}`}
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 12 12"
    >
      <circle
        cx="6"
        cy="6"
        r="6"
        fill="currentColor"
        strokeWidth="0.1"
        stroke="#000"
      />
    </svg>
  );
});

export const MemoTDS = memo(({ value }: { value: number }) => {
  const stringVal = value === 0 ? "0000" : value.toString().padStart(4, "-");
  return <div className="flex-1 text-2xl font-medium">{stringVal}</div>;
});

export const MemopH = memo(({ value }: { value: number }) => {
  const formatter = Intl.NumberFormat("en-us", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
  return <div className="flex-1 text-2xl font-medium">{formatter}</div>;
});

export const MemoTemp = memo(({ value }: { value: number }) => {
  const formatter = Intl.NumberFormat("en-us", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
  return <div className="flex-1 text-2xl font-medium">{formatter}°C</div>;
});

export const MemoHum = memo(({ value }: { value: number }) => {
  const formatter = Intl.NumberFormat("en-us", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
  return <div className="flex-1 text-2xl font-medium">{formatter}%</div>;
});
