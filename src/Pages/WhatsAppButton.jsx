// src/Components/WhatsAppButton.jsx
import React from "react";
import { Phone } from "lucide-react";

/**
 * Floating WhatsApp button (responsive)
 *
 * Props:
 * - whatsappNumber: string (wa.me format: country + number, no +), default "919922869716"
 * - message: default quick message encoded into wa.me
 *
 * Usage:
 * <WhatsAppButton />
 * or
 * <WhatsAppButton whatsappNumber="9199xxxxxxx" message="Hi" />
 */
const WhatsAppButton = ({
  whatsappNumber = "919922869716",
  message = "Hello Shri Samarth Hospital — I would like to consult / book an appointment.",
}) => {
  const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;
  const displayPhone = "+91 9922869716";

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat on WhatsApp ${displayPhone}`}
      // responsive spacing: small screens right-4 bottom-4, md+: right-6 bottom-6
      className="fixed right-4 bottom-4 md:right-6 md:bottom-6 z-[120] inline-flex items-center gap-3
                 rounded-full shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400"
      // don't rely on Tailwind's color palette if you prefer exact green:
      style={{ background: "#25D366", padding: "8px 12px" }}
    >
      {/* circle icon - always visible and compact on small screens */}
      <span
        className="flex items-center justify-center rounded-full bg-white/0"
        style={{ width: 36, height: 36 }}
      >
        <Phone size={18} className="text-white" />
      </span>

      {/* label: hidden on xs/sm, visible on md+ as a pill */}
      <span
        className="hidden md:inline-block text-white font-semibold text-sm select-none"
        style={{ lineHeight: 1 }}
      >
        WhatsApp
      </span>
    </a>
  );
};

export default WhatsAppButton;
