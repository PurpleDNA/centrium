// import { getScrollPosition, saveScrollPosition } from "./scrollManagaer";
// import { useLocation } from "react-router-dom";
// import { useEffect } from "react";

// const UseScrollRestoration = (key: string, scrolled: number) => {
//   const location = useLocation();

//   useEffect(() => {
//     console.log(scrolled);
//     const savedScrollY = getScrollPosition(key);
//     window.scrollTo(0, savedScrollY);

//     return () => {
//       saveScrollPosition(key, scrolled);
//     };
//   }, [key, location.pathname, scrolled]);
// };
import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const scrollPositions = new Map<string, number>();

const UseScrollRestoration = (
  key: string,
  ref: React.RefObject<HTMLElement>
) => {
  const location = useLocation();
  const navType = useNavigationType();
  const previousKeyRef = useRef(location.key);

  // 🧠 Save scroll *before* navigation away
  useLayoutEffect(() => {
    return () => {
      const el = ref.current;
      if (el) {
        scrollPositions.set(previousKeyRef.current, el.scrollTop);
      }
    };
  }, [location]);

  // 🔁 Restore scroll *after* mounting
  useEffect(() => {
    const el = ref.current;

    if (navType === "POP" && el) {
      const saved = scrollPositions.get(location.key) ?? 0;
      el.scrollTo({ top: saved, behavior: "auto" });
    } else {
      el?.scrollTo({ top: 0, behavior: "auto" });
    }

    previousKeyRef.current = location.key;
  }, [location.key]);
};

export default UseScrollRestoration;
