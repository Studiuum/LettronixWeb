import "../LettronixTheme.css";
import SkeletonTitleCard from "./components/SkeletonTitleCards";

function SkeletonControlCenterRender() {
  function OtherControlSetRender() {
    return (
      <>
        <div
          className={`flex flex-1 animate-pulse flex-col font-normal transition-all duration-2000 xl:grid xl:grid-cols-[1fr_2fr_2fr] xl:grid-rows-1 xl:items-center`}
        >
          {/* Name + Help Icon */}

          <div className="mb-1 h-5 w-2/3 rounded-full bg-gray-300 opacity-70 xl:mb-0 xl:min-w-[18ch]"></div>

          {/* Status */}
          <div className="mb-3 h-5 w-2/3 rounded-full bg-gray-200 opacity-70 xl:mb-0"></div>
          <div className="flex flex-1 items-center px-5 md:px-20 lg:px-40 xl:px-10">
            <div className="h-[calc(1rem+0.5rem*2)] w-full rounded-[8px] bg-gray-200 px-[20px] py-[8px] opacity-70 transition-all duration-2000"></div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex flex-1 flex-col gap-3">
        <div className="main-card flex-col gap-y-3 xl:flex-row xl:gap-0">
          <div className="flex flex-row items-center gap-2 border-b-1 border-lettronix-title-border pb-2 xl:w-1/2 xl:border-none xl:pb-0">
            <div className="h-[calc(0.75rem)] w-1/2 animate-pulse rounded-full bg-gray-300 opacity-70 transition-all duration-2000 sm:h-[1rem] lg:h-[1.25rem]"></div>
          </div>
          <div className="flex animate-pulse flex-row justify-between px-5 transition-all duration-2000 sm:px-20 md:px-25 lg:px-50 xl:w-1/2 xl:justify-evenly xl:gap-0 xl:px-0">
            <div className="h-[calc(0.625rem+0.5rem*2)] w-[14.5ch] rounded-[10px] bg-gray-200 opacity-70 sm:h-[calc(0.875rem+0.625rem*2)] sm:w-[16ch] sm:rounded-[12px]"></div>
            <div className="h-[calc(0.625rem+0.5rem*2)] w-[10.5ch] rounded-[10px] bg-gray-200 opacity-70 sm:h-[calc(0.875rem+0.625rem*2)] sm:w-[12ch] sm:rounded-[12px]"></div>
            <div className="h-[calc(0.625rem+0.5rem*2)] w-[12.5ch] rounded-[10px] bg-gray-200 opacity-70 sm:h-[calc(0.875rem+0.625rem*2)] sm:w-[14ch] sm:rounded-[12px]"></div>
          </div>
        </div>
        <div
          className={`main-card items-align flex-[1_1_auto] flex-col gap-y-3 overflow-visible`}
        >
          <SkeletonTitleCard classses="w-1/4 h-[calc(0.75rem)] sm:h-[1rem] lg:h-[1.25rem]" />
          <div className="flex flex-[1_1_auto] flex-col gap-5 lg:ml-5">
            {[1, 2, 3, 4, 5, 6].map((_, index) => {
              return (
                <OtherControlSetRender key={`control-line-skeleton-${index}`} />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default SkeletonControlCenterRender;
