"use client";
import "./styles.scss";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSelectedLayoutSegment } from "next/navigation";
import { siteAsset } from "./site";

const markup = `
    <div class="loader">
        <svg
            width="48"
            height="48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <mask
                id="a"
                style="mask-type:alpha"
                maskUnits="userSpaceOnUse"
                x="9"
                y="3"
                width="32"
                height="42"
            >
                <path
                    d="M25 44a15 15 0 1 0 0-30 15 15 0 0 0 0 30Z"
                    stroke="#fff"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="m18 8 3-4h8l3 4-7 6-7-6Z"
                    fill="#555"
                    stroke="#fff"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </mask>

            <g mask="url(#a)">
                <path d="M0 0h48v48H0V0Z" fill="#52322B" />
            </g>
        </svg>

        <p>Loading... Please wait</p>
        <div class="progress"></div>
    </div>

    <div class="side-bar">
        <nav class="navigation">
            <ul>
                <li class="unique"></li>
                <li class="forever"></li>
                <li class="emotions"></li>
            </ul>
        </nav>
    </div>

    <section class="section cam-view-1">
        <div class="hero--container">
            <div class="hero--content">
                <h1 class="webtitle">
                    Neos7 Gold 
                </h1>

                <div class="hero--text">
                    <p>
                       Explore refined gold jewelry, thoughtfully shaped with elegant
                       lines and sophisticated details to create timeless pieces that endure beyond trends.
                    </p>

                   
                </div>
            </div>
        </div>

        <div class="hero--scroller--container">
            <div class="hero--scroller">
                <p class="hero--scroller--text">
                    Start scrolling to explore
                </p>

                <svg
                    class="bounce"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M8 12L12 16L16 12"
                        stroke="#52322B"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M12 8V16"
                        stroke="#52322B"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </div>
        </div>
    </section>

    <section class="section cam-view-2">
        <div class="forever--container">
            <div class="forever--text-bg">
                Neos7
            </div>

            <div class="forever--content">
                <div class="forever--title">
                    <h2></h2>
                    <h1>
                        
                    </h1>
                </div>

                <p>
                    Discover exquisite gold jewellery, thoughtfully 
                    crafted with elegant forms and refined details to create a timeless expression of luxury.
                </p>
            </div>
        </div>
    </section>

    <section class="section cam-view-3">
        <div class="emotions--container">
            <div class="emotions--text-bg">
                
            </div>

            <div class="emotions--content">
                <div class="emotions--text">
                    <h2></h2>
                    <h1></h1>

                    <p>
                       
                    </p>
                </div>

                
            </div>
        </div>
    </section>

    <div class="footer--container">

        <div class="footer--menu">
            
        </div>

        <div class="gem--menu">
           
        </div>

        <div class="materials--menu">
            <ul class="materials--list">

                <li class="default active">
                    <img
                        alt="default color"
                        width="60"
                        src="${siteAsset("images/default.png")}"
                    >
                </li>

                <li class="silver-gold">
                    <img
                        alt="silver-gold"
                        width="60"
                        src="${siteAsset("images/silver_gold.png")}"
                    >
                </li>

                <li class="silver-silver">
                    <img
                        alt="Fancy color"
                        width="60"
                        src="${siteAsset("images/silver_silver.png")}"
                    >
                </li>

                <li class="gold-gold">
                    <img
                        alt="Fancy color"
                        width="60"
                        src="${siteAsset("images/gold_gold.png")}"
                    >
                </li>

                <li class="rose-silver">
                    <img
                        alt="Fancy color"
                        width="60"
                        src="${siteAsset("images/rose_silver.png")}"
                    >
                </li>

                <li class="gold-rose">
                    <img
                        alt="Fancy color"
                        width="60"
                        src="${siteAsset("images/gold_rose.png")}"
                    >
                </li>

                <li class="rose-rose">
                    <img
                        alt="Fancy color"
                        width="60"
                        src="${siteAsset("images/rose_rose.png")}"
                    >
                </li>

                <li class="close-materials">
                    <!-- Close SVG -->
                </li>

            </ul>
        </div>
    </div>

    <div class="exit--container">
        <h3 class="customize--title">
            Customize your ring
        </h3>

        <p class="copyright">
            Created by  Noes7 Gold. All rights reserved.
        </p>

        <button tabindex="-1" class="button--secondary button--exit">
            Exit
        </button>
    </div>

    <div id="webgi-canvas-container">
        <canvas id="webgi-canvas"></canvas>
    </div>
`;

export default function WebGiJewelry() {
  const rootRef = useRef<HTMLDivElement>(null);
  const segment = useSelectedLayoutSegment();
  const isHome = segment === null;
  const [booted, setBooted] = useState(false);

  /*
   * React compares props with `===`, so a fresh `{ __html: markup }`
   * literal on every render makes it believe `dangerouslySetInnerHTML`
   * changed and re-assign `domElement.innerHTML`. That would destroy and
   * rebuild the whole hero subtree - including the WebGL canvas and the
   * inline styles GSAP applied to the hero - every time this component
   * re-renders (e.g. when the parked class is toggled). Memoising the
   * object keeps its identity stable so the DOM is left untouched.
   */
  const innerHtml = useMemo(() => ({ __html: markup }), []);

  // The WebGi scene is only needed on the home page, so it is created the
  // first time that page is shown...
  useEffect(() => {
    if (!booted && isHome) setBooted(true);
  }, [booted, isHome]);

  // ...created exactly once for the whole session...
  useEffect(() => {
    if (!booted) return;

    const root = rootRef.current;

    const showFallback = () => {
      window.clearTimeout(fallbackTimer);
      root?.classList.add("webgi-fallback");
      document.body.style.overflowY = "auto";
    };

    const showLoadedScene = () => {
      window.clearTimeout(fallbackTimer);
      root?.classList.remove("webgi-fallback");
      root?.classList.add("webgi-loaded");
      document.body.style.overflowY = "auto";
    };

    // Fast fallback timer: 2.5s max (prevents user from being locked on loading screen)
    const fallbackTimer = window.setTimeout(showFallback, 2500);
    window.addEventListener("webgi:loaded", showLoadedScene);
    window.addEventListener("webgi:failed", showFallback);

    // Allow page scrolling immediately so the user is never locked
    document.body.style.overflowY = "auto";

    // Defer heavy 3D WebGi initialization so the main thread paints the hero immediately
    const startWebGi = () => {
      import("./webgi-client")
        .then((m) => m.initWebGi())
        .catch((error) => {
          console.error(error);
          showFallback();
        });
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      (window as any).requestIdleCallback(startWebGi, { timeout: 1500 });
    } else {
      setTimeout(startWebGi, 50);
    }
  }, [booted]);

  // ...and afterwards only parked while another route is displayed and
  // resumed on return. Rebuilding the viewer on every navigation is what
  // used to make the hero take tens of seconds (or appear to hang) after a
  // client-side route change.
  useEffect(() => {
    if (!booted) return;

    let cancelled = false;

    import("./webgi-client").then((m) => {
      if (cancelled) return;

      if (isHome) m.resumeWebGi();
      else m.pauseWebGi();
    });

    return () => {
      cancelled = true;
    };
  }, [booted, isHome]);

  return (
    <div
      ref={rootRef}
      className={isHome ? "webgi-root" : "webgi-root webgi-parked"}
      dangerouslySetInnerHTML={innerHtml}
    />
  );
}
