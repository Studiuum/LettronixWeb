import { MemoHeaderStatus } from "../hooks/memos/SensorMemos";

import "../LettronixTheme.css";
// "flex items-center justify-center py-4 divide-x rounded-[15px] divide-black  bg-lettronix-head-foot-bg drop-shadow-btn-fx"
import logo from "../assets/lettuce.png";
function HeaderRender({
  fullyconnected,
  val,
}: {
  fullyconnected: boolean;
  val: number;
}) {
  return (
    <div className="fixed top-0 right-0 left-0 z-50 mx-5 flex flex-col rounded-b-[1.25rem] bg-lettronix-bg pt-2 shadow-header-only-fx sm:mx-7 md:mx-9 lg:pt-3 xl:static xl:top-auto xl:right-auto xl:left-auto xl:z-[1] xl:mx-0 xl:mt-0 xl:mb-0 xl:rounded-none xl:bg-none xl:pt-0 xl:pb-0 xl:shadow-none min-1024-768:static min-1024-768:top-auto min-1024-768:right-auto min-1024-768:left-auto min-1024-768:mx-0 min-1024-768:mt-0 min-1024-768:mb-0 min-1024-768:rounded-none min-1024-768:bg-none min-1024-768:pt-0 min-1024-768:pb-0 min-1024-768:shadow-none">
      <div className="flex items-center justify-center gap-0 divide-x divide-black rounded-[0.7rem] bg-green-600 p-3 drop-shadow-btn-fx lg:rounded-[15px] lg:py-4 xl:z-0">
        {/* LEFT SIDE: Logo + Title */}
        <div className="lg:gap-90= flex w-1/2 flex-1 items-center justify-center gap-2 sm:gap-4 xl:gap-15 2xl:gap-20">
          <img
            src={logo}
            alt="Lettronix Logo"
            className="flex h-4 w-4 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 xl:h-11 xl:w-11 min-1024-768:h-8 min-1024-768:w-8"
          />
          <div className="xl:tracking-[0.25rem]; text-sm leading-none font-bold sm:text-[1.25rem] sm:tracking-[0.3rem] md:text-[1.5rem] lg:text-[1.5625rem] xl:text-[1.938rem]">
            {/* sm:text-[1rem] sm:tracking-[0.3rem] md:tracking-[0.6rem] lg:text-[1.5rem]  */}
            LETTRONIX
          </div>
        </div>

        {/* RIGHT SIDE: Status Display */}
        <div className="flex w-1/2 flex-1 items-center justify-center gap-x-2 text-[0.625rem] tracking-[0rem] sm:text-[1rem] lg:gap-2 lg:text-[1rem] xl:text-xl">
          <div className="hidden md:block">STATUS:</div>
          <div>
            System is{" "}
            <b className="sm:tracking-widest">
              {!fullyconnected && "UNAVAILABLE"}
              {val === 1 && fullyconnected && "DISABLED"}
              {val === 2 && fullyconnected && "ACTIVE"}
              {val === 3 && fullyconnected && "SUSPENDED"}
            </b>
          </div>

          {/* FUNCTION HERE */}
          <MemoHeaderStatus status={val} fullyConnected={fullyconnected} />
        </div>
      </div>
    </div>
  );
}

export default HeaderRender;
