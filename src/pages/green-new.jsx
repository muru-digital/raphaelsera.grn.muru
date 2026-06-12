/*
  FONTS RECOMMENDATION (free commercial use):
  - Display/Heading: "Playfair Display" (Google Fonts) — classic serif, luxurious, perfect for names
  - Subheading: "Cormorant Garamond" (Google Fonts) — thin elegant serif, editorial feel
  - Body: "Jost" (Google Fonts) — clean geometric sans, modern yet refined
  - Monogram: "Playfair Display SC" (small caps variant)

  To use: add to index.html or @import in CSS:
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Cormorant+Garamond:wght@300;400;600&family=Jost:wght@300;400;500&display=swap');
*/

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";

// ─── PALETTE ───────────────────────────────────────────────────────────────────
// Deep Forest Green + Ivory + Gold — matches the floral card reference
const COLORS = {
  forest: "#1a3a2a",
  forestLight: "#234d38",
  gold: "#b8964a",
  goldLight: "#d4af6a",
  ivory: "#faf7f0",
  ivoryDark: "#f0ebe0",
  cream: "#ede8dc",
  text: "#2c2c28",
  muted: "#6b6b5e",
};

// ─── DECORATIVE ELEMENTS ───────────────────────────────────────────────────────
const GoldDivider = () => (
  <div className="flex items-center justify-center gap-3 my-6">
    <div className="h-px flex-1 max-w-16" style={{ background: `linear-gradient(to right, transparent, ${COLORS.gold})` }} />
    <svg width="18" height="18" viewBox="0 0 24 24" fill={COLORS.gold}>
      <path d="M12 2 L13.5 8.5 L20 7 L15 12 L20 17 L13.5 15.5 L12 22 L10.5 15.5 L4 17 L9 12 L4 7 L10.5 8.5 Z" />
    </svg>
    <div className="h-px flex-1 max-w-16" style={{ background: `linear-gradient(to left, transparent, ${COLORS.gold})` }} />
  </div>
);

const FloralCorner = ({ flip = false }) => (
  <svg
    viewBox="0 0 120 120"
    className={`absolute w-28 md:w-36 opacity-40 ${flip ? "rotate-180" : ""}`}
    style={{ top: flip ? "auto" : 0, bottom: flip ? 0 : "auto", left: flip ? "auto" : 0, right: flip ? 0 : "auto" }}
    fill="none"
  >
    <circle cx="20" cy="20" r="8" fill={COLORS.gold} opacity="0.6" />
    <circle cx="40" cy="15" r="5" fill={COLORS.gold} opacity="0.4" />
    <circle cx="15" cy="40" r="5" fill={COLORS.gold} opacity="0.4" />
    <circle cx="55" cy="22" r="4" fill={COLORS.goldLight} opacity="0.3" />
    <circle cx="22" cy="55" r="4" fill={COLORS.goldLight} opacity="0.3" />
    <path d="M5 60 Q30 30 60 5" stroke={COLORS.gold} strokeWidth="1" opacity="0.5" />
    <path d="M5 80 Q40 50 80 5" stroke={COLORS.gold} strokeWidth="0.8" opacity="0.3" />
    <circle cx="70" cy="30" r="3" fill={COLORS.gold} opacity="0.3" />
    <circle cx="30" cy="70" r="3" fill={COLORS.gold} opacity="0.3" />
    {[0, 1, 2, 3, 4].map((i) => (
      <ellipse
        key={i}
        cx={12 + i * 18}
        cy={90 - i * 15}
        rx="6"
        ry="10"
        transform={`rotate(${-30 + i * 15} ${12 + i * 18} ${90 - i * 15})`}
        fill={COLORS.forestLight}
        opacity={0.3 + i * 0.04}
      />
    ))}
  </svg>
);

const GeometricFrame = ({ children, className = "" }) => (
  <div className={`relative inline-block ${className}`}>
    <svg viewBox="0 0 220 220" className="absolute inset-0 w-full h-full" fill="none">
      <polygon points="110,8 208,60 208,160 110,212 12,160 12,60" stroke={COLORS.gold} strokeWidth="1" opacity="0.6" />
      <polygon points="110,20 196,66 196,154 110,200 24,154 24,66" stroke={COLORS.gold} strokeWidth="0.5" opacity="0.3" />
    </svg>
    <div className="relative z-10 flex items-center justify-center w-full h-full">{children}</div>
  </div>
);

