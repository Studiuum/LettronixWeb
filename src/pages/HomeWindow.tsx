import { MemoHum, MemopH, MemoTDS, MemoTemp } from "../hooks/memos/SensorMemos";
import "../LettronixTheme.css";
import { MemoTank } from "../hooks/memos/TankLevelMemos";
import { MemoBtn } from "../hooks/memos/ActuatorMemos";
import { useOutletContext } from "react-router";
import type {
  RPIControlSetupFunctions,
  RPIControlStatusProp,
  SensorDataProp,
} from "../data/dataProps/dataProps";
import { useSensor } from "../hooks/useSensor";
import { usePreferences } from "../hooks/usePreferences";

const card =
  "flex flex-col p-5 bg-lettronix-card-bg drop-shadow-all-fx font-Inter rounded-2xl border-0.25 border-lettronix-card-border gap-2";

const titleCard =
  "flex items-center justify-between border-b-1 border-lettronix-title-border pb-2";

const titleName = "font-medium text-xl tracking-widest";

function RenderSensorReadingsCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  let fileName: string;
  let Func: FC<{ value: any }>;

  if (label === "TEMP") {
    fileName = "temperature";
    Func = MemoTemp;
  } else if (label == "HUM") {
    fileName = "humidity";
    Func = MemoHum;
  } else {
    fileName = label;
    if (label === "TDS") {
      Func = MemoTDS;
    } else {
      Func = MemopH;
    }
  }
  return (
    <div className="flex flex-col flex-1 justify-center items-center font-bold gap-2">
      <img
        src={`src/assets/icons/${fileName}-reading-icon.svg`}
        className="w-12 h-12"
      />
      <div className="flex-1 text-xl">{label}</div>
      <Func value={value} />
    </div>
  );
}
function HomeWindowRender() {
  const contextData: {
    values: RPIControlStatusProp;
    setFunctions: RPIControlSetupFunctions;
  } = useOutletContext();

  // SENSOR DATA
  const sensorData: SensorDataProp = useSensor();

  // CONTROL DATA
  const rpiControlData = contextData.values;

  // PREFERENCE DATA
  const preferenceData = usePreferences();
  console.log("PREFENCE DATA: ", preferenceData.lettuce_classify);

  return (
    <>
      <div className="flex h-full justify-center gap-10 min-h-0">
        {/* LEFT SIDE */}
        <div className={`${card} w-1/2 justify-between`}>
          {/* OVERVIEW LINE */}
          <div className={`${titleCard}`}>
            <div className={`${titleName}`}>OVERVIEW</div>
            <img src="src/assets/icons/overview-icon.svg" />
          </div>

          {/* DAYS - GROUP */}
          <div className=" flex flex-col justify-center gap-0">
            <div className="flex-1 font-bold text-2xl">DAY</div>
            <div className="flex items-center justify-center ml-4 gap-5">
              {/* FUNCION HERE */}
              <div className="shrink-0 h-[72px] w-1/5 font-bold text-7xl text-center overflow-hidden text-ellipsis whitespace-nowrap transition-all duration-200 transformation-gpu ease-in-out">
                {preferenceData.age}
              </div>
              <div className="flex flex-col w-full h-full text-[16px]">
                {/* PROGRESS BAR */}
                <div className="flex flex-1 h-4">
                  {/* FUNCION HERE  */}
                  <div className="flex-1 bg-lettronix-progressbar-bg rounded-full color-let overflow-hidden ">
                    <div
                      style={{
                        width: `${Math.min(
                          (preferenceData.age /
                            (preferenceData.age > 30
                              ? preferenceData.age
                              : 30)) *
                            100,
                          100
                        )}%`,
                      }}
                      className="h-full bg-lettronix-progressbar-fg  rounded-full text-lettronix-progressbar-fg p-0.5 transition-all duration-1500 transformation-gpu ease-in-out"
                    ></div>
                  </div>
                </div>
                <div className="font-bold flex-1 ">START DATE TIME:</div>
                <div className="flex-1 text-center">
                  {preferenceData.date_time}
                </div>
              </div>
            </div>
          </div>
          {/* IMAGE + CLASSIFICATION */}
          <div className="flex flex-col flex-1 rounded-[15px] gap-0 border-1 border-lettronix-selected hover:scale-105 hover:animation-pulse transition-transform duration-5000">
            <img
              src={preferenceData.lettuce_pic_url}
              alt={"src/assets/WIN_20250331_18_16_58_Pro.jpg"}
              className="h-80 object-cover rounded-t-[15px]"
            />
            <div className="flex flex-col justify-center bg-lettronix-bg rounded-b-[15px] pb-2">
              <div className="flex-1 font-bold text-[16px] ml-5">
                CLASSIFICATION:
              </div>
              <div className="flex-1 font-regular text-2xl text-center tracking-wider">
                {preferenceData.lettuce_classify === 4 && "NORMAL"}
                {preferenceData.lettuce_classify === 3 && "SLIGHT DEFICIENCY"}
                {preferenceData.lettuce_classify === 2 && "MODERATE DEFICIENCY"}
                {preferenceData.lettuce_classify === 1 && "SEVERE DEFICIENCY"}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col w-1/2 gap-3 justify-between">
          {/* SENSOR READINGS */}
          <div className={`${card} flex-1`}>
            {/* SENSOR READINGS LINE */}
            <div className={`${titleCard}`}>
              <div className={`${titleName}`}>SENSOR READINGS</div>
              <img src="src/assets/icons/sensor-reading-icon.svg" />
            </div>
            <div className="flex flex-row flex-1 justify-center items-center">
              <RenderSensorReadingsCard label="TDS" value={sensorData.tds} />
              <RenderSensorReadingsCard label="pH" value={sensorData.pH} />
              <RenderSensorReadingsCard label="TEMP" value={sensorData.temp} />
              <RenderSensorReadingsCard label="HUM" value={sensorData.hum} />
            </div>
          </div>
          {/* WATER LEVEL SENSOR */}
          <div className=" flex-1 grid grid-cols-2 grid-rows-5 gap-x-5 gap-y-0 p-5 bg-lettronix-card-bg drop-shadow-all-fx font-Inter rounded-[15px]">
            {/* WATER LEVEL SENSOR LINE */}
            <div className={`${titleCard} col-span-2`}>
              <div className={`${titleName}`}>TANK LEVEL</div>
              <img src="src/assets/icons/waterlevel-icon.svg" />
            </div>
            <MemoTank label="NUTRIENT TANK" value={sensorData.nutrient_tank} />
            <MemoTank label="FOLIAR TANK" value={sensorData.foliar_tank} />
            <MemoTank label="CALCIUM TANK" value={sensorData.cal_tank} />
            <MemoTank label="NPK TANK" value={sensorData.npk_tank} />
            <MemoTank label="MAG TANK" value={sensorData.mag_tank} />
            <MemoTank label="pH UP TANK" value={sensorData.ph_up_tank} />
            <MemoTank label="pH DOWN TANK" value={sensorData.ph_up_tank} />
            <MemoTank label="CAL-MAG TANK" value={sensorData.cal_mag_tank} />
          </div>
          <div className={`${card}`}>
            {/* SENSOR READINGS LINE */}
            <div className={`${titleCard}`}>
              <div className={`${titleName}`}>MAIN CONTROL</div>
              <img src="src/assets/icons/main-control-icon.svg" />
            </div>
            <div className="flex flex-row justify-center gap-3 items-center mx-10">
              <MemoBtn
                label="START CYCLE"
                isActive={
                  rpiControlData.status === 3 || rpiControlData.status == 1
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
        </div>
      </div>
    </>
  );
}

export default HomeWindowRender;
