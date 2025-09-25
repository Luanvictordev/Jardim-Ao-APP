import { useEffect } from "react";
import { useLocation } from "react-router-dom";

type ScrollState = {
  preventAutoScroll?: boolean;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  window.requestAnimationFrame(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  });
};

const ScrollManager = () => {
  const { pathname, state } = useLocation();

  useEffect(() => {
    const scrollState = state as ScrollState | null;
    if (scrollState?.preventAutoScroll) {
      return;
    }
    scrollToTop();
  }, [pathname, state]);

  return null;
};

export default ScrollManager;
