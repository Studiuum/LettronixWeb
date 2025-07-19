import { Outlet } from "react-router-dom";
import { useRPIControl } from "../hooks/useRPIControl";
import HeaderRender from "./HeaderRender";
import FootRender from "./FooterRender";

function MainLayout() {
  const contextData = useRPIControl();
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
