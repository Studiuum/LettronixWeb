import { useEffect, useRef, useState } from "react";
import { MemoHeaderStatus, MemoNotifStatus } from "../hooks/memos/SensorMemos";
import "../LettronixTheme.css";
import { useOutsideClick } from "../hooks/usePopUpOutsideClick";
import Popup from "./popup";
import type {
  OtherNotifDataProps,
  SensorDataProp,
} from "../data/dataProps/dataProps";
import {
  markAllNotificationsAsRead,
  useNotification,
} from "../hooks/useNotificationData";

function HeaderRender({
  fullyconnected,
  val,
  notification,
  sensorData,
  setArraySetupRealtime,
}: {
  fullyconnected: boolean;
  val: number;
  notification: [OtherNotifDataProps[], number];
  sensorData: SensorDataProp;
  setArraySetupRealtime: React.Dispatch<React.SetStateAction<(() => void)[]>>;
}) {
  const notifWrapper = useRef<HTMLDivElement>(null);

  const {
    notificationData,
    notifStat,
    setnotificationData,
    setupNotificationRealtime,
    setNotifStat,
  } = useNotification(notification);

  const [notifPopUp, setNotifPopUp] = useState(false);

  const [sensorStat, setSensorStat] = useState<number>(
    sensorData.cal_tank < 1 ||
      sensorData.npk_tank < 1 ||
      sensorData.mag_tank < 1 ||
      sensorData.ph_down_tank < 1 ||
      sensorData.ph_up_tank < 1 ||
      sensorData.cal_mag_tank < 1
      ? 1
      : 0,
  );

  const toggleNotifPopUp = () => {
    setNotifPopUp(!notifPopUp);
    if (notifStat === 2 && notifPopUp) {
      setNotifStat(1);
      (async () => {
        let updated = await markAllNotificationsAsRead();

        console.log("UPDATED: ", updated);
        if (updated.success) {
          // Update local state: change seen to true for any notification that was false
          setnotificationData((prevData) =>
            prevData.map((notif) =>
              notif.seen === false ? { ...notif, seen: true } : notif,
            ),
          );
        }
      })();
    }
    // console.log("POPUP VAL: ", notifPopUp);
  };
  useOutsideClick(notifWrapper, toggleNotifPopUp, notifPopUp);
  // ATTACHED REALTIME LISTENER FOR NOTIFICATION TABLE
  useEffect(() => {
    console.log("SENSOR REALTIME LISTENER ATTACHED TO RECONNECTION");
    setArraySetupRealtime((prev: (() => void)[]) => [
      ...prev,
      setupNotificationRealtime,
    ]);
    return () => {
      console.log("SENSOR REALTIME LISTENER REMOVED TO RECONNECTION");
      setArraySetupRealtime((prev: (() => void)[]) =>
        prev.filter((x) => {
          return x !== setupNotificationRealtime;
        }),
      );
    };
  }, []);

  useEffect(() => {
    // console.log("SENSOR DATA CHANGES UPDATES");
    setSensorStat(
      sensorData.cal_tank < 1 ||
        sensorData.npk_tank < 1 ||
        sensorData.mag_tank < 1 ||
        sensorData.ph_down_tank < 1 ||
        sensorData.ph_up_tank < 1 ||
        sensorData.cal_mag_tank < 1
        ? 1
        : 0,
    );

    // console.log("SENSOR STATUS: (THIS IS LATE)", sensorStat);
  }, [sensorData]);

  return (
    <div className="fixed top-0 right-0 left-0 z-50 mx-5 flex flex-col rounded-b-[1.25rem] bg-lettronix-bg pt-2 shadow-header-only-fx sm:mx-7 md:mx-9 lg:pt-3 xl:static xl:top-auto xl:right-auto xl:left-auto xl:z-[1] xl:mx-0 xl:mt-0 xl:mb-0 xl:rounded-none xl:bg-none xl:pt-0 xl:pb-0 xl:shadow-none min-1024-768:static min-1024-768:top-auto min-1024-768:right-auto min-1024-768:left-auto min-1024-768:mx-0 min-1024-768:mt-0 min-1024-768:mb-0 min-1024-768:rounded-none min-1024-768:bg-none min-1024-768:pt-0 min-1024-768:pb-0 min-1024-768:shadow-none">
      <div className="flex items-center justify-center gap-0 divide-x divide-black rounded-[0.7rem] bg-green-600 p-3 drop-shadow-btn-fx lg:rounded-[15px] lg:py-4 xl:z-0">
        {/* LEFT SIDE: Logo + Title */}
        <div className="flex w-1/2 flex-1 items-center justify-center gap-2 sm:gap-4 lg:gap-9 xl:gap-15 2xl:gap-20">
          <img
            src="/assets/lettuce.png"
            alt="Lettronix Logo"
            className="flex h-4 w-4 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 xl:h-11 xl:w-11 min-1024-768:h-8 min-1024-768:w-8"
          />
          <div className="xl:tracking-[0.25rem]; text-sm leading-none font-bold sm:text-[1.25rem] sm:tracking-[0.3rem] md:text-[1.5rem] lg:text-[1.5625rem] xl:text-[1.938rem]">
            {/* sm:text-[1rem] sm:tracking-[0.3rem] md:tracking-[0.6rem] lg:text-[1.5rem]  */}
            LETTRONIX
          </div>
        </div>

        {/* RIGHT SIDE: Status Display */}
        <div className="flex w-1/2 flex-1 items-center justify-center gap-4 text-[0.625rem] tracking-[0rem] sm:gap-4 sm:text-[1rem] lg:gap-9 lg:text-[1rem] xl:gap-15 xl:text-xl 2xl:gap-20">
          <div className="flex items-center gap-x-1">
            <div className="hidden md:block">STATUS:</div>
            System is{" "}
            <b className="sm:tracking-widest">
              {!fullyconnected && "UNAVAILABLE"}
              {val === 1 && fullyconnected && "DISABLED"}
              {val === 2 && fullyconnected && "ACTIVE"}
              {val === 3 && fullyconnected && "SUSPENDED"}
            </b>
            <MemoHeaderStatus status={val} fullyConnected={fullyconnected} />
          </div>

          <div ref={notifWrapper} className="relative">
            <button
              className="flex h-4 w-4 items-center justify-center rounded-lg hover:bg-black/5 active:bg-black/30 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 xl:h-11 xl:w-11 min-1024-768:h-8 min-1024-768:w-8"
              onClick={toggleNotifPopUp}
            >
              <MemoNotifStatus
                notifStatus={notifStat}
                sensorStatus={sensorStat}
              ></MemoNotifStatus>
            </button>

            {notifPopUp && (
              <Popup
                notification={notifStat}
                notificationData={notificationData}
                toggleNotifPopUp={toggleNotifPopUp}
                sensorData={sensorData}
                sensorStatus={sensorStat}
              ></Popup>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderRender;

{
  /* <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
	<path d="M0 0h24v24H0z" fill="none" />
	<g fill="none">
		<path fill="currentColor" d="m8.47 5.56l-5.21 9.48C1.8 17.68 1.08 19 1.66 19.98s2.09.99 5.1.99h10.46c3.02 0 4.53 0 5.11-.99c.58-.98-.15-2.3-1.61-4.95l-5.24-9.48c-1.56-2.8-2.33-4.21-3.51-4.21S10 2.74 8.47 5.56" opacity=".2" />
		<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m6.72 8.3l-2.3 4.2c-2.18 3.97-3.27 5.95-2.4 7.42s3.13 1.47 7.65 1.47h4.63c4.53 0 6.8 0 7.67-1.47c.87-1.48-.23-3.46-2.42-7.43l-2.32-4.2C14.9 4.1 13.73 2 11.97 2C10.2 2 9.04 4.1 6.72 8.32m5.28-.2v4.83" />
		<path fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12.59 17.07a.59.59 0 1 1-1.18 0a.59.59 0 0 1 1.18 0" />
	</g>
</svg> */
}
