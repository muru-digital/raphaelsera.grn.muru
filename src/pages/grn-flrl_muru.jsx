import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { BsInstagram } from "react-icons/bs";
import { GiLoveHowl, GiLoveMystery, GiRing } from "react-icons/gi";
import { HiMapPin } from "react-icons/hi2";
import { FiCheck, FiCopy } from "react-icons/fi";
import { BiArch, BiSolidArch } from "react-icons/bi";
import { GrArchlinux } from "react-icons/gr";

// ─── CONSTANTS ─────────────────────────────────────────────────────────────────
const WEDDING_DATE = new Date("2026-07-17T08:00:00");
const akad_date = "Sabtu, 17 Juli 2025"

const GROOM = {
  initial: "R",
  fullName: "Raphael Aldino",
  parents: "Bapak Drs. Agus & Ibu Rahmawati",
  instagram: "@raphael.aldino",
  label: "Putra dari",
};

const BRIDE = {
  initial: "S",
  fullName: "Seraphina Kirana",
  parents: "Bapak Kirana Wijaya & Ibu dr. Dewi Kusuma",
  instagram: "@raphael.aldino",
  label: "Putri dari",
};

// ─── DECORATIVE SVG ELEMENTS ──────────────────────────────────────────────────
const FloralCornerTL = () => (
  <svg viewBox="0 0 160 160" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="30" r="18" fill="#1a3a2a" stroke="#b8972e" strokeWidth="1.5" />
    <circle cx="30" cy="30" r="9" fill="#b8972e" opacity="0.6" />
    <ellipse cx="55" cy="20" rx="12" ry="7" fill="#1a3a2a" stroke="#b8972e" strokeWidth="1" transform="rotate(-30 55 20)" />
    <ellipse cx="20" cy="55" rx="12" ry="7" fill="#1a3a2a" stroke="#b8972e" strokeWidth="1" transform="rotate(60 20 55)" />
    <ellipse cx="75" cy="35" rx="9" ry="5" fill="#2d5a3d" stroke="#b8972e" strokeWidth="1" transform="rotate(-15 75 35)" />
    <ellipse cx="35" cy="75" rx="9" ry="5" fill="#2d5a3d" stroke="#b8972e" strokeWidth="1" transform="rotate(75 35 75)" />
    <path d="M5 5 Q40 20 60 60" stroke="#b8972e" strokeWidth="1" strokeDasharray="3,4" fill="none" opacity="0.5" />
    <circle cx="80" cy="15" r="3" fill="#e8c86d" opacity="0.7" />
    <circle cx="15" cy="80" r="3" fill="#e8c86d" opacity="0.7" />
    <circle cx="95" cy="40" r="2" fill="#e8c86d" opacity="0.5" />
    <circle cx="40" cy="95" r="2" fill="#e8c86d" opacity="0.5" />
    <ellipse cx="110" cy="25" rx="8" ry="4" fill="#1a3a2a" stroke="#b8972e" strokeWidth="0.8" transform="rotate(-45 110 25)" />
    <ellipse cx="25" cy="110" rx="8" ry="4" fill="#1a3a2a" stroke="#b8972e" strokeWidth="0.8" transform="rotate(45 25 110)" />
    <circle cx="120" cy="45" r="5" fill="#1a3a2a" stroke="#b8972e" strokeWidth="1" />
    <circle cx="45" cy="120" r="5" fill="#1a3a2a" stroke="#b8972e" strokeWidth="1" />
  </svg>
);

