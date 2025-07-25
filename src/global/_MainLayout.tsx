import { Outlet, useLoaderData, useLocation } from "react-router-dom";

import HeaderRender from "./HeaderRender";
import FootRender from "./FooterRender";
import { Suspense } from "react";
import { useRPIControl } from "../hooks/useRPIControl";

function MainLayout() {
  // Fetch initial data from the loader
  const { initialControlData, preferenceData } = useLoaderData();
  const contextData = useRPIControl(initialControlData);

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
      <div className="mx-7 mt-15 flex flex-col pb-12 sm:mx-9 sm:mt-18 md:mx-12 md:mt-20 lg:mt-30 xl:mx-15 xl:mt-2 xl:gap-3 xl:pb-0 mid-xl-2xl-1500:mx-40 mid-xl-2xl-1500:justify-evenly 2xl:mx-50 min-1024-768:mt-3 min-1024-768:h-[93vh] min-1024-768:gap-3">
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
