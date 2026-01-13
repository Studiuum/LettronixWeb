import { useEffect, useRef, useState } from "react";

import type {
  RPIControlSetupFunctions,
  RPIControlStatusProp,
} from "../data/dataProps/dataProps";
import { supabase } from "../supabase";
import { fetchControlData } from "./fetchInitialData";
import {
  infoToast,
  loadingToast,
  successToast,
  warnToast,
} from "../utils/toast";

export function useRPIControl(loaderData: RPIControlStatusProp) {
  const [status, setStatus] = useState(loaderData.status);
  const [pumpStatus, setPumpStatus] = useState(loaderData.pump_status);
  const [lightStatus, setLightStatus] = useState(loaderData.light_status);
  const [runFoliar, setRunFoliar] = useState(loaderData.run_foliar);
  const [runSprinkler, setRunSprinkler] = useState(loaderData.run_sprinkler);
  const [runDrain, setRunDrain] = useState(loaderData.run_drain);
  const [runMix, setRunMix] = useState(loaderData.run_mix);

  const isCleanup = useRef<Boolean>(false);
  const channelRef = useRef<any>(null);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 10;
  const retryRef = useRef<NodeJS.Timeout | null>(null);
  const BASE_DELAY = 2000; // 2 seconds
  const MAX_DELAY = 30000; // 30 seconds

  function setupControlRealtime() {
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
      channelRef.current = null;
    }

    const controlChannel = supabase.channel("rpi_control_changes").on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "rpi_control",
      },
      (payload) => {
        // TOAST FOR RPI_CONTROL_CHANGES
        const { old, new: newRow } = payload;

        let message = "";
        console.log("OLD: ", old);
        console.log("NEW: ", newRow);

        if (old != newRow) {
          // Lettuce cycle status changes
          if (old.status !== newRow.status) {
            if (newRow.status === 1) {
              message = "";
              warnToast("Lettuce Cycle is on ENDED.");
            } else if (old.status === 3 && newRow.status === 2) {
              message = "";
              successToast("Lettuce Cycle has RESUMED.");
            } else if (old.status === 1 && newRow.status === 2) {
              message = "";
              successToast("Lettuce Cycle has STARTED.");
            } else if (newRow.status === 3) {
              message = "";
              warnToast("Lettuce Cycle is on PAUSE.");
            }

            // Water pump change
          } else if (old.pump_status !== newRow.pump_status) {
            message = `Water pump has been turned ${newRow.pump_status ? "ON" : "OFF"}`;

            // Light change
          } else if (old.light_status !== newRow.light_status) {
            message = `Light has been turned ${newRow.light_status ? "ON" : "OFF"}`;

            // Plant reclassification
          } else if (
            old.plant_reclassification !== newRow.plant_reclassification
          ) {
            if (newRow.plant_reclassification === 1) {
              infoToast("Reclassification task has been ADDED!");
            } else if (newRow.plant_reclassification === 2) {
              loadingToast("Reclassification in PROCESS!");
            }
            // Tasks: Drain, Foliar, Mix, Sprinkler
          } else {
            const tasks: { field: string; name: string }[] = [
              { field: "run_drain", name: "DRAIN" },
              { field: "run_foliar", name: "FOLIAR" },
              { field: "run_mix", name: "MIX" },
              { field: "run_prinkler", name: "SPRINKLER" },
            ];

            tasks.forEach((task) => {
              if (old[task.field] !== newRow[task.field]) {
                if (newRow[task.field] === 1)
                  infoToast(`${task.name} task has been ADDED!`);
                else if (newRow[task.field] === 2)
                  infoToast(`${task.name} task is in PROCESS!`);
                else if (newRow[task.field] === 0)
                  successToast(`${task.name} task is SUCCESSFUL!`);
              }
            });
          }
        }

        // Show message toast if any
        if (message) successToast(message);

        handlePayload(payload.new as RPIControlStatusProp);
      },
    );

    channelRef.current = controlChannel;
    controlChannel.subscribe(async (status) => {
      console.log("CONTROL SUBSCRIPTION STATUS:", status);
      if (status === "SUBSCRIBED") {
        reconnectAttempts.current = 0;

        if (retryRef.current) {
          const initialData = await fetchControlData();
          console.log("CONTROL FETCHED DATA:", initialData);
          handlePayload(initialData as RPIControlStatusProp);

          clearTimeout(retryRef.current);
          retryRef.current = null;
        }
      } else if (
        status === "CHANNEL_ERROR" ||
        status === "TIMED_OUT" ||
        status === "CLOSED"
      ) {
        if (!retryRef.current && !isCleanup.current) {
          console.warn("CONTROL: ATTEMPTING RECONNECTION");
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
        "CONTROL: RECONNECTION ATTEMPT NUMBER:",
        reconnectAttempts.current,
      );
      setupControlRealtime();
    }, delay);
    retryRef.current = retryTimeout;
  }

  useEffect(() => {
    setupControlRealtime();
    return () => {
      console.log("CONTROL CLEANUP FUNCTION WORKING");
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
  return { values, setFunctions, setupControlRealtime };
}
