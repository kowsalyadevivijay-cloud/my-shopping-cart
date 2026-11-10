import { useEffect } from "react";

export default function useModalBehavior(onClose) {
  useEffect(() => {
  
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    const originalOverflowStyle = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflowStyle;
    };
  }, [onClose]);
}