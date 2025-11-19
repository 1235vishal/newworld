// import {
//   Activity,
//   BedDouble,
//   CalendarCheck,
//   ClipboardList,
//   Clock,
//   Droplet,
//   HeartHandshake,
//   Home,
//   Monitor,
//   Phone,
//   Stethoscope,
//   UserPlus,
//   Users,
// } from "lucide-react";
// import { useTranslation } from "react-i18next";

// /**
//  * TrustAndCareOverview.jsx
//  *
//  * Changes:
//  * - Each room card now uses a different image (hospital-style).
//  * - Defaults use Unsplash search endpoints for hospital/ward/clinic images.
//  * - You can override images by passing an `images` prop with keys:
//  *   { hero, community, roomsPrivate, roomsSemi, roomsDeluxe, roomsWard }
//  *
//  * Example override:
//  * <TrustAndCareOverview images={{
//  *   roomsPrivate: "/about/private-room.jpg",
//  *   roomsSemi: "/about/semiprivate-room.jpg",
//  *   roomsDeluxe: "/about/deluxe-room.jpg",
//  *   roomsWard: "/about/ward.jpg"
//  * }} />
//  */
// const TrustAndCareOverview = ({
//   whatsappNumber = "919975039313",
//   images = {
//     hero: "/about/1.JPG",
//     community: "/about/2.JPG",
//     // default hospital/clinic/ward style images (replace with your own for best results)
//     roomsPrivate:
//       "https://plus.unsplash.com/premium_photo-1681995326134-cdc947934015?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG9zcGl0YWwlMjByb29tfGVufDB8fDB8fHww",
//     roomsSemi:
//       "https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aG9zcGl0YWwlMjBzZW1pJTIwcHJpdmF0ZSUyMHJvb218ZW58MHx8MHx8fDA%3D",
//     roomsDeluxe:
//       "https://images.unsplash.com/photo-1710074213379-2a9c2653046a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG9zcGl0YWwlMjByb29tfGVufDB8fDB8fHww",
//     roomsWard:
//       "https://plus.unsplash.com/premium_photo-1667238268153-b3634e854e06?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aG9zcGl0YWwlMjBnZW5lcmFsJTIwd29yZCUyMHJvb218ZW58MHx8MHx8fDA%3D",
//   },
// }) => {
//   const { t } = useTranslation();
//   const brand = {
//     blue: "#0B5AA5",
//     red: "#E53935",
//     gold: "#F4B43A",
//     pillBg: "rgba(0,0,0,0.45)",
//   };

//   const specialties = [
//     { name: t("trust.specialties.emergencyTrauma"), Icon: Activity },
//     { name: t("trust.specialties.icu"), Icon: Monitor },
//     { name: t("trust.specialties.cardiology"), Icon: HeartHandshake },
//     { name: t("trust.specialties.orthopedics"), Icon: BedDouble },
//     { name: t("trust.specialties.pediatrics"), Icon: UserPlus },
//     { name: t("trust.specialties.gynecology"), Icon: Stethoscope },
//     { name: t("trust.specialties.dialysis"), Icon: Droplet },
//     { name: t("trust.specialties.generalMedicine"), Icon: ClipboardList },
//   ];

//   // different images per room card
//   const rooms = [
//     {
//       title: t("trust.rooms.private.title"),
//       desc: t("trust.rooms.private.desc"),
//       Icon: Home,
//       img: images.roomsPrivate,
//     },
//     {
//       title: t("trust.rooms.semi.title"),
//       desc: t("trust.rooms.semi.desc"),
//       Icon: BedDouble,
//       img: images.roomsSemi,
//     },
//     {
//       title: t("trust.rooms.deluxe.title"),
//       desc: t("trust.rooms.deluxe.desc"),
//       Icon: Users,
//       img: images.roomsDeluxe,
//     },
//     {
//       title: t("trust.rooms.ward.title"),
//       desc: t("trust.rooms.ward.desc"),
//       Icon: Clock,
//       img: images.roomsWard,
//     },
//   ];

