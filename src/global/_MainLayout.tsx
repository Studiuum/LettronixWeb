import { Outlet, useLoaderData, useLocation } from "react-router-dom";

import HeaderRender from "./HeaderRender";
import FootRender from "./FooterRender";
import { Suspense, useEffect, useState } from "react";
import { useRPIControl } from "../hooks/useRPIControl";
import { usePreferences } from "../hooks/usePreferences";
import { useIsOnline } from "../hooks/useIsOnline";
import SkeletonHomeWindowRender from "../skeleton/SkeletonHomeWindow";
import SkeletonControlCenterRender from "../skeleton/SkeletonControlCenterRender";
import SkeletonHistoryStatsRender from "../skeleton/SkeletonHistoryStatsRender";

function MainLayout() {
  // Fetch initial data from the loader
  const { initialControlData, initialpreferenceData } = useLoaderData();
  const contextData = useRPIControl(initialControlData);
  const { preferenceData, setupPreferencesRealtime } = usePreferences(
    initialpreferenceData,
  );

  // RealtimeClient Checker
  const [arraySetupRealtime, setArraySetupRealtime] = useState<(() => void)[]>([
    contextData.setupControlRealtime,
    setupPreferencesRealtime,
  ]);
  const { fullyConnected, updateReconnectStatus } = useIsOnline();

  // function forceReconnection() {
  //   console.log("THIS IS WORKING");
  // }

  useEffect(() => {
    console.log("NUMBER OF SETUPS:", arraySetupRealtime);

    // document.addEventListener("visibilitychange", () => {
    //   document.visibilityState === "visible" && forceReconnection();
    // });

    const updateStatusInterval = setInterval(() => {
      updateReconnectStatus(arraySetupRealtime);
    }, 3000);
    return () => {
      // document.removeEventListener("visibilitychange", () => {
      //   document.visibilityState === "visible" && forceReconnection();
      // });
      clearInterval(updateStatusInterval);
    };
  }, [arraySetupRealtime]);

  // Loading of loading screen
  const { pathname } = useLocation();
  const getFallback = () => {
    if (pathname.toLowerCase() === "/") {
      document.title = "Lettronix Web - Home";
      return <SkeletonHomeWindowRender />;
    }
    if (pathname.toLowerCase() === "/control-center") {
      document.title = "Lettronix Web - Control Center";
      return <SkeletonControlCenterRender />;
    }
    if (pathname.toLowerCase() === "/history-statistics") {
      document.title = "Lettronix Web - History & Statistics";
      return <SkeletonHistoryStatsRender />;
    }
  };

  return (
    <>
      <div className="mx-7 mt-15 flex flex-col gap-1 pb-12 sm:mx-9 sm:mt-18 md:mx-12 md:mt-20 lg:mt-26 xl:mx-15 xl:mt-3 xl:h-[calc(100vh_-_(0.75rem)_-_(2.375rem)_-_(0.75rem)_-_(0.75rem))] xl:gap-3 xl:pb-0 mid-xl-2xl-1500:mx-40 mid-xl-2xl-1500:justify-evenly 2xl:mx-50">
        <Suspense fallback={<div>Loading header...</div>}>
          <HeaderRender
            val={contextData.values.status}
            fullyconnected={fullyConnected}
          />
        </Suspense>
        <Suspense fallback={getFallback()}>
          <Outlet
            context={{ contextData, preferenceData, setArraySetupRealtime }}
          />
        </Suspense>
      </div>
      <Suspense fallback={<div>Loading header...</div>}>
        <FootRender />
      </Suspense>
    </>
  );
}

export default MainLayout;
