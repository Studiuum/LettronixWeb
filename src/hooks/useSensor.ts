import { useEffect, useRef, useState } from "react";
import { supabase } from "../supabase";
import type { SensorDataProp } from "../data/dataProps/dataProps";
import { fetchSensorData } from "./fetchInitialData";

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

  const channelStatusRef = useRef<String | null>(null);
  const channelRef = useRef<any>(null);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 10;
  const retryRef = useRef<NodeJS.Timeout | null>(null);
  const BASE_DELAY = 2000; // 2 seconds
  const MAX_DELAY = 30000; // 30 seconds

  function setupSensorsRealtime() {
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
      channelRef.current = null;
    }

    const sensorChannel = supabase.channel("sensor_changes");
    channelRef.current = sensorChannel;
    sensorChannel
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "realtimeDB",
        },
        (payload) => {
          handleSensorPayload(payload.new as SensorDataProp);
        },
      )
      .subscribe(async (status) => {
        console.log("SENSORS Subscription Status:", status);

        if (status === "SUBSCRIBED") {
          reconnectAttempts.current = 0;
          channelStatusRef.current = status;
          if (retryRef.current) {
            const initialData = await fetchSensorData();
            console.log("FETCHED DATA:", initialData);
            handleSensorPayload(initialData as SensorDataProp);

            clearTimeout(retryRef.current);
            retryRef.current = null;
          }
        } else if (status === "CHANNEL_ERROR") {
          if (!retryRef.current) {
            console.warn("SENSORS: ATTEMPTING RECONNECTION");
            attemptReconnection();
            channelStatusRef.current = status;
          }
        } else if (status === "TIMED_OUT" || status === "CLOSED") {
          channelStatusRef.current = status;
        }
      });
  }

  function attemptReconnection() {
    if (reconnectAttempts.current >= maxReconnectAttempts) return;
    // const delay = 5000;
    // EXPONENTIAL DELAY  + Jitter
    const delay =
      (BASE_DELAY * 2 ** reconnectAttempts.current, MAX_DELAY) +
      Math.random() * 1000;

    if (retryRef.current) {
      clearTimeout(retryRef.current);
      retryRef.current = null;
    }

    const retryTimeout = setTimeout(() => {
      reconnectAttempts.current += 1;
      console.warn(
        "SENSORS: RECONNECTION ATTEMPT NUMBER:",
        reconnectAttempts.current,
      );
      setupSensorsRealtime();
    }, delay);
    retryRef.current = retryTimeout;
  }

  useEffect(() => {
    setupSensorsRealtime();
    return () => {
      console.log("SENSOR CLEANUP FUNCTION WORKING");
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
      if (retryRef.current) {
        clearTimeout(retryRef.current);
        retryRef.current = null;
      }
    };
  }, []);

  // REALTIME DATABASE LISTENER
  // useEffect(() => {
  //   const SensorChannel = supabase
  //     .channel("Sensor-channel")
  //     .on(
  //       "postgres_changes",
  //       { event: "UPDATE", schema: "public", table: "realtimeDB" },
  //       (payload) => handleSensorPayload(payload.new as SensorDataProp),
  //     )
  //     .subscribe((status) => {});
  //   return () => {
  //     SensorChannel.unsubscribe();
  //   };
  // }, []);

  function handleSensorPayload(payload: SensorDataProp) {
    setRPISensorData(payload);
  }
  return rpiSensorData;
}
