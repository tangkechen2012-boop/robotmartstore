import { useEffect, useRef, useCallback } from "react";

export function useScrollReveal<T extends HTMLElement = HTMLElement>(
  threshold = 0.1
) {
  const ref = useRef<T>(null);
  const hasAnimated = useRef(false);

  const setupObserver = useCallback(() => {
    const el = ref.current;
    if (!el || hasAnimated.current) return;

    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    el.style.transition = "opacity 0.7s ease-out, transform 0.7s ease-out";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          hasAnimated.current = true;
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  useEffect(() => {
    // Small delay to ensure layout is computed
    const timer = requestAnimationFrame(() => {
      setupObserver();
    });
    return () => cancelAnimationFrame(timer);
  }, [setupObserver]);

  return ref;
}
