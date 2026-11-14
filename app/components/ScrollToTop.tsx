"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { scrollPageToTop } from "../webgi-client";

/*
 * Resets the scroll position on every client-side route change.
 * Runs after a double requestAnimationFrame so it lands after the
 * route commit, Next's own scroll handling and the WebGi hero's
 * resume/pause effects — whichever order they resolve in, the page
 * always ends at the top.
 */
export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    let innerRaf = 0;
    const outerRaf = requestAnimationFrame(() => {
      innerRaf = requestAnimationFrame(() => {
        scrollPageToTop();
      });
    });

    return () => {
      cancelAnimationFrame(outerRaf);
      cancelAnimationFrame(innerRaf);
    };
  }, [pathname]);

  return null;
}