//   const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
//     "Hello Shri Samarth Hospital — I would like to consult / book an appointment."
//   )}`;

//   // human-friendly phone for display where used
//   const displayPhone = "+91 99750 39313";

//   return (
//     <main className="bg-white text-slate-900 pt-28 md:pt-32">
//       {/* Hero / Trust Banner */}
//       <header className="relative overflow-hidden">
//         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-12">
//             <div className="order-2 lg:order-1">
//               <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
//                 {t("trust.heroTitle")}
//               </h1>
//               <p className="mt-4 text-lg text-slate-700 max-w-prose">
//                 {t("trust.heroDesc")}
//               </p>

//               <div className="mt-6 flex flex-col sm:flex-row gap-3">
//                 <a
//                   href={waLink}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="inline-flex items-center gap-3 rounded-full bg-[#25D366] px-4 py-3 text-white font-semibold shadow hover:brightness-95 transition"
//                 >
//                   <Phone size={18} />
//                   {t("trust.buttons.chat")}
//                 </a>

//                 <a
//                   href="#social-activity"
//                   className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-3 bg-white shadow hover:shadow-md transition text-slate-800 font-medium"
//                 >
//                   <Users size={18} />
//                   {t("trust.buttons.community")}
//                 </a>
//               </div>
//             </div>

//             <div className="order-1 lg:order-2">
//               <div className="rounded-2xl overflow-hidden shadow-lg ring-1 ring-slate-100">
//                 <img
//                   src={images.hero}
//                   alt="Sharada Foundation / Shri Samarth Hospital"
//                   className="w-full h-72 sm:h-80 md:h-96 object-cover"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       <section id="social-activity" className="bg-slate-50 py-10">
//         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//           <div className="flex flex-col lg:flex-row items-center gap-8">
//             <div className="lg:w-1/2">
//               <h2 className="text-2xl font-semibold">
//                 {t("trust.communityTitle")}
//               </h2>
//               <p className="mt-3 text-slate-700">{t("trust.communityDesc")}</p>

//               <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
//                 <div className="bg-white rounded-xl p-4 text-center shadow-sm ring-1 ring-slate-100">
//                   <HeartHandshake className="mx-auto text-red-500" size={28} />
//                   <div className="mt-2 font-semibold">
//                     {t("trust.community.camps.title")}
//                   </div>
//                   <div className="text-sm text-slate-500 mt-1">
//                     {t("trust.community.camps.sub")}
//                   </div>
//                 </div>
//                 <div className="bg-white rounded-xl p-4 text-center shadow-sm ring-1 ring-slate-100">
//                   <Users className="mx-auto text-blue-600" size={28} />
//                   <div className="mt-2 font-semibold">
//                     {t("trust.community.drives.title")}
//                   </div>
//                   <div className="text-sm text-slate-500 mt-1">
//                     {t("trust.community.drives.sub")}
//                   </div>
//                 </div>
//                 <div className="bg-white rounded-xl p-4 text-center shadow-sm ring-1 ring-slate-100">
//                   <CalendarCheck className="mx-auto text-green-600" size={28} />
//                   <div className="mt-2 font-semibold">
//                     {t("trust.community.awareness.title")}
//                   </div>
//                   <div className="text-sm text-slate-500 mt-1">
//                     {t("trust.community.awareness.sub")}
//                   </div>
//                 </div>
//                 <div className="bg-white rounded-xl p-4 text-center shadow-sm ring-1 ring-slate-100">
//                   <Activity className="mx-auto text-indigo-500" size={28} />
//                   <div className="mt-2 font-semibold">
//                     {t("trust.community.volunteers.title")}
//                   </div>
//                   <div className="text-sm text-slate-500 mt-1">
//                     {t("trust.community.volunteers.sub")}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="lg:w-1/2">
//               <div className="rounded-2xl overflow-hidden shadow-lg ring-1 ring-slate-100">
//                 <img
//                   src={images.community}
//                   alt="Community health activity"
//                   className="w-full h-80 object-cover"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Consultant WhatsApp CTA block - sticky and also inline */}
//       <section className="py-10">
//         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//           <div className="rounded-2xl bg-gradient-to-r from-white via-white/80 to-white/50 p-6 sm:p-8 ring-1 ring-slate-100 shadow">
//             <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
//               <div className="flex items-start gap-4">
//                 <div className="h-12 w-12 rounded-xl grid place-items-center bg-[#25D366] text-white shadow">
//                   <Phone size={22} />
//                 </div>
//                 <div>
//                   <h3 className="text-xl font-semibold">
//                     {t("trust.ctaTitle")}
//                   </h3>
//                   <p className="mt-1 text-slate-700 max-w-prose">
//                     {t("trust.ctaDesc")}
//                   </p>

