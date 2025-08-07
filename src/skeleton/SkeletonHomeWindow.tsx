import SkeletonImageClassCard from "./components/SkeletonImageClassCard";
import SkeletonTitleCard from "./components/SkeletonTitleCards";

function RenderSensorReadingsCard() {
  return (
    <div className="flex flex-1 animate-pulse flex-col items-center justify-center gap-1 font-bold transition-all duration-2000 md:gap-2">
      <div className="h-8 w-full rounded-2xl bg-gray-300 opacity-70 sm:h-10 sm:w-10 md:h-12 md:w-12"></div>
      <div className="large-body-sub-title-skeleton w-full rounded-full bg-gray-300 opacity-70 sm:h-[1rem] md:h-[1.25rem]"></div>
      <div className="h-[0.75rem] w-full rounded-full bg-gray-200 opacity-70 sm:h-[1rem] md:h-[1.25rem]"></div>
    </div>
  );
}

function SkeletonHomeWindowRender() {
  return (
    <>
      <div className="flex w-full flex-1 flex-col justify-center gap-2 overflow-hidden lg:gap-3 xl:flex-row xl:gap-10">
        {/* <div className="flex w-full flex-1 justify-center gap-10"> */}
        {/* LEFT SIDE */}
        <div className="main-card flex-grow justify-start overflow-hidden xl:w-1/2">
          {/* OVERVIEW LINE */}
          <SkeletonTitleCard />
          <SkeletonImageClassCard />
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-grow flex-col gap-2 md:justify-between lg:gap-3 xl:w-1/2">
          {/* SENSOR READINGS */}
          <div className={`main-card flex-[1_1_auto]`}>
            {/* SENSOR READINGS LINE */}
            <SkeletonTitleCard />
            <div className="flex flex-1 flex-row items-center justify-center gap-4">
              <RenderSensorReadingsCard />
              <RenderSensorReadingsCard />
              <RenderSensorReadingsCard />
              <RenderSensorReadingsCard />
            </div>
          </div>
          {/* WATER LEVEL SENSOR */}
          <div className="main-card flex flex-[3_1_auto] flex-col">
            <SkeletonTitleCard />
            <div className="grid flex-1 animate-pulse grid-cols-2 grid-rows-4 gap-x-5 gap-y-2 rounded-[15px] transition-all duration-2000">
              {/* WATER LEVEL SENSOR LINE */}
              <div className="h-[0.625rem] w-full rounded-full bg-gray-200 opacity-70 sm:h-[0.875rem] lg:h-[1.25rem]"></div>
              <div className="h-[0.625rem] w-full rounded-full bg-gray-200 opacity-70 sm:h-[0.875rem] lg:h-[1.25rem]"></div>
              <div className="h-[0.625rem] w-full rounded-full bg-gray-200 opacity-70 sm:h-[0.875rem] lg:h-[1.25rem]"></div>
              <div className="h-[0.625rem] w-full rounded-full bg-gray-200 opacity-70 sm:h-[0.875rem] lg:h-[1.25rem]"></div>
              <div className="h-[0.625rem] w-full rounded-full bg-gray-200 opacity-70 sm:h-[0.875rem] lg:h-[1.25rem]"></div>
              <div className="h-[0.625rem] w-full rounded-full bg-gray-200 opacity-70 sm:h-[0.875rem] lg:h-[1.25rem]"></div>
              <div className="h-[0.625rem] w-full rounded-full bg-gray-200 opacity-70 sm:h-[0.875rem] lg:h-[1.25rem]"></div>
              <div className="h-[0.625rem] w-full rounded-full bg-gray-200 opacity-70 sm:h-[0.875rem] lg:h-[1.25rem]"></div>
            </div>
          </div>
          <div className={`main-card flex-[1_1_auto`}>
            {/* SENSOR READINGS LINE */}
            {/* WATER LEVEL SENSOR LINE */}
            <SkeletonTitleCard />
            <div className="flex animate-pulse flex-row items-center justify-center gap-3 px-0 transition-all duration-2000 sm:gap-3">
              <div className="h-[calc(0.625rem+0.5rem*2)] w-[14.5ch] rounded-[10px] bg-gray-200 opacity-70 sm:h-[calc(0.875rem+0.625rem*2)] sm:w-[16ch] sm:rounded-[12px]"></div>
              <div className="h-[calc(0.625rem+0.5rem*2)] w-[10.5ch] rounded-[10px] bg-gray-200 opacity-70 sm:h-[calc(0.875rem+0.625rem*2)] sm:w-[12ch] sm:rounded-[12px]"></div>
              <div className="h-[calc(0.625rem+0.5rem*2)] w-[12.5ch] rounded-[10px] bg-gray-200 opacity-70 sm:h-[calc(0.875rem+0.625rem*2)] sm:w-[14ch] sm:rounded-[12px]"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SkeletonHomeWindowRender;
