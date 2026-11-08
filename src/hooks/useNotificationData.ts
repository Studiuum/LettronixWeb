import { useEffect, useRef, useState } from "react";
import { supabase } from "../supabase";
import type { OtherNotifDataProps } from "../data/dataProps/dataProps";
import { fetchNotificationData } from "./fetchInitialData";

export function useNotification(
  intialNotificationData: [OtherNotifDataProps[], number],
) {
  const [notificationData, setnotificationData] = useState<
    OtherNotifDataProps[]
  >(intialNotificationData[0]);

  const [notifStat, setNotifStat] = useState<number>(intialNotificationData[1]);

  const isCleanup = useRef<Boolean>(false);
  const channelRef = useRef<any>(null);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 10;
  const retryRef = useRef<NodeJS.Timeout | null>(null);
  const BASE_DELAY = 2000; // 2 seconds
  const MAX_DELAY = 30000; // 30 seconds

  function setupNotificationRealtime() {
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
      channelRef.current = null;
    }

    const notificationChannel = supabase.channel("notification_changes").on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "notification_table",
      },
      (payload) => {
        handleNotificationPayload(payload.new as OtherNotifDataProps);
      },
    );

    channelRef.current = notificationChannel;
    notificationChannel.subscribe(async (status) => {
      console.log("NOTIFICATION SUBSCRIPTION STATUS:", status);
      if (status === "SUBSCRIBED") {
        reconnectAttempts.current = 0;

        if (retryRef.current) {
          const initialData = await fetchNotificationData();
          // console.log("notification FETCHED DATA:", initialData);
          setnotificationData(initialData[0]);
          clearTimeout(retryRef.current);
          retryRef.current = null;
        }
      } else if (
        status === "CHANNEL_ERROR" ||
        status === "TIMED_OUT" ||
        status === "CLOSED"
      ) {
        if (!retryRef.current && !isCleanup.current) {
          console.warn("NOTIFICATION: ATTEMPTING RECONNECTION");
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
        "Notification: RECONNECTION ATTEMPT NUMBER:",
        reconnectAttempts.current,
      );
      setupNotificationRealtime();
    }, delay);
    retryRef.current = retryTimeout;
  }

  useEffect(() => {
    setupNotificationRealtime();
    return () => {
      console.log("NOTIFICATION CLEANUP FUNCTION WORKING");
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

  function handleNotificationPayload(payload: OtherNotifDataProps | null) {
    if (!payload) {
      setnotificationData([]);
      setNotifStat(1);
    } else {
      setnotificationData((prev) => [...prev, payload as OtherNotifDataProps]);
      let seen_bool = payload.seen ? 1 : 2;
      seen_bool = notifStat < 0 ? -seen_bool : seen_bool;
      setNotifStat(seen_bool);
    }
  }
  return {
    notificationData,
    notifStat,
    setnotificationData,
    setupNotificationRealtime,
    setNotifStat,
  };
}

export async function markAllNotificationsAsRead() {
  try {
    const { data, error } = await supabase
      .from("notification_table")
      .update({ seen: true })
      .eq("seen", false)
      .select(); // Optional: returns the updated rows if you need them

    if (error) {
      console.error("MARKING NOTIFICATION READINGS error:", error.message);
      return { success: false, error };
    }

    console.log("MARKING NOTIFICATION READINGS results:", data);
    return { success: true, data };
  } catch (err) {
    console.error("MARKING NOTIFICATION READINGS error:", err);
    return { success: false, error: err };
  }
}
