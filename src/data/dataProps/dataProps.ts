// INTIALIZATIONs
export type PreferencesProp = {
  date_time: string;
  age: number;
  lettuce_classify: number;
  lettuce_pic_url: string;
  concentration: number;
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
  plant_reclassification: number;
  source?: string;
  drained: number;
};

export type RPIControlSetupFunctions = {
  setStatus: (val: number) => void;
  setPumpStatus: (val: number) => void;
  setLightStatus: (val: number) => void;
  setRunFoliar: (val: number) => void;
  setRunSprinkler: (val: number) => void;
  setRunDrain: (val: number) => void;
  setRunMix: (val: number) => void;
  setReclassification: (val: number) => void;
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
  cal_tank: number;
  npk_tank: number;
  mag_tank: number;
  ph_up_tank: number;
  ph_down_tank: number;
  cal_mag_tank: number;
};

export type DailyDataProp = {
  age: number;
  tds: number;
  pH: number;
  temp: number;
  hum: number;
  pic: string;
  classification: number;
  concentration: number;
};

export type ParamAutomationProp = {
  day: number;
  sensor: string;
  reading: number;
  time: string;
  action: string;
};

/////////////////////////////////////////
// GLOBAL TYPES
export type OutletContextProp = {
  contextData: {
    values: RPIControlStatusProp;
    setFunctions: RPIControlSetupFunctions;
  };
  preferenceData: PreferencesProp;
  setArraySetupRealtime: (prev: any) => void;
  rpiSensorData: SensorDataProp;
};

export type OtherNotifDataProps = {
  id: number;
  created_at: string;
  field: string;
  status: number;
  seen: boolean;
  rpi: boolean;
};
