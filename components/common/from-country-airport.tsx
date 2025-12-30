"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn,  } from "@/lib/utils";
import { usePathname, useRouter,  } from "next/navigation";
import { Currency, useCurrency } from "@/hooks/use-currency";

export function FromCountryAirport({ slug,from }: { slug: string,from?:string }) {
  const pathname = usePathname()
  const {setCurrency} = useCurrency()
  const router = useRouter();
  const [hoveredCurrency, setHoveredCurrency] = useState<string | null>(null);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (!from) {
      setIsExiting(false);
    }
  }, [from]);

  const handleSelect = (value: Currency) => {
    setIsExiting(true);
    setCurrency(value);
    router.push(`${pathname}?from=${value}`);

  };

  const isTourWithAir = slug == "رحلات-تشمل-الطيران";
  const dontShowContent = (isTourWithAir && from) || !isTourWithAir;

  if (dontShowContent) {
    return null;
  }

  return (
    <div
      className={cn(
        "w-full max-w-7xl mx-auto transition-opacity duration-400 mt-8 mb-16 px-2 sm:px-0",
        isExiting && "opacity-0"
      )}
    >
      <h2 className="text-3xl md:text-4xl text-primary font-bold text-center mb-8 text-balance font-primary">
        الرجاء اختيار بوابة الطيران
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <button
          onClick={() => handleSelect("BHD")}
          onMouseEnter={() => setHoveredCurrency("BHD")}
          onMouseLeave={() => setHoveredCurrency(null)}
          className={cn(
            "group relative overflow-hidden rounded-xl transition-all duration-300",
            "hover:scale-[1.02] active:scale-[0.98]",
            from === "BHD"
              ? "ring-4 ring-primary shadow-2xl"
              : "ring-2 ring-border hover:ring-primary/50 shadow-lg hover:shadow-xl"
          )}
        >
          <div className="relative aspect-[2/1] w-full">
            <Image
              src="/images/Bahrin-gate.jpeg"
              alt="Travel from Saudi Arabia"
              fill
              className={cn(
                "object-cover transition-all duration-500",
                hoveredCurrency === "BHD" && "scale-105",
                from === "BHD" && "brightness-110"
              )}
            />
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center p-4">
              <div className="bg-gray-900/60 backdrop-blur-md rounded-xl px-6 py-3 shadow-2xl border border-white/10">
                <p className="text-white text-lg md:text-xl font-semibold text-center drop-shadow-lg">
                  السفر من البحرين
                </p>
              </div>
            </div>
          </div>
        </button>

        <button
          onClick={() => handleSelect("OMR")}
          onMouseEnter={() => setHoveredCurrency("OMR")}
          onMouseLeave={() => setHoveredCurrency(null)}
          className={cn(
            "group relative overflow-hidden rounded-xl transition-all duration-300",
            "hover:scale-[1.02] active:scale-[0.98]",
            from === "OMR"
              ? "ring-4 ring-primary shadow-2xl"
              : "ring-2 ring-border hover:ring-primary/50 shadow-lg hover:shadow-xl"
          )}
        >
          <div className="relative aspect-[2/1] w-full">
            <Image
              src="/images/Oman-gate.jpeg"
              alt="Travel from Sultanate of Oman"
              fill
              className={cn(
                "object-cover transition-all duration-500",
                hoveredCurrency === "OMR" && "scale-105",
                from === "OMR" && "brightness-110"
              )}
            />
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center p-4">
              <div className="bg-gray-900/60 backdrop-blur-md rounded-xl px-6 py-3 shadow-2xl border border-white/10">
                <p className="text-white text-lg md:text-xl font-semibold text-center drop-shadow-lg">
                  السفر من سلطنة عمان
                </p>
              </div>
            </div>
          </div>
        </button>
      </div>

      {from && (
        <div className="mt-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
          <p className="text-muted-foreground">
            Selected currency:{" "}
            <span className="font-bold text-foreground">{from}</span>
          </p>
        </div>
      )}
    </div>
  );
}
