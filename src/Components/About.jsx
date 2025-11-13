import {
  BuildingOffice2Icon,
  ChatBubbleLeftRightIcon,
  CheckBadgeIcon,
  HeartIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

/**
 * About section with image carousel (4 images) + content + stats + CTA
 * - Matches your original layout (left image card, right text)
 * - Improvements:
 *   • Left image becomes an auto-sliding carousel with 4 images
 *   • Clickable pagination dots shown only below the image card
 *   • Modern Heroicons, better heading typography
 *   • Fully responsive
 *   • White page background
 *
 * Customize:
 * - Update the `images` array with your 4 image paths
 * - Replace `title` or keep default
 */
const About = ({
  images = ["./about/1.JPG", "./about/2.JPG", "./about/3.JPG", "./about/4.JPG"],
  title,
}) => {
  const { t } = useTranslation();
  // Theme colors from your logo (for subtle accents)
  const brand = {
    blue: "#0B5AA5",
    red: "#E53935",
    gold: "#F4B43A",
  };

  // Carousel state
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  useEffect(() => {
    if (images.length <= 1) return;
    if (isPaused) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [images.length, isPaused]);

  const onTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };
  const onTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const delta = (touchStartX.current ?? 0) - (touchEndX.current ?? 0);
    if (Math.abs(delta) > 40) {
      if (delta > 0) next();
      else prev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const stats = [
    {
      label: "Saved Lives",
      value: "200k",
      icon: HeartIcon,
    },
    {
      label: "Successful Surgeries",
      value: "420k",
      icon: CheckBadgeIcon,
    },
    {
      label: "Happy Patients",
      value: "480k",
      icon: UserGroupIcon,
    },
    {
      label: "Consultations",
      value: "150k",
      icon: ChatBubbleLeftRightIcon,
    },
    {
      label: "Departments",
      value: "30+",
      icon: BuildingOffice2Icon,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Subtle background accents (kept minimal for a clean white page) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full blur-3xl opacity-15"
        style={{
          background:
            "radial-gradient(40% 40% at 50% 50%, rgba(11,90,165,0.15), rgba(229,57,53,0))",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full blur-3xl opacity-10"
        style={{
          background:
            "radial-gradient(40% 40% at 50% 50%, rgba(244,180,58,0.18), rgba(255,255,255,0))",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Image card with gradient border and carousel */}
          <div className="relative">
            <div
              className="relative rounded-[2rem] p-[3px] shadow-xl"
              style={{
                background: `linear-gradient(135deg, ${brand.blue}, ${brand.red})`,
              }}
            >
              <figure className="rounded-[1.9rem] overflow-hidden bg-white">
                <div
                  className="relative w-full select-none"
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                  onTouchStart={onTouchStart}
                  onTouchEnd={onTouchEnd}
                >
                  {/* Viewport */}
                  <div className="overflow-hidden">
                    {/* Track */}
                    <div
                      className="flex transition-transform duration-700 ease-out"
                      style={{ transform: `translateX(-${index * 100}%)` }}
                    >
                      {images.map((src, i) => (
                        <div key={i} className="min-w-full">
                          <img
                            src={src}
                            alt={`Hospital view ${i + 1}`}
                            className="w-full h-full object-cover aspect-[4/3] sm:aspect-[5/4] md:aspect-[4/3] lg:aspect-[4/3]"
                            loading={i === 0 ? "eager" : "lazy"}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </figure>
            </div>

            {/* Dots (only for image div and below) */}
            {images.length > 1 && (
              <div className="mt-4 flex items-center justify-center gap-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Go to slide ${i + 1}`}
                    aria-current={i === index}
                    onClick={() => setIndex(i)}
                    className={`h-2.5 rounded-full transition-all ${
                      i === index ? "w-6" : "w-2.5"
                    }`}
                    style={{
                      backgroundColor: i === index ? brand.blue : "#E5E7EB",
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right: Content */}
          <div>
            <header className="space-y-4">
              <h2 className="font-semibold tracking-tight text-gray-900 text-3xl sm:text-4xl lg:text-5xl">
                {title || t("about.title")}
              </h2>

              {/* Updated actual text (two paragraphs) */}
              <div className="text-base sm:text-lg text-gray-600 max-w-prose space-y-4">
                <p>{t("about.p1")}</p>
                <p>{t("about.p2")}</p>
              </div>
            </header>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">
              {stats.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={i} className="flex items-start gap-3">
                    <div className="shrink-0">
                      <div className="flex size-10 items-center justify-center rounded-xl border border-gray-200 bg-white shadow-sm text-gray-700">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                    </div>
                    <div>
                      <div className="text-xl font-semibold text-gray-900">
                        {s.value}
                      </div>
                      <div className="text-sm text-gray-500">
                        {s.label === "Saved Lives"
                          ? t("about.stats.saved")
                          : s.label === "Successful Surgeries"
                          ? t("about.stats.surgeries")
                          : s.label === "Happy Patients"
                          ? t("about.stats.happy")
                          : s.label === "Consultations"
                          ? t("about.stats.consult")
                          : t("about.stats.departments")}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="mt-10">
              <a
                href="#read-more"
                className="group inline-flex items-center gap-2 rounded-full border-2 px-6 py-3 text-sm sm:text-base transition
                           focus:outline-none focus:ring-4"
                style={{
                  color: brand.blue,
                  borderColor: brand.blue,
                  boxShadow: "0 0 0 0 rgba(11,90,165,0)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = brand.blue;
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = brand.blue;
                }}
              >
                {t("about.readMore")}
                <span className="inline-flex size-6 items-center justify-center rounded-full border border-current">
                  <svg
                    className="size-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 5v14M5 12h14"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
