export default function TitleCard({
  label,
  classNames,
}: {
  label: string;
  classNames?: string;
}) {
  return (
    <div
      className={`${classNames} flex items-center justify-between border-b-1 border-lettronix-title-border pb-1 md:pb-2`}
    >
      <div className="text-[0.75rem] leading-none font-medium tracking-[0rem] text-green-900 sm:text-[1rem] md:text-[1rem] lg:text-[1.250rem]">
        {label.toUpperCase()}
      </div>
      <img
        src={`src/assets/icons/${label.trim().replaceAll(" ", "-")}-icon.svg`}
        alt={`${label} icon`}
        className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6"
      />
    </div>
  );
}
