import "../LettronixTheme.css";
import { GrommetIconsOverview } from "../assets/icons/overview.tsx";

function HomeWindowRender() {
  return (
    <>
      <div className="flex flex-row gap-10">
        {/* LEFT SIDE */}
        <div className="flex flex-col flex-1 justify-center p-8 bg-lettronix_card_bg drop-shadow-all-fx  font-Inter rounded-[15px] gap-2">
          {/* OVERVIEW LINE */}
          <div className="flex items-center justify-between border-b-1 border-lettronix_title_border pb-2">
            <div className=" text-xl tracking-widest">OVERVIEW</div>
            <GrommetIconsOverview />
          </div>

          {/* DAYS - GROUP */}
          <div className=" flex flex-col flex-1">
            <div className="flex-1 font-bold text-3xl">DAY</div>
            <div className="flex flex-1 items-center  justify-center ml-4 gap-5">
              {/* FUNCION HERE */}
              <div className="shrink-0 w-30 font-bold text-7xl text-center">
                30
              </div>
              <div className="flex-row flex-1 text-[16px] gap-[1rem]">
                {/* PROGRESS BAR */}
                <div className="flex flex-1 h-4">
                  {/* FUNCION HERE  */}
                  <div className="flex-1 bg-lettronix_progressbar_bg rounded-full color-let">
                    <div className="h-full bg-lettronix_progressbar_fg  rounded-full w-[30%] text-lettronix_progressbar_fg p-0.5"></div>
                  </div>
                </div>
                <div className="font-bold flex-1 ">START DATE TIME:</div>
                <div className="flex-1 text-center">JULY 14, 2025 8:00 AM</div>
              </div>
            </div>
          </div>
          {/* IMAGE + CLASSIFICATION */}
          <div className="flex flex-col flex-1 rounded-[15px] gap-0 border-1 border-lettronix_selected">
            <img
              src="public/WIN_20250331_18_16_58_Pro.jpg"
              className="w-ull h-70 object-cover flex-1 rounded-t-[15px]"
            />
            <div className="flex flex-col justify-center bg-lettronix_img_class rounded-b-[15px] pb-2">
              <div className="flex-1 font-bold text-[16px] ml-5">
                CLASSIFICATION:
              </div>
              <div className="flex-1 font-medium text-2xl text-center bg">
                MODERATE DEFICIENT
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 p-8 bg-lettronix_card_bg drop-shadow-all-fx  font-Inter rounded-[15px] gap-2">
          {/* OVERVIEW LINE */}
          <div className="flex items-center justify-between border-b-1 border-lettronix_title_border pb-2">
            <div className=" text-2xl tracking-widest">OVERVIEW</div>
            <GrommetIconsOverview />
          </div>
          {/* DAYS - GROUP */}
          <div className=" flex flex-col flex-1">
            <div className="flex-1 font-bold text-3xl">DAY</div>
            <div className="flex flex-1 items-center  justify-center ml-15 gap-5">
              {/* FUNCION HERE */}
              <div className=" font-bold text-7xl bg-amber-600">09</div>

              <div className="flex-row flex-1 text-[16px] gap-[1rem] bg-amber-300">
                {/* PROGRESS BAR */}
                <div className="flex flex-1 h-4">
                  {/* FUNCION HERE  */}
                  <div className="flex-1 bg-lettronix_progressbar_bg rounded-full color-let">
                    <div className="h-full bg-lettronix_progressbar_fg  rounded-full w-[30%] text-lettronix_progressbar_fg p-0.5"></div>
                  </div>
                </div>
                <div className="font-bold flex-1 ">START DATE TIME:</div>
                <div className="flex-1 text-center">JULY 14, 2025 8:00 AM</div>
              </div>
            </div>
          </div>
          {/* IMAGE + CLASSIFICATION */}
          <div className="flex flex-col flex-1 rounded-[15px]">
            <img
              src="public/WIN_20250331_18_16_58_Pro.jpg"
              className="w-90 h-70 object-cover flex-1"
            />
            <div className="flex-1 font-bold text-[16px]">CLASSIFICATION:</div>
            <div className="flex-1 font-medium text-3xl">
              MODERATE DEFICIENT:
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeWindowRender;
