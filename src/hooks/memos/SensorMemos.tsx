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

export const MemoNotifStatus = memo(
  ({
    notifStatus,
    sensorStatus,
  }: {
    notifStatus: number;
    sensorStatus: number;
  }) => {
    let color = "fill-red-600/60";
    let color2 = "fill-red-600 animate-pulse";

    if (sensorStatus === 1) {
      color = "fill-red-600/60";
      color2 = "fill-red-600 animate-pulse";
    } else if (notifStatus === 1 || notifStatus === 2) {
      color = "fill-black/30";
      color2 = "fill-status-pause";
    }

    if ((notifStatus === 2 && sensorStatus === 0) || sensorStatus === 1) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="80%"
          height="80%"
          viewBox="0 0 24 24"
        >
          <g fill="none">
            <path
              className={`${color}`}
              fillRule="evenodd"
              d="M19.6 18.57c.48 0 .73 0 .93-.04a2 2 0 0 0 1.55-1.55c.04-.2.04-.45.04-.94v-.38a2 2 0 0 0-.62-1.28l-.34-.39c-.46-.53-.7-.79-.82-1.1l-.03-.08c-.11-.33-.11-.68-.11-1.38V7.84h-3.3l-1.81-2.4l1.18-2.8s.25-.01-.89-.45C14.02 1.66 12 1.77 12 1.77h-.25a8 8 0 0 0-7.89 7.89v2.66a2 2 0 0 1-.39 1l-.26.3l-.69.76l-.25.29a2 2 0 0 0-.38 1l-.01.39c0 .47 0 .71.04.9a2 2 0 0 0 1.56 1.57c.2.04.44.04.91.04z"
              clipRule="evenodd"
            ></path>
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20.2 11.3v.14a4 4 0 0 0 .15 1.45c.13.32.36.58.82 1.1l.34.4q.18.19.24.29a2 2 0 0 1 .38.98v.39c0 .48 0 .72-.04.93a2 2 0 0 1-1.55 1.55c-.2.04-.44.04-.93.04H4.37c-.47 0-.7 0-.9-.04a2 2 0 0 1-1.56-1.57c-.04-.2-.04-.43-.04-.9v-.38a2 2 0 0 1 .64-1.3l1.33-1.47l.01-.02V9.76c0-4.4 3.57-7.97 7.97-7.97l.79.05M7.66 18.57c0 2.05 1.94 3.7 4.34 3.7s4.34-1.65 4.34-3.7"
            ></path>

            <circle
              cx={18.32}
              cy={4.84}
              r={3.08}
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              transform="rotate(-90 18.32 4.84)"
            ></circle>

            <circle
              className={`${color2}`}
              cx={18.32}
              cy={4.84}
              r={3.08}
              transform="rotate(-90 18.32 4.84)"
            ></circle>
          </g>
        </svg>
      );
    } else if (notifStatus === 1) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="80%"
          height="80%"
          viewBox="0 0 24 24"
        >
          <g fill="none">
            <path
              className={`${color}`}
              d="M21.5 14.4q.17.18.24.28a2 2 0 0 1 .38 1.37c0 .48 0 .72-.04.92a2 2 0 0 1-1.56 1.56c-.2.04-.44.04-.92.04H4.38c-.47 0-.7 0-.9-.04a2 2 0 0 1-1.56-1.57c-.04-.2-.04-.43-.04-.9v-.37a2 2 0 0 1 .4-1.02l.24-.28l1.34-1.47V9.95c0-4.5 3.64-8.14 8.14-8.14a8.2 8.2 0 0 1 8.2 8.2v2.9z"
            ></path>
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="m21.5 14.38l.25.3a2 2 0 0 1 .38.98v.39c0 .48 0 .72-.04.93a2 2 0 0 1-1.55 1.55c-.2.04-.44.04-.93.04H4.37c-.47 0-.7 0-.9-.04a2 2 0 0 1-1.56-1.57c-.04-.2-.04-.43-.04-.9v-.38a2 2 0 0 1 .64-1.3l1.33-1.47l.01-.02V9.94c0-4.5 3.65-8.15 8.15-8.15a8.2 8.2 0 0 1 8.2 8.2v2.9l.01.02zM7.66 18.57c0 2.05 1.94 3.7 4.34 3.7s4.34-1.65 4.34-3.7"
            ></path>
          </g>
        </svg>
      );
    }
  },
);
