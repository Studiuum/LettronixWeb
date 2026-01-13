import { useEffect, useRef, useState } from "react";
import type { PreferencesProp } from "../data/dataProps/dataProps";
import { supabase } from "../supabase";
import { fetchPreferencesData } from "./fetchInitialData";
import { infoToast, successToast } from "../utils/toast";

export function usePreferences(initialPreferenceData: PreferencesProp) {
  const [preferenceData, setPreferenceData] = useState<PreferencesProp>(
    initialPreferenceData,
  );

  const isCleanup = useRef<Boolean>(false);
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

    const preferencesChannel = supabase
      .channel("preferences_changes")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "preferences",
        },
        (payload) => {
          const { old, new: newRow } = payload;
          if (old !== newRow) {
            if (newRow.age != 0)
              if (old.lettuce_classify !== newRow.lettuce_classify)
                successToast("Classification has been Updated");
              else infoToast("Overview Details Has been Updated");
          }
          handlePreferencePayload(payload.new as PreferencesProp);
        },
      )
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "preferences",
        },
        (payload) => {
          handlePreferencePayload(payload.new as PreferencesProp);
        },
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "preferences",
        },
        () => {
          handlePreferencePayload(null);
        },
      );

    channelRef.current = preferencesChannel;
    preferencesChannel.subscribe(async (status) => {
      console.log("PREFERENCES SUBSCRIPTION STATUS:", status);
      if (status === "SUBSCRIBED") {
        reconnectAttempts.current = 0;

        if (retryRef.current) {
          const initialData = await fetchPreferencesData();
          console.log("PREFERENCES FETCHED DATA:", initialData);
          setPreferenceData(initialData as PreferencesProp);

          clearTimeout(retryRef.current);
          retryRef.current = null;
        }
      } else if (
        status === "CHANNEL_ERROR" ||
        status === "TIMED_OUT" ||
        status === "CLOSED"
      ) {
        if (!retryRef.current && !isCleanup.current) {
          console.warn("PREFERENCES: ATTEMPTING RECONNECTION");
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
      console.log("PREFERENCES CLEANUP FUNCTION WORKING");
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

  function handlePreferencePayload(payload: PreferencesProp | null) {
    if (!payload) {
      const defaultData: PreferencesProp = {
        date_time: "--/--/-- --:--",
        age: 0,
        lettuce_classify: 0,
        lettuce_pic_url: "",
      };
      setPreferenceData(defaultData);
    } else {
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
      setPreferenceData(payload);
    }
  }
  return { preferenceData, setupPreferencesRealtime };
}
