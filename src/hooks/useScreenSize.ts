import { useEffect, useMemo, useState } from "react";

export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl";

export interface ScreenSizeResult {
  width: number;
  height: number;
  breakpoint: Breakpoint;
  isXs: boolean;
  isSm: boolean;
  isMd: boolean;
  isLg: boolean;
  isXl: boolean;
  isPortrait: boolean;
  isLandscape: boolean;
}

export interface UseScreenSizeOptions {
  debounce?: number;
  breakpoints?: Partial<Record<Breakpoint, number>>;
}

const DEFAULT_BREAKPOINTS: Record<Breakpoint, number> = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

function getBreakpoint(
  width: number,
  bps: Record<Breakpoint, number>
): Breakpoint {
  if (width >= bps.xl) return "xl";
  if (width >= bps.lg) return "lg";
  if (width >= bps.md) return "md";
  if (width >= bps.sm) return "sm";
  return "xs";
}

function useSSRWindowSize() {
  const isClient =
    typeof window !== "undefined" && typeof window.innerWidth === "number";
  return {
    width: isClient ? window.innerWidth : 1200,
    height: isClient ? window.innerHeight : 800,
  };
}

export default function useScreenSize(
  options: UseScreenSizeOptions = {}
): ScreenSizeResult {
  const { debounce = 100, breakpoints = {} } = options;
  const mergedBreakpoints = useMemo(
    () => ({ ...DEFAULT_BREAKPOINTS, ...breakpoints }),
    [breakpoints]
  );

  const initial = useSSRWindowSize();
  const [size, setSize] = useState({
    width: initial.width,
    height: initial.height,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    let timer: number | undefined;

    const handle = () => {
      const update = () =>
        setSize({ width: window.innerWidth, height: window.innerHeight });
      if (debounce && debounce > 0) {
        if (timer) window.clearTimeout(timer);
        timer = window.setTimeout(update, debounce);
      } else {
        update();
      }
    };

    window.addEventListener("resize", handle);
    window.addEventListener("orientationchange", handle);

    handle();

    return () => {
      window.removeEventListener("resize", handle);
      window.removeEventListener("orientationchange", handle);
      if (timer) window.clearTimeout(timer);
    };
  }, [debounce, mergedBreakpoints]);

  const breakpoint = getBreakpoint(size.width, mergedBreakpoints);
  const isPortrait = size.height >= size.width;

  const result: ScreenSizeResult = {
    width: size.width,
    height: size.height,
    breakpoint,
    isXs: breakpoint === "xs",
    isSm: breakpoint === "sm",
    isMd: breakpoint === "md",
    isLg: breakpoint === "lg",
    isXl: breakpoint === "xl",
    isPortrait,
    isLandscape: !isPortrait,
  };

  return result;
}
