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
      <div className="text-sm leading-none font-[450] tracking-[0rem] md:text-[1rem] xl:text-[1.250rem]">
        {label.toUpperCase()}
      </div>
      <img
        src={`src/assets/icons/${label.trim().replace(" ", "-")}-icon.svg`}
        className="h-4 w-4 sm:h-5 sm:w-5 md:h-auto md:w-auto"
      />
    </div>
  );
}
