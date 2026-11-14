import { siteAsset } from "./site";

let initialized = false;
let lifecycleGeneration = 0;

let viewerInstance: any = null;
let lenisInstance: any = null;
let rafId: number | null = null;
let audio: HTMLAudioElement | null = null;

let gsapInstance: any = null;
let scrollTriggerInstance: any = null;

let lenisCtor: any = null;
let pageScrollSetup: (() => void) | null = null;
let replayIntro: (() => void) | null = null;
let activeIntro: any = null;

/* ================================================================
   LENIS
   Owns the smooth-scroll RAF loop. Kept separate from the viewer so
   the loop can be stopped while the hero is parked on another route
   and started again when the home page is back.
================================================================ */

function startLenis() {
    if (!lenisCtor || lenisInstance) return;

    const lenis = new lenisCtor({
        duration: 2.8,

        easing: (t: number) =>
            Math.min(
                1,
                1.001 - Math.pow(2, -5 * t)
            ),

        direction: "vertical",
        gestureDirection: "vertical",
        mouseMultiplier: 1,
        smoothWheel: true,
    });

    lenisInstance = lenis;

    const raf = (time: number) => {
        if (!lenisInstance) return;

        lenisInstance.raf(time);

        rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);
}

function stopLenis() {
    if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
    }

    if (lenisInstance) {
        try {
            lenisInstance.destroy();
        } catch {}

        lenisInstance = null;
    }
}

/* ================================================================
   INIT
================================================================ */

