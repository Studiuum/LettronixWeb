import { NavLink } from "react-router";

const getRoute = (index: number) => {
  if (index === 0) return "/";
  if (index === 1) return "/control-center";
  if (index === 2) return "/history-statistics";
  return "/"; // default fallback
};

function FootRender() {
  return (
    <div className="fixed bottom-2 left-0 right-0 mx-70 bg-lettronix-head-foot-bg rounded-full shadow drop-shadow-btn-fx z-50">
      <nav className="flex flex-row divide-x divide-lettronix-title-border">
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
              `flex-1 flex items-center justify-center gap-4 py-2.25 px-4 text-x1 font-medium cursor-events-none
            hover:bg-lettronix-hover active: active:drop-shadow-none duration-300
            ${index === 0 ? "rounded-l-full" : ""}
            ${index === 2 ? "rounded-r-full" : ""}
            ${
              isActive
                ? " bg-lettronix-selected inset-shadow-inward-all-fx pointer-events-none"
                : ""
            }`
            }
          >
            <img src={item.icon} alt={item.label} className="w-5 h-5" />
            <span className="text-center">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export default FootRender;
