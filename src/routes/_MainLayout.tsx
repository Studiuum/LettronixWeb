import HeaderRender from "../components/HeaderRender";
import FootRender from "../components/FooterRender";
import { Outlet } from "react-router";

function MainLayout() {
  return (
    <>
      <div className="flex min-h-[668px] flex-col justify-center gap-y-2 mx-45 my-2 bg-red-200">
        <HeaderRender />
        <Outlet />
      </div>
      <FootRender />
    </>
  );
}

export default MainLayout;
