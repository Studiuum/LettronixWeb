// FETCHING

import type {
  DailyDataProp,
  PreferencesProp,
  RPIControlStatusProp,
  SensorDataProp,
} from "../data/dataProps/dataProps";
import { supabase } from "../supabase";

export const fetchControlData = async () => {
  console.log("FETCHING CONTROl DATA");
  const { data, error } = await supabase.from("rpi_control").select();
  if (error || data.length === 0 || data === null) {
    console.log(
      "FETCH CONTROL DATA ERROR",
      error
        ? error.message
        : data === null
          ? "DATA FETCH ERROR"
          : data.length === 0
            ? "No data found"
            : "UNKNOWN ERROR",
    );
    const defaultControlData: RPIControlStatusProp = {
      id: 1,
      status: 1,
      pump_status: 0,
      light_status: 0,
      run_foliar: 0,
      run_sprinkler: 0,
      run_drain: 0,
      run_mix: 0,
    };
    console.log(defaultControlData);
    return defaultControlData;
  } else if (data && data.length > 0) {
    const row = data[0];
    return row as RPIControlStatusProp;
  }
};

export const fetchPreferencesData = async () => {
  console.log("FETCHING PREFERENCES DATA");
  const { data, error } = await supabase.from("preferences").select();
  if (error || data.length === 0 || data === null) {
    console.log(
      "FETCH CONTROL DATA ERROR",
      error
        ? error.message
        : data === null
          ? "DATA FETCH ERROR"
          : data.length === 0
            ? "No data found"
            : "UNKNOWN ERROR",
    );
    const defaultData: PreferencesProp = {
      date_time: "--/--/-- --:--",
      age: 0,
      lettuce_classify: 4,
      lettuce_pic_url:
        "https://i.pinimg.com/1200x/50/3d/74/503d7489014506873e2cdea8a64492b6.jpg",
    };
    return defaultData;
  } else if (data && data.length > 0) {
    const row = data[0];

    const dateTime = new Date(row.date_time.replace(" ", "T")).toLocaleString(
      "en-US",
      {
        year: "numeric",
        month: "long", // e.g., July
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      },
    );
    row.date_time = dateTime;
    return row as PreferencesProp;
  }
};

export const fetchSensorData = async () => {
  console.log("FETCHING SENSOR DATA");
  const { data, error } = await supabase.from("realtimeDB").select();
  if (error || data.length === 0 || data === null) {
    console.log(
      "FETCH CONTROL DATA ERROR",
      error
        ? error.message
        : data === null
          ? "DATA FETCH ERROR"
          : data.length === 0
            ? "No data found"
            : "UNKNOWN ERROR",
    );
    const defaultData: SensorDataProp = {
      tds: 0,
      pH: 0,
      temp: 0,
      hum: 0,
      nutrient_tank: false,
      foliar_tank: false,
      cal_tank: false,
      npk_tank: false,
      mag_tank: false,
      ph_up_tank: false,
      ph_down_tank: false,
      cal_mag_tank: false,
    };
    return defaultData;
  } else if (data && data.length > 0) {
    const row = data[0];
    return row as SensorDataProp;
  }
};

export const fetchHistoryData = async () => {
  console.log("FETCHING HISTORY DATA");
  const { data, error } = await supabase
    .from("daily_db")
    .select()
    .order("age", { ascending: true });

  if (error || data.length === 0 || data === null) {
    console.log(
      "FETCH CONTROL DATA ERROR",
      error
        ? error.message
        : data === null
          ? "DATA FETCH ERROR"
          : data.length === 0
            ? "No data found"
            : "UNKNOWN ERROR",
    );
    const defaultData: DailyDataProp[] = [
      {
        age: 0,
        tds: 0,
        pH: 0,
        temp: 0,
        hum: 0,
        pic: "https://i.pinimg.com/1200x/50/3d/74/503d7489014506873e2cdea8a64492b6.jpg",
        classification: 4,
      },
    ];
    return defaultData;
  } else if (data && data.length > 0) {
    return data as DailyDataProp[];
  }
};
