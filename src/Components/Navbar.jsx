import { ChevronDown, Globe2, Languages, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink, useLocation } from "react-router-dom";

/**
 * Centered transparent-pill Navbar (not full width)
 * - All items (Home | About | Contact | Language) live INSIDE the pill
 * - Pill is centered; page sides are transparent (no white bands)
 * - Larger, clearer center logo without increasing navbar height
 *   • The logo floats above the pill (absolute), so the strip height stays the same
 * - Symmetric link spacing left/right of the logo
 * - Mobile: hamburger -> sidebar
 */
const Navbar = ({ logoSrc = "/logo.png", onLanguageChange }) => {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [lang, setLang] = useState(
    localStorage.getItem("ss_lang") || i18n.language || "en"
  );
  const [logoError, setLogoError] = useState(false);
  const langBtnRefDesktop = useRef(null);
  const langMenuRefDesktop = useRef(null);
  const langBtnRefMobile = useRef(null);
  const langMenuRefMobile = useRef(null);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  // Keep <html lang="..."> in sync (a11y + detectors)
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang || "en";
    }
  }, [lang]);

  // Keep local state in sync if i18n changes elsewhere (detection/init)
  useEffect(() => {
    if (i18n.language && i18n.language !== lang) {
      // normalize like 'en-US' -> 'en'
      const base = i18n.language.split("-")[0];
      setLang(base);
    }
  }, [i18n.language, lang]);

  useEffect(() => {
    function onClick(e) {
      if (!langOpen) return;
      const insideDesktop =
        (langMenuRefDesktop.current &&
          langMenuRefDesktop.current.contains(e.target)) ||
        (langBtnRefDesktop.current &&
          langBtnRefDesktop.current.contains(e.target));
      const insideMobile =
        (langMenuRefMobile.current &&
          langMenuRefMobile.current.contains(e.target)) ||
        (langBtnRefMobile.current &&
          langBtnRefMobile.current.contains(e.target));
      if (!insideDesktop && !insideMobile) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [langOpen]);

  const languages = [
    { code: "en", label: "English" },
    { code: "hi", label: "हिंदी" },
    { code: "mr", label: "मराठी" },
  ];
  function changeLang(code) {
    setLang(code);
    localStorage.setItem("ss_lang", code);
    i18n.changeLanguage(code);
    onLanguageChange?.(code);
    setLangOpen(false);
  }

  const linkBase =
    "text-white/90 hover:text-white transition font-semibold text-[15px]";
  const activeStyles = ({ isActive }) =>
    `${linkBase} ${isActive ? "text-white" : "text-white/90"}`;

  return (
    // Fixed overlay so no white bands at left/right; only the pill is visible
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent pointer-events-none">
      <nav className="relative">
        <div className="w-full flex justify-center mt-3 sm:mt-4">
          {/* Transparent pill (not full width) */}
          <div
            className="
              pointer-events-auto
              relative
              h-12 sm:h-14
              w-[94%] sm:w-[88%] md:w-[78%] lg:w-[60%]
              max-w-[980px]
              rounded-full
              border
              backdrop-blur-md
              shadow-sm
              px-4
              grid grid-cols-[1fr_auto_1fr] items-center
            "
            style={{
              background: "rgba(0,0,0,0.42)",
              borderColor: "rgba(255,255,255,0.18)",
            }}
          >
            {/* Left group: align toward center with proper gap and logo clearance */}
            <div className="hidden lg:flex items-center justify-end gap-8 pr-6 lg:pr-24">
              <NavLink to="/" className={activeStyles}>
                {t("navbar.home")}
              </NavLink>
              <NavLink to="/about" className={activeStyles}>
                {t("navbar.about")}
              </NavLink>
            </div>

            {/* Mobile hamburger inside pill (replaces left group) */}
            <div className="lg:hidden flex items-center">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white/90 hover:text-white"
                aria-label="Open menu"
                title="Menu"
              >
                <Menu size={20} />
              </button>
            </div>

            {/* Center logo: bigger and clearer, floating above pill without changing pill height */}
            <div className="relative flex items-center justify-center">
              <Link
                to="/"
                aria-label="Shri Samarth Hospital - Home"
                className="relative"
              >
                <span
                  className="
                    absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                    grid place-items-center
                    rounded-full
                    ring-1 ring-white/20
                    shadow-[0_4px_12px_rgba(0,0,0,0.25)]
                    bg-white
                    z-10
                  "
                  // Larger logo while pill height remains constant
                  style={{ height: "74px", width: "74px" }}
                >
                  <span
                    className="grid place-items-center rounded-full overflow-hidden ring-1 ring-black/5 bg-white"
                    style={{ height: "66px", width: "66px" }}
                  >
                    {!logoError ? (
                      <img
                        src={logoSrc}
                        alt="Hospital logo"
                        className="h-full w-full object-contain p-1.5"
                        onError={() => setLogoError(true)}
                      />
                    ) : (
                      <span className="text-sm font-semibold text-slate-800">
                        SS
                      </span>
                    )}
                  </span>
                </span>
                {/* Spacer element so the link has click area but no extra height */}
                <span className="block h-0 w-0" />
              </Link>
            </div>

            {/* Right group: align toward center with symmetric gap and logo clearance */}
            <div className="hidden lg:flex items-center justify-start gap-8 pl-6 lg:pl-24">
              <NavLink to="/contact" className={activeStyles}>
                {t("navbar.contact")}
              </NavLink>

              {/* Language dropdown */}
              <div className="relative">
                <button
                  ref={langBtnRefDesktop}
                  type="button"
                  onClick={() => setLangOpen((s) => !s)}
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm text-white/90 hover:text-white"
                  aria-haspopup="menu"
                  aria-expanded={langOpen}
                  aria-label="Select language"
                  title="Language"
                >
                  <Languages size={16} />
                  <span className="hidden sm:inline">
                    {languages.find((l) => l.code === lang)?.label ??
                      t("navbar.language")}
                  </span>
                  <ChevronDown size={14} className="opacity-80" />
                </button>

                {langOpen && (
                  <div
                    ref={langMenuRefDesktop}
                    role="menu"
                    className="absolute right-0 mt-2 w-44 overflow-hidden rounded-xl bg-white p-1.5 shadow-lg ring-1 ring-black/5"
                  >
                    {languages.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => changeLang(l.code)}
                        className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-800 hover:bg-slate-50 ${
                          lang === l.code ? "font-semibold text-slate-900" : ""
                        }`}
                        role="menuitem"
                      >
                        <Globe2 size={14} className="text-slate-500" />
                        <span>{l.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* On small screens put Contact + Lang on the right cell as compact row */}
            <div className="lg:hidden flex items-center justify-end gap-3">
              {/* <NavLink to="/contact" className={activeStyles}>
                {t('navbar.contact')}
              </NavLink> */}
              <div className="relative">
                <button
                  ref={langBtnRefMobile}
                  type="button"
                  onClick={() => setLangOpen((s) => !s)}
                  className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-2 text-sm text-white/90 hover:text-white"
                  aria-haspopup="menu"
                  aria-expanded={langOpen}
                  aria-label="Select language"
                  title="Language"
                >
                  <Languages size={16} />
                  <ChevronDown size={14} className="opacity-80" />
                </button>
                {langOpen && (
                  <div
                    ref={langMenuRefMobile}
                    role="menu"
                    className="absolute right-0 mt-2 w-40 overflow-hidden rounded-xl bg-white p-1.5 shadow-lg ring-1 ring-black/5"
                  >
                    {languages.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => changeLang(l.code)}
                        className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-800 hover:bg-slate-50 ${
                          lang === l.code ? "font-semibold text-slate-900" : ""
                        }`}
                        role="menuitem"
                      >
                        <Globe2 size={14} className="text-slate-500" />
                        <span>{l.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile sidebar */}
        {open && (
          <div className="lg:hidden pointer-events-auto">
            <div
              className="fixed inset-0 z-50 bg-black/40"
              onClick={() => setOpen(false)}
            />
            <aside className="fixed top-0 left-0 z-50 h-full w-72 max-w-[85%] bg-white shadow-xl ring-1 ring-black/5">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="h-8 w-8 rounded-full bg-black/60 grid place-items-center ring-1 ring-black/10">
                    {!logoError ? (
                      <img
                        src={logoSrc}
                        alt="Logo"
                        className="h-7 w-7 rounded-full object-contain bg-white"
                        onError={() => setLogoError(true)}
                      />
                    ) : (
                      <span className="text-xs font-semibold text-white">
                        SS
                      </span>
                    )}
                  </span>
                  <span className="text-sm font-semibold text-slate-900">
                    {t("navbar.hospital")}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-700 hover:bg-slate-50"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              <nav className="px-3 py-4">
                <ul className="space-y-1">
                  <li>
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        `block rounded-xl px-3 py-3 text-sm ${
                          isActive
                            ? "bg-slate-100 text-slate-900 font-semibold"
                            : "text-slate-800 hover:bg-slate-50"
                        }`
                      }
                    >
                      {t("navbar.home")}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/about"
                      className={({ isActive }) =>
                        `block rounded-xl px-3 py-3 text-sm ${
                          isActive
                            ? "bg-slate-100 text-slate-900 font-semibold"
                            : "text-slate-800 hover:bg-slate-50"
                        }`
                      }
                    >
                      {t("navbar.about")}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/contact"
                      className={({ isActive }) =>
                        `block rounded-xl px-3 py-3 text-sm ${
                          isActive
                            ? "bg-slate-100 text-slate-900 font-semibold"
                            : "text-slate-800 hover:bg-slate-50"
                        }`
                      }
                    >
                      {t("navbar.contact")}
                    </NavLink>
                  </li>
                </ul>

                {/* Language inside sidebar */}
                <div className="mt-4 border-t border-slate-100 pt-4">
                  <div className="px-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {t("navbar.language")}
                  </div>
                  <div className="mt-2 grid grid-cols-3 gap-2 px-3">
                    {languages.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => changeLang(l.code)}
                        className={`rounded-full px-3 py-2 text-sm ring-1 ${
                          lang === l.code
                            ? "bg-black text-white ring-black"
                            : "bg-white text-slate-800 ring-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        {l.label}
                      </button>
                    ))}
                  </div>
                </div>
              </nav>
            </aside>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
