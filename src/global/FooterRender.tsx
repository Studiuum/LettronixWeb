import { NavLink } from "react-router";

const getRoute = (index: number) => {
  if (index === 0) return "/";
  if (index === 1) return "/control-center";
  if (index === 2) return "/history-statistics";
  return "/"; // default fallback
};

function FootRender() {
  return (
    <div className="fixed right-0 bottom-2 left-0 z-50 mx-10 rounded-full sm:mx-20 lg:mx-30 xl:mx-70">
      <nav className="flex flex-row divide-x-2 divide-lettronix-title-border">
        {[
          { icon: "src/assets/icons/nav-home-icon.svg", label: "HOME" },
          {
            icon: "src/assets/icons/nav-control-center-icon.svg",
            label: "CONTROL CENTER",
          },
          {
            icon: "src/assets/icons/nav-stats-icon.svg",
            label: "HISTORY AND STATISTICS",
          },
        ].map((item, index) => (
          <NavLink
            to={getRoute(index)}
            key={index}
            className={({ isActive }) =>
              `x:text-x1 cursor-events-none active: flex flex-1 items-center justify-center bg-green-600 py-1 font-medium duration-300 hover:bg-green-700 active:drop-shadow-none lg:gap-4 lg:py-2 xl:px-4 xl:py-2.25 ${index === 0 ? "rounded-l-full" : ""} ${index === 2 ? "rounded-r-full" : ""} ${
                isActive
                  ? "bg-green- pointer-events-none inset-shadow-nav-bar-select"
                  : ""
              }`
            }
          >
            <img src={item.icon} alt={item.label} className="block h-5 w-5" />
            <span className="hidden text-center lg:block lg:text-[13px]">
              {item.label}
            </span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export default FootRender;
