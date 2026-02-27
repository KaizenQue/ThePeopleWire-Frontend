"use client";
import { useEffect, useRef, useState } from "react";

export function useFetchOnVisible(callback: () => void) {
  const ref = useRef<HTMLElement | null>(null);
  const calledRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !calledRef.current) {
          calledRef.current = true;
          callback();
          observer.disconnect();
        }
      },
      { rootMargin: "350px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [callback]);

  return ref;
}