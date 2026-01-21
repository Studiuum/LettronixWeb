import { useEffect, useRef, useState } from "react";
import { supabase } from "../supabase";

export function useIsOnline() {
  const networkStatus = useRef(navigator.onLine);
  const supabaseStatus = useRef(supabase.realtime.isConnected());
  const sendHeartbeatCheck = useRef<boolean>(false);
  const retryAttempt = useRef(false);
  const updateRunning = useRef(false);
  const [fullyConnected, setFullyConnected] = useState(networkStatus.current);

  const reconnectSupabaseClient = () => {
    console.log("ATTEMPTING TO RECONNECT TO SUPABASE");
    supabase.realtime.connect();
  };

  const updateNetworkStatus = () => {
    if (!retryAttempt.current) retryAttempt.current = true;
    console.log("NETWORK UPDATE WORKING PROPERLY");
    networkStatus.current = navigator.onLine;

    setFullyConnected(networkStatus.current && supabaseStatus.current && true);
  };

  const updateSupabaseStatus = (checker: boolean = false) => {
    // if (checker) console.log("THIS IS FROM RETRY ATTEMPT");
    supabaseStatus.current = supabase.realtime.isConnected();
    if (checker)
      console.log("supabase connection Status:", supabaseStatus.current);
    setFullyConnected(networkStatus.current && supabaseStatus.current && true);
    if (!supabaseStatus.current && !retryAttempt.current) {
      // console.log("THIS MODIFIES THE RETRY ATTEMPT");
      retryAttempt.current = true;
    }
  };

  const updateReconnectStatus = async (
    func: ((forceReconnection: boolean) => void)[],
  ) => {
    // updateRunning.current = true;
    if (retryAttempt.current) {
      supabase.realtime.onHeartbeat(() => {
        // console.log("MANUAL HEARTBEAT");
      });
      reconnectSupabaseClient();
      await supabase.realtime.sendHeartbeat();
      // Wait a bit for the socket to catch up
      await new Promise((r) => setTimeout(r, 3000));

      updateSupabaseStatus(true);

      if (supabase.realtime.isConnected()) {
        // console.log("SUPABASE CLIENT IS RECONNECTED");
        supabase.realtime.onHeartbeat(() => {});
        retryAttempt.current = false;
        // console.log("CHANNELS:", supabase.realtime.channels);
        func.forEach((func) => func(true));
      }
    } else {
      updateSupabaseStatus();
    }
  };

  // ATTACHING WINDOWS ONLINE LISTENER
  useEffect(() => {
    window.addEventListener("online", updateNetworkStatus);
    window.addEventListener("offline", updateNetworkStatus);

    return () => {
      // console.log("isONline cleanup runnning");
      window.removeEventListener("offline", updateNetworkStatus);
      window.removeEventListener("online", updateNetworkStatus);
      sendHeartbeatCheck.current = false;
      updateRunning.current = false;
    };
  }, []);

  return { fullyConnected, updateReconnectStatus };
}
