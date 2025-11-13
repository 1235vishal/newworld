import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

function Section1() {
  const { t } = useTranslation();
  const symptoms = [
    {
      id: 1,
      img: "https://cdn.pixabay.com/photo/2020/05/04/16/24/man-5127912_960_720.jpg",
      title: t("section.symptoms.headache"),
    },
    {
      id: 2,
      img: "https://cdn.pixabay.com/photo/2016/11/29/05/48/pain-1867430_960_720.jpg",
      title: t("section.symptoms.chestPain"),
    },
    {
      id: 3,
      img: "https://cdn.pixabay.com/photo/2016/03/31/19/56/knee-1290325_960_720.jpg",
      title: t("section.symptoms.jointPain"),
    },
    {
      id: 4,
      img: "https://cdn.pixabay.com/photo/2016/03/27/07/10/man-1282232_960_720.jpg",
      title: t("section.symptoms.stomachAche"),
    },
    {
      id: 5,
      img: "https://cdn.pixabay.com/photo/2018/01/31/07/45/woman-3120818_960_720.jpg",
      title: t("section.symptoms.backPain"),
    },
  ];

  // ✅ Define arrow components properly as functions
  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div
        onClick={onClick}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-teal-600 hover:bg-teal-700 text-white p-2 rounded-full z-10 cursor-pointer"
      >
        <ChevronLeft size={20} />
      </div>
    );
  };

  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <div
        onClick={onClick}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-teal-600 hover:bg-teal-700 text-white p-2 rounded-full z-10 cursor-pointer"
      >
        <ChevronRight size={20} />
      </div>
    );
  };

  // ✅ Slider settings (arrows passed as React elements)
  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  // Dynamic import of react-slick to avoid bundler export issues
  const [SliderComp, setSliderComp] = useState(null);
  useEffect(() => {
    let mounted = true;
    import("react-slick")
      .then((mod) => {
        const S = mod.default || mod;
        if (mounted) setSliderComp(() => S);
      })
      .catch((err) => {
        console.error("Failed to load react-slick:", err);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="py-12 bg-white">
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 text-gray-800">
        {t("section.title")}
      </h2>

      <div className="relative max-w-7xl mx-auto px-4">
        {SliderComp ? (
          <SliderComp {...settings}>
            {symptoms.map((item) => (
              <div key={item.id} className="px-3">
                <div
                  className="flex flex-col items-center cursor-pointer group"
                  onClick={() =>
                    alert(t("section.clicked", { item: item.title }))
                  }
                >
                  <div className="w-48 h-48 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-full overflow-hidden shadow-lg relative">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-red-500/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>
                  </div>
                  <p className="mt-3 text-gray-700 text-lg font-medium group-hover:text-teal-600 transition">
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </SliderComp>
        ) : (
          // Fallback while slider loads: simple responsive grid
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {symptoms.map((item) => (
              <div key={item.id} className="px-3">
                <div
                  className="flex flex-col items-center cursor-pointer group"
                  onClick={() =>
                    alert(t("section.clicked", { item: item.title }))
                  }
                >
                  <div className="w-40 h-40 rounded-full overflow-hidden shadow-lg relative">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="mt-3 text-gray-700 text-lg font-medium">
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Section1;