//                   <div className="mt-3 text-sm font-medium text-slate-800">
//                     {t("trust.ctaCall")}{" "}
//                     <span className="font-semibold">{displayPhone}</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex items-center gap-3">
//                 <a
//                   href={waLink}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="inline-flex items-center gap-3 rounded-full bg-[#25D366] px-5 py-3 text-white font-semibold shadow hover:brightness-95 transition"
//                 >
//                   <Phone size={18} />
//                   {t("trust.ctaChatBtn")}
//                 </a>

//                 <a
//                   href={`tel:+${whatsappNumber}`}
//                   className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-3 text-slate-800 hover:shadow-md transition"
//                 >
//                   <Phone size={16} />
//                   {t("trust.ctaCallBtn")}
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Specialties */}
//       <section className="py-10 bg-slate-50">
//         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//           <header className="max-w-3xl">
//             <h2 className="text-2xl font-semibold">
//               {t("trust.specialtiesTitle")}
//             </h2>
//             <p className="mt-2 text-slate-700">{t("trust.specialtiesDesc")}</p>
//           </header>

//           <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
//             {specialties.map((s, idx) => (
//               <div
//                 key={idx}
//                 className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 flex gap-4 items-start"
//               >
//                 <div
//                   className="h-12 w-12 rounded-xl grid place-items-center text-white shadow"
//                   style={{ background: brand.blue }}
//                 >
//                   <s.Icon size={20} />
//                 </div>
//                 <div>
//                   <h3 className="font-semibold">{s.name}</h3>
//                   <p className="text-sm text-slate-600 mt-1">
//                     {t("trust.specialtyNote")}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Room Details & Categories */}
//       <section className="py-12">
//         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//           <header className="max-w-3xl">
//             <h2 className="text-2xl font-semibold">{t("trust.roomsTitle")}</h2>
//             <p className="mt-2 text-slate-700">{t("trust.roomsDesc")}</p>
//           </header>

//           <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
//             {rooms.map((r, i) => (
//               <div
//                 key={i}
//                 className="rounded-2xl bg-white overflow-hidden shadow-sm ring-1 ring-slate-100"
//               >
//                 <div className="md:flex">
//                   <div className="md:w-1/2">
//                     <img
//                       src={r.img}
//                       alt={r.title}
//                       className="w-full h-44 md:h-full object-cover"
//                     />
//                   </div>
//                   <div className="p-5 md:w-1/2">
//                     <div className="flex items-center gap-3">
//                       <div className="h-10 w-10 grid place-items-center rounded-lg bg-[#F4B43A]/10 text-[#F4B43A]">
//                         <r.Icon size={20} />
//                       </div>
//                       <h3 className="text-lg font-semibold">{r.title}</h3>
//                     </div>
//                     <p className="mt-3 text-slate-700">{r.desc}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="mt-8 text-center">
//             <a
//               href="#"
//               className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-slate-800 hover:shadow-md transition"
//             >
//               <BedDouble size={18} />
//               {t("trust.viewRooms")}
//             </a>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// };

// export default TrustAndCareOverview;


