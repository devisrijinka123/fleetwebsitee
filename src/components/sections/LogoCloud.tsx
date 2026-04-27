"use client";

import Image from "next/image";

export function LogoCloud() {
  const logos = [
    { name: "Renault", src: "/renault.png", width: 160, height: 50 },
    { name: "Stellantis", src: "/stellantis.png", width: 200, height: 50 },
    { name: "Maruti", src: "/maruti.svg", width: 140, height: 50 },
    { name: "Volvo", src: "/volvo.jpg", width: 140, height: 50 }
  ];

  return (
    <section className="py-20 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-12">
        <p className="text-center text-[11px] font-bold text-[#00031F]/55 uppercase tracking-[0.4em] mb-12">
          Supporting the world's largest automotive companies
        </p>

        <div className="flex flex-wrap justify-between items-center gap-12 md:gap-8 grayscale opacity-60 transition-none">
          {logos.map((logo) => (
            <div key={logo.name} className="relative transition-none flex-1 flex justify-center">
              <div
                className="relative"
                style={{ width: logo.width, height: logo.height }}
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
