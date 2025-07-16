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
function HomeWindowRender() {
  return (
    <>
      <div className="flex flex-1 w-full h-full justify-center gap-10">
        {/* LEFT SIDE */}
        <div className={`${card} w-1/2 justify-between`}>
          {/* OVERVIEW LINE */}
          <div className={`${titleCard}`}>
            <div className={`${titleName}`}>OVERVIEW</div>
            <img src="icons/overview-icon.svg" />
          </div>

          {/* DAYS - GROUP */}
          <div className=" flex flex-col justify-center gap-0">
            <div className="flex-1 font-bold text-3xl">DAY</div>
            <div className="flex items-center justify-center ml-4 gap-5">
              {/* FUNCION HERE */}
              <div className="shrink-0 w-1/6 font-bold text-7xl text-center">
                30
              </div>
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
        <div className="flex flex-col w-1/2  gap-3 justify-center">
          {/* SENSOR READINGS */}
          <div className={`${card} flex-1`}>
            {/* SENSOR READINGS LINE */}
            <div className={`${titleCard}`}>
              <div className={`${titleName}`}>SENSOR READINGS</div>
              <img src="icons/sensor-reading-icon.svg" />
            </div>
            <div className="flex flex-row flex-1 justify-center items-center">
              <RenderSensorReadingsCard label="TDS" value={9999} />
              <RenderSensorReadingsCard label="pH" value={99.99} />
              <RenderSensorReadingsCard label="TEMP" value={99.99} />
              <RenderSensorReadingsCard label="HUM" value={99.99} />
            </div>
          </div>
          {/* WATER LEVEL SENSOR */}
          <div className="flex-1 grid grid-cols-2 grid-rows-5 gap-x-5 gap-y-0 p-5 bg-lettronix-card-bg drop-shadow-all-fx font-Inter rounded-[15px]">
            {/* WATER LEVEL SENSOR LINE */}
            <div className={`${titleCard} col-span-2`}>
              <div className={`${titleName}`}>TANK LEVEL</div>
              <img src="icons/waterlevel-icon.svg" />
            </div>

            <div className="flex flex-row items-center justify-between">
              <div className="text-s">NUTRIENT TANK</div>
              <img src="icons/waterlevel-good-icon.svg" />
            </div>

            <div className="flex flex-row items-center justify-between">
              <div className="text-s">FOLIAR TANK</div>
              <img src="icons/waterlevel-bad-icon.svg" />
            </div>

            <div className="flex flex-row items-center justify-between">
              <div className="text-s">CALCIUM TANK</div>
              <img src="icons/waterlevel-good-icon.svg" />
            </div>

            <div className="flex flex-row items-center justify-between">
              <div className="text-s">NPK TANK</div>
              <img src="icons/waterlevel-good-icon.svg" />
            </div>

            <div className="flex flex-row items-center justify-between">
              <div className="text-s">MAGNESIUM TANK</div>
              <img src="icons/waterlevel-good-icon.svg" />
            </div>

            <div className="flex flex-row items-center justify-between">
              <div className="text-s">pH UP TANK</div>
              <img src="icons/waterlevel-good-icon.svg" />
            </div>

            <div className="flex flex-row items-center justify-between">
              <div className="text-s">pH DOWN TANK</div>
              <img src="icons/waterlevel-good-icon.svg" />
            </div>

            <div className="flex flex-row items-center justify-between">
              <div className="text-s">CAL-MAG TANK</div>
              <img src="icons/waterlevel-good-icon.svg" />
            </div>
          </div>
          <div className={`${card}`}>
            {/* SENSOR READINGS LINE */}
            <div className={`${titleCard}`}>
              <div className={`${titleName}`}>MAIN CONTROL</div>
              <img src="icons/main-control-icon.svg" />
            </div>
            <div className="flex flex-row justify-center gap-3 items-center mx-10">
              <button className={`${controlBtn}`}>START CYCLE</button>
              <button className={`${controlBtn}`}>PAUSE</button>
              <button className={`${controlBtn}`} disabled={true}>
                END CYCLE
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeWindowRender;