const FloralCornerBR = () => (
  <svg viewBox="0 0 160 160" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: "rotate(180deg)" }}>
    <circle cx="30" cy="30" r="18" fill="#1a3a2a" stroke="#b8972e" strokeWidth="1.5" />
    <circle cx="30" cy="30" r="9" fill="#b8972e" opacity="0.6" />
    <ellipse cx="55" cy="20" rx="12" ry="7" fill="#1a3a2a" stroke="#b8972e" strokeWidth="1" transform="rotate(-30 55 20)" />
    <ellipse cx="20" cy="55" rx="12" ry="7" fill="#1a3a2a" stroke="#b8972e" strokeWidth="1" transform="rotate(60 20 55)" />
    <ellipse cx="75" cy="35" rx="9" ry="5" fill="#2d5a3d" stroke="#b8972e" strokeWidth="1" transform="rotate(-15 75 35)" />
    <ellipse cx="35" cy="75" rx="9" ry="5" fill="#2d5a3d" stroke="#b8972e" strokeWidth="1" transform="rotate(75 35 75)" />
    <path d="M5 5 Q40 20 60 60" stroke="#b8972e" strokeWidth="1" strokeDasharray="3,4" fill="none" opacity="0.5" />
    <circle cx="80" cy="15" r="3" fill="#e8c86d" opacity="0.7" />
    <circle cx="15" cy="80" r="3" fill="#e8c86d" opacity="0.7" />
    <circle cx="95" cy="40" r="2" fill="#e8c86d" opacity="0.5" />
    <circle cx="40" cy="95" r="2" fill="#e8c86d" opacity="0.5" />
    <ellipse cx="110" cy="25" rx="8" ry="4" fill="#1a3a2a" stroke="#b8972e" strokeWidth="0.8" transform="rotate(-45 110 25)" />
    <ellipse cx="25" cy="110" rx="8" ry="4" fill="#1a3a2a" stroke="#b8972e" strokeWidth="0.8" transform="rotate(45 25 110)" />
    <circle cx="120" cy="45" r="5" fill="#1a3a2a" stroke="#b8972e" strokeWidth="1" />
    <circle cx="45" cy="120" r="5" fill="#1a3a2a" stroke="#b8972e" strokeWidth="1" />
  </svg>
);

const GoldDivider = () => (

  <div className="flex items-center justify-center gap-3 my-1">
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ delay: 1.2, duration: 0.8 }}
      className="h-px w-32 mx-auto  bg-gradient-to-r from-transparent via-gold to-transparent" />
  </div>


);

function GoldLine() {
  return (
    <div className="flex items-center justify-center gap-3 my-6">
      <div className="h-px bg-gradient-to-r from-transparent to-yellow-600/60 w-16 sm:w-24" />
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 1 L11.5 8.5 L19 10 L11.5 11.5 L10 19 L8.5 11.5 L1 10 L8.5 8.5 Z" fill="#b8972e" opacity="0.8" />
      </svg>
      <div className="h-px bg-gradient-to-l from-transparent to-yellow-600/60 w-16 sm:w-24" />
    </div>
  )
}

// ─── FADE IN SECTION WRAPPER ──────────────────────────────────────────────────
const FadeSection = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}>
      {children}
    </motion.div>
  );
};

// ─── SECTION: COVER ──────────────────────────────────────────────────────────
const CoverSection = ({ onOpen }) => (
  <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0d2218] px-6">

    {/* Noise texture overlay */}
    <div className="absolute inset-0 opacity-20"
      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")` }} />

    {/* Radial glow */}
    <div className="absolute inset-0 bg-radial-[ellipse_at_center] from-[#1a3a2a]/60 via-transparent to-transparent" />

    {/* Top-left floral */}
    <div className="absolute top-0 left-0 w-36 sm:w-52 h-36 sm:h-52 opacity-90">
      <FloralCornerTL />
    </div>

    {/* Bottom-right floral */}
    <div className="absolute bottom-0 right-0 w-36 sm:w-52 h-36 sm:h-52 opacity-90">
      <FloralCornerBR />
    </div>

    {/* Gold border frame */}
    <div className="absolute inset-4 sm:inset-8 border border-yellow-700/30 pointer-events-none" />
    <div className="absolute inset-5 sm:inset-9 border border-yellow-700/15 pointer-events-none" />

    <div className="relative z-10 text-center">
      <motion.p
        initial={{ opacity: 0, letterSpacing: "0.4em" }}
        animate={{ opacity: 1, letterSpacing: "0.3em" }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="text-yellow-500/70 text-xs sm:text-lg lg:text-xs uppercase tracking-[0.3em] mb-5">
        Wedding Invitation
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.5 }}
        className="text-white text-4xl md:text-6xl font-flowmery leading-none mb-2">
        Raphael
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="text-yellow-500/80 text-sm sm:text-lg font-flowmery mt-8 mb-3">
        &
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 1.1 }}
        className="text-white text-4xl md:text-6xl font-flowmery leading-none mb-10">
        Seraphina
      </motion.h1>

      <div className="mt-12 mb-24 sm:mt-14 lg:mt-8 lg:mb-8">
        <GoldDivider />
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="text-yellow-100/50 text-sm sm:text-xl lg:text-sm font-serif mb-1">
        Kepada Yth
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.7 }}
        className="text-yellow-100/80 text-lg sm:text-xl lg:text-sm mb-6 font-serif" >
        Hartono
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.0 }}
        whileTap={{ scale: 0.97 }}
        onClick={onOpen}
        className="bg-yellow-600 text-[#123021] font-medium rounded-lg px-12 py-3 hover:bg-yellow-700/90 hover:shadow-xl text-sm sm:text-xl lg:text-sm w-full transition-colors duration-300 cursor-pointer">
        {/* bg-yellow-600 text-[#123021] rounded-xl */}
        Buka Undangan
      </motion.button>
    </div>
  </div>
);

