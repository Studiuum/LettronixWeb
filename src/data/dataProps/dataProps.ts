// INTIALIZATIONs
export type PreferencesProp = {
  date_time: string;
  age: number;
  lettuce_classify: number;
  lettuce_pic_url: string;
};

export type RPIControlStatusProp = {
  id: number;
  status: number;
  pump_status: number;
  light_status: number;
  run_foliar: number;
  run_sprinkler: number;
  run_drain: number;
  run_mix: number;
};

export type RPIControlSetupFunctions = {
  setStatus: (val: number) => void;
  setPumpStatus: (val: number) => void;
  setLightStatus: (val: number) => void;
  setRunFoliar: (val: number) => void;
  setRunSprinkler: (val: number) => void;
  setRunDrain: (val: number) => void;
  setRunMix: (val: number) => void;
};

//////////////////////////////////////

// REALTIME
export type SensorDataProp = {
  tds: number;
  pH: number;
  temp: number;
  hum: number;
  nutrient_tank: boolean;
  foliar_tank: boolean;
  cal_tank: boolean;
  npk_tank: boolean;
  mag_tank: boolean;
  ph_up_tank: boolean;
  ph_down_tank: boolean;
  cal_mag_tank: boolean;
};

export type DailyDataProp = {
  age: number;
  tds: number;
  pH: number;
  temp: number;
  hum: number;
  pic: string;
  classification: number;
};
/////////////////////////////////////////
// GLOBAL TYPES
export type OutletContextProp = {
  contextData: {
    values: RPIControlStatusProp;
    setFunctions: RPIControlSetupFunctions;
  };
  preferenceData: PreferencesProp;
};