export async function initWebGi() {
    if (initialized) {
        return;
    }

    if (
        typeof window === "undefined" ||
        typeof document === "undefined"
    ) {
        return;
    }

    initialized = true;
    const generation = ++lifecycleGeneration;
    const isCurrent = () => generation === lifecycleGeneration;

    try {
        const {
            ViewerApp,
            AssetManagerPlugin,
            timeout,
            SSRPlugin,
            mobileAndTabletCheck,
            GBufferPlugin,
            ProgressivePlugin,
            TonemapPlugin,
            SSAOPlugin,
            GroundPlugin,
            FrameFadePlugin,
            DiamondPlugin,
            BloomPlugin,
            TemporalAAPlugin,
            RandomizedDirectionalLightPlugin,
            Color,
        } = await import("webgi");
        if (!isCurrent()) return;

        const { default: gsap } = await import("gsap");
        if (!isCurrent()) return;
        const { ScrollTrigger } =
            await import("gsap/ScrollTrigger");
        if (!isCurrent()) return;

        const { default: Lenis } =
            await import("@studio-freight/lenis");
        if (!isCurrent()) return;

        gsapInstance = gsap;
        scrollTriggerInstance = ScrollTrigger;

        gsap.registerPlugin(ScrollTrigger);

        /* ============================================================
           LENIS
        ============================================================ */

        lenisCtor = Lenis;
        startLenis();

        /* ============================================================
           CONSTANTS
        ============================================================ */

        const diamondsObjectNames = [
            "diamonds",
            "diamonds001",
            "diamonds002",
            "diamonds003",
            "diamonds004",
            "diamonds005",
        ];

        const diamondsObjectNames2 = [
            "Object",
        ];

        let usingCustomColors = false;

        let nightMode = false;

        let firstLoad = true;

        let ringModel = 1;

        let musicPlay = false;

        /* ============================================================
           VIEWER
        ============================================================ */

        const canvas =
            document.getElementById(
                "webgi-canvas"
            ) as HTMLCanvasElement | null;

        if (!canvas) {
            console.error(
                "WebGi: #webgi-canvas was not found."
            );

            initialized = false;
            window.dispatchEvent(new Event("webgi:failed"));

            return;
        }

        const viewer = new ViewerApp({
            canvas,
            useGBufferDepth: true,
            isAntialiased: false,
        });

        viewerInstance = viewer;

        /* ============================================================
           CAMERA
        ============================================================ */

        const isMobile =
            mobileAndTabletCheck();

        viewer.renderer.displayCanvasScaling =
            Math.min(
                window.devicePixelRatio || 1,
                1
            );

        const camera =
            viewer.scene.activeCamera;

        const position =
            camera.position;

        const target =
            camera.target;

        /* ============================================================
           UPDATE SYSTEM
        ============================================================ */

        let needsUpdate = true;

        function onUpdate() {
            needsUpdate = true;

            try {
                viewer.setDirty();
            } catch {
                // Viewer may not be ready yet.
            }
        }

        /* ============================================================
           DOM
        ============================================================ */

        const exploreView =
            document.querySelector(
                ".cam-view-3"
            ) as HTMLElement | null;

        const canvasView =
            document.getElementById(
                "webgi-canvas"
            ) as HTMLElement | null;

        const canvasContainer =
            document.getElementById(
                "webgi-canvas-container"
            ) as HTMLElement | null;

        const exitContainer =
            document.querySelector(
                ".exit--container"
            ) as HTMLElement | null;

        const header =
            document.querySelector(
                ".header"
            ) as HTMLElement | null;

        const camView1 =
            document.querySelector(
                ".cam-view-1"
            ) as HTMLElement | null;

        const camView2 =
            document.querySelector(
                ".cam-view-2"
            ) as HTMLElement | null;

        const camView3 =
            document.querySelector(
                ".cam-view-3"
            ) as HTMLElement | null;

        const gemMenu =
            document.querySelector(
                ".gem--menu"
            ) as HTMLElement | null;

        const footerContainer =
            document.querySelector(
                ".footer--container"
            ) as HTMLElement | null;

        const footerMenu =
            document.querySelector(
                ".footer--menu"
            ) as HTMLElement | null;

        const materialsMenu =
            document.querySelector(
                ".materials--menu"
            ) as HTMLElement | null;

        const configMaterial =
            document.querySelector(
                ".config--material"
            ) as HTMLElement | null;

        const configGem =
            document.querySelector(
                ".config--gem"
            ) as HTMLElement | null;

        const closeConfigMaterial =
            document.querySelector(
                ".close-materials"
            ) as HTMLElement | null;

        const configRing =
            document.querySelector(
                ".config--ring"
            ) as HTMLElement | null;

        const closeConfigGem =
            document.querySelector(
                ".close-gems"
            ) as HTMLElement | null;

        const sidebar =
            document.querySelector(
                ".side-bar"
            ) as HTMLElement | null;

        /* ============================================================
           COLOR
        ============================================================ */

        function linearColor(
            hex: string | number
        ) {
            return new Color(hex)
                .convertSRGBToLinear();
        }

        /* ============================================================
           TEXTURE NORMALIZATION
        ============================================================ */

        function normalizeTexture(
            texture: any
        ) {
            if (!texture) return;

            if (
                "colorSpace" in texture
            ) {
                const name =
                    texture.name || "";

                const lowerName =
                    String(name)
                        .toLowerCase();

                if (
                    lowerName.includes(
                        "basecolor"
                    ) ||
                    lowerName.includes(
                        "base_color"
                    ) ||
                    lowerName.includes(
                        "albedo"
                    ) ||
                    lowerName.includes(
                        "diffuse"
                    ) ||
                    lowerName.includes(
                        "color"
                    ) ||
                    lowerName.includes(
                        "map"
                    )
                ) {
                    texture.colorSpace =
                        "srgb";
                } else {
                    texture.colorSpace =
                        "";
                }
            }

            if (
                "needsUpdate" in texture
            ) {
                texture.needsUpdate = true;
            }
        }

        function normalizeMaterial(
            material: any
        ) {
            if (!material) return;

            normalizeTexture(
                material.map
            );

            normalizeTexture(
                material.normalMap
            );

            normalizeTexture(
                material.roughnessMap
            );

            normalizeTexture(
                material.metalnessMap
            );

            normalizeTexture(
                material.aoMap
            );

            normalizeTexture(
                material.emissiveMap
            );

            normalizeTexture(
                material.alphaMap
            );

            normalizeTexture(
                material.bumpMap
            );

            normalizeTexture(
                material.clearcoatMap
            );

            normalizeTexture(
                material.clearcoatNormalMap
            );

            normalizeTexture(
                material.clearcoatRoughnessMap
            );

            normalizeTexture(
                material.iridescenceMap
            );

            normalizeTexture(
                material.iridescenceThicknessMap
            );

            normalizeTexture(
                material.sheenColorMap
            );

            normalizeTexture(
                material.sheenRoughnessMap
            );

            normalizeTexture(
                material.specularColorMap
            );

            normalizeTexture(
                material.specularIntensityMap
            );

            normalizeTexture(
                material.transmissionMap
            );

            normalizeTexture(
                material.thicknessMap
            );

            if (
                material.map &&
                "colorSpace" in
                    material.map &&
                material.map.colorSpace ===
                    undefined
            ) {
                material.map.colorSpace =
                    "srgb";

                material.map.needsUpdate =
                    true;
            }

            if (
                material.needsUpdate !==
                undefined
            ) {
                material.needsUpdate = true;
            }
        }

        function normalizeObject(
            object: any
        ) {
            if (!object) return;

            object.traverse?.(
                (child: any) => {
                    if (
                        !child.material
                    ) {
                        return;
                    }

                    if (
                        Array.isArray(
                            child.material
                        )
                    ) {
                        child.material.forEach(
                            (mat: any) => {
                                normalizeMaterial(
                                    mat
                                );
                            }
                        );
                    } else {
                        normalizeMaterial(
                            child.material
                        );
                    }
                }
            );
        }

        /* ============================================================
           PLUGINS
        ============================================================ */

        const manager =
            await viewer.addPlugin(
                AssetManagerPlugin
            );
        if (!isCurrent()) return;

        const importer =
            manager.importer;

        await viewer.addPlugin(
            GBufferPlugin
        );
        if (!isCurrent()) return;

        await viewer.addPlugin(
            new ProgressivePlugin(32)
        );
        if (!isCurrent()) return;

        /*
         * IMPORTANT:
         *
         * Keep GLSL inside a single template literal.
         * This fixes the TypeScript parser error:
         *
         * Expected ';', '}' or <eof>
         */

        const vignetteShader = `
vec4 vignette(
    vec4 color,
    vec2 uv,
    float offset,
    float darkness
) {
    uv = (uv - vec2(0.5)) * vec2(offset);

    float vignetteAmount =
        dot(uv, uv) * darkness;

    return vec4(
        mix(
            color.rgb,
            vec3(0.17, 0.00, 0.09),
            vignetteAmount
        ),
        color.a
    );
}
`;

        const vignetteApply = `
gl_FragColor =
    vignette(
        gl_FragColor,
        vUv,
        1.1,
        0.8
    );
`;

        await viewer.addPlugin(
            new TonemapPlugin(
                true,
                false,
                [
                    vignetteShader,
                    vignetteApply,
                ]
            )
        );
        if (!isCurrent()) return;

        const ssr =
            await viewer.addPlugin(
                SSRPlugin
            );
        if (!isCurrent()) return;

        const ssao =
            await viewer.addPlugin(
                SSAOPlugin
            );
        if (!isCurrent()) return;

        await viewer.addPlugin(
            FrameFadePlugin
        );
        if (!isCurrent()) return;

        await viewer.addPlugin(
            GroundPlugin
        );
        if (!isCurrent()) return;

        const bloom =
            await viewer.addPlugin(
                BloomPlugin
            );
        if (!isCurrent()) return;

        await viewer.addPlugin(
            TemporalAAPlugin
        );
        if (!isCurrent()) return;

        await viewer.addPlugin(
            DiamondPlugin
        );
        if (!isCurrent()) return;

        await viewer.addPlugin(
            RandomizedDirectionalLightPlugin,
            false
        );
        if (!isCurrent()) return;

        /* ============================================================
           BACKGROUND
        ============================================================ */

        // viewer.setBackground(
        //     linearColor("#bb7101")
        // );

        /* ============================================================
           POST PROCESSING
        ============================================================ */

        if (
            ssr?.passes?.ssr?.passObject
        ) {
            ssr.passes.ssr.passObject.lowQualityFrames = 0;
        }

        if (
            bloom?.pass?.passObject
        ) {
            bloom.pass.passObject.bloomIterations = 2;
        }

        if (
            ssao?.passes?.ssao?.passObject
                ?.material
        ) {
            ssao.passes.ssr?.passObject;
            
            ssao.passes.ssao.passObject.material.defines.NUM_SAMPLES = 4;

            ssao.passes.ssao.passObject.material.needsUpdate = true;
        }

        /* ============================================================
           LOADER
        ============================================================ */

        importer.addEventListener(
            "onProgress",
            (ev: any) => {
                if (!ev) return;

                if (
                    typeof ev.loaded !==
                        "number" ||
                    typeof ev.total !==
                        "number" ||
                    ev.total <= 0
                ) {
                    return;
                }

                const progressRatio =
                    Math.min(
                        Math.max(
                            ev.loaded /
                                ev.total,
                            0
                        ),
                        1
                    );

                document
                    .querySelector(
                        ".progress"
                    )
                    ?.setAttribute(
                        "style",
                        `transform: scaleX(${progressRatio})`
                    );
            }
        );

        importer.addEventListener(
            "onLoad",
            () => {
                window.dispatchEvent(new Event("webgi:loaded"));

                if (firstLoad) {
                    introAnimation();
                } else {
                    gsap.to(
                        ".loader",
                        {
                            x: "100%",
                            duration: 0.35,
                            ease: "power2.out",
                            delay: 0,
                        }
                    );
                }
            }
        );

        /* ============================================================
           FIRST MODEL
        ============================================================ */

        await manager.addFromPath(
            siteAsset("ring_webgi.glb")
        );
        if (!isCurrent()) return;

        viewer.scene.traverse?.(
            (object: any) => {
                normalizeObject(object);
            }
        );

        /* ============================================================
           MODEL REFERENCES
        ============================================================ */

        let ring: any = null;
        let gold: any = null;
        let silver: any = null;

        let diamondObjects: any[] = [];

        function findObject(
            name: string
        ) {
            const objects =
                viewer.scene.findObjectsByName(
                    name
                );

            if (
                !objects ||
                objects.length === 0
            ) {
                console.warn(
                    `WebGi: object "${name}" not found.`
                );

                return null;
            }

            return objects[0];
        }

        function loadModelReferences() {
            diamondObjects = [];

            if (ringModel === 1) {
                ring =
                    findObject(
                        "Scene"
                    );

                silver =
                    findObject(
                        "silver"
                    );

                gold =
                    findObject(
                        "gold"
                    );

                for (
                    const name of
                        diamondsObjectNames
                ) {
                    const object =
                        findObject(
                            name
                        );

                    if (object) {
                        diamondObjects.push(
                            object
                        );
                    }
                }
            } else {
                ring =
                    findObject(
                        "Scene_1"
                    );

                if (!ring) {
                    ring =
                        findObject(
                            "ring-compare"
                        );
                }

                silver =
                    findObject(
                        "alliance"
                    );

                gold =
                    findObject(
                        "entourage"
                    );

                for (
                    const name of
                        diamondsObjectNames2
                ) {
                    const object =
                        findObject(
                            name
                        );

                    if (object) {
                        diamondObjects.push(
                            object
                        );
                    }
                }
            }

            normalizeObject(ring);
            normalizeObject(silver);
            normalizeObject(gold);

            diamondObjects.forEach(
                normalizeObject
            );
        }

        loadModelReferences();

        if (!ring) {
            console.error(
                "WebGi: Ring model could not be found."
            );
        }

        /* ============================================================
           CAMERA CONTROLS
        ============================================================ */

        if (camera.controls) {
            camera.controls.enabled =
                false;
        }

        /* ============================================================
           MOBILE
        ============================================================ */

        if (isMobile) {
            if (
                ssr?.passes?.ssr?.passObject
            ) {
                ssr.passes.ssr.passObject.stepCount /= 2;
            }

            if (bloom) {
                bloom.enabled = false;
            }

            camera.setCameraOptions({
                fov: 65,
            });
        }

        await timeout(50);
        if (!isCurrent()) return;

        /* ============================================================
           INTRO
        ============================================================ */

        function introAnimation() {
            firstLoad = false;

            /*
             * On a resume the loader is still parked off-screen from the
             * previous run, so bring it back before the slide-out tween.
             */
            gsap.set(
                ".loader",
                { x: "0%" }
            );

            const introTL =
                gsap.timeline();

            activeIntro = introTL;

            introTL
                .to(
                    ".loader",
                    {
                        x: "100%",
                        duration: 0.35,
                        ease: "power2.out",
                        delay: 0,
                    }
                )

                /*
                 * DRAMATIC CLOSE-UP
                 */

                .fromTo(
                    position,
                    {
                        x: 3,
                        y: -0.8,
                        z: 1.2,
                    },
                    {
                        x: 1.28,
                        y: -1.7,
                        z: 5.86,
                        duration: 1.8,
                        ease: "power2.out",
                        onUpdate,
                    },
                    "-=0.3"
                )

                .fromTo(
                    target,
                    {
                        x: 2.5,
                        y: -0.07,
                        z: -0.1,
                    },
                    {
                        x: isMobile
                            ? -0.21
                            : 0.91,
                        y: 0.03,
                        z: -0.25,
                        duration: 4.5,
                        ease:
                            "power2.inOut",
                        onUpdate,
                    },
                    "-=4.5"
                )

                .fromTo(
                    ".header--container",
                    {
                        opacity: 0,
                        y: "-100%",
                    },
                    {
                        opacity: 1,
                        y: "0%",
                        ease:
                            "power1.inOut",
                        duration: 0.8,
                    },
                    "-=1"
                )

                .fromTo(
                    ".hero--scroller",
                    {
                        opacity: 0,
                        y: "150%",
                    },
                    {
                        opacity: 1,
                        y: "0%",
                        ease:
                            "power4.inOut",
                        duration: 1,
                    },
                    "-=1"
                )

                .fromTo(
                    ".hero--container",
                    {
                        opacity: 0,
                        x: "100%",
                    },
                    {
                        opacity: 1,
                        x: "0%",
                        ease:
                            "power4.inOut",
                        duration: 1.8,
                        onComplete: () => {
                            activeIntro = null;
                            setupScrollAnimation();
                        },
                    },
                    "-=1"
                )

                .fromTo(
                    ".side-bar",
                    {
                        opacity: 0,
                        x: "50%",
                    },
                    {
                        opacity: 1,
                        x: "0%",
                        ease:
                            "power4.inOut",
                        duration: 2,
                    },
                    "-=1"
                )

                .to(
                    ".side-bar .unique",
                    {
                        opacity: 1,
                        scale: 1.5,
                        ease:
                            "power4.inOut",
                        duration: 2,
                    },
                    "-=1"
                );
        }

        /* ============================================================
           SCROLL ANIMATION
        ============================================================ */

        function setupScrollAnimation() {
            document.body.style.overflowY =
                "auto";

            const tl =
                gsap.timeline({
                    defaults: {
                        ease: "none",
                    },
                });

            /* ========================================================
               FOREVER
            ======================================================== */

            tl.to(
                position,
                {
                    x: -1.83,
                    y: -0.14,
                    z: 6.15,

                    scrollTrigger: {
                        trigger:
                            ".cam-view-2",
                        start:
                            "top bottom",
                        end:
                            "top top",
                        scrub: true,
                        immediateRender:
                            false,
                    },

                    onUpdate,
                }
            )

                .to(
                    target,
                    {
                        x: isMobile
                            ? 0
                            : -0.78,
                        y: isMobile
                            ? 1.5
                            : -0.03,
                        z: -0.12,

                        scrollTrigger: {
                            trigger:
                                ".cam-view-2",
                            start:
                                "top bottom",
                            end:
                                "top top",
                            scrub: true,
                            immediateRender:
                                false,
                        },

                        onUpdate,
                    }
                )

                /*
                 * SLOW RING ROTATION
                 */

                .to(
                    ring?.rotation,
                    {
                        x:
                            ringModel === 1
                                ? 0
                                : -Math.PI / 3,

                        y:
                            ringModel === 1
                                ? 0
                                : -0.92,

                        z:
                            ringModel === 1
                                ? Math.PI / 2
                                : 0,

                        scrollTrigger: {
                            trigger:
                                ".cam-view-2",
                            start:
                                "top bottom",
                            end:
                                "top top",
                            scrub: 1.5,
                            immediateRender:
                                false,
                        },

                        onUpdate,
                    }
                )

                /*
                 * COLOR TRANSITION
                 */

                .fromTo(
                    { x: 0 },
                    { x: 1 },
                    {
                        scrollTrigger: {
                            trigger:
                                ".cam-view-2",
                            start:
                                "top bottom",
                            end:
                                "top top",
                            scrub: true,
                            immediateRender:
                                false,
                        },

                        onUpdate:
                            function () {
                                if (
                                    usingCustomColors
                                ) {
                                    return;
                                }

                                if (
                                    !silver?.material ||
                                    !gold?.material
                                ) {
                                    return;
                                }

                                silver.material.color.lerpColors(
                                    linearColor(
                                        0xfefefe
                                    ),
                                    linearColor(
                                        0xd28b8b
                                    ),
                                    this.targets()[0].x
                                );

                                gold.material.color.lerpColors(
                                    linearColor(
                                        0xe2bf7f
                                    ),
                                    linearColor(
                                        0xd28b8b
                                    ),
                                    this.targets()[0].x
                                );

                                for (
                                    const object of
                                        diamondObjects
                                ) {
                                    if (
                                        object?.material?.color
                                    ) {
                                        object.material.color.lerpColors(
                                            linearColor(
                                                0xffffff
                                            ),
                                            linearColor(
                                                0x39cffe
                                            ),
                                            this.targets()[0].x
                                        );
                                    }
                                }

                                onUpdate();
                            },
                    }
                )

                .to(
                    ".hero--scroller",
                    {
                        opacity: 0,
                        y: "150%",

                        scrollTrigger: {
                            trigger:
                                ".cam-view-2",
                            start:
                                "top bottom",
                            end:
                                "top center",
                            scrub: 1,
                            immediateRender:
                                false,
                            pin:
                                ".hero--scroller--container",
                        },
                    }
                )

                .to(
                    ".hero--container",
                    {
                        opacity: 0,
                        xPercent: 100,

                        scrollTrigger: {
                            trigger:
                                ".cam-view-2",
                            start:
                                "top bottom",
                            end:
                                "top top",
                            scrub: 1,
                            immediateRender:
                                false,
                        },
                    }
                )

                .to(
                    ".forever--text-bg",
                    {
                        opacity: 0.1,

                        scrollTrigger: {
                            trigger:
                                ".cam-view-2",
                            start:
                                "top bottom",
                            end:
                                "top top",
                            scrub: 1,
                            immediateRender:
                                false,
                        },
                    }
                )

                .fromTo(
                    ".forever--container",
                    {
                        opacity: 0,
                        x: "-110%",
                    },
                    {
                        opacity: 1,
                        x: "0%",

                        scrollTrigger: {
                            trigger:
                                ".cam-view-2",
                            start:
                                "top bottom",
                            end:
                                "top top",
                            scrub: 1,
                            immediateRender:
                                false,
                        },
                    }
                )

                .addLabel("Forever");

            /* ========================================================
               EMOTIONS
            ======================================================== */

            tl.to(
                position,
                {
                    /*
                     * MUCH CLOSER CAMERA
                     */
                    x: -0.06,
                    y: -0.95,
                    z: 3.65,

                    scrollTrigger: {
                        trigger:
                            ".cam-view-3",
                        start:
                            "top bottom",
                        end:
                            "top top",
                        scrub: 1.5,
                        immediateRender:
                            false,
                    },

                    onUpdate,
                }
            )

                .to(
                    target,
                    {
                        x: -0.01,
                        y: 0.65,
                        z: 0.05,

                        scrollTrigger: {
                            trigger:
                                ".cam-view-3",
                            start:
                                "top bottom",
                            end:
                                "top top",
                            scrub: 1.5,
                            immediateRender:
                                false,
                        },

                        onUpdate,
                    }
                )

                /*
                 * SLOW DRAMATIC ROTATION
                 */

                .to(
                    ring?.rotation,
                    {
                        x:
                            ringModel === 1
                                ? 0
                                : 0.92,

                        y:
                            ringModel === 1
                                ? Math.PI * 0.15
                                : 0.92,

                        z:
                            ringModel === 1
                                ? -Math.PI / 2
                                : Math.PI / 3,

                        scrollTrigger: {
                            trigger:
                                ".cam-view-3",
                            start:
                                "top bottom",
                            end:
                                "top top",
                            scrub: 2,
                            immediateRender:
                                false,
                        },

                        onUpdate,
                    }
                )

                .to(
                    ".forever--container",
                    {
                        opacity: 0,
                        x: "-110%",

                        scrollTrigger: {
                            trigger:
                                ".cam-view-3",
                            start:
                                "top bottom",
                            end:
                                "top top",
                            scrub: 1,
                            immediateRender:
                                false,
                        },
                    }
                )

                .to(
                    ".emotions--text-bg",
                    {
                        opacity: 0.1,

                        scrollTrigger: {
                            trigger:
                                ".cam-view-3",
                            start:
                                "top bottom",
                            end:
                                "top top",
                            scrub: 1,
                            immediateRender:
                                false,
                        },
                    }
                )

                .fromTo(
                    ".emotions--content",
                    {
                        opacity: 0,
                        y: "130%",
                    },
                    {
                        opacity: 1,
                        y: "0%",
                        duration: 0.5,
                    }
                )

                .addLabel("Emotions");

            ScrollTrigger.refresh();
        }

        /* ============================================================
           PRE FRAME
        ============================================================ */

        viewer.addEventListener(
            "preFrame",
            () => {
                if (!needsUpdate) return;

                try {
                    camera.positionUpdated(
                        false
                    );

                    camera.targetUpdated(
                        true
                    );
                } catch {
                    // Ignore camera race conditions.
                }

                needsUpdate = false;
            }
        );

        /* ============================================================
           SCROLL BUTTON
        ============================================================ */

        function scrollToElement(
            selector: string
        ) {
            const element =
                document.querySelector(
                    selector
                ) as HTMLElement | null;

            if (!element) return;

            const top =
                element.getBoundingClientRect()
                    .top +
                window.scrollY;

            if (lenisInstance) {
                lenisInstance.scrollTo(
                    top,
                    {
                        duration: 1.8,
                    }
                );
            } else {
                window.scrollTo({
                    top,
                    behavior: "smooth",
                });
            }
        }

        document
            .querySelector(
                ".button-scroll"
            )
            ?.addEventListener(
                "click",
                () => {
                    scrollToElement(
                        ".cam-view-2"
                    );
                }
            );

        document
            .querySelector(".forever")
            ?.addEventListener(
                "click",
                () => {
                    scrollToElement(
                        ".cam-view-2"
                    );
                }
            );

        document
            .querySelector(
                ".hero--scroller"
            )
            ?.addEventListener(
                "click",
                () => {
                    scrollToElement(
                        ".cam-view-2"
                    );
                }
            );

        /* ============================================================
           CUSTOMIZE
        ============================================================ */

        document
            .querySelector(
                ".btn-customize"
            )
            ?.addEventListener(
                "click",
                () => {
                    if (exploreView) {
                        exploreView.style.pointerEvents =
                            "none";
                    }

                    if (canvasView) {
                        canvasView.style.pointerEvents =
                            "all";
                    }

                    if (canvasContainer) {
                        canvasContainer.style.zIndex =
                            "1";
                    }

                    document.body.style.overflowY =
                        "hidden";

                    document.body.style.cursor =
                        "grab";

                    if (sidebar) {
                        sidebar.style.display =
                            "none";
                    }

                    if (footerContainer) {
                        footerContainer.style.display =
                            "flex";
                    }

                    configAnimation();

                    if (!musicPlay) {
                        playMusic();
                    }
                }
            );

        const tlExplore =
            gsap.timeline();

        function configAnimation() {
            lenisInstance?.stop();

            tlExplore.clear();

            tlExplore
                /*
                 * CLOSE-UP PRODUCT SHOT
                 */
                .to(
                    position,
                    {
                        x: -0.12,
                        y: -0.18,
                        z: 6.7,
                        duration: 2.5,
                        ease:
                            "power3.inOut",
                        onUpdate,
                    }
                )

                .to(
                    target,
                    {
                        x: 0,
                        y: 0.05,
                        z: 0,
                        duration: 2.5,
                        ease:
                            "power3.inOut",
                        onUpdate,
                    },
                    "-=2.5"
                )

                .to(
                    ring?.rotation,
                    {
                        x:
                            ringModel === 1
                                ? -Math.PI / 2
                                : 0,

                        y:
                            ringModel === 1
                                ? 0.15
                                : 0,

                        z:
                            ringModel === 1
                                ? -Math.PI / 2
                                : 0,

                        duration: 2.5,
                        ease:
                            "power3.inOut",
                        onUpdate,
                    },
                    "-=2.5"
                )

                .to(
                    ".emotions--content",
                    {
                        opacity: 0,
                        x: "130%",
                        duration: 1.5,
                        ease:
                            "power4.out",

                        onComplete:
                            onCompleteConfigAnimation,
                    },
                    "-=2"
                )

                .fromTo(
                    ".footer--menu",
                    {
                        opacity: 0,
                        y: "150%",
                    },
                    {
                        opacity: 1,
                        y: "0%",
                        duration: 1.5,
                        ease:
                            "power4.out",
                    }
                );
        }

        function onCompleteConfigAnimation() {
            if (exitContainer) {
                exitContainer.style.display =
                    "flex";
            }

            if (camera.controls) {
                camera.controls.enabled =
                    true;

                /*
                 * SLOW AUTO ROTATION
                 */
                camera.controls.autoRotate =
                    true;

                camera.controls.autoRotateSpeed =
                    0.25;

                camera.controls.minDistance =
                    4.5;

                camera.controls.maxDistance =
                    11;

                camera.controls.enablePan =
                    false;

                camera.controls.screenSpacePanning =
                    false;
            }
        }

        /* ============================================================
           EXIT
        ============================================================ */

        document
            .querySelector(
                ".button--exit"
            )
            ?.addEventListener(
                "click",
                () => {
                    if (exploreView) {
                        exploreView.style.pointerEvents =
                            "all";
                    }

                    if (canvasView) {
                        canvasView.style.pointerEvents =
                            "none";
                    }

                    if (canvasContainer) {
                        canvasContainer.style.zIndex =
                            "unset";
                    }

                    document.body.style.overflowY =
                        "auto";

                    if (exitContainer) {
                        exitContainer.style.display =
                            "none";
                    }

                    document.body.style.cursor =
                        "auto";

                    if (sidebar) {
                        sidebar.style.display =
                            "block";
                    }

                    if (footerContainer) {
                        footerContainer.style.display =
                            "none";
                    }

                    exitConfigAnimation();
                }
            );

        const tlExit =
            gsap.timeline();

        function exitConfigAnimation() {
            if (camera.controls) {
                camera.controls.enabled =
                    false;

                camera.controls.autoRotate =
                    false;
            }

            lenisInstance?.start();

            gemMenu?.classList.remove(
                "show"
            );

            materialsMenu?.classList.remove(
                "show"
            );

            document
                .querySelector(
                    ".footer--menu li.active"
                )
                ?.classList.remove(
                    "active"
                );

            tlExit.clear();

            tlExit
                .to(
                    position,
                    {
                        x: -0.06,
                        y: -0.95,
                        z: 3.65,
                        duration: 1.5,
                        ease:
                            "power4.out",
                        onUpdate,
                    }
                )

                .to(
                    target,
                    {
                        x: -0.01,
                        y: 0.65,
                        z: 0.05,
                        duration: 1.5,
                        ease:
                            "power4.out",
                        onUpdate,
                    },
                    "-=1.5"
                )

                .to(
                    ring?.rotation,
                    {
                        x:
                            ringModel === 1
                                ? 0
                                : 0.92,

                        y:
                            ringModel === 1
                                ? 0
                                : 0.92,

                        z:
                            ringModel === 1
                                ? -Math.PI / 2
                                : Math.PI / 3,

                        duration: 1.5,
                        ease:
                            "power4.out",
                        onUpdate,
                    },
                    "-=1.5"
                )

                .to(
                    ".footer--menu",
                    {
                        opacity: 0,
                        y: "150%",
                        duration: 0.8,
                    },
                    "-=1.2"
                )

                .to(
                    ".emotions--content",
                    {
                        opacity: 1,
                        x: "0%",
                        duration: 0.7,
                        ease:
                            "power4.out",
                    },
                    "-=0.8"
                );
        }

        /* ============================================================
           NIGHT MODE
        ============================================================ */

        function toggleNightMode() {
            if (!nightMode) {
                header?.classList.add(
                    "night--mode--filter"
                );

                camView1?.classList.add(
                    "night--mode--filter"
                );

                camView2?.classList.add(
                    "night--mode--filter"
                );

                camView3?.classList.add(
                    "night--mode--filter"
                );

                exitContainer?.classList.add(
                    "night--mode--filter"
                );

                footerMenu?.classList.add(
                    "night--mode--filter"
                );

                // viewer.setBackground(
                //     linearColor(
                //         0x22052f
                //     )
                // );

                nightMode = true;
            } else {
                header?.classList.remove(
                    "night--mode--filter"
                );

                camView1?.classList.remove(
                    "night--mode--filter"
                );

                camView2?.classList.remove(
                    "night--mode--filter"
                );

                camView3?.classList.remove(
                    "night--mode--filter"
                );

                exitContainer?.classList.remove(
                    "night--mode--filter"
                );

                footerMenu?.classList.remove(
                    "night--mode--filter"
                );

                // viewer.setBackground(
                //     linearColor(
                //         "#EEB7B5"
                //     )
                // );

                nightMode = false;
            }

            viewer.setDirty();
        }

        document
            .querySelector(
                ".night--mode"
            )
            ?.addEventListener(
                "click",
                toggleNightMode
            );

        document
            .querySelector(
                ".night--mode--2"
            )
            ?.addEventListener(
                "click",
                toggleNightMode
            );

        /* ============================================================
           GEM MENU
        ============================================================ */

        configGem?.addEventListener(
            "click",
            () => {
                gemMenu?.classList.add(
                    "show"
                );

                materialsMenu?.classList.remove(
                    "show"
                );

                const gemCameraAnimation =
                    gsap.timeline();

                gemCameraAnimation
                    .to(
                        position,
                        {
                            /*
                             * DRAMATIC TOP GEM CLOSE-UP
                             */
                            x: 1.35,
                            y: 2.85,
                            z: 2.15,
                            duration: 1.8,
                            ease:
                                "power3.inOut",
                            onUpdate,
                        }
                    )
                    .to(
                        target,
                        {
                            x: -0.01,
                            y: 0.75,
                            z: -0.05,
                            duration: 1.8,
                            ease:
                                "power3.inOut",
                            onUpdate,
                        },
                        "-=1.8"
                    );

                document
                    .querySelector(
                        ".footer--menu li.active"
                    )
                    ?.classList.remove(
                        "active"
                    );

                configGem.parentElement?.classList.add(
                    "active"
                );
            }
        );

        /* ============================================================
           DIAMOND COLOR
        ============================================================ */

        function changeDiamondColor(
            color: any
        ) {
            if (!color) return;

            for (
                const object of
                    diamondObjects
            ) {
                if (
                    object?.material?.color
                ) {
                    object.material.color =
                        color.clone
                            ? color.clone()
                            : color;

                    object.material.needsUpdate =
                        true;
                }
            }

            usingCustomColors = true;

            viewer.setDirty();
        }

        const diamondColors: Record<
            string,
            string
        > = {
            ruby: "#f70db1",
            faint: "#CFECEC",
            fancy: "#a9cbe2",
            aqua: "#62cffe",
            swiss: "#76dce4",
            yellow: "#efe75b",
            orange: "#eb8e17",
            green: "#17ebb5",
            emerald: "#5eca00",
            rose: "#fa37d7",
            violet: "#c200f2",
        };

        Object.entries(
            diamondColors
        ).forEach(
            ([className, color]) => {
                document
                    .querySelector(
                        `.${className}`
                    )
                    ?.addEventListener(
                        "click",
                        () => {
                            changeDiamondColor(
                                new Color(
                                    color
                                )
                            );

                            document
                                .querySelector(
                                    ".colors--list li.active"
                                )
                                ?.classList.remove(
                                    "active"
                                );

                            document
                                .querySelector(
                                    `.${className}`
                                )
                                ?.classList.add(
                                    "active"
                                );
                        }
                    );
            }
        );

        /* ============================================================
           MATERIAL MENU
        ============================================================ */

        configMaterial?.addEventListener(
            "click",
            () => {
                materialsMenu?.classList.add(
                    "show"
                );

                gemMenu?.classList.remove(
                    "show"
                );

                gsap.timeline()
                    .to(
                        position,
                        {
                            x: -0.17,
                            y: -0.25,
                            z: 7,
                            duration: 2,
                            ease:
                                "power3.inOut",
                            onUpdate,
                        }
                    )
                    .to(
                        target,
                        {
                            x: 0,
                            y: 0,
                            z: 0,
                            duration: 2,
                            ease:
                                "power3.inOut",
                            onUpdate,
                        },
                        "-=2"
                    );

                document
                    .querySelector(
                        ".footer--menu li.active"
                    )
                    ?.classList.remove(
                        "active"
                    );

                configMaterial.parentElement?.classList.add(
                    "active"
                );
            }
        );

        /* ============================================================
           MATERIAL COLORS
        ============================================================ */

        function changeMaterialColor(
            firstColor: any,
            secondColor: any
        ) {
            if (
                silver?.material?.color
            ) {
                silver.material.color =
                    firstColor.clone
                        ? firstColor.clone()
                        : firstColor;

                silver.material.needsUpdate =
                    true;
            }

            if (
                gold?.material?.color
            ) {
                gold.material.color =
                    secondColor.clone
                        ? secondColor.clone()
                        : secondColor;

                gold.material.needsUpdate =
                    true;
            }

            usingCustomColors = true;

            viewer.setDirty();
        }

        const materialColors: Record<
            string,
            [string, string]
        > = {
            default: [
                "#fea04d",
                "#ffffff",
            ],

            "silver-gold": [
                "#ffffff",
                "#fea04d",
            ],

            "silver-silver": [
                "#ffffff",
                "#ffffff",
            ],

            "gold-gold": [
                "#fea04d",
                "#fea04d",
            ],

            "rose-silver": [
                "#fa8787",
                "#ffffff",
            ],

            "gold-rose": [
                "#fea04d",
                "#fa8787",
            ],

            "rose-rose": [
                "#fa8787",
                "#fa8787",
            ],
        };

        Object.entries(
            materialColors
        ).forEach(
            ([className, colors]) => {
                document
                    .querySelector(
                        `.${className}`
                    )
                    ?.addEventListener(
                        "click",
                        () => {
                            changeMaterialColor(
                                new Color(
                                    colors[0]
                                ),
                                new Color(
                                    colors[1]
                                )
                            );

                            document
                                .querySelector(
                                    ".materials--list li.active"
                                )
                                ?.classList.remove(
                                    "active"
                                );

                            document
                                .querySelector(
                                    `.${className}`
                                )
                                ?.classList.add(
                                    "active"
                                );
                        }
                    );
            }
        );

        /* ============================================================
           CLOSE GEM
        ============================================================ */

        closeConfigGem?.addEventListener(
            "click",
            () => {
                gemMenu?.classList.remove(
                    "show"
                );

                gsap.timeline()
                    .to(
                        position,
                        {
                            x: -0.17,
                            y: -0.25,
                            z: 7,
                            duration: 2,
                            ease:
                                "power3.inOut",
                            onUpdate,
                        }
                    )
                    .to(
                        target,
                        {
                            x: 0,
                            y: 0,
                            z: 0,
                            duration: 2,
                            ease:
                                "power3.inOut",
                            onUpdate,
                        },
                        "-=2"
                    );

                document
                    .querySelector(
                        ".footer--menu li.active"
                    )
                    ?.classList.remove(
                        "active"
                    );
            }
        );

        /* ============================================================
           CLOSE MATERIAL
        ============================================================ */

        closeConfigMaterial?.addEventListener(
            "click",
            () => {
                materialsMenu?.classList.remove(
                    "show"
                );

                document
                    .querySelector(
                        ".footer--menu li.active"
                    )
                    ?.classList.remove(
                        "active"
                    );
            }
        );

        /* ============================================================
           CHANGE RING
        ============================================================ */

        configRing?.addEventListener(
            "click",
            () => {
                gsap.to(
                    ".loader",
                    {
                        x: "0%",
                        duration: 0.8,
                        ease:
                            "power4.inOut",

                        onComplete:
                            loadNewModel,
                    }
                );

                document
                    .querySelector(
                        ".footer--menu li.active"
                    )
                    ?.classList.remove(
                        "active"
                    );
            }
        );

        /* ============================================================
           LOAD NEW MODEL
        ============================================================ */

        async function loadNewModel() {
            try {
                viewer.scene.removeSceneModels();

                diamondObjects = [];

                usingCustomColors = false;

                if (ringModel === 1) {
                    await manager.addFromPath(
                        siteAsset("ring2_webgi.glb")
                    );

                    ringModel = 2;
                } else {
                    await manager.addFromPath(
                        siteAsset("ring_webgi.glb")
                    );

                    ringModel = 1;
                }

                viewer.scene.traverse?.(
                    (object: any) => {
                        normalizeObject(
                            object
                        );
                    }
                );

                loadModelReferences();

                if (
                    ringModel === 2 &&
                    ring
                ) {
                    ring.rotation.set(
                        Math.PI / 2,
                        0.92,
                        0
                    );
                }

                if (
                    ringModel === 1 &&
                    ring
                ) {
                    ring.rotation.set(
                        -Math.PI / 2,
                        0,
                        0
                    );
                }

                // viewer.setBackground(
                //     linearColor(
                //         "#EEB7B5"
                //     )
                // );

                if (
                    camera.controls
                ) {
                    camera.controls.enabled =
                        true;

                    camera.controls.autoRotate =
                        true;

                    camera.controls.autoRotateSpeed =
                        0.25;

                    camera.controls.minDistance =
                        4.5;

                    camera.controls.maxDistance =
                        11;

                    camera.controls.enablePan =
                        false;

                    camera.controls.screenSpacePanning =
                        false;
                }

                gsap.to(
                    ".loader",
                    {
                        x: "100%",
                        duration: 0.8,
                        ease:
                            "power4.inOut",
                        delay: 0.5,
                    }
                );

                viewer.renderer.refreshPipeline();

                viewer.setDirty();

                ScrollTrigger.refresh();
            } catch (error) {
                console.error(
                    "WebGi: Failed to load ring model",
                    error
                );

                gsap.to(
                    ".loader",
                    {
                        x: "100%",
                        duration: 0.8,
                    }
                );
            }
        }

        /* ============================================================
           MUSIC
        ============================================================ */

        audio = new Audio(
            siteAsset("sounds/music_loop.mp3")
        );

        audio.preload = "auto";
        audio.loop = true;
        audio.volume = 0.1;

        function playMusic() {
            if (!audio) return;

            if (!musicPlay) {
                audio
                    .play()
                    .then(() => {
                        musicPlay = true;
                    })
                    .catch(
                        (error) => {
                            console.warn(
                                "Music playback blocked:",
                                error
                            );
                        }
                    );
            } else {
                audio.pause();

                musicPlay = false;
            }
        }

        document
            .querySelector(
                ".music--control"
            )
            ?.addEventListener(
                "click",
                playMusic
            );

        document
            .querySelector(
                ".music--control--2"
            )
            ?.addEventListener(
                "click",
                playMusic
            );

        /* ============================================================
           FINAL
        ============================================================ */

        pageScrollSetup = setupScrollAnimation;
        replayIntro = introAnimation;

        viewer.renderer.refreshPipeline();

        viewer.setDirty();

        console.log(
            "WebGi initialized successfully."
        );
    } catch (error) {
        if (!isCurrent()) return;

        console.error(
            "WebGi initialization failed:",
            error
        );

        initialized = false;
        document.body.style.overflowY = "auto";
        window.dispatchEvent(new Event("webgi:failed"));

        if (rafId !== null) {
            cancelAnimationFrame(
                rafId
            );

            rafId = null;
        }

        if (lenisInstance) {
            try {
                lenisInstance.destroy();
            } catch {}

            lenisInstance = null;
        }
    }
}

