import HeaderRender from "../global/HeaderRender";
import FootRender from "../global/FooterRender";
import { Outlet } from "react-router";
import { useRPIControl } from "../hooks/useRPIControl";

function MainLayout() {
  const contextData = useRPIControl();
  console.log("mainStatus:", contextData.values.status); // <- add this
  return (
    <>
      <div className="flex min-h-[668px] flex-col justify-center gap-y-2 mx-45 my-2">
        <HeaderRender val={contextData.values.status} />
        <Outlet context={contextData} />
      </div>
      <FootRender />
    </>
  );
}

export default MainLayout;
