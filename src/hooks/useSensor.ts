import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import type { SensorDataProp } from "../data/dataProps/dataProps";

export function useSensor() {
  const [rpiSensorData, setRPISensorData] = useState<SensorDataProp>({
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
  });

  // FETCHING
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("realtimeDB").select();
      if (error) {
        console.log("ERROR", error);
      } else if (data && data.length > 0) {
        const row = data[0];
        handleSensorPayload(row);
      }
    };
    console.log("FETCH COMPLETE");
    fetchData();
    // Do not return a promise from useEffect
  }, []);

  // LISTENER
  useEffect(() => {
    const SensorChannel = supabase
      .channel("Sensor-channel")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "realtimeDB" },
        (payload) => handleSensorPayload(payload.new as SensorDataProp)
      )
      .subscribe();
    return () => {
      SensorChannel.unsubscribe();
    };
  }, []);
  function handleSensorPayload(payload: SensorDataProp) {
    setRPISensorData(payload);
  }
  return rpiSensorData;
}
