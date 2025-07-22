import { useOutletContext } from "react-router";
import type { OutletContextProp } from "../data/dataProps/dataProps";
import "../LettronixTheme.css";
import { MemoBtn, MemoOtherBtn } from "../hooks/memos/ActuatorMemos";

const card =
  "flex p-5 bg-lettronix-card-bg drop-shadow-all-fx font-Inter rounded-2xl border-0.25 border-lettronix-card-border";

const titleName = " font-medium text-xl tracking-widest";

const helpBTN =
  "w-4 hover:scale-120 hover:animation-pulse transition duration-200";

function ControlCenterRender() {
  const { contextData } = useOutletContext<OutletContextProp>();

  // CONTROL DATA
  const rpiControlData = contextData.values;
  const setFunctions = contextData.setFunctions;

  function StatusMSG(label: string, status: number) {
    let message;

    if (
      ["FOLIAR", "SPRINKLER", "DRAIN", "MIX", "PUMP"].includes(label) &&
      status === 2
    ) {
      let running = "";

      if (label === "FOLIAR") {
        running = "Sprinkler";
      } else if (label === "SPRINKLER") {
        running = "Foliar";
      } else if (label === "DRAIN") {
        running = "Mix";
      } else if (label === "MIX") {
        running = "Drain";
      } else if (label === "PUMP") {
        running = "Drain or Mix";
      }

      message = `STATUS: Conflicting w/ ${running}!`;
    } else {
      if (status === 1) {
        message = `STATUS: ${label} is running`;
      } else if (status === 0) {
        message = `STATUS: ${label} is not running`;
      } else {
        message = `STATUS: Unknown status for ${label} ${status}`;
      }
    }

    return message;
  }
  return (
    <>
      <div className="flex flex-1 flex-col gap-3 ">
        <div className={`${card} flex-row  items-align`}>
          <div className="w-1/2 flex flex-row items-center gap-2 ">
            <div className={`${titleName}`}>MAIN CONTROL</div>
            <div className="relative group">
              <img
                src="src/assets/icons/help-icon.svg"
                className={`${helpBTN}`}
              />
              <div className="absolute hidden  group-hover:inline-block left-full bottom-full p-3  rounded-2xl w-120 group-active:inline-block bg-gray-900 text-white z-[100]">
                Control the hydroponic automation—start, pause, resume, or end.
                Ending the cycle means the lettuce is ready for harvest.
              </div>
            </div>
          </div>
          <div className=" w-1/2 flex flex-row justify-between px-15">
            <MemoBtn
              label="START CYCLE"
              isActive={
                rpiControlData.status === 1 || rpiControlData.status === 3
              }
              val={2}
            />
            <MemoBtn
              label="PAUSE CYCLE"
              isActive={rpiControlData.status === 2}
              val={3}
            />
            <MemoBtn
              label="END CYCLE"
              isActive={rpiControlData.status === 3}
              val={1}
            />
          </div>
        </div>
        <div className={`${card} flex-col items-align overflow-visible`}>
          <div
            className={`${titleName} pb-2 border-b-1 border-lettronix-title-border`}
          >
            OTHER CONTROLS
          </div>
          <div className="grid grid-cols-[2fr_2fr_3fr] grid-rows-6 h-full items-center gap-y-7 p-2 ml-5">
            {/* Name + Help Icon */}
            <div className="flex gap-2 items-center ">
              <div className="text-xl font-normal">Pump Control</div>
              <div className="relative group">
                <img
                  src="src/assets/icons/help-icon.svg"
                  className={`${helpBTN}`}
                />
                <div className="absolute hidden  group-hover:inline-block left-full bottom-full p-3  rounded-2xl w-120 group-active:inline-block bg-gray-900 text-white z-[100]">
                  Pump toggles are overridden when automation is running. Pause
                  automation to manually control the pump.
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="italic  ">
              {StatusMSG(
                "PUMP",
                rpiControlData.run_mix === 1 || rpiControlData.run_drain === 1
                  ? 2
                  : rpiControlData.pump_status
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-5 px-5">
              <MemoOtherBtn
                label="PUMP OFF"
                isActive={
                  rpiControlData.pump_status === 1 &&
                  rpiControlData.run_drain == 0 &&
                  rpiControlData.run_mix == 0
                }
                val={0}
                setVal={setFunctions.setPumpStatus}
              />
              <MemoOtherBtn
                label="PUMP ON"
                isActive={
                  rpiControlData.pump_status === 0 &&
                  rpiControlData.run_drain == 0 &&
                  rpiControlData.run_mix == 0
                }
                val={1}
                setVal={setFunctions.setPumpStatus}
              />
            </div>

            {/* Name + Help Icon */}
            <div className="flex gap-2 items-center">
              <div className="text-xl font-normal">Light Control</div>
              <div className="relative group">
                <img
                  src="src/assets/icons/help-icon.svg"
                  className={`${helpBTN}`}
                />
                <div className="absolute hidden  group-hover:inline-block left-full bottom-full p-3  rounded-2xl w-120 group-active:inline-block bg-gray-900 text-white z-[100]">
                  The light will stay ON or OFF regardless of whether the
                  automation process is running or not.
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="italic ">
              {StatusMSG("LIGHT", rpiControlData.light_status)}
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-5 px-5">
              <MemoOtherBtn
                label="LIGHT OFF"
                isActive={rpiControlData.light_status === 1}
                val={0}
                setVal={setFunctions.setLightStatus}
              />
              <MemoOtherBtn
                label="LIGHT ON"
                isActive={rpiControlData.light_status === 0}
                val={1}
                setVal={setFunctions.setLightStatus}
              />
            </div>

            {/* Name + Help Icon */}
            <div className="flex gap-2 items-center">
              <div className="text-xl font-normal">Run Foliar</div>
              <div className="relative group">
                <img
                  src="src/assets/icons/help-icon.svg"
                  className={`${helpBTN}`}
                />
                <div className="absolute hidden  group-hover:inline-block left-full bottom-full p-3  rounded-2xl w-120 group-active:inline-block bg-gray-900 text-white z-[100]">
                  The foliar system uses the sprinkler but adds Cal-Mag to
                  deliver nutrients directly to the leaves.
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="italic">
              {StatusMSG(
                "FOLIAR",
                rpiControlData.run_sprinkler === 1
                  ? 2
                  : rpiControlData.run_foliar
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-5 px-5">
              <MemoOtherBtn
                label="START FOLIAR"
                isActive={
                  rpiControlData.run_foliar === 0 &&
                  rpiControlData.run_sprinkler == 0
                }
                val={1}
                setVal={setFunctions.setRunFoliar}
              />
            </div>

            {/* Name + Help Icon */}
            <div className="flex gap-2 items-center">
              <div className="text-xl font-normal">Run Sprinkler</div>
              <div className="relative group">
                <img
                  src="src/assets/icons/help-icon.svg"
                  className={`${helpBTN}`}
                />
                <div className="absolute hidden  group-hover:inline-block left-full bottom-full p-3  rounded-2xl w-120 group-active:inline-block bg-gray-900 text-white z-[100]">
                  The sprinkler system sprays water without added nutrients.
                  It's used for temperature regulation.
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="italic">
              {StatusMSG(
                "SPRINKLER",
                rpiControlData.run_foliar === 1
                  ? 2
                  : rpiControlData.run_sprinkler
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-5 px-5">
              <MemoOtherBtn
                label="START SPRINKLER"
                isActive={
                  rpiControlData.run_foliar === 0 &&
                  rpiControlData.run_sprinkler == 0
                }
                val={1}
                setVal={setFunctions.setRunSprinkler}
              />
            </div>

            {/* Name + Help Icon */}
            <div className="flex gap-2 items-center">
              <div className="text-xl font-normal">Run Drain</div>
              <div className="relative group">
                <img
                  src="src/assets/icons/help-icon.svg"
                  className={`${helpBTN}`}
                />
                <div className="absolute hidden  group-hover:inline-block left-full bottom-full p-3  rounded-2xl w-120 group-active:inline-block bg-gray-900 text-white z-[100]">
                  Draining removes the current nutrient solution from the
                  system.
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="italic">
              {StatusMSG(
                "DRAIN",
                rpiControlData.run_mix === 1 ? 2 : rpiControlData.run_drain
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-5 px-5">
              <MemoOtherBtn
                label="START DRAIN"
                isActive={
                  rpiControlData.run_mix === 0 && rpiControlData.run_drain === 0
                }
                val={1}
                setVal={setFunctions.setRunDrain}
              />
            </div>

            {/* Name + Help Icon */}
            <div className="flex gap-2 items-center">
              <div className="text-xl font-normal">Run Drain and Mix</div>
              <div className="relative group">
                <img
                  src="src/assets/icons/help-icon.svg"
                  className={`${helpBTN}`}
                />
                <div className="absolute hidden  group-hover:inline-block left-full bottom-full p-3  rounded-2xl w-120 group-active:inline-block bg-gray-900 text-white z-[100]">
                  Drain + Mix removes the existing solution and immediately
                  mixes a new batch. This changes the entire nutrient
                  composition.
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="italic">
              {StatusMSG(
                "MIX",
                rpiControlData.run_drain === 1 ? 2 : rpiControlData.run_mix
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-5 px-5">
              <MemoOtherBtn
                label="START DRAIN AND MIX"
                isActive={
                  rpiControlData.run_mix === 0 && rpiControlData.run_drain === 0
                }
                val={1}
                setVal={setFunctions.setRunMix}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ControlCenterRender;
