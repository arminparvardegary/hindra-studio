"use client";

import { Eye, PenTool, Palette, LayoutGrid, BookText, Type } from "lucide-react";

type Service = {
  title: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const SERVICES: Service[] = [
  { title: "Visual identity", Icon: Eye },
  { title: "Logo design", Icon: PenTool },
  { title: "Color theory", Icon: Palette },
  { title: "Layout & composition", Icon: LayoutGrid },
  { title: "Brand guidelines", Icon: BookText },
  { title: "Typography", Icon: Type },
];

export default function ServicesSection() {
  return (
    <section
      aria-labelledby="services-title"
      className="
        w-full
        min-h-[100svh] lg:min-h-screen  /* true full screen, safe on mobile */
        flex items-center
      "
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Center everything vertically */}
        <div className="flex flex-col items-center justify-center gap-12 sm:gap-14 lg:gap-16">
          {/* Title */}
          <h2
            id="services-title"
            className="text-center text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-black"
          >
            Services
          </h2>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 place-items-center">
            {SERVICES.map(({ title, Icon }) => (
              <div
                key={title}
                className="
                  w-full max-w-[360px]
                  rounded-[20px] bg-neutral-100 ring-1 ring-black/5 shadow-sm
                  px-6 sm:px-8 py-6 sm:py-7
                  flex flex-col items-center justify-center gap-3 select-none
                "
              >
                <Icon className="h-7 w-7 sm:h-8 sm:w-8 text-neutral-900" strokeWidth={2} />
                <p className="text-sm sm:text-base text-neutral-700">{title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
