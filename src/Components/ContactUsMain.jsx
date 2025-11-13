import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Ambulance,
  Clock8,
  MailOpen,
  MapPin,
  PhoneCall,
  Send,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

/**
 * ContactUsMain.jsx
 * - Modern, responsive Contact page
 * - First: Contact Form + Map side-by-side (row on desktop, stack on mobile)
 * - Then: 4 detail cards (Address, Phone, Email, Hours) one-per-row
 * - GSAP animations with ScrollTrigger (respects prefers-reduced-motion)
 */

const ContactUsMain = ({
  bannerImage = "/Hero/DSC08789.JPG", // place under public/Hero
  bannerTitle,
  bannerSubtitle,
}) => {
  const { t } = useTranslation();
  const brand = {
    blue: "#0B5AA5",
    red: "#E53935",
    gold: "#F4B43A",
  };

  const phones = [
    { label: t("contact.phones.primary"), number: "+91 9975039313" },
    { label: t("contact.phones.emergency"), number: "+91 9860062394" },
    { label: t("contact.phones.reception"), number: "+91 9922869716" },
  ];

  const email = "info@shrisamarthhospital.com";
  const addressLines = [
    "Shri Samarth Hospital",
    "Gat No. ४१८/१, Chakan‑Shikrapur Road, Chaufula, Wajewadi,",
    "Taluka: Shirur, Pune, Maharashtra – 412208",
  ];

  const mapLink = "https://maps.app.goo.gl/9FBJZUXwFeaPdkJG6";
  const mapEmbed =
    "https://www.google.com/maps?q=Shri%20Samarth%20Hospital%20Chaufula%20Wajewadi%20Pune%20412208&output=embed";

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      await new Promise((r) => setTimeout(r, 800));
      if (
        !payload.name ||
        !payload.email ||
        !payload.phone ||
        !payload.message
      ) {
        throw new Error(t("contact.error_required"));
      }
      setSubmitted(true);
      e.currentTarget.reset();
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  // Refs for GSAP
  const heroOverlayRef = useRef(null);
  const formBoxRef = useRef(null);
  const mapBoxRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const pageRef = useRef(null);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) return;

    gsap.registerPlugin(ScrollTrigger);

    // Note: Removed hero heading intro animation to avoid hide/show on load

    const ctx = gsap.context(() => {
      // Reveal form and map boxes
      if (formBoxRef.current) {
        gsap.from(formBoxRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: formBoxRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }
      if (mapBoxRef.current) {
        gsap.from(mapBoxRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
          delay: 0.06,
          scrollTrigger: {
            trigger: mapBoxRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // Cards one by one
      if (cardsContainerRef.current) {
        const items =
          cardsContainerRef.current.querySelectorAll(".contact-card");
        items.forEach((el, idx) => {
          gsap.from(el, {
            y: 26,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            delay: idx * 0.05,
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          });
        });
      }
    }, pageRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.killTweensOf("*");
    };
  }, []);

  return (
    <main ref={pageRef} className="bg-white overflow-x-hidden">
      {/* 1) Full-width Hero (no frame, no carousel) */}
      <section className="relative w-full">
        <div className="relative w-full">
          <img
            src={bannerImage}
            alt="Hospital reception"
            className="w-full h-[45vh] sm:h-[55vh] lg:h-[65vh] object-cover"
            loading="eager"
            onError={(e) => {
              e.currentTarget.style.background = "#f3f4f6";
            }}
          />
          {/* Soft overlay for readability */}
          <div className="absolute inset-0 bg-white/10 sm:bg-black/20" />

          {/* Text overlay - above image */}
          <div className="absolute inset-0 flex items-center z-10">
            <div className="px-4 sm:px-10 lg:px-20 w-full">
              <div
                ref={heroOverlayRef}
                className="max-w-2xl rounded-2xl bg-white/80 backdrop-blur-md p-6 sm:p-8 ring-1 ring-slate-200 shadow-md"
              >
                <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                  <Ambulance size={18} className="text-red-500" />
                  {t("contact.emergencySupport")}
                </div>
                <h1 className="mt-1 text-2xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-slate-900">
                  {bannerTitle || t("contact.bannerTitle")}
                </h1>
                <p className="mt-2 text-sm sm:text-lg text-slate-700">
                  {bannerSubtitle || t("contact.bannerSubtitle")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2) Contact Form + Map side-by-side (row) */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {/* Left: Form */}
            <div
              ref={formBoxRef}
              className="rounded-3xl bg-white p-6 sm:p-8 ring-1 ring-slate-200 shadow-sm"
            >
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
                {t("contact.sendUs")}
              </h2>
              <p className="mt-2 text-slate-700">{t("contact.helpText")}</p>

              <form onSubmit={handleSubmit} noValidate className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-slate-900"
                    >
                      {t("contact.name")}
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder={t("contact.ph_name")}
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-slate-900 placeholder-slate-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-4"
                      style={{ caretColor: brand.blue }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-slate-900"
                    >
                      {t("contact.email")}
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder={t("contact.ph_email")}
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-slate-900 placeholder-slate-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-4"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-slate-900"
                    >
                      {t("contact.phone")}
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder={t("contact.ph_phone")}
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-slate-900 placeholder-slate-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-4"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-slate-900"
                    >
                      {t("contact.message")}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      placeholder={t("contact.ph_message")}
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-slate-900 placeholder-slate-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-4"
                    />
                  </div>
                </div>

                {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
                {submitted && !error && (
                  <p className="mt-4 text-sm text-emerald-600">
                    {t("contact.success")}
                  </p>
                )}

                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 rounded-full border-2 px-6 py-3 text-sm sm:text-base transition focus:outline-none focus:ring-4 disabled:opacity-70"
                    style={{
                      color: brand.blue,
                      borderColor: brand.blue,
                      backgroundColor: "transparent",
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
                    <Send size={18} />
                    {submitting ? t("contact.sending") : t("contact.send")}
                  </button>
                </div>
              </form>
            </div>

            {/* Right: Map */}
            <div ref={mapBoxRef}>
              <div
                className="rounded-[2rem] p-[4px] shadow-xl overflow-hidden h-full"
                style={{
                  background: `linear-gradient(135deg, ${brand.blue}, ${brand.red})`,
                }}
              >
                <div className="rounded-[1.9rem] overflow-hidden bg-white h-full">
                  <div className="aspect-[16/12] lg:aspect-[16/13] xl:aspect-[16/11] w-full h-full">
                    <iframe
                      title="Shri Samarth Hospital Location"
                      src={mapEmbed}
                      width="100%"
                      height="100%"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="h-full w-full border-0"
                    />
                  </div>
                </div>
              </div>
              <p className="mt-3 text-xs text-slate-500">
                {t("contact.map_hint")}{" "}
                <a
                  href={mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                  style={{ color: brand.blue }}
                >
                  {t("contact.map_open")}
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3) Contact Details (4 cards one-per-row below) */}
      <section className="relative">
        <div
          ref={cardsContainerRef}
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16"
        >
          <div className="space-y-6">
            {/* Address */}
            <div className="contact-card rounded-3xl bg-white p-6 sm:p-8 ring-1 ring-slate-200 shadow-sm hover:shadow-md transition break-words">
              <div className="flex items-start gap-5">
                <div
                  className="h-14 w-14 rounded-2xl grid place-items-center ring-1 ring-slate-200 shadow-sm shrink-0"
                  style={{
                    background: `linear-gradient(180deg, ${brand.blue}26 0%, #FFFFFF 100%)`,
                  }}
                >
                  <MapPin
                    size={26}
                    style={{ color: brand.blue }}
                    aria-hidden="true"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xl font-semibold text-slate-900">
                    {t("contact.address")}
                  </h3>
                  <address className="not-italic mt-2 text-slate-700 text-[15px] leading-7 hyphens-auto break-words">
                    {addressLines.map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                  </address>
                  <a
                    href={mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex text-sm font-medium underline decoration-transparent hover:decoration-current"
                    style={{ color: brand.blue }}
                  >
                    {t("contact.map_open")}
                  </a>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="contact-card rounded-3xl bg-white p-6 sm:p-8 ring-1 ring-slate-200 shadow-sm hover:shadow-md transition">
              <div className="flex items-start gap-5">
                <div
                  className="h-14 w-14 rounded-2xl grid place-items-center ring-1 ring-slate-200 shadow-sm shrink-0"
                  style={{
                    background: `linear-gradient(180deg, ${brand.red}26 0%, #FFFFFF 100%)`,
                  }}
                >
                  <PhoneCall
                    size={26}
                    style={{ color: brand.red }}
                    aria-hidden="true"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xl font-semibold text-slate-900">
                    {t("contact.phoneTitle")}
                  </h3>
                  <ul className="mt-2 text-[15px] text-slate-700 space-y-1.5">
                    {phones.map((p, i) => (
                      <li key={i}>
                        <span className="font-medium">{p.label}:</span>{" "}
                        <a
                          href={`tel:${p.number.replace(/\s+/g, "")}`}
                          className="underline decoration-transparent hover:decoration-current"
                          style={{ color: brand.blue }}
                        >
                          {p.number}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-slate-600">
                    <ShieldCheck size={16} className="text-emerald-600" />
                    {t("contact.emergencyLines")}
                  </div>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="contact-card rounded-3xl bg-white p-6 sm:p-8 ring-1 ring-slate-200 shadow-sm hover:shadow-md transition">
              <div className="flex items-start gap-5">
                <div
                  className="h-14 w-14 rounded-2xl grid place-items-center ring-1 ring-slate-200 shadow-sm shrink-0"
                  style={{
                    background: `linear-gradient(180deg, ${brand.gold}33 0%, #FFFFFF 100%)`,
                  }}
                >
                  <MailOpen
                    size={26}
                    style={{ color: brand.gold }}
                    aria-hidden="true"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xl font-semibold text-slate-900">
                    {t("contact.emailTitle")}
                  </h3>
                  <a
                    href={`mailto:${email}`}
                    className="mt-2 inline-flex text-[15px]"
                    style={{ color: brand.blue }}
                  >
                    {email}
                  </a>
                  <p className="mt-2 text-xs text-slate-500">
                    {t("contact.email_note")}
                  </p>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="contact-card rounded-3xl bg-white p-6 sm:p-8 ring-1 ring-slate-200 shadow-sm hover:shadow-md transition">
              <div className="flex items-start gap-5">
                <div
                  className="h-14 w-14 rounded-2xl grid place-items-center ring-1 ring-slate-200 shadow-sm shrink-0"
                  style={{
                    background: `linear-gradient(180deg, ${brand.blue}26 0%, #FFFFFF 100%)`,
                  }}
                >
                  <Clock8
                    size={26}
                    style={{ color: brand.blue }}
                    aria-hidden="true"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xl font-semibold text-slate-900">
                    {t("contact.working")}
                  </h3>
                  <ul className="mt-2 text-[15px] text-slate-700 space-y-1.5">
                    <li>
                      <span className="font-medium">{t("contact.opd")}</span>{" "}
                      {t("contact.opd_time")}
                    </li>
                    <li>
                      <span className="font-medium">
                        {t("contact.emergency")}
                      </span>{" "}
                      {t("contact.emergency_time")}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactUsMain;
