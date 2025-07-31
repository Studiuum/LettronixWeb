import { Outlet, useLoaderData, useLocation } from "react-router-dom";

import HeaderRender from "./HeaderRender";
import FootRender from "./FooterRender";
import { Suspense } from "react";
import { useRPIControl } from "../hooks/useRPIControl";
import { usePreferences } from "../hooks/usePreferences";

function MainLayout() {
  // Fetch initial data from the loader
  const { initialControlData, initialpreferenceData } = useLoaderData();
  const contextData = useRPIControl(initialControlData);
  const preferenceData = usePreferences(initialpreferenceData);
  // console.log("MAIN LAYOUT:", preferenceData, initialpreferenceData);
  const { pathname } = useLocation();

  const getFallback = () => {
    if (pathname.toLowerCase() === "/") return <div>Loading Home...</div>;
    if (pathname.toLowerCase() === "/control-center")
      return <div>Loading Control Center...</div>;
    if (pathname.toLowerCase() === "/history-statistics")
      return <div>Loading History Statistics...</div>;
    return <div>Loading page...</div>;
  };
  return (
    <>
      <div className="mx-7 mt-15 flex flex-col gap-1 pb-12 sm:mx-9 sm:mt-18 md:mx-12 md:mt-20 lg:mt-26 xl:mx-15 xl:mt-3 xl:h-[calc(100vh_-_(0.75rem)_-_(2.375rem)_-_(0.75rem)_-_(0.75rem))] xl:gap-3 xl:pb-0 mid-xl-2xl-1500:mx-40 mid-xl-2xl-1500:justify-evenly 2xl:mx-50">
        <Suspense fallback={<div>Loading header...</div>}>
          <HeaderRender val={contextData.values.status} />
        </Suspense>
        <Suspense fallback={getFallback()}>
          <Outlet context={{ contextData, preferenceData }} />
        </Suspense>
      </div>
      <Suspense fallback={<div>Loading header...</div>}>
        <FootRender />
      </Suspense>
    </>
  );
}

export default MainLayout;
