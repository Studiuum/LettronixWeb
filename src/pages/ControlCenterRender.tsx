import { useOutletContext } from "react-router";
import type { OutletContextProp } from "../data/dataProps/dataProps";
import "../LettronixTheme.css";
import { MemoBtn, MemoOtherBtn } from "../hooks/memos/ActuatorMemos";

const titleName =
  "text-[0.75rem] leading-none font-medium tracking-[0rem] text-green-900 sm:text-[1rem] md:text-[1rem] lg:text-[1.250rem]";

const helpBTN =
  "w-4 hover:scale-120 hover:animation-pulse transition duration-200";
const controlText =
  "md:text-s text-[0.625rem] font-[400] sm:text-[0.875rem] lg:text-[1rem]";
const tooltipConf =
  "absolute z-[1000] hidden mt-2 w-45 rounded-2xl bg-gray-900 p-2 text-[0.75rem] text-white group-hover:block group-active:block sm:text-[1rem] md:text-[1rem] md:w-120";
type otherControlProps = {
  label: string;
  tips: string;
  generalField: string;
  generalFieldCondition: any;
  buttonLabels: string[];
  condition: any[];
  val: number[];
  setFunc: (val: number) => void;
};

function ControlCenterRender() {
  const { contextData } = useOutletContext<OutletContextProp>();

  // CONTROL DATA
  const rpiControlData = contextData.values;
  const setFunctions = contextData.setFunctions;

  const otherBtnData: otherControlProps[] = [
    {
      label: "Pump Control",
      tips: "Pump toggles are overridden when automation is running. Pause automation to manually control the pump.",
      generalField: "PUMP",
      generalFieldCondition:
        rpiControlData.run_mix === 1 || rpiControlData.run_drain === 1
          ? 2
          : rpiControlData.pump_status,
      buttonLabels: ["PUMP OFF", "PUMP ON"],
      condition: [
        rpiControlData.pump_status === 1 &&
          rpiControlData.run_drain == 0 &&
          rpiControlData.run_mix == 0,
        rpiControlData.pump_status === 0 &&
          rpiControlData.run_drain == 0 &&
          rpiControlData.run_mix == 0,
      ],
      val: [0, 1],
      setFunc: setFunctions.setPumpStatus,
    },
    {
      label: "Light Control",
      tips: " The light will stay ON or OFF regardless of whether the automation process is running or not.",
      generalField: "LIGHT",
      generalFieldCondition: rpiControlData.light_status,
      buttonLabels: ["LIGHT OFF", "LIGHT ON"],
      condition: [
        rpiControlData.light_status === 1,
        rpiControlData.light_status === 0,
      ],
      val: [0, 1],
      setFunc: setFunctions.setLightStatus,
    },
    {
      label: "Foliar",
      tips: "The foliar system uses the sprinkler but adds Cal-Mag to deliver nutrients directly to the leaves.",
      generalField: "FOLIAR",
      generalFieldCondition:
        rpiControlData.run_sprinkler === 1 ? 2 : rpiControlData.run_foliar,
      buttonLabels: ["START FOLIAR"],
      condition: [
        rpiControlData.run_foliar === 0 && rpiControlData.run_sprinkler == 0,
      ],
      val: [1],
      setFunc: setFunctions.setRunFoliar,
    },
    {
      label: "Sprinkler",
      tips: "The sprinkler system sprays water without added nutrients.It's used for temperature regulation.",
      generalField: "SPRINKLER",
      generalFieldCondition:
        rpiControlData.run_foliar === 1 ? 2 : rpiControlData.run_sprinkler,
      buttonLabels: ["START SPRINKLER"],
      condition: [
        rpiControlData.run_foliar === 0 && rpiControlData.run_sprinkler == 0,
      ],
      val: [1],
      setFunc: setFunctions.setRunSprinkler,
    },
    {
      label: "Drain",
      tips: " Draining removes the current nutrient solution from the system",
      generalField: "DRAIN",
      generalFieldCondition:
        rpiControlData.run_mix === 1 ? 2 : rpiControlData.run_drain,
      buttonLabels: ["START DRAIN"],
      condition: [
        rpiControlData.run_mix === 0 && rpiControlData.run_drain === 0,
      ],
      val: [1],
      setFunc: setFunctions.setRunDrain,
    },
    {
      label: "Drain and Mix",
      tips: " Drain + Mix removes the existing solution and immediately mixes a new batch. This changes the entire nutrient composition.",
      generalField: "DRAIN & MIX",
      generalFieldCondition:
        rpiControlData.run_drain === 1 ? 2 : rpiControlData.run_mix,
      buttonLabels: ["START DRAIN"],
      condition: [
        rpiControlData.run_mix === 0 && rpiControlData.run_drain === 0,
      ],
      val: [1],
      setFunc: setFunctions.setRunMix,
    },
  ];

  function OtherControlSetRender({
    controlData,
  }: {
    controlData: otherControlProps;
  }) {
    return (
      <>
        <div
          className={`${controlText} flex flex-1 flex-col font-normal xl:grid xl:grid-cols-[1fr_2fr_2fr] xl:grid-rows-1 xl:items-center`}
        >
          {/* Name + Help Icon */}
          <div className="flex items-center gap-2 xl:min-w-[18ch]">
            <div className="font-medium">{controlData.label}</div>
            <div className="group relative">
              <img
                src="src/assets/icons/help-icon.svg"
                alt="help button"
                className={`${helpBTN}`}
              />
              <div
                className={`${tooltipConf} bottom-full left-full font-normal`}
              >
                {controlData.tips}
              </div>
            </div>
          </div>
          {/* Status */}
          <div className="pb-3 font-light italic xl:pb-0">
            {StatusMSG(
              controlData.generalField,
              controlData.generalFieldCondition,
            )}
          </div>
          <div className="flex justify-center gap-5 px-5 md:px-20 lg:gap-5 lg:px-40 xl:px-10">
            {controlData.buttonLabels.map((label, index) => (
              <MemoOtherBtn
                key={`other-control-btn-${index}`}
                label={label}
                isActive={controlData.condition[index]}
                val={controlData.val[index]}
                setVal={controlData.setFunc}
              />
            ))}
          </div>
        </div>
      </>
    );
  }

  function StatusMSG(label: string, status: number) {
    let message;

    if (
      ["FOLIAR", "SPRINKLER", "DRAIN", "DRAIN & MIX", "PUMP"].includes(label) &&
      status === 2
    ) {
      let running = "";

      if (label === "FOLIAR") {
        running = "Sprinkler";
      } else if (label === "SPRINKLER") {
        running = "Foliar";
      } else if (label === "DRAIN") {
        running = "Mix";
      } else if (label === "DRAIN & MIX") {
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
      <div className="k flex flex-1 flex-col gap-3">
        <div className="main-card flex-col gap-y-3 xl:flex-row xl:gap-0">
          <div className="flex flex-row items-center gap-2 border-b-1 border-lettronix-title-border pb-2 xl:w-1/2 xl:border-none xl:pb-0">
            <div className={`${titleName} `}>MAIN CONTROL</div>
            <div className="group relative">
              <img
                src="src/assets/icons/help-icon.svg"
                alt="help icon"
                className={`${helpBTN}`}
              />
              <div
                className={`${tooltipConf} top-full left-0 lg:top-1/2 lg:left-full`}
              >
                Control the hydroponic automation—start, pause, resume, or end.
                Ending the cycle means the lettuce is ready for harvest.
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between px-5 sm:px-20 md:px-25 lg:px-50 xl:w-1/2 xl:justify-evenly xl:gap-0 xl:px-0">
            <MemoBtn
              label={`${rpiControlData.status === 3 ? "RESUME" : "START"} CYCLE`}
              isActive={
                rpiControlData.status === 1 || rpiControlData.status === 3
              }
              val={2}
            />
            <MemoBtn
              label="PAUSE"
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
        <div
          className={`main-card items-align flex-[1_1_auto] flex-col gap-y-3 overflow-visible`}
        >
          <div
            className={`${titleName} border-b-1 border-lettronix-title-border pb-2`}
          >
            OTHER CONTROLS
          </div>
          <div className="flex flex-[1_1_auto] flex-col gap-2 lg:ml-5">
            {otherBtnData.map((data, index) => {
              return (
                <OtherControlSetRender
                  controlData={data}
                  key={`control-center-line-${index}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default ControlCenterRender;
