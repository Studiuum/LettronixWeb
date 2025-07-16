import "../LettronixTheme.css";

const card =
  "flex p-5 bg-lettronix-card-bg drop-shadow-all-fx font-Inter rounded-2xl border-0.25 border-lettronix-card-border";

const titleCard =
  "flex items-center justify-between border-b-1 border-lettronix-title-border pb-2";

const titleName = " font-medium text-xl tracking-widest";

const controlBtn =
  "px-[20px] py-[10px] rounded-[20px] drop-shadow-btn-fx bg-lettronix-btn hover:bg-lettronix-hover active:bg-lettronix-selected active:drop-shadow-none active:inset-shadow-inward-all-fx disabled:bg-lettronix-btn-disabled disabled:drop-shadow-none disabled:inset-shadow-inward-all-fx disabled:text-white disabled:cursor-events-none transition active:scale-99 duration-300";

const otherControlBtn =
  "flex-1 px-[20px] py-[8px] rounded-[20px] drop-shadow-btn-fx bg-lettronix-btn hover:bg-lettronix-hover active:bg-lettronix-selected active:drop-shadow-none active:inset-shadow-inward-all-fx disabled:bg-lettronix-btn-disabled disabled:drop-shadow-none disabled:inset-shadow-inward-all-fx disabled:text-white disabled:cursor-events-none transition active:scale-99 duration-300";

const helpBTN = "w-4 hover:scale-120 active:scale-80 transition duration-200";
function ControlCenterRender() {
  return (
    <>
      <div className="flex flex-col gap-3">
        <div className={`${card} flex-row  items-align`}>
          <div className="w-1/2 flex flex-row items-center gap-2">
            <div className={`${titleName}`}>MAIN CONTROL</div>
            <button className="text-sm">
              <img src="/icons/help-icon.svg" className={`${helpBTN}`} />
            </button>
          </div>
          <div className=" w-1/2 flex flex-row justify-between px-20">
            <button className={`${controlBtn}`}>START CYCLE</button>
            <button className={`${controlBtn}`}>PAUSE</button>
            <button className={`${controlBtn}`} disabled={true}>
              END CYCLE
            </button>
          </div>
        </div>
        <div className={`${card} flex-col items-align`}>
          <div
            className={`${titleName} pb-2 border-b-1 border-lettronix-title-border`}
          >
            OTHER CONTROLS
          </div>
          <div className="grid grid-cols-[2fr_2fr_3fr] grid-rows-6 h-full items-center gap-y-7 p-2 ml-5">
            {/* Name + Help Icon */}
            <div className="flex gap-2 items-center ">
              <div className="text-xl font-normal">Pump Control</div>
              <button className="text-sm">
                <img src="/icons/help-icon.svg" className={`${helpBTN}`} />
              </button>
            </div>

            {/* Status */}
            <div className="italic  ">STATUS: Pump Running</div>

            {/* Buttons */}
            <div className="flex justify-center gap-5 px-5">
              <button className={`${otherControlBtn}`}>PUMP ON</button>
              <button className={`${otherControlBtn}`}>PUMP OFF</button>
            </div>

            {/* Name + Help Icon */}
            <div className="flex gap-2 items-center">
              <div className="text-xl font-normal">Light Control</div>
              <button className="text-sm">
                <img src="/icons/help-icon.svg" className={`${helpBTN}`} />
              </button>
            </div>

            {/* Status */}
            <div className="italic ">STATUS: Light On</div>

            {/* Buttons */}
            <div className="flex justify-center gap-5 px-5">
              <button className={`${otherControlBtn}`}>LIGHT ON</button>
              <button className={`${otherControlBtn}`}>LIGHT OFF</button>
            </div>

            {/* Name + Help Icon */}
            <div className="flex gap-2 items-center">
              <div className="text-xl font-normal">Run Foliar</div>
              <button className="text-sm">
                <img src="/icons/help-icon.svg" className={`${helpBTN}`} />
              </button>
            </div>

            {/* Status */}
            <div className="italic">STATUS: Not Running</div>

            {/* Buttons */}
            <div className="flex justify-center gap-5 px-5">
              <button className={`${otherControlBtn}`}>START FOLIAR</button>
            </div>

            {/* Name + Help Icon */}
            <div className="flex gap-2 items-center">
              <div className="text-xl font-normal">Run Sprinkler</div>
              <button className="text-sm">
                <img src="/icons/help-icon.svg" className={`${helpBTN}`} />
              </button>
            </div>

            {/* Status */}
            <div className="italic">STATUS: Not Running</div>

            {/* Buttons */}
            <div className="flex justify-center gap-5 px-5">
              <button className={`${otherControlBtn}`}>START SPRINKLER</button>
            </div>

            {/* Name + Help Icon */}
            <div className="flex gap-2 items-center">
              <div className="text-xl font-normal">Run Drain</div>
              <button className="text-sm">
                <img src="/icons/help-icon.svg" className={`${helpBTN}`} />
              </button>
            </div>

            {/* Status */}
            <div className="italic">STATUS: N/A Conflicting Action</div>

            {/* Buttons */}
            <div className="flex justify-center gap-5 px-5">
              <button className={`${otherControlBtn}`}>START DRAIN</button>
            </div>

            {/* Name + Help Icon */}
            <div className="flex gap-2 items-center">
              <div className="text-xl font-normal">Run Drain and Mix</div>
              <button className="text-sm">
                <img src="/icons/help-icon.svg" className={`${helpBTN}`} />
              </button>
            </div>

            {/* Status */}
            <div className="italic">STATUS: Drain and Mix Running</div>

            {/* Buttons */}
            <div className="flex justify-center gap-5 px-5">
              <button className={`${otherControlBtn}`}>
                START DRAIN AND MIX
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ControlCenterRender;
