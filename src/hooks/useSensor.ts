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

  const isCleanup = useRef<Boolean>(false);
  const channelRef = useRef<any>(null);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 10;
  const retryRef = useRef<NodeJS.Timeout | null>(null);
  const BASE_DELAY = 2000; // 2 seconds
  const MAX_DELAY = 30000; // 30 seconds

  function setupSensorRealtime() {
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
      channelRef.current = null;
    }

    const sensorChannel = supabase.channel("rpi_sensor_changes").on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "realtimeDB",
      },
      (payload) => {
        handleSensorPayload(payload.new as SensorDataProp);
      },
    );

    channelRef.current = sensorChannel;
    sensorChannel.subscribe(async (status) => {
      console.log("SENSOR SUBSCRIPTION STATUS:", status);
      if (status === "SUBSCRIBED") {
        reconnectAttempts.current = 0;

        if (retryRef.current) {
          const initialData = await fetchSensorData();
          // console.log("SENSOR FETCHED DATA:", initialData);
          handleSensorPayload(initialData as SensorDataProp);
          clearTimeout(retryRef.current);
          retryRef.current = null;
        }
      } else if (
        status === "CHANNEL_ERROR" ||
        status === "TIMED_OUT" ||
        status === "CLOSED"
      ) {
        if (!retryRef.current && !isCleanup.current) {
          console.warn("SENSOR: ATTEMPTING RECONNECTION");
          attemptReconnection();
        } else {
          isCleanup.current = false;
        }
      }
    });
  }

  function attemptReconnection() {
    if (reconnectAttempts.current >= maxReconnectAttempts) {
      if (retryRef.current) {
        clearTimeout(retryRef.current);
        retryRef.current = null;
      }
      return;
    }

    const delay =
      Math.min(BASE_DELAY * 2 ** reconnectAttempts.current, MAX_DELAY) +
      Math.random() * 1000;

    if (retryRef.current) {
      clearTimeout(retryRef.current);
      retryRef.current = null;
    }

    const retryTimeout = setTimeout(() => {
      reconnectAttempts.current += 1;
      console.warn(
        "SENSOR: RECONNECTION ATTEMPT NUMBER:",
        reconnectAttempts.current,
      );
      setupSensorRealtime();
    }, delay);
    retryRef.current = retryTimeout;
  }

  useEffect(() => {
    setupSensorRealtime();
    return () => {
      console.log("SENSOR CLEANUP FUNCTION WORKING");
      isCleanup.current = true;
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

  function handleSensorPayload(payload: SensorDataProp) {
    setRPISensorData(payload);
  }
  return { rpiSensorData, setupSensorRealtime };
}
