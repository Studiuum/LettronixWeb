import { useEffect, useRef, useState } from "react";
import type { PreferencesProp } from "../data/dataProps/dataProps";
import { supabase } from "../supabase";
import { fetchPreferencesData } from "./fetchInitialData";

export function usePreferences(initialPreferenceData: PreferencesProp) {
  const [preferencesData, setPreferencesData] = useState<PreferencesProp>(
    initialPreferenceData,
  );
  const channelStatusRef = useRef<String | null>(null);
  const channelRef = useRef<any>(null);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 10;
  const retryRef = useRef<NodeJS.Timeout | null>(null);
  const BASE_DELAY = 2000; // 2 seconds
  const MAX_DELAY = 30000; // 30 seconds

  function setupPreferencesRealtime() {
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
      channelRef.current = null;
    }

    const preferenceChannel = supabase.channel("preference_changes");
    channelRef.current = preferenceChannel;
    preferenceChannel
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "preferences",
        },
        (payload) => {
          handlePreferencePayload(payload.new as PreferencesProp);
        },
      )
      .subscribe(async (status) => {
        console.log("PREFERENCES Subscription Status:", status);

        if (status === "SUBSCRIBED") {
          reconnectAttempts.current = 0;

          channelStatusRef.current = status;
          if (retryRef.current) {
            const initialData = await fetchPreferencesData();
            console.log("FETCHED DATA:", initialData);
            handlePreferencePayload(initialData as PreferencesProp);

            clearTimeout(retryRef.current);
            retryRef.current = null;
          }
        } else if (status === "CHANNEL_ERROR") {
          if (!retryRef.current) {
            console.warn("PREFERENCES: ATTEMPTING RECONNECTION");
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
        "PREFERENCES: RECONNECTION ATTEMPT NUMBER:",
        reconnectAttempts.current,
      );
      setupPreferencesRealtime();
    }, delay);
    retryRef.current = retryTimeout;
  }

  useEffect(() => {
    setupPreferencesRealtime();
    return () => {
      console.log("PREFERENCE CLEANUP FUNCTION WORKING");
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

  // useEffect(() => {
  //   const preferenceChannel = supabase
  //     .channel("preference-channel")
  //     .on(
  //       "postgres_changes",
  //       {
  //         event: "*",
  //         schema: "public",
  //         table: "preferences",
  //       },
  //       (payload) => handlePreferencePayload(payload.new as PreferencesProp),
  //     )
  //     .subscribe((status) => {});
  //   return () => {
  //     supabase.removeChannel(preferenceChannel);
  //   };
  // }, []);

  function handlePreferencePayload(payload: PreferencesProp) {
    console.log("DATA RECEIVED");
    const dateTime = new Date(
      payload.date_time.replace(" ", "T"),
    ).toLocaleString("en-US", {
      year: "numeric",
      month: "long", // e.g., July
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    payload.date_time = dateTime;
    setPreferencesData(payload);
  }

  return preferencesData;
}
