import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const prefersNativeScroll = () =>
  window.matchMedia("(hover: none) and (pointer: coarse)").matches;

export function useMotionSystem(pathname: string) {
  useEffect(() => {
    if (prefersReducedMotion() || prefersNativeScroll()) {
      return;
    }

    const lenis = new Lenis({
      duration: 0.92,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);
    lenis.on("scroll", ScrollTrigger.update);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) {
      return;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        ".site-main",
        { autoAlpha: 0.92, y: 8 },
        { autoAlpha: 1, y: 0, duration: 0.42, ease: "power3.out" },
      );

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element, index) => {
        const isHeroElement = Boolean(element.closest(".hero-section"));
        const isInitiallyVisible = element.getBoundingClientRect().top < window.innerHeight * 0.92;
        const delay = isHeroElement ? Math.min(index * 0.055, 0.28) : 0;
        const fromVars = { autoAlpha: 0, y: isHeroElement ? 24 : 34 };
        const toVars = {
          autoAlpha: 1,
          y: 0,
          delay,
          duration: isHeroElement ? 0.72 : 0.86,
          ease: "power3.out",
        };

        if (isInitiallyVisible) {
          gsap.set(element, { autoAlpha: 1, y: 0 });
          return;
        }

        gsap.fromTo(element, fromVars, {
          ...toVars,
          scrollTrigger: {
            trigger: element,
            start: "top 84%",
            once: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-rail]").forEach((rail) => {
        gsap.fromTo(
          rail,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: rail,
              start: "top 88%",
              end: "bottom 42%",
              scrub: 0.5,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((item) => {
        gsap.to(item, {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      ScrollTrigger.refresh();
    });

    return () => context.revert();
  }, [pathname]);
}
