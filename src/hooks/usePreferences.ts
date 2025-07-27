import { useEffect, useState } from "react";
import type { PreferencesProp } from "../data/dataProps/dataProps";
import { supabase } from "../supabase";

export function usePreferences(initialPreferenceData: PreferencesProp) {
  const [preferencesData, setPreferencesData] = useState<PreferencesProp>(
    initialPreferenceData,
  );

  // // FETCH
  // useEffect(() => {
  //   const fetchPreferenceData = async () => {
  //     const { data, error } = await supabase.from("preferences").select();

  //     if (error) {
  //       console.log("ERROR: ", error);
  //     } else if (data && data.length > 0) {
  //       handlePreferencePayload(data[0]);
  //     }
  //   };
  //   fetchPreferenceData();
  // }, []);
  // LISTENER
  useEffect(() => {
    const preferenceChannel = supabase
      .channel("preference-channel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "preferences",
        },
        (payload) => handlePreferencePayload(payload.new as PreferencesProp),
      )
      .subscribe();
    return () => {
      preferenceChannel.unsubscribe();
    };
  }, []);
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
