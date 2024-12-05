import { useEffect, useRef } from "react";

export const useKeyPress = () => {
  const isCtrlDown = useRef(false);
  const isLeftShiftSelected = useRef(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey) {
        isCtrlDown.current = true;
      }
      if (event.key === "Shift" && !event.repeat) {
        isLeftShiftSelected.current = true;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (!event.ctrlKey) {
        isCtrlDown.current = false;
      }
      if (event.key === "Shift") {
        isLeftShiftSelected.current = false;
      }
    };

    // Add event listeners
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return { isCtrlDown, isLeftShiftSelected };
};
