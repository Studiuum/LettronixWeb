import { useEffect, useRef, useState } from "react";
import type {
  RPIControlSetupFunctions,
  RPIControlStatusProp,
} from "../data/dataProps/dataProps";
import { supabase } from "../supabase";

function useRPIControlTESTING(loaderData: RPIControlStatusProp) {
  const [status, setStatus] = useState(loaderData.status);
  const [pumpStatus, setPumpStatus] = useState(loaderData.pump_status);
  const [lightStatus, setLightStatus] = useState(loaderData.light_status);
  const [runFoliar, setRunFoliar] = useState(loaderData.run_foliar);
  const [runSprinkler, setRunSprinkler] = useState(loaderData.run_sprinkler);
  const [runDrain, setRunDrain] = useState(loaderData.run_drain);
  const [runMix, setRunMix] = useState(loaderData.run_mix);

  const channelRef = useRef<any>(null);

  const setupRealtime = () => {
    const channel = supabase
      .channel("rpi_control_changes")
      .on("broadcast", { event: "UPDATE" }, (payload) => {
        console.log("Broadcast received:", payload.payload.new);
        handlePayload(payload.payload.new as RPIControlStatusProp);
      })
      .subscribe((status) => {
        console.log("Supabase broadcast channel status:", status);
        if (status === "CHANNEL_ERROR") {
          console.warn("Supabase channel error (phx_reply). Retrying...");
          reconnect();
        }
      });
    channelRef.current = channel;
  };

  const reconnect = () => {
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
      channelRef.current = null;
    }
    setTimeout(() => {
      setupRealtime();
    }, 3000); // Delay before retry
  };

  const handleVisibilityChange = () => {
    if (
      document.visibilityState === "visible" &&
      channelRef.current?.state === "closed"
    ) {
      console.log("Tab became visible again, reconnecting Supabase channel...");
      reconnect();
    }
  };

  useEffect(() => {
    setupRealtime();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
    };
  }, []);

  function handlePayload(payload: RPIControlStatusProp) {
    setStatus(payload.status);
    setPumpStatus(payload.pump_status);
    setLightStatus(payload.light_status);
    setRunFoliar(payload.run_foliar);
    setRunSprinkler(payload.run_sprinkler);
    setRunDrain(payload.run_drain);
    setRunMix(payload.run_mix);
  }

  const values: RPIControlStatusProp = {
    id: 1,
    status,
    pump_status: pumpStatus,
    light_status: lightStatus,
    run_foliar: runFoliar,
    run_sprinkler: runSprinkler,
    run_drain: runDrain,
    run_mix: runMix,
  };

  const setFunctions: RPIControlSetupFunctions = {
    setStatus,
    setPumpStatus,
    setLightStatus,
    setRunFoliar,
    setRunSprinkler,
    setRunDrain,
    setRunMix,
  };

  return { values, setFunctions };
}
