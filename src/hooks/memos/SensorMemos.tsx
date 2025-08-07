import { memo } from "react";

export const MemoHeaderStatus = memo(
  ({ status, fullyConnected }: { status: number; fullyConnected: boolean }) => {
    let color: string = "text-status-active";

    if (!fullyConnected) color = "text-black";
    else {
      if (status === 1) color = "text-status-stop";
      if (status === 2) color = "text-status-active";
      if (status === 3) color = "text-status-pause";
    }
    return (
      <svg
        className={`flex h-2 w-2 items-center justify-center md:h-3 md:w-3 xl:h-4 xl:w-4 ${color}`}
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
  },
);

export const MemoTDS = memo(({ value }: { value: number }) => {
  return (
    <div className="width-full text-[0.75rem] font-medium sm:text-[1rem] md:text-[1.25rem]">
      {value}{" "}
      <span className="text-xs leading-none sm:text-[0.75rem] md:text-lg xl:text-[1rem]">
        ppm
      </span>
    </div>
  );
});

export const MemopH = memo(({ value }: { value: number }) => {
  const formatter = Intl.NumberFormat("en-us", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
  return (
    <div className="width-full text-[0.75rem] font-medium whitespace-nowrap sm:text-[1rem] md:text-[1.25rem]">
      {formatter}
    </div>
  );
});

export const MemoTemp = memo(({ value }: { value: number }) => {
  const formatter = Intl.NumberFormat("en-us", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
  return (
    <div className="width-full text-[0.75rem] font-medium whitespace-nowrap sm:text-[1rem] md:text-[1.25rem]">
      {formatter}°C
    </div>
  );
});

export const MemoHum = memo(({ value }: { value: number }) => {
  const formatter = Intl.NumberFormat("en-us", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
  return (
    <div className="width-full text-[0.75rem] font-medium whitespace-nowrap sm:text-[1rem] md:text-[1.25rem]">
      {formatter}%
    </div>
  );
});
