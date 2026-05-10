import { useEffect, useRef, useState } from "react";

interface UseIntersectionObserverProps {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  enabled?: boolean;
}

export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>({
  root = null,
  rootMargin = "0px",
  threshold = 0,
  enabled = true,
}: UseIntersectionObserverProps = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef<T | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { root, rootMargin, threshold }
    );

    const currentTarget = targetRef.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [root, rootMargin, threshold, enabled]);

  return { targetRef, isIntersecting };
}
