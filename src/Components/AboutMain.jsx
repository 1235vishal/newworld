import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Award,
  Eye,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

/**
 * AboutMain.jsx
 * - Modern About Us page with a full-width static hero
 * - Fully responsive and accessible
 * - GSAP animations + ScrollTrigger (respects prefers-reduced-motion)
 */

const AboutMain = ({
  // Place these files in your public folder. Example: public/about/1.JPG
  bannerImages = [
    "/about/1.JPG", // hospital exterior
    "/about/2.JPG", // hospital interior
    "/about/3.JPG", // doctors team
    "/Hero/DSC08807.JPG", // reception smiling staff
    "/Hero/DSC08794.JPG", // modern ICU/OT corridor
  ],
  bannerTitle,
  bannerSubtitle,

  // Optional: team photos
  team = [
    {
      name: "Dr. A. Sharma",
      role: "Cardiology",
      image:
        "https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Dr. N. Desai",
      role: "Orthopedics",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Dr. S. Kulkarni",
      role: "General Medicine",
      image:
        "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Dr. R. Patil",
      role: "Pediatrics",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
    },
  ],
}) => {
  const { t } = useTranslation();
  // Brand palette from your logo
  const brand = {
    blue: "#0B5AA5",
    red: "#E53935",
    gold: "#F4B43A",
  };

  // Full-width hero uses a single static image (first from bannerImages)
  const heroImage = bannerImages?.[0] || "/about/1.JPG";

  const coreValues = [
    {
      title: t("aboutMain.values.compassion.title"),
      desc: t("aboutMain.values.compassion.desc"),
      Icon: HeartHandshake,
      tone: brand.red,
    },
    {
      title: t("aboutMain.values.excellence.title"),
      desc: t("aboutMain.values.excellence.desc"),
      Icon: Award,
      tone: brand.blue,
    },
    {
      title: t("aboutMain.values.integrity.title"),
      desc: t("aboutMain.values.integrity.desc"),
      Icon: ShieldCheck,
      tone: brand.gold,
    },
    {
      title: t("aboutMain.values.service.title"),
      desc: t("aboutMain.values.service.desc"),
      Icon: Sparkles,
      tone: brand.blue,
    },
    {
      title: t("aboutMain.values.teamwork.title"),
      desc: t("aboutMain.values.teamwork.desc"),
      Icon: Users,
      tone: brand.red,
    },
  ];

  // Refs for animation
  const heroOverlayRef = useRef(null); // the white box with title/subtitle
  const storyHeaderRef = useRef(null);
  const mvHeaderRef = useRef(null);
  const valuesHeaderRef = useRef(null);
  const teamHeaderRef = useRef(null);
  const containerRef = useRef(null);

  // GSAP animations
  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    // Note: Removed hero heading intro animation to avoid hide/show on load

    // Utility to reveal elements with the class 'reveal-up'
    const ctx = gsap.context(() => {
      const revealUp = (el) => {
        gsap.from(el, {
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      };

      // headers
      [storyHeaderRef, mvHeaderRef, valuesHeaderRef, teamHeaderRef]
        .map((r) => r?.current)
        .filter(Boolean)
        .forEach((el) => revealUp(el));

      // any element with 'reveal-up'
      gsap.utils.toArray(".reveal-up").forEach((el) => revealUp(el));
    }, containerRef);

    // Cleanup on unmount
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.killTweensOf("*");
    };
  }, []);

  return (
    <main ref={containerRef} className="bg-white overflow-x-hidden">
      {/* 1) Full-width Hero (no carousel) */}
      <section className="relative w-full">
        {/* Background image */}
        <div className="relative w-full">
          <img
            src={heroImage}
            alt="Hospital hero"
            className="w-full h-[45vh] sm:h-[55vh] lg:h-[65vh] object-cover"
            loading="eager"
            onError={(e) => {
              e.currentTarget.style.background = "#f3f4f6";
            }}
          />
          {/* Soft overlay for readability */}
          <div className="absolute inset-0 bg-white/10 sm:bg-black/20" />

          {/* Overlay text box */}
          <div className="absolute  inset-0 z-10 flex items-center">
            <div className="px-4 sm:px-10 lg:px-20 w-full">
              <div
                ref={heroOverlayRef}
                className="max-w-2xl  rounded-2xl bg-white/80 backdrop-blur-md p-5 sm:p-7 ring-1 ring-slate-200 shadow-md"
              >
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-slate-900">
                  {bannerTitle || t("aboutMain.bannerTitle")}
                </h1>
                <p className="mt-2 text-sm sm:text-lg text-slate-700">
                  {bannerSubtitle || t("aboutMain.bannerSubtitle")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2) Our Story */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <header ref={storyHeaderRef} className="max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
              {t("aboutMain.ourStory")}
            </h2>
            <div
              className="mt-3 h-1.5 w-16 rounded-full"
              style={{ background: brand.blue }}
            />
          </header>

          <div className="reveal-up mt-6 max-w-4xl text-base sm:text-lg text-slate-700 space-y-4">
            <p>{t("aboutMain.story_p1")}</p>
            <p>{t("aboutMain.story_p2")}</p>
          </div>
        </div>
      </section>

      {/* 3) Mission & Vision */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <header ref={mvHeaderRef} className="max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
              {t("aboutMain.mv")}
            </h2>
            <div
              className="mt-3 h-1.5 w-16 rounded-full"
              style={{ background: brand.red }}
            />
          </header>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Mission */}
            <div className="reveal-up rounded-3xl bg-white p-6 sm:p-7 ring-1 ring-slate-200 shadow-sm hover:shadow-md transition">
              <div className="flex items-start gap-4">
                <div
                  className="h-12 w-12 rounded-2xl grid place-items-center ring-1 ring-slate-200 shadow-sm shrink-0"
                  style={{
                    background: `linear-gradient(180deg, ${brand.blue}26 0%, #FFFFFF 100%)`,
                  }}
                >
                  <Target size={26} style={{ color: brand.blue }} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">
                    {t("aboutMain.mission")}
                  </h3>
                  <p className="mt-2 text-slate-700">
                    {t("aboutMain.mission_p1")}
                  </p>
                  <p className="mt-2 font-medium text-slate-900">
                    {t("aboutMain.mission_motto_mr")}
                  </p>
                  <p className="text-sm text-slate-500">
                    {t("aboutMain.mission_motto_en")}
                  </p>
                </div>
              </div>
            </div>

            {/* Vision */}
            <div className="reveal-up rounded-3xl bg-white p-6 sm:p-7 ring-1 ring-slate-200 shadow-sm hover:shadow-md transition">
              <div className="flex items-start gap-4">
                <div
                  className="h-12 w-12 rounded-2xl grid place-items-center ring-1 ring-slate-200 shadow-sm shrink-0"
                  style={{
                    background: `linear-gradient(180deg, ${brand.red}26 0%, #FFFFFF 100%)`,
                  }}
                >
                  <Eye size={26} style={{ color: brand.red }} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">
                    {t("aboutMain.vision")}
                  </h3>
                  <p className="mt-2 text-slate-700">
                    {t("aboutMain.vision_p")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4) Our Core Values */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <header ref={valuesHeaderRef} className="max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
              {t("aboutMain.valuesTitle")}
            </h2>
          </header>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 lg:gap-7">
            {coreValues.map((val, i) => (
              <div
                key={i}
                className="reveal-up group rounded-3xl bg-white p-6 ring-1 ring-slate-200 shadow-sm transition hover:shadow-md hover:-translate-y-0.5"
              >
                <div
                  className="h-12 w-12 rounded-xl grid place-items-center ring-1 ring-slate-200 shadow-sm"
                  style={{
                    background: `linear-gradient(180deg, ${val.tone}1A 0%, #FFFFFF 100%)`,
                  }}
                >
                  <val.Icon size={24} style={{ color: val.tone }} />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">
                  {val.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {val.desc}
                </p>
                <span
                  className="pointer-events-none mt-5 block h-1 w-0 rounded-full transition-all duration-300 group-hover:w-full"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(11,90,165,0.15), rgba(229,57,53,0.15))",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5) Our Team (Optional) */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <header ref={teamHeaderRef} className="max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
              {t("aboutMain.teamTitle")}
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-700 max-w-2xl">
              {t("aboutMain.teamDesc")}
            </p>
          </header>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {team.map((m, i) => (
              <div
                key={i}
                className="reveal-up rounded-3xl bg-white p-4 ring-1 ring-slate-200 shadow-sm hover:shadow-md transition"
              >
                <div className="relative">
                  <img
                    src={m.image}
                    alt={m.name}
                    className="w-full aspect-square object-cover rounded-2xl"
                    loading="lazy"
                  />
                </div>
                <div className="pt-3">
                  <div className="text-sm font-semibold text-slate-900">
                    {m.name}
                  </div>
                  <div className="text-xs text-slate-500">{m.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutMain;
