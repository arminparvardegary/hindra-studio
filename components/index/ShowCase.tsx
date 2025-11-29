"use client";

import {
  useEffect,
  useRef,
  useState,
  useCallback,
  useLayoutEffect,
} from "react";
import Link from "next/link";

type Slide =
  | {
      id: string;
      title: string;
      badges: string[];
      kind: "video";
      src: string;
      poster?: string;
      href: string;
    }
  | { 
      id: string; 
      title: string; 
      badges: string[]; 
      kind: "image"; 
      src: string;
      href: string;
    };

const BASE: Slide[] = [
  {
    id: "luxe-motors",
    title: "Luxe Motors",
    badges: ["AUTOMOTIVE", "BRANDING", "MOTION"],
    kind: "video",
    src: "/videos/motion.mp4",
    poster: "/images/ford.png",
    href: "/works/ford-mustang",
  },
  {
    id: "kumu-app",
    title: "Kumu Social",
    badges: ["TECH", "UI/UX", "MOBILE APP"],
    kind: "image",
    src: "/images/ford.png",
    href: "/works/kumu",
  },
  {
    id: "carsome",
    title: "Carsome Platform",
    badges: ["E-COMMERCE", "WEB DESIGN", "DEVELOPMENT"],
    kind: "video",
    src: "/videos/motion.mp4",
    poster: "/images/ford.png",
    href: "/works/carsome",
  },
  {
    id: "van-heusen",
    title: "Van Heusen",
    badges: ["FASHION", "BRAND IDENTITY", "CAMPAIGN"],
    kind: "image",
    src: "/images/ford.png",
    href: "/works/van-heusen",
  },
  {
    id: "fintech-hub",
    title: "FinTech Hub",
    badges: ["FINANCE", "PRODUCT DESIGN", "STRATEGY"],
    kind: "video",
    src: "/videos/motion.mp4",
    poster: "/images/ford.png",
    href: "/works/ford-mustang",
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
      } else if (vp.scrollLeft <= 0) {
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
  
    const left = el.offsetLeft - (vp.clientWidth - el.clientWidth) / 1.9;
    vp.scrollLeft = left;
  }, [active]);
  
  return (
    <section className="flex flex-col items-center justify-center py-12 sm:py-16 lg:py-20">
      {/* Section header */}
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 mb-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-black">
          Featured Projects
        </h2>
        <p className="text-center text-gray-500 mt-3 text-lg">
          Drag to explore our latest work
        </p>
      </div>

      <div className="w-full">
        <div className="relative rounded-[28px]">
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
                className={`snap-center shrink-0 w-[88vw] sm:w-[84vw] lg:w-[1180px] xl:w-[1000px] transition-all duration-300 ${
                  i === active ? "scale-110" : "scale-95 opacity-60"
                }`}
                onMouseEnter={handleVideoPlay}
                onMouseLeave={handleVideoPause}
              >
                <Link href={s.href} className="block group">
                  <div className="rounded-[26px] shadow-[0_8px_30px_rgba(21,16,48,0.08)] ring-1 ring-[#ECE9F5] overflow-hidden bg-white transition-shadow duration-300 group-hover:shadow-[0_12px_40px_rgba(21,16,48,0.12)]">
                    <div className="p-2 sm:p-3">
                      <div className="rounded-[22px] overflow-hidden bg-neutral-950 ring-1 h-[500px] sm:h-[550px] lg:h-[600px] ring-white/10 relative">
                        {s.kind === "video" ? (
                          <video
                            src={s.src}
                            playsInline
                            muted
                            loop
                            preload="metadata"
                            poster={s.poster}
                            className="block w-full h-full object-cover"
                          />
                        ) : (
                          <img
                            src={s.src}
                            alt={s.title}
                            loading="lazy"
                            className="block w-full h-full object-cover"
                          />
                        )}
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-black px-6 py-3 rounded-full font-medium">
                            View Case Study →
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-4 sm:px-6 pb-4 sm:pb-6">
                      <div className="text-[22px] sm:text-[26px] leading-none font-semibold text-[#15131F]">
                        {s.title}
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] sm:text-xs uppercase tracking-[0.12em] text-[#6F6C85]">
                        {s.badges.map((b) => (
                          <span key={`${s.id}-${b}`} className="bg-[#F5F5F5] px-3 py-1 rounded-full">{b}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-3 sm:mt-4 lg:mt-5 flex items-center justify-center gap-3 sm:gap-4">
            {BASE.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(SECTION_SIZE + i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  baseActive === i
                    ? "w-10 bg-black"
                    : "w-3 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
