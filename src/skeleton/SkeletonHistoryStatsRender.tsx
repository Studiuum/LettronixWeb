import "../LettronixTheme.css";

import SkeletonImageClassCard from "./components/SkeletonImageClassCard";
import SkeletonTitleCard from "./components/SkeletonTitleCards";

function SkeletonHistoryStatsRender() {
  return (
    <>
      <div className="flex w-full flex-1 flex-col justify-center gap-2 overflow-hidden lg:gap-3 xl:flex-row xl:gap-10">
        {/* LEFT SIDE */}
        <div className="main-card flex-grow justify-start overflow-hidden xl:w-1/2">
          {/* IMAGE AND CLASSIFICATION LINE */}
          <SkeletonTitleCard />
          <SkeletonImageClassCard />
        </div>

        {/* RIGHT SIDE */}
        <div className="main-card flex flex-[1_1_auto] flex-col xl:w-1/2 xl:overflow-hidden">
          {/* OVERVIEW LINE */}
          <SkeletonTitleCard />

          {/* SELECT PARAMETR GROUP */}
          <div className="flex flex-shrink-0 flex-col justify-center gap-2">
            <div className="large-body-sub-title-skeleton w-1/2 animate-pulse rounded-full bg-gray-200 opacity-70 transition-all duration-2000"></div>
            <div className="mx-5 grid animate-pulse grid-cols-2 grid-rows-2 gap-2 transition-all duration-2000">
              {/* TDS */}
              <div className="h-[calc(0.625rem+0.5rem*2)] rounded-[10px] bg-gray-200 opacity-70 sm:h-[calc(0.875rem+0.625rem*2)] sm:rounded-[12px]"></div>
              <div className="h-[calc(0.625rem+0.5rem*2)] rounded-[10px] bg-gray-200 opacity-70 sm:h-[calc(0.875rem+0.625rem*2)] sm:rounded-[12px]"></div>
              <div className="h-[calc(0.625rem+0.5rem*2)] rounded-[10px] bg-gray-200 opacity-70 sm:h-[calc(0.875rem+0.625rem*2)] sm:rounded-[12px]"></div>
              <div className="h-[calc(0.625rem+0.5rem*2)] rounded-[10px] bg-gray-200 opacity-70 sm:h-[calc(0.875rem+0.625rem*2)] sm:rounded-[12px]"></div>
            </div>
          </div>
          <div className="h-full w-full flex-1 animate-pulse rounded-[10px] bg-gray-200 opacity-70 transition-all duration-2000 sm:min-h-[50vh] sm:rounded-[12px] xl:h-full xl:overflow-hidden"></div>
        </div>
      </div>
    </>
  );
}

export default SkeletonHistoryStatsRender;
