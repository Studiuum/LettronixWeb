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
    supabaseStatus.current = supabase.realtime.isConnected();
    if (checker)
      console.log("supabase connection Status:", supabaseStatus.current);
    setFullyConnected(networkStatus.current && supabaseStatus.current && true);
    if (!supabaseStatus.current && !retryAttempt.current) {
      retryAttempt.current = true;
    }
  };

  const updateReconnectStatus = async (
    func: ((forceReconnection: boolean) => void)[],
  ) => {
    if (retryAttempt.current) {
      supabase.realtime.onHeartbeat(() => {});
      reconnectSupabaseClient();
      await supabase.realtime.sendHeartbeat();
      await new Promise((r) => setTimeout(r, 3000));

      updateSupabaseStatus(true);

      if (supabase.realtime.isConnected()) {
        supabase.realtime.onHeartbeat(() => {});
        retryAttempt.current = false;
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
      window.removeEventListener("offline", updateNetworkStatus);
      window.removeEventListener("online", updateNetworkStatus);
      sendHeartbeatCheck.current = false;
      updateRunning.current = false;
    };
  }, []);

  return { fullyConnected, updateReconnectStatus };
}
