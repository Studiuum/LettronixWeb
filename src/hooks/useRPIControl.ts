import { useEffect, useState } from "react";

import type {
  RPIControlSetupFunctions,
  RPIControlStatusProp,
} from "../data/dataProps/dataProps";
import { supabase } from "../supabase";
import { loader } from "../routes/ControlCenter";

export function useRPIControl(loaderData: RPIControlStatusProp) {
  const [status, setStatus] = useState(loaderData.status);
  const [pumpStatus, setPumpStatus] = useState(loaderData.pump_status);
  const [lightStatus, setLightStatus] = useState(loaderData.light_status);
  const [runFoliar, setRunFoliar] = useState(loaderData.run_foliar);
  const [runSprinkler, setRunSprinkler] = useState(loaderData.run_sprinkler);
  const [runDrain, setRunDrain] = useState(loaderData.run_drain);
  const [runMix, setRunMix] = useState(loaderData.run_mix);

  // // FETCHING
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const { data, error } = await supabase.from("rpi_control").select();
  //     if (error) {
  //       console.log("FETCH CONTROL DATA ERROR", error);
  //     } else if (data && data.length > 0) {
  //       const row = data[0];
  //       handlePayload(row);
  //     }
  //   };
  //   console.log("FETCH CONTROL COMPLETE");
  //   fetchData();
  // }, []);

  //LISTENING TO DATABASE CHANGES
  useEffect(() => {
    const channelA = supabase
      .channel("listen_changes")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "rpi_control" },
        (payload) => handlePayload(payload.new as RPIControlStatusProp)
      )
      .subscribe();
    //Cleanup Function
    return () => {
      console.log("FETCH DATA LISTENER CLEANUP WORKING");
      channelA.unsubscribe();
    };
  }, []);
  function handlePayload(payload: RPIControlStatusProp) {
    setStatus(payload.status);
    setPumpStatus(payload.pump_status);
    setLightStatus(payload.light_status);
    setRunFoliar(payload.run_foliar);
    setRunSprinkler(payload.run_sprinkler);
    setRunDrain(payload.run_drain);
    setRunDrain(payload.run_drain);

    setRunMix(payload.run_mix);
  }

  const values: RPIControlStatusProp = {
      id: 1,
      status: status,
      pump_status: pumpStatus,
      light_status: lightStatus,
      run_foliar: runFoliar,
      run_sprinkler: runSprinkler,
      run_drain: runDrain,
      run_mix: runMix,
    },
    setFunctions: RPIControlSetupFunctions = {
      setStatus: setStatus,
      setPumpStatus: setPumpStatus,
      setLightStatus: setLightStatus,
      setRunFoliar: setRunFoliar,
      setRunSprinkler: setRunSprinkler,
      setRunDrain: setRunDrain,
      setRunMix: setRunMix,
    };
  return { values, setFunctions };
}
