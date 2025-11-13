import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const slidesData = [
  {
    src: "./Hero/DSC08789.JPG",
    alt: "Nephrology Department",
  },
  {
    src: "./Hero/DSC08800.JPG",
    alt: "Medical",
  },
  {
    src: "./Hero/DSC08794.JPG",
    alt: "Nephrology Department",
  },
  {
    src: "./Hero/DSC08807.JPG",
    alt: "Medical",
  },
];

export default function HeroCopy() {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = slidesData.length;
  const autoRef = useRef(null);

  useEffect(() => {
    startAuto();
    return () => stopAuto();
  }, [currentSlide]);

  function startAuto() {
    stopAuto();
    autoRef.current = setInterval(() => {
      setCurrentSlide((s) => (s + 1) % totalSlides);
    }, 5000);
  }

  function stopAuto() {
    if (autoRef.current) {
      clearInterval(autoRef.current);
      autoRef.current = null;
    }
  }

  function nextSlide() {
    stopAuto();
    setCurrentSlide((s) => (s + 1) % totalSlides);
    startAuto();
  }

  function prevSlide() {
    stopAuto();
    setCurrentSlide((s) => (s - 1 + totalSlides) % totalSlides);
    startAuto();
  }

  return (
    <div className="relative w-full overflow-hidden">
      <style>{`
        @keyframes slideIn { from { opacity: 0; transform: translateX(100%);} to { opacity:1; transform: translateX(0);} }
        @keyframes slideOut { from { opacity:1; transform: translateX(0);} to { opacity:0; transform: translateX(-100%);} }
        .slide-enter { animation: slideIn 0.8s ease-out forwards; }
        .slide-exit { animation: slideOut 0.8s ease-out forwards; }
        .arrow-btn { transition: all 0.3s ease; }
      `}</style>

      {/* Hero Section */}
      <div className="relative w-full h-[420px] md:h-[500px] lg:h-[560px]">
        <div className="relative w-full h-full">
          {slidesData.map((slide, i) => (
            <div
              key={i}
              className={`absolute inset-0 w-full h-full ${
                i === currentSlide ? "" : "hidden"
              }`}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                className="w-full h-full object-cover"
              />
              {/* Dark gradient overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/30 to-transparent" />
            </div>
          ))}
        </div>

        {/* ✅ Centered Hero Text with improved colors */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 z-20">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white drop-shadow-lg mb-3">
            {t("hero.title")}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white font-semibold drop-shadow-md mb-2">
            {t("hero.tagline")}
          </p>
          <p className="text-sm sm:text-base md:text-lg text-white/95 max-w-2xl leading-relaxed drop-shadow-sm">
            {t("hero.desc")}
          </p>
          <button className="mt-6 px-6 py-3 bg-[#E3342F] hover:bg-[#004080] text-white font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
            {t("hero.book")}
          </button>
        </div>

        {/* Arrows - Hidden on mobile, visible on medium screens and up */}
        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          className="arrow-btn absolute left-3 md:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-[#004080] hover:bg-[#E3342F] rounded-full shadow-lg transition-all duration-300 hidden md:flex"
        >
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="arrow-btn absolute right-3 md:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-[#004080] hover:bg-[#E3342F] rounded-full shadow-lg transition-all duration-300 hidden md:flex"
        >
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Doctor GIF */}
        <div className="absolute bottom-4 sm:bottom-1 md:bottom-8 right-[-33px] sm:right-6 md:right-20 z-10">
          <img
            src="https://www.lilavatihospital.com/assets/front/images/icons/hello-lila-3.gif?ver=001"
            alt="Doctor"
            className="h-[140px] w-[180px] md:h-[234px] md:w-[300px] object-contain drop-shadow-2xl"
          />
        </div>

        {/* Slide Indicators */}
        {/* <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
          {slidesData.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                stopAuto();
                setCurrentSlide(i);
                startAuto();
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === currentSlide ? "bg-white w-6" : "bg-white/60"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div> */}
      </div>

      {/* ✅ Service Strip */}
      <div className="bg-[#004080] py-5 w-full md:w-4/5 mx-auto -translate-y-4 md:-translate-y-8 shadow-lg">
        <div className="max-w-8xl mx-auto px-2">
          {/* Desktop */}
          <div className="hidden md:grid grid-cols-5 divide-x divide-white/20">
            {[
              {
                icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
                text1: "Find a",
                text2: "Doctor",
              },
              {
                icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
                text1: "Explore",
                text2: "Specialities",
              },
              {
                icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
                text1: "Online",
                text2: "Payment",
              },
              {
                icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
                text1: "Health",
                text2: "Checkup",
              },
              {
                icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
                text1: "Video",
                text2: "Consultation",
              },
            ].map((item, i) => (
              <a
                key={i}
                href="#"
                className="flex items-center justify-center gap-3 py-3 px-3 hover:bg-[#E3342F] transition-all duration-300 group"
              >
                <div className="w-12 h-12 flex items-center justify-center border-2 border-[#E4AD64] rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-300">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={item.icon}
                    />
                  </svg>
                </div>
                <div className="text-white text-sm font-medium leading-tight text-left">
                  <div>
                    {i === 0 && t("hero.services.find1")}
                    {i === 1 && t("hero.services.explore1")}
                    {i === 2 && t("hero.services.pay1")}
                    {i === 3 && t("hero.services.check1")}
                    {i === 4 && t("hero.services.video1")}
                  </div>
                  <div>
                    {i === 0 && t("hero.services.find2")}
                    {i === 1 && t("hero.services.explore2")}
                    {i === 2 && t("hero.services.pay2")}
                    {i === 3 && t("hero.services.check2")}
                    {i === 4 && t("hero.services.video2")}
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Mobile */}
          <div className="md:hidden grid grid-cols-5 gap-2 text-center">
            {[
              {
                icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
                label: "Find a Doctor",
              },
              {
                icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
                label: "Explore Specialities",
              },
              {
                icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
                label: "Online Payment",
              },
              {
                icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
                label: "Health Checkup",
              },
              {
                icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
                label: "Video Consultation",
              },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center border-2 border-[#E4AD64] rounded-full hover:bg-[#E3342F] transition-all duration-300">
                  <svg
                    className="w-6 h-6 sm:w-7 sm:h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={item.icon}
                    />
                  </svg>
                </div>
                <p className="text-white text-xs sm:text-sm mt-2 leading-tight">
                  {i === 0 && t("hero.services.labels.find")}
                  {i === 1 && t("hero.services.labels.explore")}
                  {i === 2 && t("hero.services.labels.pay")}
                  {i === 3 && t("hero.services.labels.check")}
                  {i === 4 && t("hero.services.labels.video")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
