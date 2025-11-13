import { Quote, Star } from "lucide-react";
import { useTranslation } from "react-i18next";

const Testimonials = ({ title, featured, items }) => {
  const { t } = useTranslation();
  const localTitle = title || t("testimonials.title");
  const localFeatured = {
    quote: t("testimonials.featured.quote"),
    author: t("testimonials.featured.author"),
    role: t("testimonials.featured.role"),
    image:
      (featured && featured.image) ||
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
  };
  const localItems = (
    items && items.length
      ? items
      : t("testimonials.items", { returnObjects: true })
  ).map((it, i) => ({
    quote: it.quote,
    author: it.author,
    role: it.role,
    image:
      (items && items[i] && items[i].image) ||
      [
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?auto=format&fit=crop&w=600&q=80",
      ][i] ||
      undefined,
    rating: 5,
  }));
  const brand = {
    blue: "#0B5AA5",
    red: "#E53935",
  };

  const Stars = ({ count = 5 }) => (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star
          key={i}
          size={18}
          className="text-yellow-500"
          fill="#EAB308"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      ))}
    </div>
  );

  return (
    // overflow-hidden prevents any accidental horizontal page scroll from inner accents
    <section className="relative bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900">
            {localTitle}
          </h2>
          <div
            className="mx-auto mt-4 h-1.5 w-20 rounded-full"
            style={{ background: brand.blue }}
          />
        </div>

        {/* Featured testimonial */}
        <div className="mt-10 lg:mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image frame (kept inside bounds; no negative offsets) */}
          <div className="order-1 lg:order-none">
            <div
              className="relative rounded-[2rem] p-[4px] shadow-xl"
              style={{
                background: `linear-gradient(135deg, ${brand.blue}, ${brand.red})`,
              }}
            >
              <figure className="rounded-[1.9rem] overflow-hidden bg-white">
                <img
                  src={localFeatured.image}
                  alt="Smiling patient"
                  className="w-full h-full object-cover aspect-[4/3] sm:aspect-[5/4] md:aspect-[4/3]"
                  loading="lazy"
                />
              </figure>

              {/* Quote badge kept inside to avoid overflow */}
              <div className="absolute top-3 left-3">
                <div className="h-12 w-12 rounded-2xl grid place-items-center bg-white shadow ring-1 ring-slate-200">
                  <Quote
                    size={22}
                    style={{ color: brand.blue }}
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Quote content */}
          <div className="relative">
            <div className="rounded-3xl bg-white p-6 sm:p-8 ring-1 ring-slate-200 shadow-sm">
              <Stars count={5} />
              <blockquote className="mt-4 text-lg sm:text-xl leading-8 text-slate-700">
                “{localFeatured.quote}”
              </blockquote>
              <div className="mt-5">
                <div className="text-base font-semibold text-slate-900">
                  — {localFeatured.author}
                </div>
                <div className="text-sm text-slate-500">
                  {localFeatured.role}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* More testimonials (no horizontal scroller) */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {localItems.map((t, i) => (
            <div
              key={i}
              className="group rounded-3xl bg-white p-6 ring-1 ring-slate-200 shadow-sm transition hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-4">
                <img
                  src={t.image}
                  alt="Patient"
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-white shadow"
                  loading="lazy"
                />
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    {t.author}
                  </div>
                  <div className="text-xs text-slate-500">{t.role}</div>
                </div>
              </div>

              <div className="mt-3">
                <Stars count={t.rating ?? 5} />
              </div>

              <p className="mt-3 text-sm sm:text-[15px] leading-6 text-slate-600">
                “{t.quote}”
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
  );
};

export default Testimonials;
