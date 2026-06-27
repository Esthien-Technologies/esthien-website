import { useEffect } from "react";

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const revealVisible = (element: HTMLElement) => {
  element.classList.add("is-revealed");
};

export function useMotionSystem(pathname: string) {
  useEffect(() => {
    const revealElements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const rails = Array.from(document.querySelectorAll<HTMLElement>("[data-rail]"));

    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      revealElements.forEach(revealVisible);
      rails.forEach((rail) => rail.classList.add("is-extended"));
      return;
    }

    revealElements.forEach((element, index) => {
      element.classList.add("reveal-pending");
      element.style.setProperty("--reveal-delay", `${Math.min(index * 45, 240)}ms`);
    });

    rails.forEach((rail) => rail.classList.add("rail-pending"));

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          revealVisible(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.01 },
    );

    const railObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          (entry.target as HTMLElement).classList.add("is-extended");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.01 },
    );

    revealElements.forEach((element) => revealObserver.observe(element));
    rails.forEach((rail) => railObserver.observe(rail));

    return () => {
      revealObserver.disconnect();
      railObserver.disconnect();
    };
  }, [pathname]);
}
