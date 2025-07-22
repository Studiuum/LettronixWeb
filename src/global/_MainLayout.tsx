import { Outlet, useLoaderData } from "react-router-dom";

import HeaderRender from "./HeaderRender";
import FootRender from "./FooterRender";
import { Suspense } from "react";
import { useRPIControl } from "../hooks/useRPIControl";

function MainLayout() {
  // Fetch initial data from the loader
  const { initialControlData, preferenceData } = useLoaderData();
  const contextData = useRPIControl(initialControlData);

  return (
    <>
      <div className="flex min-h-[668px] flex-col justify-center gap-y-2 mx-45 my-2">
        <Suspense fallback={<div>Loading header...</div>}>
          <HeaderRender val={contextData.values.status} />
        </Suspense>
        <Outlet context={{ contextData, preferenceData }} />
      </div>
      <Suspense fallback={<div>Loading header...</div>}>
        <FootRender />
      </Suspense>
    </>
  );
}

export default MainLayout;
