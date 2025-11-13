import { Facebook, Instagram } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

/**
 * Footer (matches your navbar style)
 * - Inside the centered transparent pill:
 *    • LEFT: logo (clear, visible)
 *    • RIGHT: social icons (Facebook, Instagram)
 * - OUTSIDE the pill (below): full copyright line
 * - Not full width, centered, fully responsive
 */
const Footer = ({
  logoSrc = "/logo.png",
  facebookUrl = "https://www.facebook.com/share/1A2ssyxE6p/",
  instagramUrl = "https://www.instagram.com/hospitalshrisamarth?igsh=N3UzeXpibzN1czU1",
}) => {
  const { t } = useTranslation();
  const [logoError, setLogoError] = useState(false);
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-transparent pt-10 pb-12">
      {/* Centered pill strip (not full width) */}
      <div className="w-full flex justify-center">
        <div
          className="
            pointer-events-auto
            relative
            h-14 sm:h-16
            w-[94%] sm:w-[88%] md:w-[78%] lg:w-[60%]
            max-w-[980px]
            rounded-full
            border
            backdrop-blur-md
            shadow-sm
            px-4 sm:px-6
            flex items-center justify-between
          "
          style={{
            background: "rgba(0,0,0,0.42)", // black transparent pill
            borderColor: "rgba(255,255,255,0.18)",
          }}
        >
          {/* LEFT: Logo (clear and visible inside the strip) */}
          <div className="flex items-center">
            <span className="grid place-items-center rounded-full ring-1 ring-white/20 bg-white shadow-md">
              <span className="grid place-items-center rounded-full overflow-hidden ring-1 ring-black/5 bg-white h-12 w-12 sm:h-14 sm:w-14">
                {!logoError ? (
                  <img
                    src={logoSrc}
                    alt="Shri Samarth Hospital logo"
                    className="h-full w-full object-contain p-1.5"
                    onError={() => setLogoError(true)}
                  />
                ) : (
                  <span className="text-xs font-semibold text-slate-800">
                    SS
                  </span>
                )}
              </span>
            </span>
          </div>

          {/* RIGHT: Social icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/15"
              aria-label="Facebook"
              title="Facebook"
            >
              <Facebook size={18} />
            </a>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/15"
              aria-label="Instagram"
              title="Instagram"
            >
              <Instagram size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* OUTSIDE the strip: Copyright (wraps on small screens, no overflow) */}
      <div className="mt-4 flex justify-center px-4">
        <p className="text-center text-[13px] sm:text-sm leading-relaxed text-black/90 whitespace-normal break-words">
          © {year} {t("navbar.hospital")} | {t("footer.copyright")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
