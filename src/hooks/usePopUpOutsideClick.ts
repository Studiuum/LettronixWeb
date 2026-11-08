import { useEffect } from "react";
import type { RefObject } from "react";

export const useOutsideClick = (
  ref: RefObject<HTMLElement | null>,
  callback: () => void,
  isActive: boolean,
) => {
  useEffect(() => {
    if (!isActive) return;

    const handleClick = (event: MouseEvent) => {
      const targetElement = event.target as HTMLElement;

      const isOutsideRef = ref.current && !ref.current.contains(targetElement);

      const isANavigationLink =
        targetElement.tagName === "A" ||
        targetElement.closest("a") !== null ||
        targetElement.closest('[role="link"]') !== null;

      if (isOutsideRef && !isANavigationLink) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref, callback, isActive]);
};
