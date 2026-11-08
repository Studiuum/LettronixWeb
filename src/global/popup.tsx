import type {
  OtherNotifDataProps,
  SensorDataProp,
} from "../data/dataProps/dataProps";

function ImportantMessage({
  notification,
  sensorData,
  sensorStatus,
}: {
  notification: number;
  sensorData: SensorDataProp;
  sensorStatus: number;
}) {
  return (
    <>
      {sensorStatus === 1 && (
        <>
          <div className="mx-3 flex flex-col justify-center gap-0 md:mx-5">
            <div className="md:text-s flex flex-row gap-4 py-2 text-[0.625rem] sm:text-[0.875rem] md:items-center lg:text-[1rem]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                viewBox="0 0 24 24"
                className="h-[10%] w-[10%] opacity-80 sm:inline md:block md:h-[15%] md:w-[15%]"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <g fill="none">
                  <path
                    className="fill-red-600/60"
                    d="m8.47 5.56l-5.21 9.48C1.8 17.68 1.08 19 1.66 19.98s2.09.99 5.1.99h10.46c3.02 0 4.53 0 5.11-.99c.58-.98-.15-2.3-1.61-4.95l-5.24-9.48c-1.56-2.8-2.33-4.21-3.51-4.21S10 2.74 8.47 5.56"
                  />
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    opacity={1}
                    d="m6.72 8.3l-2.3 4.2c-2.18 3.97-3.27 5.95-2.4 7.42s3.13 1.47 7.65 1.47h4.63c4.53 0 6.8 0 7.67-1.47c.87-1.48-.23-3.46-2.42-7.43l-2.32-4.2C14.9 4.1 13.73 2 11.97 2C10.2 2 9.04 4.1 6.72 8.32m5.28-.2v4.83"
                  />
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    opacity={1}
                    d="M12.59 17.07a.59.59 0 1 1-1.18 0a.59.59 0 0 1 1.18 0"
                  />
                </g>
              </svg>
              <div className="flex flex-1 flex-col gap-0">
                <div className="md:text-s text-[0.625rem] font-bold sm:text-[0.875rem] lg:text-[1rem]">
                  <span className="hidden sm:inline">ALERT :</span> LOW
                  CONCENTRATED NUTRIENT TANK(s)
                </div>
                <div className="">
                  Refill the tanks to prevent disruptions to automation
                  processes (TDS and pH regulation).
                </div>
                <div className="m-0 grid justify-baseline gap-x-3 p-0">
                  <div className="col-span-2 flex flex-0 flex-col italic">
                    <span className="">
                      Low Tanks:{" "}
                      <span className="sm:text-s inline text-[0.5rem] leading-[0.25] italic xl:text-xs">
                        (approx.)
                      </span>
                    </span>
                  </div>
                  <div
                    className={`${sensorData.npk_tank == 1 ? "hidden" : ""}`}
                  >
                    NPK <span className="hidden md:inline">Tank</span> :{" "}
                    <span className="font-[550]">
                      {Math.abs(sensorData.npk_tank as number)}mL
                    </span>
                  </div>
                  <div
                    className={`${sensorData.cal_tank == 1 ? "hidden" : ""}`}
                  >
                    Calcium <span className="hidden md:inline">Tank</span> :{" "}
                    <span className="font-[550]">
                      {Math.abs(sensorData.cal_tank as number)}mL
                    </span>
                  </div>
                  <div
                    className={`${sensorData.mag_tank == 1 ? "hidden" : ""}`}
                  >
                    Magnesium <span className="hidden md:inline">Tank</span> :{" "}
                    <span className="font-[550]">
                      {Math.abs(sensorData.mag_tank as number)}mL
                    </span>
                  </div>
                  <div
                    className={`${sensorData.ph_down_tank == 1 ? "hidden" : ""}`}
                  >
                    pH Down <span className="hidden md:inline">Tank</span> :{" "}
                    <span className="font-[550]">
                      {Math.abs(sensorData.ph_down_tank as number)}mL
                    </span>
                  </div>
                  <div
                    className={`${sensorData.ph_up_tank == 1 ? "hidden" : ""}`}
                  >
                    pH Up <span className="hidden md:inline">Tank</span> :{" "}
                    <span className="font-[550]">
                      {Math.abs(sensorData.ph_up_tank as number)}mL
                    </span>
                  </div>
                  <div
                    className={`${sensorData.cal_mag_tank == 1 ? "hidden" : ""}`}
                  >
                    Cal-Mag <span className="hidden md:inline">Tank</span> :{" "}
                    <span className="font-[550]">
                      {Math.abs(sensorData.cal_mag_tank as number)}mL
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {(notification === 1 || notification === 2) && sensorStatus === 0 && (
        <>
          <div className="flex flex-1 items-center justify-center gap-2 py-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              viewBox="0 0 24 24"
              className="h-[10%] w-[10%] opacity-80"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <g fill="none">
                <circle
                  cx="12"
                  cy="12"
                  r="10.22"
                  className={`fill-status-active/50`}
                  transform="rotate(90 12 12)"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="10.22"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  opacity={0.5}
                  transform="rotate(90 12 12)"
                />
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  opacity={0.5}
                  d="m7.18 12.77l1.55 1.9c.71.88 1.07 1.32 1.55 1.32s.83-.45 1.55-1.33l5-6.16"
                />
              </g>
            </svg>
            No issues Detected
          </div>
        </>
      )}
    </>
  );
}

function OtherMessages({ dataList }: { dataList: OtherNotifDataProps[] }) {
  return (
    <>
      <div className="mx-0 flex flex-1 flex-col-reverse">
        {dataList.map((notif: OtherNotifDataProps) => {
          let dateTime: string;
          try {
            dateTime = new Date(
              notif.created_at.replace(" ", "T"),
            ).toLocaleString("en-US", {
              year: "numeric",
              month: "short", // e.g., July
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            });
          } catch (error: unknown) {
            dateTime = "Unavailable DateTime Format";
          }

          let titleMessage = "MAIN SYSTEM CONTROLS";
          let background = "bg-bg-success/60";
          let color = "fill-status-active/60";
          let icon = "success";
          let contentMessage = "The cycle has resumed (or has started).";

          if (notif.status === 5) {
            icon = "";
            let conce = notif.field.split(":")[1].replace(" ", "");
            contentMessage = `Solution mixed at new concentration (${conce})`;
            titleMessage = "NUTRIENT INTEREVENTION";
            background = "bg-[#a2e62e]/30";
            color = "fill-status-pause/60";
          } else if (
            notif.field === "MAIN" &&
            (notif.status === 1 || notif.status === 3)
          ) {
            background = "bg-bg-warn/60";
            color = "fill-status-pause/60";
            icon = "warn";
            contentMessage =
              notif.status === 1
                ? "The cycle has Ended."
                : "The cycle has been Paused";
          } else if (notif.field === "PUMP") {
            titleMessage = "PUMP CONTROLS";
            contentMessage =
              notif.status === 1
                ? "Water pump has been turned ON."
                : "Water pump has been turned OFF";
          } else if (notif.field === "LIGHT") {
            titleMessage = "LIGHT CONTROLS";
            contentMessage =
              notif.status === 1
                ? "Grow lights has been turned ON."
                : "Grow lights has been turned OFF";
          } else if (notif.field !== "MAIN") {
            titleMessage = `${notif.field} OPERATIONS`;
            contentMessage =
              notif.status === 1
                ? `${notif.field} task has been added to the queue.`
                : notif.status === 2
                  ? `${notif.field} task is being processed`
                  : `${notif.field} task has been completed.`;

            background =
              notif.status === 1
                ? "bg-bg-info/30"
                : notif.status === 2
                  ? "bg-bg-load/60"
                  : "bg-bg-success/60";

            icon =
              notif.status === 1
                ? "info"
                : notif.status === 2
                  ? "load"
                  : "success";

            color =
              notif.status === 1
                ? "fill-fg-info/60"
                : notif.status === 2
                  ? "fill-fg-load/60"
                  : "fill-status-active/60";
          }
          let controller = notif.rpi ? "Automation" : "Manual";
          titleMessage = `${titleMessage} - ${controller}`;
          return (
            <div
              key={`notification-${notif.id}`}
              className={`md:text-s flex flex-1 flex-col text-[0.625rem] sm:text-[0.875rem] lg:text-[1rem]`}
            >
              <div
                className={`flex-1 border-b-1 border-lettronix-progressbar-bg/20 ${background} py-2`}
              >
                <div className="flex flex-row items-center gap-3 px-3 pb-1 sm:gap-4 md:px-5">
                  {notif.status === 5 && (
                    <>
                      <img
                        src="/assets/lettuce.png"
                        alt="lettuce.icon"
                        className="h-[10%] w-[10%] object-contain"
                      />
                    </>
                  )}
                  {icon === "success" && (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        height="100%"
                        viewBox="0 0 24 24"
                        className="h-[10%] w-[10%] opacity-80"
                      >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <g fill="none">
                          <circle
                            cx="12"
                            cy="12"
                            r="10.22"
                            className={`${color}`}
                            transform="rotate(90 12 12)"
                          />
                          <circle
                            cx="12"
                            cy="12"
                            r="10.22"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            opacity={0.5}
                            transform="rotate(90 12 12)"
                          />
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            opacity={0.5}
                            d="m7.18 12.77l1.55 1.9c.71.88 1.07 1.32 1.55 1.32s.83-.45 1.55-1.33l5-6.16"
                          />
                        </g>
                      </svg>
                    </>
                  )}

                  {icon === "warn" && (
                    <>
                      {/* className="h-[15%] w-[15%] opacity-100" */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        height="100%"
                        viewBox="0 0 24 24"
                        className="h-[10%] w-[10%] opacity-80"
                      >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <g fill="none">
                          <path
                            className={`${color}`}
                            d="m8.47 5.56l-5.21 9.48C1.8 17.68 1.08 19 1.66 19.98s2.09.99 5.1.99h10.46c3.02 0 4.53 0 5.11-.99c.58-.98-.15-2.3-1.61-4.95l-5.24-9.48c-1.56-2.8-2.33-4.21-3.51-4.21S10 2.74 8.47 5.56"
                          />
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            opacity={1}
                            d="m6.72 8.3l-2.3 4.2c-2.18 3.97-3.27 5.95-2.4 7.42s3.13 1.47 7.65 1.47h4.63c4.53 0 6.8 0 7.67-1.47c.87-1.48-.23-3.46-2.42-7.43l-2.32-4.2C14.9 4.1 13.73 2 11.97 2C10.2 2 9.04 4.1 6.72 8.32m5.28-.2v4.83"
                          />
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            opacity={1}
                            d="M12.59 17.07a.59.59 0 1 1-1.18 0a.59.59 0 0 1 1.18 0"
                          />
                        </g>
                      </svg>
                    </>
                  )}
                  {icon === "info" && (
                    <>
                      {/* className="h-[15%] w-[15%] opacity-100" */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        height="100%"
                        viewBox="0 0 24 24"
                        className="h-[10%] w-[10%] opacity-80"
                      >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <g fill="none">
                          <circle
                            cx="12"
                            cy="12"
                            r="10.18"
                            opacity="1"
                            transform="rotate(90 12 12)"
                            className={`${color}`}
                          />
                          <circle
                            cx="12"
                            cy="12"
                            r="10.18"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            transform="rotate(90 12 12)"
                          />
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M10.6 10.67h.4c.47 0 .7 0 .85.14s.15.39.15.86v5.76m-1.74 0h3.48"
                          />
                          <path
                            fill="currentColor"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12.57 7.08a.57.57 0 1 1-1.14 0a.57.57 0 0 1 1.14 0"
                          />
                        </g>
                      </svg>
                    </>
                  )}
                  {icon === "load" && (
                    <>
                      {/* className="h-[15%] w-[15%] opacity-100" */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        height="100%"
                        viewBox="0 0 24 24"
                        className="h-[10%] w-[10%] opacity-80"
                      >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <g fill="none">
                          <path
                            className={`${color}`}
                            d="m6.55 15.86l-1.37 6h13.5l-1.15-6L15.21 13l-3.4-1.68L8.86 13z"
                            opacity="1"
                          />
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M5.22 21.69c0-5.46 3.04-9.88 6.78-9.88s6.78 4.42 6.78 9.88M5.22 2.3c0 5.25 3.04 9.5 6.78 9.5s6.78-4.25 6.78-9.5m1.26 19.39H3.96M20.04 2.3H3.96"
                          />
                        </g>
                      </svg>
                    </>
                  )}
                  <div className="flex flex-col">
                    <div className="font-[400]">{dateTime}</div>
                    <div className="font-bold">{titleMessage}</div>
                    <div className="italic">{contentMessage}</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

function Popup({
  notification,
  notificationData,
  toggleNotifPopUp,
  sensorData,
  sensorStatus,
}: {
  notification: number;
  notificationData: OtherNotifDataProps[];
  toggleNotifPopUp: () => void;
  sensorData: SensorDataProp;
  sensorStatus: number;
}) {
  const color = sensorStatus === 0 ? "bg-[#D6F5D6]" : "bg-red-600/20";
  return (
    <div
      className="absolute top-[110%] right-0 z-[100] flex h-fit max-h-[80vh] w-[80vw] flex-1 flex-col overflow-x-hidden overflow-y-scroll scroll-smooth rounded-lg bg-green-400 shadow-[0px_5px_20px_rgba(0,0,0,0.3)] lg:rounded-xl xl:h-fit xl:max-h-[50vh] xl:w-[40vw]"
      onClick={(e) => {
        if ((e.target as HTMLElement).tagName === "A") {
          toggleNotifPopUp();
        }
      }}
    >
      <div className="relative flex flex-1 flex-col">
        <div className="sticky top-0 z-[50] flex flex-1 items-center justify-between bg-green-400 py-3 text-[0.75rem] leading-none font-bold tracking-[0rem] text-green-900 sm:text-[1rem] md:text-[1.250rem] lg:text-[1.5rem] xl:pt-5 xl:pb-3">
          <div className="ml-3 font-extrabold md:ml-5"> NOTIFICATIONS</div>
          <button
            className="group mr-3 h-[1rem] w-[1rem] transition-all duration-400 ease-in-out hover:rotate-180 hover:duration-400 sm:h-[1.25rem] sm:w-[1.25rem] md:mr-5 md:h-[1.5rem] md:w-[1.5rem] lg:h-[1.75rem] lg:w-[1.75rem]"
            onClick={toggleNotifPopUp}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              viewBox="0 0 1024 1024"
            >
              <path d="M0 0h1024v1024H0z" className="fill-black/0" />
              <path
                className="fill-black/100 transition-colors duration-200 group-hover:fill-black/20"
                d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448s448-200.6 448-448S759.4 64 512 64m0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372s372 166.6 372 372s-166.6 372-372 372"
              />
              <path
                className="fill-black/30 transition-colors duration-200 group-hover:fill-white/50"
                d="M512 140c-205.4 0-372 166.6-372 372s166.6 372 372 372s372-166.6 372-372s-166.6-372-372-372m171.8 527.1c1.2 1.5 1.9 3.3 1.9 5.2c0 4.5-3.6 8-8 8l-66-.3l-99.3-118.4l-99.3 118.5l-66.1.3c-4.4 0-8-3.6-8-8c0-1.9.7-3.7 1.9-5.2L471 512.3l-130.1-155a8.32 8.32 0 0 1-1.9-5.2c0-4.5 3.6-8 8-8l66.1.3l99.3 118.4l99.4-118.5l66-.3c4.4 0 8 3.6 8 8c0 1.9-.6 3.8-1.8 5.2l-130.1 155z"
              />
              <path
                className="fill-black/100 transition-colors duration-200 group-hover:fill-black/50"
                d="M685.8 352c0-4.4-3.6-8-8-8l-66 .3l-99.4 118.5l-99.3-118.4l-66.1-.3c-4.4 0-8 3.5-8 8c0 1.9.7 3.7 1.9 5.2l130.1 155l-130.1 154.9a8.32 8.32 0 0 0-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3l99.3-118.5L611.7 680l66 .3c4.4 0 8-3.5 8-8c0-1.9-.7-3.7-1.9-5.2L553.9 512.2l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2"
              />
            </svg>
          </button>
        </div>
        {/* TOP SECTION OF NOTIF */}
        <div className="mb-3.5 flex flex-1 flex-col gap-2">
          <div className="mx-3 text-[0.75rem] leading-none font-medium tracking-[0rem] text-green-900 sm:text-[1rem] md:mx-5 md:text-[1rem] lg:text-[1.250rem]">
            IMPORTANT MESSAGES
          </div>
          <div className={`flex-1 ${color}`}>
            <ImportantMessage
              notification={notification}
              sensorData={sensorData}
              sensorStatus={sensorStatus}
            ></ImportantMessage>
          </div>
        </div>

        {/* BOTTOM SECTION OF NOTIF */}
        <div className="flex flex-1 flex-col gap-2">
          <div className="mx-3 flex-1 gap-1 text-[0.75rem] leading-none font-medium tracking-[0rem] text-green-900 sm:text-[1rem] md:mx-5 md:text-[1rem] lg:text-[1.250rem]">
            OTHER NOTIFICATIONS
          </div>
          <OtherMessages dataList={notificationData}></OtherMessages>
        </div>
      </div>
    </div>
  );
}

export default Popup;