// ─── SECTION: HERO ─────────────────────────────────────────────────────────────
const HeroSection = () => (
  <section className="relative bg-[#0d2218] py-32 sm:py-24 lg:py-16 px-6 overflow-hidden">

    <div className="absolute top-0 left-0 w-28 sm:w-40 h-28 sm:h-40 opacity-60"><FloralCornerTL /></div>
    <div className="absolute bottom-0 right-0 w-28 sm:w-40 h-28 sm:h-40 opacity-60"><FloralCornerBR /></div>

    <FadeSection className="text-center px-6">

      <p className="text-yellow-500/70 text-xs sm:text-lg lg:text-xs uppercase tracking-[0.3em] mb-7 sm:mb-9 lg:mb-5">Wedding Invitation</p>

      <div className="flex items-baseline justify-center gap-2 sm:gap-5 mb-4 sm:mb-2">
        <h2 className="text-white text-[32px] sm:text-6xl font-flowmery">Raphael</h2>
        <span className="text-yellow-500 text-lg sm:text-2xl font-flowmery">&</span>
        <h2 className="text-white text-[32px] sm:text-6xl font-flowmery">Seraphina</h2>
      </div>

      <p className="text-yellow-400/50 text-xs sm:text-sm tracking-widest mt-1 sm:mt-9 lg:mt-9">{akad_date}</p>

      <div className="mt-12 mb-24 sm:mt-14 lg:mt-8 lg:mb-16">
        <GoldDivider />
      </div>

      {/* Monogram */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto w-36 h-36 rounded-full flex flex-col items-center justify-center mt-4">
        <p className="text-[66px] text-gold font-flowmery w-24 flex justify-start">R</p>
        <p className="text-[66px] text-gold font-flowmery -mt-9 w-24 flex justify-end">S</p>
      </motion.div>
    </FadeSection>
  </section>
);

// ─── SECTION: THE WEDDING OF ──────────────────────────────────────────────────
const WeddingOfSection = () => (
  <section className="bg-[#0a1c12] py-16  relative">
    <div className="absolute inset-0 opacity-5"
      style={{ backgroundImage: `repeating-linear-gradient(45deg, #b8972e 0, #b8972e 1px, transparent 0, transparent 50%)`, backgroundSize: "20px 20px" }} />

    <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
      <FadeSection>

        <p className="text-yellow-500/60 text-[32px] lg:text-4xl mb-4 font-flowmery">The Wedding of</p>
        <p className="text-yellow-100/40 text-xs sm:text-sm italic font-serif mb-12">The pleasure of your company is requested</p>

        <div className="mt-12 mb-24 sm:mt-14 lg:mt-8 lg:mb-16">
          <GoldDivider />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 sm:gap-8 items-start">
          {/* Groom */}
          <div className="flex flex-col items-center justify-center">
            <div className="text-yellow-500 text-5xl sm:text-7xl font-flowmery mb-4">{GROOM.initial}</div>

            <h3 className="text-2xl font-flowmery text-white">{GROOM.fullName.split(" ")[0]}</h3>
            <p className="text-sm mt-2 text-[#9A9A9A]">{GROOM.fullName.split(" ").slice(1).join(" ")}</p>

            <p className="text-yellow-100/40 text-xs mt-2">{GROOM.label}</p>
            <p className="text-yellow-100/60 text-xs sm:text-sm mt-1">{GROOM.parents}</p>
            <p className="text-yellow-600/60 text-xs mt-3 flex items-center gap-1"><BsInstagram />{GROOM.instagram}</p>
          </div>

          {/* Bride */}
          <div className="flex flex-col items-center justify-center">
            <div className="text-yellow-500 text-5xl sm:text-7xl font-flowmery mb-4">{BRIDE.initial}</div>

            <h3 className="text-2xl font-flowmery text-white">{BRIDE.fullName.split(" ")[0]}</h3>
            <p className="text-sm mt-2 text-[#9A9A9A]">{BRIDE.fullName.split(" ").slice(1).join(" ")}</p>
            


            <p className="text-yellow-100/40 text-xs mt-2">{BRIDE.label}</p>
            <p className="text-yellow-100/60 text-xs sm:text-sm mt-1">{BRIDE.parents}</p>
            <p className="text-yellow-600/60 text-xs mt-3 flex items-center gap-1"><BsInstagram />{BRIDE.instagram}</p>
          </div>
        </div>

      </FadeSection>
    </div>

  </section>
);

// ─── SECTION: SAVE THE DATE / COUNTDOWN ──────────────────────────────────────
const useCountdown = (target) => {
  const calc = () => {
    const diff = target - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
};

const CountUnit = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <div className="w-16 sm:w-20 h-16 sm:h-20 border border-yellow-700/40 rounded-lg flex items-center justify-center mb-2 bg-[#0a1c12]/50 backdrop-blur-sm">
      <span className="text-3xl sm:text-4xl text-yellow-400">{String(value).padStart(2, "0")}</span>
    </div>
    <span className="text-yellow-600/60 text-xs tracking-widest ">{label}</span>
  </div>
);

const SaveTheDateSection = () => {
  const { days, hours, minutes, seconds } = useCountdown(WEDDING_DATE);

  const calUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Pernikahan+Raphael+%26+Seraphina&dates=20260430T010000Z/20260430T060000Z&details=Akad+Nikah+%26+Resepsi&location=Taciro+Grand+Ballroom`;

  return (
    <section className="bg-[#0d2218] py-16 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 sm:w-36 h-24 sm:h-36 opacity-40" style={{ transform: "rotate(90deg)" }}><FloralCornerTL /></div>
      <div className="absolute bottom-0 left-0 w-24 sm:w-36 h-24 sm:h-36 opacity-40" style={{ transform: "rotate(270deg)" }}><FloralCornerTL /></div>

      <FadeSection className="text-center px-6 relative z-10">
        <p className="text-yellow-500/60 text-[32px] lg:text-4xl font-flowmery">Save The Date</p>

        <div className="mt-12 mb-24 sm:mt-14 lg:mt-8 lg:mb-16">
          <GoldDivider />
        </div>

        <div className="flex justify-center gap-3 sm:gap-5 mb-10">
          <CountUnit value={days} label="Hari" />
          <CountUnit value={hours} label="Jam" />
          <CountUnit value={minutes} label="Menit" />
          <CountUnit value={seconds} label="Detik" />
        </div>

        <a
          href={calUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-yellow-600 font-medium rounded-lg px-8 sm:px-12 py-3 text-xs sm:text-sm text-[#123021] hover:bg-yellow-700/90 hover:shadow-xl transition-colors duration-300" >
          Tambahkan Ke Kalender
        </a>

      </FadeSection>
    </section>
  );
};

// ─── SECTION: WEDDING DAY / SCHEDULE ─────────────────────────────────────────
const WeddingDaySection = () => (
  <section className="bg-[#0a1c12] py-16">
    <FadeSection className="text-center px-6 max-w-xl mx-auto">
      <p className="text-yellow-500/60 text-[32px] lg:text-4xl mb-5 font-flowmery">It's Wedding Day</p>

      <p className="text-yellow-100/40 text-xs sm:text-sm italic font-serif mb-2 leading-relaxed">
        True love stands by each other's side on<br />good days and stands closer on bad days
      </p>

      <div className="mt-12 mb-24 sm:mt-14 lg:mt-8 lg:mb-16">
        <GoldDivider />
      </div>

      <h3 className="text-white font-serif mb-12 text-2xl">{akad_date}</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        <div className="border border-yellow-700/30 p-6 sm:p-8 text-center">
          <div className="text-yellow-600 text-3xl mb-3"><GiRing className="mx-auto text-3xl" /></div>
          <h4 className="text-yellow-400 font-flowmery text-lg sm:text-xl mb-3">Akad Nikah</h4>
          <p className="text-yellow-100/50 text-xs sm:text-sm">08:00 - Selesai</p>
        </div>
        <div className="border border-yellow-700/30 p-6 sm:p-8 text-center">
          <div className="flex justify-center mb-3"><img src="grn.png" alt="" className=" w-8" /></div>

          {/* <GiLoveMystery className="mx-auto text-3xl" /> */}
          <h4 className="text-yellow-400 font-flowmery text-lg sm:text-xl mb-3">Resepsi</h4>
          <p className="text-yellow-100/50 text-xs sm:text-sm">10:00 - Selesai</p>
        </div>
      </div>

      {/* <p className="text-yellow-500/50 text-xs tracking-widest uppercase mb-3">Lokasi</p> */}
      <HiMapPin className="text-3xl mx-auto mb-2 text-yellow-600" />
      <h4 className="text-white font-serif text-xl sm:text-2xl mb-2">Taciro Grand Ballroom</h4>
      <p className="text-yellow-100/50 text-xs sm:text-sm mb-8 font-serif">Jl. Bambang Utoyo No. 118A, Palembang, Sumatera Selatan</p>

      <a
        href="https://maps.google.com/?q=Taciro+Grand+Ballroom+Palembang"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-yellow-600 font-medium text-[#123021] hover:bg-yellow-700/90 hover:shadow-xl px-8 sm:px-12 py-3 rounded-lg text-xs sm:text-sm transition-colors duration-300" >
        Lihat Peta
      </a>
    </FadeSection>
  </section>
);

// ─── SECTION: WEDDING GIFT ────────────────────────────────────────────────────
const WeddingGiftSection = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("1234567890");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="bg-[#0d2218] py-16 ">
      <FadeSection className="text-center px-6 max-w-lg mx-auto">
        <p className="text-yellow-500/60 text-[32px] lg:text-4xl mb-5 font-flowmery">Wedding Gift</p>

        <p className="text-yellow-100/40 text-xs sm:text-sm italic font-serif leading-relaxed mb-10">
          Tanpa mengurangi rasa hormat, apabila Bapak/Ibu/Saudara/i<br className="hidden sm:block" />
          berkeinginan memberikan tanda kasih, kami persilahkan<br className="hidden sm:block" />
          untuk menyampiakannya melalui nomor rekening berikut
        </p>

        <div className="mt-12 mb-24 sm:mt-14 lg:mt-8 lg:mb-16">
          <GoldDivider />
        </div>

        <div className="border border-yellow-700/40 p-6 sm:p-8 text-left bg-[#0a1c12]/60 rounded-lg">
          <p className="text-yellow-600 text-xs mb-2 tracking-wider">Muamalat</p>
          <div className="flex items-center justify-between gap-4">
            
            <div>
              <p className="text-white font-serif text-lg lg:text-2xl tracking-wider">1234 5678 90</p>
              <p className="text-yellow-100/50 text-xs mt-1">Raphael Aldino</p>
            </div>

            <motion.button
              whileTap={{ scale: 0.93 }}
              onClick={handleCopy}
              className="border border-yellow-600/50 text-yellow-600 rounded-md px-4 py-2 text-xs hover:bg-yellow-700/20 transition-colors duration-300 cursor-pointer whitespace-nowrap" >
              <AnimatePresence mode="wait">
                <motion.span
                  key={copied ? "copied" : "salin"}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="block">
                  {copied ? (
                    <div className="flex items-center justify-center gap-1">
                      <FiCheck size={12} /> <p> Tersalin</p>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-1">
                      <FiCopy size={12} /> <p> Salin</p>
                    </div>)}
                </motion.span>
              </AnimatePresence>
            </motion.button>

          </div>
        </div>
      </FadeSection>
    </section>
  );
};

// ─── SECTION: FOOTER ──────────────────────────────────────────────────────────
const FooterSection = () => (
  <section className="bg-[#0a1c12]  pt-16 pb-11 relative overflow-hidden">
    <div className="absolute inset-0 opacity-10"
      style={{ backgroundImage: `repeating-linear-gradient(45deg, #b8972e 0, #b8972e 1px, transparent 0, transparent 50%)`, backgroundSize: "20px 20px" }}/>
    
    <FadeSection className="text-center px-6 relative z-10">

      <div className=" mb-24 lg:mb-16">
        <GoldDivider />
      </div>

      <p className="text-yellow-100/60 text-3xl font-flowmery mb-4">Raphael & Seraphina</p>
      <p className="text-yellow-100/30 text-xs mb-10">{akad_date}</p>

      <div className="h-px w-10 mx-auto mb-4" style={{ background: "rgba(184,149,42,0.35)" }} />

      <div className=" ">
        <p className="text-yellow-100/20 text-xs mb-1">Powered By</p>
        <p className="text-yellow-600/60 text-sm">MuRu</p>
      </div>

    </FadeSection>
  </section>
);

// ─── ROOT EXPORT ──────────────────────────────────────────────────────────────
export default function GrnFlrlMuru() {
  const [opened, setOpened] = useState(false);

  return (
    <div className="min-h-screen bg-[#0d2218]">
      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div
            key="cover"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            <CoverSection onOpen={() => setOpened(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9 }}>
            <HeroSection />
            <WeddingOfSection />
            <SaveTheDateSection />
            <WeddingDaySection />
            <WeddingGiftSection />
            <FooterSection />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
