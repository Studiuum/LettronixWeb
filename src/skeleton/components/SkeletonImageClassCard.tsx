export default function SkeletonImageClassCard() {
  return (
    <>
      <div className="flex flex-grow-0 animate-pulse flex-col justify-start gap-0 transition-all duration-2000">
        <div className="large-body-sub-title-skeleton mb-1 w-5/12 rounded-full bg-gray-200 opacity-70"></div>
        <div className="ml-2 flex h-full gap-2 md:ml-4 md:gap-5">
          {/* FUNCION HERE */}
          <input
            type="number"
            className="w-[2.5ch] flex-shrink transform-gpu appearance-none overflow-hidden rounded-2xl bg-gray-300 py-0 text-center text-5xl leading-none font-bold text-ellipsis whitespace-nowrap opacity-70 outline-0 transition-all duration-200 ease-in-out focus:bg-white sm:h-[60px] sm:text-6xl md:h-[72px] md:text-7xl xl:text-[4.6875rem]"
            disabled={true}
          />

          <div className="flex w-full flex-1 flex-col justify-center">
            {/* PROGRESS BAR */}
            <div className="flex h-4 flex-1">
              {/* FUNCION HERE  */}
              <div className="w-full flex-1 overflow-hidden rounded-full bg-gray-300 pb-1 opacity-70"></div>
            </div>
            <div className="mt-1 mb-1 h-[0.625rem] w-3/5 rounded-full bg-gray-200 sm:h-[14px] lg:h-[16px]"></div>
            <div className="h-[0.625rem] rounded-full bg-gray-200 sm:h-[14px] lg:h-[16px]"></div>
          </div>
        </div>
      </div>

      {/* IMAGE + CLASSIFICATION */}
      <div className="flex flex-1 animate-pulse flex-col overflow-hidden rounded-[8px] border-none transition-all duration-2000 md:rounded-[15px]">
        {/* Image block */}
        <div className="bg-red flex h-60 flex-col items-center justify-center overflow-hidden bg-gray-200 text-gray-400 sm:h-125 md:h-110">
          <div className="flex items-center justify-center">
            <svg
              className="h-[50%] w-[50%] lg:block"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M3.464 3.464C2 4.93 2 7.286 2 12s0 7.071 1.464 8.535C4.93 22 7.286 22 12 22s7.071 0 8.535-1.465C22 19.072 22 16.714 22 12s0-7.071-1.465-8.536C19.072 2 16.714 2 12 2S4.929 2 3.464 3.464"
                clipRule="evenodd"
                opacity="0.5"
              />
              <path
                fill="currentColor"
                d="M8.504 13.177a1.55 1.55 0 0 0-2.183-.073l-.81.753a.75.75 0 0 1-1.021-1.1l.81-.752a3.05 3.05 0 0 1 4.296.143l2.647 2.81a.795.795 0 0 0 1.054.092a3.07 3.07 0 0 1 3.953.241l2.268 2.167a.75.75 0 0 1-1.036 1.084l-2.268-2.166a1.57 1.57 0 0 0-2.02-.123a2.295 2.295 0 0 1-3.043-.266zM18 8a2 2 0 1 1-4 0a2 2 0 0 1 4 0"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}
