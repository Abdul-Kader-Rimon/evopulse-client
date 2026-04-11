"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";

const MIN_VISIBLE_MS = 1500;
const MAX_VISIBLE_MS = 12000;

function toRelativePath(rawUrl) {
  if (!rawUrl || typeof window === "undefined") {
    return null;
  }

  try {
    const nextUrl = new URL(String(rawUrl), window.location.href);
    if (nextUrl.origin !== window.location.origin) {
      return null;
    }

    return `${nextUrl.pathname}${nextUrl.search}`;
  } catch {
    return null;
  }
}

export default function GlobalRouteLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const routeKey = useMemo(() => {
    const query = searchParams?.toString();
    return query ? `${pathname}?${query}` : pathname || "/";
  }, [pathname, searchParams]);

  const [active, setActive] = useState(false);
  const activeRef = useRef(false);
  const startedAtRef = useRef(0);
  const hideTimeoutRef = useRef(null);
  const safetyTimeoutRef = useRef(null);

  const clearTimers = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }

    if (safetyTimeoutRef.current) {
      clearTimeout(safetyTimeoutRef.current);
      safetyTimeoutRef.current = null;
    }
  };

  const startLoader = () => {
    startedAtRef.current = Date.now();
    clearTimers();

    if (!activeRef.current) {
      activeRef.current = true;
      setActive(true);
    }

    safetyTimeoutRef.current = setTimeout(() => {
      activeRef.current = false;
      setActive(false);
      clearTimers();
    }, MAX_VISIBLE_MS);
  };

  const stopLoader = () => {
    if (!activeRef.current) {
      return;
    }

    const elapsed = Date.now() - startedAtRef.current;
    const remaining = Math.max(0, MIN_VISIBLE_MS - elapsed);

    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }

    hideTimeoutRef.current = setTimeout(() => {
      activeRef.current = false;
      setActive(false);

      if (safetyTimeoutRef.current) {
        clearTimeout(safetyTimeoutRef.current);
        safetyTimeoutRef.current = null;
      }
    }, remaining);
  };

  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, []);

  useEffect(() => {
    stopLoader();
  }, [routeKey]);

  useEffect(() => {
    const handleAnchorClick = (event) => {
      if (event.defaultPrevented || event.button !== 0) {
        return;
      }

      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const anchor = target.closest("a");
      if (!anchor) {
        return;
      }

      if (anchor.target && anchor.target !== "_self") {
        return;
      }

      if (anchor.hasAttribute("download")) {
        return;
      }

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
        return;
      }

      const nextPath = toRelativePath(href);
      if (!nextPath) {
        return;
      }

      const currentPath = `${window.location.pathname}${window.location.search}`;
      if (nextPath === currentPath) {
        return;
      }

      startLoader();
    };

    const handlePopState = () => {
      startLoader();
    };

    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    const patchHistory = (originalMethod) => {
      return function patchedHistory(state, unused, url) {
        const href = typeof url === "string" ? url : url?.toString?.();
        const nextPath = toRelativePath(href);
        const currentPath = `${window.location.pathname}${window.location.search}`;

        if (nextPath && nextPath !== currentPath) {
          startLoader();
        }

        return originalMethod.apply(this, [state, unused, url]);
      };
    };

    window.history.pushState = patchHistory(originalPushState);
    window.history.replaceState = patchHistory(originalReplaceState);

    document.addEventListener("click", handleAnchorClick, true);
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("click", handleAnchorClick, true);
      window.removeEventListener("popstate", handlePopState);
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
    };
  }, []);

  if (!active) {
    return null;
  }

  return (
    <div className="route-loader-overlay" role="status" aria-live="polite" aria-label="Loading next page">
      <main className="app-loading route-loading-shell" aria-busy="true">
        <section className="loading-scene route-loading-scene">
          <div className="loading-road" aria-hidden="true">
            <div className="loading-wind">
              <span className="line line-1" />
              <span className="line line-2" />
              <span className="line line-3" />
              <span className="line line-4" />
              <span className="line line-5" />
            </div>
            <div className="loading-truck-shadow" />
            <div className="loading-truck">
              <Image src="/brand/evopulse-truck.svg" alt="" width={220} height={92} priority unoptimized />
            </div>
          </div>

          <div className="loading-progress" aria-hidden="true">
            <span />
          </div>
          <p className="loading-title">EvoPulse delivery is on the way</p>
          <p className="loading-subtitle">Please wait while we open your next page.</p>
        </section>
      </main>
    </div>
  );
}
