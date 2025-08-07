export default function SkeletonTitleCard({ classses }: { classses?: string }) {
  let width_ = "w-full sm:h-[1rem] md:h-[1rem] lg:h-6 h-[0.75rem]";
  if (classses) width_ = classses;
  return (
    <div
      className={`flex animate-pulse items-center justify-between border-b-1 border-lettronix-title-border pb-1 transition-all duration-2000 md:pb-2`}
    >
      <div
        className={` ${width_} rounded-full bg-gray-200 leading-none font-medium tracking-[0rem] opacity-70`}
      ></div>
    </div>
  );
}
