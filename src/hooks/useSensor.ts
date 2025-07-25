import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import type { SensorDataProp } from "../data/dataProps/dataProps";

export function useSensor(intialSensorData: SensorDataProp) {
  const [rpiSensorData, setRPISensorData] = useState<SensorDataProp>({
    tds: intialSensorData.tds,
    pH: intialSensorData.pH,
    temp: intialSensorData.temp,
    hum: intialSensorData.hum,
    nutrient_tank: intialSensorData.nutrient_tank,
    foliar_tank: intialSensorData.foliar_tank,
    cal_tank: intialSensorData.cal_tank,
    npk_tank: intialSensorData.npk_tank,
    mag_tank: intialSensorData.mag_tank,
    ph_up_tank: intialSensorData.ph_up_tank,
    ph_down_tank: intialSensorData.ph_down_tank,
    cal_mag_tank: intialSensorData.cal_mag_tank,
  });

  // REALTIME DATABASE LISTENER
  useEffect(() => {
    const SensorChannel = supabase
      .channel("Sensor-channel")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "realtimeDB" },
        (payload) => handleSensorPayload(payload.new as SensorDataProp)
      )
      .subscribe((status) => {
        console.log("Realtime connection status:", status);
      });
    return () => {
      SensorChannel.unsubscribe();
    };
  }, []);

  function handleSensorPayload(payload: SensorDataProp) {
    setRPISensorData(payload);
  }
  return rpiSensorData;
}
