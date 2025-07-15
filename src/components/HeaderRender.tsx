import "../LettronixTheme.css";

function HeaderRender() {
  return (
    <div className="flex flex-row flex-1 items-center justify-center gap-1 py-4 divide-x divide-black rounded-[15px] bg-lettronix_head_foot_bg drop-shadow-all-fx">
      {/* LEFT SIDE: Logo + Title */}
      <div className="flex flex-1 items-center justify-center gap-3  xl:gap-15 2xl:gap-20">
        <img
          src="public/logo/lettuce.png"
          className="flex w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-11 xl:h-11"
        />
        <div className="font-Inter font-bold tracking-[0.6rem] xl:text-[1.75rem] ">
          LETTRONIX
        </div>
      </div>

      {/* RIGHT SIDE: Status Display */}
      <div className="flex flex-1 items-center justify-center md:text-[1rem]  lg:gap-5 xl:text-xl">
        <div className="font-bold ">STATUS:</div>
        <div>System is ACTIVE</div>
        {/* FUNCTION HERE */}
        <img
          src="../public/green_dot.png"
          alt="Active"
          className="w-2 h-2 md:w-3 md:h-3 xl:w-5 xl:h-5"
        />
      </div>
    </div>
  );
}

export default HeaderRender;
