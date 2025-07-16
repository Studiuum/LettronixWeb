import "../LettronixTheme.css";
const navBtn = " flex flex-row flex-1 gap-5 justify-center";

const btn =
  " bg-lettronix-head-foot-bg hover:bg-lettronix-hover hover:drop-shadow-all-fx active:bg-lettronix-selected active:drop-shadow-none active:inset-shadow-inward-all-fx disabled:bg-lettronix-btn-disabled";

function FootRender() {
  return (
    <div className="fixed bottom-2 left-0 right-0 mx-70 bg-lettronix-head-foot-bg rounded-full shadow drop-shadow-btn-fx z-50">
      <div className="flex divide-x divide-lettronix-title-border">
        {[
          { icon: "/icons/nav-home-icon.svg", label: "HOME" },
          {
            icon: "/icons/nav-control-center-icon.svg",
            label: "CONTROL CENTER",
          },
          {
            icon: "/icons/nav-stats-icon.svg",
            label: "HISTORY AND STATISTICS",
          },
        ].map((item, index) => (
          <button
            key={index}
            className={`flex-1 flex items-center justify-center gap-4 py-2.25 px-4 text-x1 font-medium 
          hover:bg-lettronix-hover active:bg-lettronix-selected active:drop-shadow-none duration-300
          active:inset-shadow-inward-all-fx
          ${index === 0 && "rounded-l-full"}
          ${index === 2 && "rounded-r-full"}`}
          >
            <img src={item.icon} alt={item.label} className="w-5 h-5" />
            <span className="text-center">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default FootRender;
