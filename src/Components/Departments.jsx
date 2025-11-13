import {
  Ambulance,
  Baby,
  Bone,
  Droplet,
  HeartPulse,
  Stethoscope,
} from "lucide-react";
import { useTranslation } from "react-i18next";

/**
 * 3. Our Departments / Specialties
 * - Modern, clean cards inspired by the reference image.
 * - 6 responsive cards with clear, relevant icons.
 * - White background, subtle brand accents, works with TailwindCSS.
 *
 * Props (optional):
 * - title: section heading
 * - intro: section description
 */
const Departments = ({ title, intro }) => {
  const { t } = useTranslation();
  // Brand palette from your logo
  const brand = {
    blue: "#0B5AA5",
    red: "#E53935",
    gold: "#F4B43A",
  };

  const items = [
    {
      name: t("departments.items.cardiology.name"),
      desc: t("departments.items.cardiology.desc"),
      Icon: HeartPulse,
      tone: brand.red,
    },
    {
      name: t("departments.items.ortho.name"),
      desc: t("departments.items.ortho.desc"),
      Icon: Bone,
      tone: brand.gold,
    },
    {
      name: t("departments.items.medicine.name"),
      desc: t("departments.items.medicine.desc"),
      Icon: Stethoscope,
      tone: brand.blue,
    },
    {
      name: t("departments.items.pediatrics.name"),
      desc: t("departments.items.pediatrics.desc"),
      Icon: Baby,
      tone: brand.blue,
    },
    {
      name: t("departments.items.dialysis.name"),
      desc: t("departments.items.dialysis.desc"),
      Icon: Droplet,
      tone: brand.gold,
    },
    {
      name: t("departments.items.emergency.name"),
      desc: t("departments.items.emergency.desc"),
      Icon: Ambulance,
      tone: brand.red,
    },
  ];

  return (
    <section className="relative bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Heading */}
        <div className="max-w-3xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900">
            {title || t("departments.title")}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            {intro || t("departments.intro")}
          </p>
        </div>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {items.map(({ name, desc, Icon, tone }, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-3xl bg-white ring-1 ring-slate-200 shadow-sm p-6 sm:p-7 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
            >
              {/* Soft icon tile (like the reference) */}
              <div
                className="h-16 w-16 rounded-2xl grid place-items-center shadow-sm ring-1 ring-slate-200"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(241,245,249,0.75) 0%, rgba(255,255,255,0.9) 100%)",
                }}
              >
                <Icon
                  size={28}
                  strokeWidth={2}
                  className="text-slate-800"
                  style={{ color: tone }}
                  aria-hidden="true"
                />
              </div>

              {/* Text */}
              <h3 className="mt-5 text-xl font-semibold text-slate-900">
                {name}
              </h3>
              <p className="mt-2 text-sm sm:text-[15px] leading-6 text-slate-600">
                {desc}
              </p>

              {/* Accent underline on hover */}
              <span
                className="pointer-events-none absolute bottom-0 left-0 h-1 w-0 transition-all duration-300 group-hover:w-full"
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
  );
};

export default Departments;
