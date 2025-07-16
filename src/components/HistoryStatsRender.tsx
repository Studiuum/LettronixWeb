import "../LettronixTheme.css";

const card =
  "flex flex-col p-5 bg-lettronix-card-bg drop-shadow-all-fx font-Inter rounded-2xl border-0.25 border-lettronix-card-border gap-2";

const titleCard =
  "flex items-center justify-between border-b-1 border-lettronix-title-border pb-2";

const titleName = "font-medium text-xl tracking-widest";

interface SensorCardProps {
  label: string;
  value: number;
}

function RenderSensorReadingsCard({ label, value }: SensorCardProps) {
  let fileName: string;
  let stringVal: string;

  if (label === "TEMP") {
    fileName = "temperature";
    stringVal = `${value}°C`;
  } else if (label == "HUM") {
    fileName = "humidity";
    stringVal = `${value}%`;
  } else {
    fileName = label;
    stringVal = `${value}`;
  }

  return (
    <div className="flex flex-col flex-1 justify-center items-center font-bold gap-2">
      <img src={`icons/${fileName}-reading-icon.svg`} className="w-12 h-12" />
      <div className="flex-1 text-xl">{label}</div>
      <div className="flex-1 text-2xl font-medium">{stringVal}</div>
    </div>
  );
}

const controlBtn =
  "px-[20px] py-[10px] rounded-[20px] drop-shadow-btn-fx bg-lettronix-btn hover:bg-lettronix-hover active:bg-lettronix-selected active:drop-shadow-none active:inset-shadow-inward-all-fx disabled:bg-lettronix-btn-disabled disabled:drop-shadow-none disabled:inset-shadow-inward-all-fx disabled:text-white disabled:cursor-events-none transition active:scale-99 duration-300";

function HistoryStatRender() {
  return (
    <>
      <div className="flex flex-1 w-full h-full justify-center gap-10">
        {/* LEFT SIDE */}
        <div className={`${card} w-1/2 justify-between`}>
          {/* OVERVIEW LINE */}
          <div className={`${titleCard}`}>
            <div className={`${titleName}`}>IMAGE AND CLASSIFICATIONS</div>
            <img src="icons/overview-icon.svg" />
          </div>

          {/* DAYS - GROUP */}
          <div className=" flex flex-col justify-center gap-0">
            <div className="flex-1 font-bold text-3xl">DAY</div>
            <div className="flex items-center justify-center ml-4 gap-5">
              {/* FUNCION HERE */}
              <input
                type="text"
                value={99}
                className="shrink-0 w-1/5 font-bold text-7xl text-center overflow-hidden text-ellipsis whitespace-nowrap bg-gray-100 drop-shadow-btn-fx border-0.5 border-lettronix-title-border outline-0 focus:bg-lettronix-img-class"
              />

              <div className="flex flex-col w-full h-full text-[16px]">
                {/* PROGRESS BAR */}
                <div className="flex flex-1 h-4">
                  {/* FUNCION HERE  */}
                  <div className="flex-1 bg-lettronix-progressbar-bg rounded-full color-let">
                    <div className="h-full bg-lettronix-progressbar-fg  rounded-full w-[30%] text-lettronix-progressbar-fg p-0.5"></div>
                  </div>
                </div>
                <div className="font-bold flex-1 ">START DATE TIME:</div>
                <div className="flex-1 text-center">JULY 14, 2025 8:00 AM</div>
              </div>
            </div>
          </div>
          {/* IMAGE + CLASSIFICATION */}
          <div className="flex flex-col flex-1 rounded-[15px] gap-0 border-1 border-lettronix-selected">
            <img
              src="/WIN_20250331_18_16_58_Pro.jpg"
              className="w-full h-70 object-cover flex-1 rounded-t-[15px]"
            />
            <div className="flex flex-col justify-center bg-lettronix-img-class rounded-b-[15px] pb-2">
              <div className="flex-1 font-bold text-[16px] ml-5">
                CLASSIFICATION:
              </div>
              <div className="flex-1 font-regular text-2xl text-center tracking-wider">
                MODERATE DEFICIENT
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col w-1/2  gap-3 justify-center"></div>
      </div>
    </>
  );
}

export default HistoryStatRender;