import React from "react";
import {
  Activity,
  BedDouble,
  CalendarCheck,
  ClipboardList,
  Clock,
  Droplet,
  HeartHandshake,
  Home,
  Monitor,
  Phone,
  Stethoscope,
  UserPlus,
  Users,
} from "lucide-react";
import { useTranslation } from "react-i18next";

/**
 * TrustAndCareOverview.jsx
 * - Improved responsive behavior for all sections (mobile-first)
 * - Buttons become full width on small screens
 * - Grids collapse nicely and images use object-center / responsive heights
 *
 * Props:
 *  - whatsappNumber: string (international w/o +)
 *  - images: { hero, community, roomsPrivate, roomsSemi, roomsDeluxe, roomsWard }
 */
const TrustAndCareOverview = ({
  whatsappNumber = "919975039313",
  images = {
    hero: "/about/1.JPG",
    community: "/about/2.JPG",
    roomsPrivate:
      "https://plus.unsplash.com/premium_photo-1681995326134-cdc947934015?w=1200&auto=format&fit=crop&q=60",
    roomsSemi:
      "https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=1200&auto=format&fit=crop&q=60",
    roomsDeluxe:
      "https://images.unsplash.com/photo-1710074213379-2a9c2653046a?w=1200&auto=format&fit=crop&q=60",
    roomsWard:
      "https://plus.unsplash.com/premium_photo-1667238268153-b3634e854e06?w=1200&auto=format&fit=crop&q=60",
  },
}) => {
  const { t } = useTranslation();
  const brand = {
    blue: "#0B5AA5",
    red: "#E53935",
    gold: "#F4B43A",
    pillBg: "rgba(0,0,0,0.45)",
  };

  const specialties = [
    { name: t("trust.specialties.emergencyTrauma") || "Emergency & Trauma Care (24x7)", Icon: Activity },
    { name: t("trust.specialties.icu") || "Intensive Care Unit (ICU)", Icon: Monitor },
    { name: t("trust.specialties.cardiology") || "Cardiology & Heart Care", Icon: HeartHandshake },
    { name: t("trust.specialties.orthopedics") || "Orthopedics (Bone & Joint)", Icon: BedDouble },
    { name: t("trust.specialties.pediatrics") || "Pediatrics (Child Care)", Icon: UserPlus },
    { name: t("trust.specialties.gynecology") || "Gynecology", Icon: Stethoscope },
    { name: t("trust.specialties.dialysis") || "Dialysis", Icon: Droplet },
    { name: t("trust.specialties.generalMedicine") || "General Medicine & Diabetes", Icon: ClipboardList },
  ];

  const rooms = [
    {
      title: t("trust.rooms.private.title") || "Private Rooms",
      desc: t("trust.rooms.private.desc") || "Complete privacy and a quiet environment with personal amenities.",
      Icon: Home,
      img: images.roomsPrivate,
    },
    {
      title: t("trust.rooms.semi.title") || "Semi-Private Rooms",
      desc: t("trust.rooms.semi.desc") || "Cost-effective option with essential amenities shared between two patients.",
      Icon: BedDouble,
      img: images.roomsSemi,
    },
    {
      title: t("trust.rooms.deluxe.title") || "Deluxe Rooms",
      desc: t("trust.rooms.deluxe.desc") || "Enhanced comfort and extra amenities for a more pleasant stay.",
      Icon: Users,
      img: images.roomsDeluxe,
    },
    {
      title: t("trust.rooms.ward.title") || "General Wards",
      desc: t("trust.rooms.ward.desc") || "Clean and well-managed wards, separate for male and female patients.",
      Icon: Clock,
      img: images.roomsWard,
    },
  ];

  const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hello Shri Samarth Hospital — I would like to consult / book an appointment."
  )}`;

  const displayPhone = "+91 99750 39313";

  return (
    <main className="bg-white text-slate-900 pt-28 md:pt-32">
      {/* Hero / Trust Banner */}
      <header className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-10 md:py-14">
            {/* Text */}
            <div className="order-2 lg:order-1">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
                {t("trust.heroTitle") || "Our Legacy of Care: The Sharada Foundation's Commitment to Health"}
              </h1>

              <p className="mt-4 text-base sm:text-lg text-slate-700 max-w-prose">
                {t("trust.heroDesc") ||
                  "Shri Samarth Hospital is a dedicated initiative by the Sharada Foundation, built on a mission of providing compassionate and accessible healthcare. We bring trusted medical expertise and state-of-the-art technology to the communities of Shirur, Chaufula, Wajewadi, and beyond."}
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-full bg-[#25D366] px-4 py-3 text-white font-semibold shadow hover:brightness-95 transition"
                  aria-label={t("trust.buttons.chat") || "Chat on WhatsApp"}
                >
                  <Phone size={18} />
                  <span>{t("trust.buttons.chat") || "Chat on WhatsApp"}</span>
                </a>

                <a
                  href="#social-activity"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-4 py-3 bg-white shadow hover:shadow-md transition text-slate-800 font-medium"
                >
                  <Users size={18} />
                  <span>{t("trust.buttons.community") || "Community Programs"}</span>
                </a>
              </div>
            </div>

            {/* Image */}
            <div className="order-1 lg:order-2">
              <div className="rounded-2xl overflow-hidden shadow-lg ring-1 ring-slate-100">
                <img
                  src={images.hero}
                  alt={t("trust.heroTitle") || "Sharada Foundation / Shri Samarth Hospital"}
                  className="w-full h-56 sm:h-72 md:h-80 lg:h-96 object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Social Activity */}
      <section id="social-activity" className="bg-slate-50 py-8 md:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="lg:w-1/2">
              <h2 className="text-xl md:text-2xl font-semibold">
                {t("trust.communityTitle") || "Serving Our Community with Heart"}
              </h2>
              <p className="mt-3 text-sm md:text-base text-slate-700">
                {t("trust.communityDesc") ||
                  "At Shri Samarth Hospital, we believe in giving back. We are committed to uplifting our community through free health check-up camps, blood donation drives, and wellness awareness programs."}
              </p>

              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white rounded-xl p-3 text-center shadow-sm ring-1 ring-slate-100">
                  <HeartHandshake className="mx-auto text-red-500" size={24} />
                  <div className="mt-2 text-sm font-semibold">{t("trust.community.camps.title") || "Health Camps"}</div>
                  <div className="text-xs text-slate-500 mt-1">{t("trust.community.camps.sub") || "Regular camps"}</div>
                </div>

                <div className="bg-white rounded-xl p-3 text-center shadow-sm ring-1 ring-slate-100">
                  <Users className="mx-auto text-blue-600" size={24} />
                  <div className="mt-2 text-sm font-semibold">{t("trust.community.drives.title") || "Blood Drives"}</div>
                  <div className="text-xs text-slate-500 mt-1">{t("trust.community.drives.sub") || "Life saving"}</div>
                </div>

                <div className="bg-white rounded-xl p-3 text-center shadow-sm ring-1 ring-slate-100">
                  <CalendarCheck className="mx-auto text-green-600" size={24} />
                  <div className="mt-2 text-sm font-semibold">{t("trust.community.awareness.title") || "Awareness"}</div>
                  <div className="text-xs text-slate-500 mt-1">{t("trust.community.awareness.sub") || "Wellness programs"}</div>
                </div>

                <div className="bg-white rounded-xl p-3 text-center shadow-sm ring-1 ring-slate-100">
                  <Activity className="mx-auto text-indigo-500" size={24} />
                  <div className="mt-2 text-sm font-semibold">{t("trust.community.volunteers.title") || "Volunteers"}</div>
                  <div className="text-xs text-slate-500 mt-1">{t("trust.community.volunteers.sub") || "Community support"}</div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2">
              <div className="rounded-2xl overflow-hidden shadow-lg ring-1 ring-slate-100">
                <img
                  src={images.community}
                  alt={t("trust.communityTitle") || "Community health activity"}
                  className="w-full h-52 sm:h-64 md:h-72 lg:h-80 object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consultant WhatsApp CTA */}
      <section className="py-8 md:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-white p-4 sm:p-6 md:p-8 ring-1 ring-slate-100 shadow">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start gap-4 w-full md:w-auto">
                <div className="h-12 w-12 rounded-xl grid place-items-center bg-[#25D366] text-white shadow-sm flex-shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{t("trust.ctaTitle") || "Instant Consultation & Appointments"}</h3>
                  <p className="mt-1 text-sm text-slate-700 max-w-prose">{t("trust.ctaDesc") || "Chat directly with our hospital representatives on WhatsApp for quick information and scheduling."}</p>

                  <div className="mt-2 text-xs text-slate-700">
                    {t("trust.ctaCall") || "Call us:"} <span className="font-semibold">{displayPhone}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch gap-3 w-full md:w-auto">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-full bg-[#25D366] px-4 py-3 text-white font-semibold shadow hover:brightness-95 transition"
                  aria-label={t("trust.ctaChatBtn") || "Chat on WhatsApp"}
                >
                  <Phone size={16} />
                  <span>{t("trust.ctaChatBtn") || "Chat on WhatsApp"}</span>
                </a>

                <a
                  href={`tel:+${whatsappNumber}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-4 py-3 text-slate-800 hover:shadow-md transition"
                >
                  <Phone size={16} />
                  <span>{t("trust.ctaCallBtn") || "Call Us"}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialties */}
      <section className="py-8 md:py-10 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <header className="max-w-3xl">
            <h2 className="text-xl md:text-2xl font-semibold">{t("trust.specialtiesTitle") || "Our Medical Specialties"}</h2>
            <p className="mt-2 text-sm md:text-base text-slate-700">{t("trust.specialtiesDesc") || "Explore our comprehensive range of expert medical departments."}</p>
          </header>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {specialties.map((s, idx) => (
              <div key={idx} className="rounded-2xl bg-white p-4 sm:p-5 shadow-sm ring-1 ring-slate-100 flex gap-3 items-start">
                <div className="h-10 w-10 rounded-lg grid place-items-center text-white flex-shrink-0" style={{ background: brand.blue }}>
                  <s.Icon size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm sm:text-base">{s.name}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">{t("trust.specialtyNote") || "Expert team and up-to-date facilities"}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Room Details & Categories */}
      <section className="py-8 md:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <header className="max-w-3xl">
            <h2 className="text-xl md:text-2xl font-semibold">{t("trust.roomsTitle") || "Accommodations Designed for Your Comfort & Healing"}</h2>
            <p className="mt-2 text-sm md:text-base text-slate-700">{t("trust.roomsDesc") || "We offer a range of comfortable and well-maintained rooms to suit your needs."}</p>
          </header>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {rooms.map((r, i) => (
              <div key={i} className="rounded-2xl bg-white overflow-hidden shadow-sm ring-1 ring-slate-100">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <img src={r.img} alt={r.title} className="w-full h-40 sm:h-52 md:h-full object-cover object-center" />
                  </div>
                  <div className="p-4 md:p-5 md:w-1/2">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 grid place-items-center rounded-lg bg-[#F4B43A]/10 text-[#F4B43A] flex-shrink-0">
                        <r.Icon size={18} />
                      </div>
                      <h3 className="text-base font-semibold">{r.title}</h3>
                    </div>
                    <p className="mt-3 text-sm text-slate-700">{r.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <a href="#" className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm sm:text-base text-slate-800 hover:shadow-md transition">
              <BedDouble size={16} />
              {t("trust.viewRooms") || "View All Rooms & Rates"}
            </a>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp quick button - bottom-right (responsive) */}
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-4 bottom-4 z-50 inline-flex items-center gap-3 rounded-full bg-[#25D366] px-3 py-2 text-white shadow-lg hover:brightness-95 transition sm:px-4 sm:py-3"
        aria-label="Chat on WhatsApp"
      >
        <Phone size={16} />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>
    </main>
  );
};

export default TrustAndCareOverview;