/* ================================================================
   PARK / RESUME
   The WebGi viewer is created once and then kept alive for the whole
   session. While a route other than the home page is displayed the
   scroll animation is torn down so ScrollTrigger's pin cannot affect
   that page, and it is rebuilt when the home page comes back.
================================================================ */

export function pauseWebGi() {
    stopLenis();

    try {
        activeIntro?.kill();
    } catch {}
    activeIntro = null;

    try {
        ScrollTriggerCleanup();
    } catch {}

    document.body.style.overflowY = "auto";
}

export function resumeWebGi() {
    startLenis();

    /*
     * Replay the intro (loader + camera sweep + hero reveals) so the
     * home page presents exactly like a fresh load. The intro's
     * onComplete rebuilds the scroll animation, so pageScrollSetup is
     * only the fallback for when no intro is available.
     */
    if (replayIntro) {
        replayIntro();
    } else {
        try {
            pageScrollSetup?.();
        } catch {}
    }

    /*
     * While parked, .webgi-root is display:none, so the canvas had a
     * zero-sized viewport. Now that it is visible again the renderer has
     * to be told to re-measure before the next frame, otherwise the hero
     * would come back blank.
     */
    try {
        viewerInstance?.renderer?.refreshPipeline?.();
        window.dispatchEvent(new Event("resize"));
        viewerInstance?.setDirty?.();
    } catch {}
}

