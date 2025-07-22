import { useEffect, useState } from "react";
import type { DailyDataProp } from "../data/dataProps/dataProps";
import { supabase } from "../supabase";

export function useHistory() {
  const [historyData, setHistoryData] = useState<DailyDataProp[]>([
    {
      age: 0,
      tds: 0,
      pH: 0,
      temp: 0,
      hum: 0,
      pic: "https://i.pinimg.com/1200x/50/3d/74/503d7489014506873e2cdea8a64492b6.jpg",
      classification: 4,
    },
  ]);

  const [loadData, setloadData] = useState<DailyDataProp>(historyData[0]);

  const [indexNumber, setIndexNumber] = useState<number | string>(
    historyData[0].age
  );
  // Fetching
  useEffect(() => {
    console.log("FETCHING HISTORY DATA");
    const fetchHistoryData = async () => {
      const { data, error } = await supabase
        .from("daily_db")
        .select()
        .order("age", { ascending: true });

      if (error) {
        console.error("ERROR FETCHING: ", error.message);
        return;
      }

      if (data) {
        handleHiostoryPayload(data as DailyDataProp[]);
      }
    };
    fetchHistoryData();
  }, []);

  function handleHiostoryPayload(payload: DailyDataProp[]) {
    setHistoryData(payload);
    setloadData(payload[payload.length - 1]);
    setIndexNumber(payload[payload.length - 1].age);
  }

  console.log(historyData);

  return { historyData, loadData, setloadData, indexNumber, setIndexNumber };
}
