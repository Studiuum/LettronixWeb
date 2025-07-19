import { useEffect, useState } from "react";
import type { PreferencesProp } from "../data/dataProps/dataProps";
import { supabase } from "../supabase";

export function usePreferences() {
  const [preferencesData, setPreferencesData] = useState<PreferencesProp>({
    date_time: "--/--/-- --:--",
    age: 0,
    lettuce_classify: 4,
    lettuce_pic_url:
      "https://i.pinimg.com/1200x/50/3d/74/503d7489014506873e2cdea8a64492b6.jpg",
  });

  // FETCH
  useEffect(() => {
    const fetchPreferenceData = async () => {
      const { data, error } = await supabase.from("preferences").select();

      if (error) {
        console.log("ERROR: ", error);
      } else if (data && data.length > 0) {
        handlePreferencePayload(data[0]);
      }
    };
    fetchPreferenceData();
  }, []);
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
        (payload) => handlePreferencePayload(payload.new as PreferencesProp)
      )
      .subscribe();
    return () => {
      preferenceChannel.unsubscribe();
    };
  }, []);
  function handlePreferencePayload(payload: PreferencesProp) {
    const dateTime = new Date(
      payload.date_time.replace(" ", "T")
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
