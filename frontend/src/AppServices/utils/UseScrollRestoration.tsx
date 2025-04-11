import { getScrollPosition, saveScrollPosition } from "./scrollManagaer";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const UseScrollRestoration = (key: string) => {
  const location = useLocation();

  useEffect(() => {
    const savedScrollY = getScrollPosition(key);
    console.log("scrolling");
    window.scrollTo(0, savedScrollY);

    return () => {
      saveScrollPosition(key);
    };
  }, [key, location.pathname]);
};

export default UseScrollRestoration;
