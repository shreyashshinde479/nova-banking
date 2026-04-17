import { useEffect, useRef, useState } from "react";

/**
 * Custom animated cursor: a small dot that follows the mouse precisely,
 * and a larger trailing ring that smoothly lags behind and grows on hover
 * over interactive elements.
 *
 * Disabled on touch / coarse-pointer devices.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(pointer: fine)");
    setEnabled(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setEnabled(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf = 0;
    let visible = false;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) {
        visible = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    };

    const onLeave = () => {
      visible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const onDown = () => ring.classList.add("cursor-ring--down");
    const onUp = () => ring.classList.remove("cursor-ring--down");

    const interactiveSelector =
      'a, button, [role="button"], input, textarea, select, label, summary, [data-cursor="hover"]';

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest && target.closest(interactiveSelector)) {
        ring.classList.add("cursor-ring--hover");
      }
    };
    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest && target.closest(interactiveSelector)) {
        ring.classList.remove("cursor-ring--hover");
      }
    };

    const tick = () => {
      // Smooth lag for the ring
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseout", (e) => {
      if (!e.relatedTarget) onLeave();
    });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    raf = requestAnimationFrame(tick);

    // Hide native cursor while custom is active
    document.documentElement.classList.add("custom-cursor-active");

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        className="cursor-ring pointer-events-none fixed top-0 left-0 z-[9999] h-9 w-9 rounded-full border opacity-0"
        style={{
          borderColor: "color-mix(in oklab, var(--neon-blue) 70%, transparent)",
          boxShadow:
            "0 0 18px color-mix(in oklab, var(--neon-purple) 60%, transparent), inset 0 0 10px color-mix(in oklab, var(--neon-blue) 30%, transparent)",
          transition:
            "width 220ms ease, height 220ms ease, background-color 220ms ease, border-color 220ms ease, opacity 220ms ease",
          mixBlendMode: "screen",
        }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[10000] h-2 w-2 rounded-full opacity-0"
        style={{
          backgroundColor: "var(--neon-cyan)",
          boxShadow: "0 0 10px var(--neon-cyan)",
          transition: "opacity 200ms ease",
        }}
      />
    </>
  );
}
