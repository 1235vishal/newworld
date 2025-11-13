// import About from "../Components/About.jsx";
// import Departments from "../Components/Departments.jsx";
// import Hero from "../Components/Hero.jsx";
// import Testimonials from "../Components/Testimonials.jsx";
// import WhyChooseUs from "../Components/WhyChooseUs.jsx";

// export default function Home() {
//   return (
//     <>
//       <Hero />
//       <About />
//       <Departments />
//       <WhyChooseUs />
//       <Testimonials />
//     </>
//   );
// }

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

import About from "../Components/About.jsx";
import Departments from "../Components/Departments.jsx";
import Hero from "../Components/Hero.jsx";
import Testimonials from "../Components/Testimonials.jsx";
import WhyChooseUs from "../Components/WhyChooseUs.jsx";

/**
 * Home.jsx
 * - Adds GSAP animations with ScrollTrigger
 * - Subtle parallax on Hero, smooth reveal-on-scroll for each section
 * - Non-intrusive: does not change your existing section markup/design
 *
 * Optional: inside your section components, add data-reveal to any child
 * elements to get staggered reveals automatically, e.g.:
 *   <h2 data-reveal>Title</h2>
 *   <p data-reveal>Paragraph</p>
 */

export default function Home() {
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const deptRef = useRef(null);
  const whyRef = useRef(null);
  const testiRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Create a GSAP context to auto-cleanup on unmount
    const ctx = gsap.context(() => {
      // 1) Initial fade-in for the Hero block
      if (heroRef.current) {
        gsap.from(heroRef.current, {
          autoAlpha: 0,
          y: 20,
          duration: 0.8,
          ease: "power2.out",
        });

        // Subtle parallax on the whole Hero section while scrolling
        gsap.to(heroRef.current, {
          yPercent: 5,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      // Helper to reveal a section and optionally stagger any [data-reveal] children
      const revealSection = (ref) => {
        if (!ref?.current) return;

        // Section fade/slide in
        gsap.from(ref.current, {
          autoAlpha: 0,
          y: 40,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });

        // Stagger any children marked with [data-reveal]
        const items = ref.current.querySelectorAll("[data-reveal]");
        if (items.length) {
          gsap.from(items, {
            autoAlpha: 0,
            y: 24,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: ref.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });
        }
      };

      // 2) Reveal-on-scroll for the rest of the sections
      [aboutRef, deptRef, whyRef, testiRef].forEach(revealSection);
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div ref={heroRef}>
        <Hero />
      </div>

      <section ref={aboutRef}>
        <About />
      </section>

      <section ref={deptRef}>
        <Departments />
      </section>

      <section ref={whyRef}>
        <WhyChooseUs />
      </section>

      <section ref={testiRef}>
        <Testimonials />
      </section>
    </>
  );
}