/* ================================================================
   SCROLL TO TOP
   Lenis keeps its own animated scroll target, so a plain
   window.scrollTo() can be overridden on the next RAF. Route
   changes go through here so the reset is applied to whichever
   scroll driver is currently active.
================================================================ */

export function scrollPageToTop() {
    try {
        if (lenisInstance) {
            lenisInstance.scrollTo(0, {
                immediate: true,
            });
            return;
        }
    } catch {}

    if (typeof window !== "undefined") {
        window.scrollTo(0, 0);
    }
}

/* ================================================================
   DESTROY
================================================================ */

export function destroyWebGi() {
    lifecycleGeneration += 1;

    try {
        ScrollTriggerCleanup();
    } catch {}

    stopLenis();

    if (audio) {
        try {
            audio.pause();
            audio.src = "";
        } catch {}

        audio = null;
    }

    if (viewerInstance) {
        try {
            viewerInstance.dispose();
        } catch {}

        viewerInstance = null;
    }

    gsapInstance = null;
    scrollTriggerInstance = null;
    pageScrollSetup = null;
    replayIntro = null;
    activeIntro = null;

    document.body.style.overflowY =
        "auto";

    document.body.style.cursor =
        "auto";

    initialized = false;
}

/* ================================================================
   SCROLLTRIGGER CLEANUP
================================================================ */

function ScrollTriggerCleanup() {
    if (
        scrollTriggerInstance
    ) {
        try {
            scrollTriggerInstance.getAll()
                .forEach(
                    (trigger: any) => {
                        trigger.kill();
                    }
                );

            scrollTriggerInstance.refresh();
        } catch {}
    }

    try {
        const elements =
            document.querySelectorAll(
                ".gsap-marker-start, .gsap-marker-end"
            );

        elements.forEach(
            (element) =>
                element.remove()
        );
    } catch {}
}

/* ================================================================
   LOGO
================================================================ */

if (
    typeof window !== "undefined"
) {
    window.setTimeout(() => {
        const logo =
            document.querySelector(
                ".neo-logo"
            );

        if (logo) {
            logo.classList.add(
                "logo--visible"
            );
        }
    }, 500);
}
