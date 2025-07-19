import { MemoHeaderStatus } from "../hooks/memos/SensorMemos";

import "../LettronixTheme.css";

function HeaderRender({ val }: { val: number }) {
  return (
    <div className="flex w-full items-center justify-center py-4 divide-x divide-black rounded-[15px] bg-lettronix-head-foot-bg drop-shadow-btn-fx">
      {/* LEFT SIDE: Logo + Title */}
      <div className="flex w-1/2 flex-1 items-center justify-center gap-3 xl:gap-15 2xl:gap-20">
        <img
          src="src/assets/lettuce.png"
          className="flex w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-11 xl:h-11"
        />
        <div className="font-Inter font-bold tracking-[0.6rem] xl:text-[1.75rem] ">
          LETTRONIX
        </div>
      </div>

      {/* RIGHT SIDE: Status Display */}
      <div className="flex w-1/2 flex-1 items-center justify-center md:text-[1rem] lg:gap-5 xl:text-xl">
        <div>STATUS:</div>
        <div>
          System is <b>ACTIVE</b>
        </div>

        {/* FUNCTION HERE */}
        <MemoHeaderStatus status={val} />
      </div>
    </div>
  );
}

export default HeaderRender;
