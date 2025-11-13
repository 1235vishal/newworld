import {
  Ambulance,
  BedDouble,
  FlaskConical,
  Hospital,
  ShieldCheck,
  UserCog,
} from "lucide-react";
import { useTranslation } from "react-i18next";

/**
 * WhyChooseUs section
 * - Two-column layout (features + framed image)
 * - Right image "frame" matches reference (Image 5):
 *   • Rounded white container
 *   • Blue accent bar on the right + bottom with soft glow
 *   • Works across breakpoints, looks clean on small screens
 *
 * Props:
 * - imageSrc: string (team/reception photo)
 * - imageAlt: string
 * - title: string
 */
const WhyChooseUs = ({
  imageSrc = "./imgi_7_female-dentist-showing-teeth-model-smiling-patient-clinic-839x1024.jpg",
  imageAlt = "Our expert and caring hospital team",
  title,
}) => {
  const { t } = useTranslation();
  const brand = {
    blue: "#0B5AA5",
    blueLight: "#1FA0FF",
    red: "#E53935",
    gold: "#F4B43A",
  };

  const features = [
    {
      title: t("why.features.emergency.title"),
      desc: t("why.features.emergency.desc"),
      Icon: Ambulance,
      tone: brand.red,
    },
    {
      title: t("why.features.cashless.title"),
      desc: t("why.features.cashless.desc"),
      Icon: ShieldCheck,
      tone: brand.blue,
    },
    {
      title: t("why.features.specialists.title"),
      desc: t("why.features.specialists.desc"),
      Icon: UserCog,
      tone: brand.gold,
    },
    {
      title: t("why.features.icu.title"),
      desc: t("why.features.icu.desc"),
      Icon: Hospital,
      tone: brand.blue,
    },
    {
      title: t("why.features.wards.title"),
      desc: t("why.features.wards.desc"),
      Icon: BedDouble,
      tone: brand.gold,
    },
    {
      title: t("why.features.inhouse.title"),
      desc: t("why.features.inhouse.desc"),
      Icon: FlaskConical,
      tone: brand.blue,
    },
  ];

  return (
    <section className="relative bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Text + Feature Cards */}
          <div>
            <header>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900">
                {title || t("why.title")}
              </h2>
              <div
                className="mt-3 h-1.5 w-14 rounded-full"
                style={{ background: brand.blue }}
              />
            </header>

            <div className="mt-8 flex flex-col gap-4">
              {features.map(({ title, desc, Icon, tone }, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 rounded-2xl bg-white p-4 sm:p-5 ring-1 ring-slate-200 shadow-sm hover:shadow-md transition hover:-translate-y-0.5"
                >
                  {/* Icon Tile */}
                  <div
                    className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl grid place-items-center ring-1 ring-slate-200 shadow-sm shrink-0"
                    style={{
                      background: `linear-gradient(180deg, ${tone}1A 0%, #FFFFFF 100%)`,
                    }}
                  >
                    <Icon
                      size={26}
                      strokeWidth={2}
                      style={{ color: tone }}
                      aria-hidden="true"
                    />
                  </div>

                  {/* Text */}
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900">
                      {title}
                    </h3>
                    <p className="mt-1 text-sm sm:text-[15px] leading-6 text-slate-600">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Image with "same to same" rounded frame + blue right/bottom accent */}
          <div className="relative max-w-xl lg:max-w-none w-full mx-auto">
            {/* Outer white, softly rounded container */}
            <div className="relative rounded-[2rem] bg-white p-2 sm:p-3 ring-1 ring-slate-200 shadow-[0_10px_30px_rgba(2,8,23,0.06)]">
              {/* Image holder with responsive aspect
                  - Portrait feeling like the reference on md+ screens
                  - Slightly wider on small screens for better stacking */}
              <div className="relative overflow-hidden rounded-[1.7rem]">
                <img
                  src={imageSrc}
                  alt={imageAlt}
                  className="w-full h-full object-cover aspect-[4/3] sm:aspect-[4/3] md:aspect-[4/5] lg:aspect-[4/5]"
                  loading="lazy"
                />
              </div>

              {/* Blue accent: RIGHT vertical bar */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-4 bottom-4 -right-[2px] w-[10px] sm:w-[12px] rounded-full"
                style={{
                  background: `linear-gradient(180deg, ${brand.blueLight}, ${brand.blue})`,
                  boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.4)`,
                }}
              />

              {/* Blue accent: BOTTOM horizontal bar */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-4 right-4 -bottom-[2px] h-[10px] sm:h-[12px] rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${brand.blueLight}, ${brand.blue})`,
                  boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.4)`,
                }}
              />

              {/* Soft glow like reference */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -z-10 -right-4 -bottom-3 h-28 w-28 rounded-full blur-2xl opacity-40"
                style={{
                  background: `radial-gradient(40% 40% at 50% 50%, ${brand.blueLight}, transparent)`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
