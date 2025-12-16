"use client";

import {
  useEffect,
  useRef,
  useState,
  useCallback,
  useLayoutEffect,
} from "react";
import Image from "next/image";

type Slide =
  | {
      id: string;
      title: string;
      badges: string[];
      kind: "video";
      src: string;
      poster?: string;
    }
  | { id: string; title: string; badges: string[]; kind: "image"; src: string };

const BASE: Slide[] = [
  {
    id: "scriptra",
    title: "Scriptra",
    badges: ["AI PLATFORM", "SAAS", "CONTENT CREATION"],
    kind: "image",
    src: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop",
  },
  {
    id: "rush-photos",
    title: "Rush Photos",
    badges: ["PRODUCT PHOTO", "E-COMMERCE", "FROM $25/ANGLE"],
    kind: "image",
    src: "/images/rush-photos-hero.jpg",
  },
  {
    id: "rush-video",
    title: "Rush Video",
    badges: ["PRODUCT VIDEO", "AI POWERED", "2 TO 5 DAY DELIVERY"],
    kind: "image",
    src: "/images/rush-video-hero.jpg",
  },
  {
    id: "rush-boxes",
    title: "Rush Boxes",
    badges: ["PACKAGING", "CUSTOM BOXES", "B2B"],
    kind: "image",
    src: "/images/portfolio/rush-boxes-hero.png",
  },
];

const EXT = [...BASE, ...BASE, ...BASE];
const SECTION_SIZE = BASE.length;

export default function ShowCase() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<HTMLDivElement[]>([]);
  const [active, setActive] = useState(SECTION_SIZE);
  const didInit = useRef(false);

  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const [dragging, setDragging] = useState(false);

  useLayoutEffect(() => {
    const vp = viewportRef.current;
    if (!vp || didInit.current) return;
    didInit.current = true;

    const slides = vp.querySelectorAll("div.snap-center");
    const middleIndex = Math.floor(slides.length / 2.5);
    const el = slides[middleIndex] as HTMLElement | null;

    if (el) {
      const left = el.offsetLeft - (vp.clientWidth - el.clientWidth) / 2.5;
      vp.scrollLeft = left;
    }
  }, []);

  const computeActive = useCallback(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    const rect = vp.getBoundingClientRect();
    const mid = rect.left + rect.width / 2;

    let best = 0;
    let bestDist = Infinity;
    slideRefs.current.forEach((node, i) => {
      if (!node) return;
      const r = node.getBoundingClientRect();
      const c = r.left + r.width / 2;
      const d = Math.abs(c - mid);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    setActive(best);
  }, []);

  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;

    const handleScroll = () => {
      const sectionWidth = vp.scrollWidth / 3;

      if (vp.scrollLeft >= sectionWidth * 2) {
        vp.scrollLeft -= sectionWidth;
      }
      else if (vp.scrollLeft <= 0) {
        vp.scrollLeft += sectionWidth;
      }

      computeActive();
    };

    vp.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", computeActive);
    computeActive();

    return () => {
      vp.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", computeActive);
    };
  }, [computeActive]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const vp = viewportRef.current;
    if (!vp) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;

    isDraggingRef.current = true;
    setDragging(true);
    startXRef.current = e.clientX;
    startScrollLeftRef.current = vp.scrollLeft;
    vp.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const vp = viewportRef.current;
    if (!vp) return;
    e.preventDefault();
    const dx = e.clientX - startXRef.current;
    vp.scrollLeft = startScrollLeftRef.current - dx;
  };

  const endDrag = (e?: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setDragging(false);
    const vp = viewportRef.current;
    if (vp && e) vp.releasePointerCapture?.(e.pointerId);
  };

  const handleVideoPlay = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = e.currentTarget.querySelector("video");
    if (video) video.play();
  };
  const handleVideoPause = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = e.currentTarget.querySelector("video");
    if (video) video.pause();
  };

  const baseActive = active % BASE.length;
  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;
  
    const el = slideRefs.current[active];
    if (!el) return;
  
    const left = el.offsetLeft - (vp.clientWidth - el.clientWidth) /1.9;
    vp.scrollLeft = left;
  }, [active]);
  
  return (
    <section className="flex flex-col items-center justify-center py-12 sm:py-16 lg:py-20">
      <div className="w-full">
        <div className="relative rounded-[28px]">
          {/* Scrollable viewport */}
          <div
            ref={viewportRef}
            style={{ touchAction: "pan-y" }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerLeave={endDrag}
            onPointerCancel={endDrag}
            className={`
              relative w-full overflow-x-auto
              flex items-stretch gap-12 sm:gap-16 lg:gap-20
              py-20 sm:py-20 lg:py-14
              px-[6vw] sm:px-[8vw] lg:px-[10vw]
              [scrollbar-width:none] [-ms-overflow-style:none]
              hide-scrollbar select-none
              ${dragging ? "cursor-grabbing" : "cursor-grab"}
            `}
          >
            <style>{`.hide-scrollbar::-webkit-scrollbar{display:none}`}</style>

            {EXT.map((s, i) => (
              <div
                key={`${s.id}-${i}`}
                ref={(el) => {
                  if (el) slideRefs.current[i] = el;
                }}
                className={`snap-center shrink-0 w-[85vw] sm:w-[80vw] md:w-[75vw] lg:w-[900px] xl:w-[1000px] transition-all duration-300 ${
                  i === active ? "scale-105 sm:scale-110" : "scale-95"
                }`}
                onMouseEnter={handleVideoPlay}
                onMouseLeave={handleVideoPause}
              >
                {/* Card */}
                <div className="rounded-[18px] sm:rounded-[22px] lg:rounded-[26px] shadow-[0_8px_30px_rgba(21,16,48,0.06)] ring-1 ring-[#ECE9F5]">
                  <div className="p-1.5 sm:p-2 lg:p-3">
                    <div className="rounded-[14px] sm:rounded-[18px] lg:rounded-[22px] overflow-hidden bg-neutral-950 ring-1 h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] ring-white/10 relative">
                      {s.kind === "video" ? (
                        <video
                          src={s.src}
                          playsInline
                          muted
                          loop
                          preload="metadata"
                          poster={s.poster}
                          className="block w-full h-full aspect-[21/9] object-cover"
                        />
                      ) : (
                        <Image
                          src={s.src}
                          alt={s.title}
                          fill
                          sizes="(max-width: 640px) 85vw, (max-width: 768px) 80vw, (max-width: 1024px) 75vw, 1000px"
                          className="object-cover"
                        />
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 px-3 sm:px-4 lg:px-6 pb-3 sm:pb-4 lg:pb-6">
                    <div className="text-lg sm:text-xl lg:text-[24px] leading-none font-medium text-[#15131F]">
                      {s.title}
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 lg:gap-x-6 gap-y-1 text-[10px] sm:text-[11px] lg:text-xs uppercase tracking-[0.12em] sm:tracking-[0.16em] text-[#6F6C85]">
                      {s.badges.map((b) => (
                        <span key={`${s.id}-${b}`}>{b}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation dots */}
          <div className="mt-3 sm:mt-4 lg:mt-5 flex items-center justify-center gap-2 sm:gap-3 lg:gap-4">
            {BASE.map((_, i) => (
              <div
                key={i}
                onClick={() => setActive(SECTION_SIZE + i)}
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  baseActive === i
                    ? "w-6 sm:w-8 lg:w-10 bg-[#6F6C85]"
                    : "w-2 sm:w-2.5 lg:w-3 bg-[#CFCBDF] hover:bg-[#BFBAD6]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
