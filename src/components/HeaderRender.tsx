import "../LettronixTheme.css";

function HeaderRender() {
  return (
    <div className="flex w-full items-center justify-center py-4 divide-x divide-black rounded-[15px] bg-lettronix-head-foot-bg drop-shadow-btn-fx">
      {/* LEFT SIDE: Logo + Title */}
      <div className="flex w-1/2 flex-1 items-center justify-center gap-3 xl:gap-15 2xl:gap-20">
        <img
          src="/logo/lettuce.png"
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
        <svg
          className="flex justify-center items-center w-2 h-2 md:w-3 md:h-3 xl:w-4 xl:h-4 text-status-active"
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
            stroke-width="0.1"
            stroke="#000"
          />
        </svg>
      </div>
    </div>
  );
}

export default HeaderRender;