// ─── FADE-IN WRAPPER ───────────────────────────────────────────────────────────
const FadeIn = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ─── COUNTDOWN HOOK ────────────────────────────────────────────────────────────
function useCountdown(target) {
  const [time, setTime] = useState({ hari: 0, jam: 0, menit: 0, detik: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = new Date(target) - new Date();
      if (diff <= 0) { setTime({ hari: 0, jam: 0, menit: 0, detik: 0 }); return; }
      setTime({
        hari: Math.floor(diff / 86400000),
        jam: Math.floor((diff % 86400000) / 3600000),
        menit: Math.floor((diff % 3600000) / 60000),
        detik: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  return time;
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 1 — COVER
// ─────────────────────────────────────────────────────────────────────────────
function CoverSection({ onOpen }) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: COLORS.forest }}
    >
      <FloralCorner />
      <FloralCorner flip />

      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, ${COLORS.gold} 0, ${COLORS.gold} 1px, transparent 0, transparent 50%)`,
          backgroundSize: "20px 20px",
        }}
      />

      <motion.div
        className="relative z-10 text-center px-8 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <motion.p
          className="tracking-[0.35em] text-xs uppercase mb-8"
          style={{ color: COLORS.gold }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Wedding Invitation
        </motion.p>

        <motion.h1
          className="font-serif text-6xl md:text-8xl font-normal mb-3"
          style={{ color: COLORS.ivory }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9 }}
        >
          Raphael
        </motion.h1>

        <motion.p
          className="text-base tracking-[0.25em] mb-3"
          style={{ color: COLORS.gold }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          and
        </motion.p>

        <motion.h1
          className="font-serif text-6xl md:text-8xl font-normal mb-10"
          style={{ color: COLORS.ivory }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.9 }}
        >
          Seraphina
        </motion.h1>

        <motion.div
          className="mb-3"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          <div className="h-px w-32 mx-auto" style={{ background: COLORS.gold }} />
        </motion.div>

        <motion.p
          className="tracking-[0.2em] text-sm mb-2"
          style={{ color: COLORS.goldLight }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
        >
          30 April 2026
        </motion.p>

        <motion.div
          className="mt-12 flex flex-col items-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <p className="text-xs tracking-widest" style={{ color: COLORS.muted }}>Kepada Yth</p>
          <p className="font-serif text-xl" style={{ color: COLORS.ivory }}>Hartono</p>
        </motion.div>

        <motion.button
          onClick={onOpen}
          className="mt-12 px-10 py-3 border tracking-widest text-sm uppercase rounded-none"
          style={{ borderColor: COLORS.gold, color: COLORS.gold }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          whileHover={{ backgroundColor: COLORS.gold, color: COLORS.forest }}
          whileTap={{ scale: 0.97 }}
        >
          Open Invitation
        </motion.button>
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 2 — HERO (after open invitation)
// ─────────────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden"
      style={{ background: COLORS.ivory }}
    >
      <FloralCorner />
      <FloralCorner flip />

      <div className="relative z-10 flex flex-col items-center">
        <FadeIn>
          <p className="tracking-[0.4em] text-xs uppercase mb-8" style={{ color: COLORS.gold }}>
            Wedding Invitation
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="flex items-baseline justify-center gap-3 md:gap-5 mb-2">
            <h1 className="font-serif text-4xl md:text-6xl font-normal" style={{ color: COLORS.forest }}>
              Raphael
            </h1>
            <span className="text-sm tracking-widest" style={{ color: COLORS.gold }}>&amp;</span>
            <h1 className="font-serif text-4xl md:text-6xl font-normal" style={{ color: COLORS.forest }}>
              Seraphina
            </h1>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="tracking-[0.25em] text-xs mb-16" style={{ color: COLORS.muted }}>
            Saturday, 30 April 2026
          </p>
        </FadeIn>

        <FadeIn delay={0.35}>
          <div className="relative flex items-center justify-center">
            <svg viewBox="0 0 300 300" className="absolute w-64 md:w-80 opacity-20">
              <circle cx="150" cy="150" r="140" stroke={COLORS.gold} strokeWidth="1" fill="none" />
              <circle cx="150" cy="150" r="120" stroke={COLORS.gold} strokeWidth="0.5" fill="none" />
            </svg>
            <motion.p
              className="font-serif text-8xl md:text-[10rem] font-normal leading-none"
              style={{ color: COLORS.forest, letterSpacing: "0.05em" }}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            >
              RS
            </motion.p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 3 — THE WEDDING OF (Couple Details)
// ─────────────────────────────────────────────────────────────────────────────
function WeddingOfSection() {
  return (
    <section
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: COLORS.ivory }}
    >
      <div className="max-w-lg mx-auto text-center">
        <FadeIn>
          <p className="tracking-[0.35em] text-xs uppercase mb-3" style={{ color: COLORS.gold }}>Wedding Invitation</p>
          <h2 className="font-serif text-4xl md:text-5xl mb-2" style={{ color: COLORS.forest }}>The Wedding of</h2>
          <p className="text-sm tracking-widest" style={{ color: COLORS.muted }}>The pleasure of your company is requested</p>
        </FadeIn>

        <GoldDivider />

        <FadeIn delay={0.15}>
          <div className="flex items-start justify-center gap-6 md:gap-12 mt-8">
            {/* Groom */}
            <div className="flex-1 text-center">
              <GeometricFrame className="w-28 h-28 md:w-36 md:h-36 mx-auto mb-4">
                <span className="font-serif text-5xl md:text-6xl" style={{ color: COLORS.forest }}>R</span>
              </GeometricFrame>
              <p className="font-serif text-lg md:text-xl mb-1" style={{ color: COLORS.forest }}>Raphael Aldino Prasetyo</p>
              <p className="text-xs tracking-wide mb-1" style={{ color: COLORS.muted }}>Putra dari</p>
              <p className="text-sm" style={{ color: COLORS.text }}>Bapak Drs. Agus &amp; Ibu Rahmawati</p>
              <p className="text-xs mt-2" style={{ color: COLORS.gold }}>@raphael.aldino</p>
            </div>

            <div className="flex flex-col items-center justify-center pt-14">
              <div className="h-16 w-px" style={{ background: `linear-gradient(to bottom, transparent, ${COLORS.gold}, transparent)` }} />
              <span className="my-2 font-serif text-lg" style={{ color: COLORS.gold }}>&amp;</span>
              <div className="h-16 w-px" style={{ background: `linear-gradient(to bottom, transparent, ${COLORS.gold}, transparent)` }} />
            </div>

            {/* Bride */}
            <div className="flex-1 text-center">
              <GeometricFrame className="w-28 h-28 md:w-36 md:h-36 mx-auto mb-4">
                <span className="font-serif text-5xl md:text-6xl" style={{ color: COLORS.forest }}>S</span>
              </GeometricFrame>
              <p className="font-serif text-lg md:text-xl mb-1" style={{ color: COLORS.forest }}>Seraphina Laila Kirana</p>
              <p className="text-xs tracking-wide mb-1" style={{ color: COLORS.muted }}>Putri dari</p>
              <p className="text-sm" style={{ color: COLORS.text }}>Bapak Kirana Wijaya &amp; Ibu dr. Dewi Kusuma</p>
              <p className="text-xs mt-2" style={{ color: COLORS.gold }}>@raphael.aldino</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 3 — SAVE THE DATE (Countdown)
// ─────────────────────────────────────────────────────────────────────────────
function SaveTheDateSection() {
  const time = useCountdown("2026-04-30T08:00:00");

  const handleCalendar = () => {
    const url = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Wedding+Raphael+%26+Seraphina&dates=20260430T010000Z/20260430T060000Z&details=Wedding+Ceremony+%26+Reception&location=Taciro+Grand+Ballroom%2C+Jl.+Bambang+Utoyo+No.+118A%2C+Palembang";
    window.open(url, "_blank");
  };

  return (
    <section
      className="relative py-24 px-6 text-center overflow-hidden"
      style={{ background: COLORS.forest }}
    >
      <FloralCorner />
      <FloralCorner flip />

      <div className="relative z-10 max-w-lg mx-auto">
        <FadeIn>
          <p className="tracking-[0.35em] text-xs uppercase mb-4" style={{ color: COLORS.gold }}>Mark Your Calendar</p>
          <h2 className="font-serif text-4xl md:text-5xl mb-8" style={{ color: COLORS.ivory }}>Save The Date</h2>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="flex justify-center gap-6 md:gap-10 mb-10">
            {[
              { val: time.hari, label: "Hari" },
              { val: time.jam, label: "Jam" },
              { val: time.menit, label: "Menit" },
              { val: time.detik, label: "Detik" },
            ].map(({ val, label }) => (
              <div key={label} className="flex flex-col items-center">
                <div
                  className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center border mb-2"
                  style={{ borderColor: COLORS.gold, color: COLORS.ivory }}
                >
                  <span className="font-serif text-2xl md:text-3xl">{String(val).padStart(2, "0")}</span>
                </div>
                <span className="text-xs tracking-widest uppercase" style={{ color: COLORS.muted }}>{label}</span>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.25}>
          <motion.button
            onClick={handleCalendar}
            className="px-8 py-3 border tracking-widest text-sm uppercase"
            style={{ borderColor: COLORS.gold, color: COLORS.gold }}
            whileHover={{ backgroundColor: COLORS.gold, color: COLORS.forest }}
            whileTap={{ scale: 0.97 }}
          >
            Tambahkan Ke Kalender
          </motion.button>
        </FadeIn>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 4 — IT'S WEDDING DAY (Schedule & Location)
// ─────────────────────────────────────────────────────────────────────────────
function WeddingDaySection() {
  const handleMap = () => {
    window.open("https://maps.google.com/?q=Taciro+Grand+Ballroom+Palembang", "_blank");
  };

  return (
    <section
      className="py-24 px-6 text-center"
      style={{ background: COLORS.ivoryDark }}
    >
      <div className="max-w-lg mx-auto">
        <FadeIn>
          <p className="tracking-[0.35em] text-xs uppercase mb-3" style={{ color: COLORS.gold }}>We Are Getting Married</p>
          <h2 className="font-serif text-4xl md:text-5xl mb-3" style={{ color: COLORS.forest }}>It&apos;s Wedding Day</h2>
          <p className="text-sm leading-relaxed max-w-xs mx-auto" style={{ color: COLORS.muted }}>
            True love stands by each other&apos;s side on good days and stands closer on bad days
          </p>
        </FadeIn>

        <GoldDivider />

        <FadeIn delay={0.1}>
          <p className="font-serif text-2xl md:text-3xl mb-10" style={{ color: COLORS.forest }}>Saturday, 30 April 2026</p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="grid grid-cols-2 gap-4 mb-10">
            {[
              { title: "Akad Nikah", time: "08:00 - Selesai" },
              { title: "Resepsi", time: "10:00 - Selesai" },
            ].map(({ title, time }) => (
              <div
                key={title}
                className="py-6 px-4 border"
                style={{ borderColor: COLORS.gold + "60", background: COLORS.ivory }}
              >
                <p className="font-serif text-xl mb-1" style={{ color: COLORS.forest }}>{title}</p>
                <div className="h-px w-10 mx-auto my-2" style={{ background: COLORS.gold }} />
                <p className="text-xs tracking-wider" style={{ color: COLORS.muted }}>{time}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <p className="tracking-widest text-xs uppercase mb-3" style={{ color: COLORS.muted }}>Lokasi</p>
          <h3 className="font-serif text-2xl mb-1" style={{ color: COLORS.forest }}>Taciro Grand Ballroom</h3>
          <p className="text-sm mb-6" style={{ color: COLORS.muted }}>
            Jl. Bambang Utoyo No. 118A, Palembang, Sumatera Selatan
          </p>
          <motion.button
            onClick={handleMap}
            className="px-8 py-3 border tracking-widest text-sm uppercase"
            style={{ borderColor: COLORS.forest, color: COLORS.forest }}
            whileHover={{ backgroundColor: COLORS.forest, color: COLORS.ivory }}
            whileTap={{ scale: 0.97 }}
          >
            Lihat Peta
          </motion.button>
        </FadeIn>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 5 — WEDDING GIFT
// ─────────────────────────────────────────────────────────────────────────────
function WeddingGiftSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("1234567890").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section
      className="py-24 px-6 text-center"
      style={{ background: COLORS.forest }}
    >
      <div className="max-w-md mx-auto">
        <FadeIn>
          <p className="tracking-[0.35em] text-xs uppercase mb-3" style={{ color: COLORS.gold }}>With Love</p>
          <h2 className="font-serif text-4xl md:text-5xl mb-4" style={{ color: COLORS.ivory }}>Wedding Gift</h2>
          <p className="text-sm leading-relaxed" style={{ color: COLORS.muted }}>
            Tanpa mengurangi rasa hormat, apabila Bapak/Ibu/Saudara/i berkeinginan memberikan tanda kasih, kami persilahkan untuk menyampaikannya melalui nomor rekening berikut
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div
            className="mt-8 p-6 border text-left"
            style={{ borderColor: COLORS.gold + "40", background: "rgba(255,255,255,0.04)" }}
          >
            <p className="text-xs tracking-widest uppercase mb-3" style={{ color: COLORS.gold }}>Muamalat</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-serif text-2xl tracking-widest mb-1" style={{ color: COLORS.ivory }}>1234 5678 90</p>
                <p className="text-xs" style={{ color: COLORS.muted }}>Raphael Aldino P.</p>
              </div>
              <motion.button
                onClick={handleCopy}
                className="px-4 py-2 text-xs tracking-widest uppercase border"
                style={{ borderColor: COLORS.gold, color: COLORS.gold }}
                whileHover={{ backgroundColor: COLORS.gold, color: COLORS.forest }}
                whileTap={{ scale: 0.96 }}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={copied ? "ok" : "copy"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {copied ? "Disalin ✓" : "Salin"}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 6 — CLOSING / FOOTER
// ─────────────────────────────────────────────────────────────────────────────
function ClosingSection() {
  return (
    <section
      className="py-20 px-6 text-center"
      style={{ background: COLORS.ivoryDark }}
    >
      <div className="max-w-md mx-auto">
        <FadeIn>
          <svg viewBox="0 0 120 60" className="w-24 mx-auto mb-6 opacity-60">
            <path d="M60 50 Q10 20 60 5 Q110 20 60 50Z" fill={COLORS.gold} opacity="0.4" />
            <path d="M60 50 Q10 30 20 5 Q60 25 60 50Z" fill={COLORS.forest} opacity="0.3" />
            <path d="M60 50 Q110 30 100 5 Q60 25 60 50Z" fill={COLORS.forest} opacity="0.3" />
          </svg>
          <p className="font-serif text-xl mb-1" style={{ color: COLORS.forest }}>Rizky dan Herni</p>
          <p className="text-xs tracking-widest" style={{ color: COLORS.muted }}>Saturday, 16 April 2026</p>
          <div className="mt-8 pt-8 border-t" style={{ borderColor: COLORS.gold + "30" }}>
            <p className="text-xs tracking-widest uppercase mb-1" style={{ color: COLORS.muted }}>Powered By</p>
            <p className="font-serif text-lg" style={{ color: COLORS.forest }}>MuRu</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT EXPORT
// ─────────────────────────────────────────────────────────────────────────────
export default function GreenNewInvitation() {
  const [opened, setOpened] = useState(false);

  return (
    <div className="font-sans min-h-screen" style={{ color: COLORS.text }}>
      <AnimatePresence>
        {!opened ? (
          <motion.div
            key="cover"
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.6 }}
          >
            <CoverSection onOpen={() => setOpened(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <HeroSection />
            <WeddingOfSection />
            <SaveTheDateSection />
            <WeddingDaySection />
            <WeddingGiftSection />
            <ClosingSection />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
