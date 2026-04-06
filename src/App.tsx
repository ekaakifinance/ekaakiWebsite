import { useState, useEffect, useRef } from "react";

const loanTypes = [
  "Home Loan",
  "Personal Loan",
  "Business Loan",
  "Car Loan",
  "Education Loan",
  "Gold Loan",
  "Loan Against Property",
  "Two-Wheeler Loan",
];

const services = [
  {
    icon: "🏠",
    title: "Home Loan",
    desc: "Fulfill your dream of owning a home with our competitive interest rates and flexible repayment options.",
    rate: "8.5% p.a.",
  },
  {
    icon: "💼",
    title: "Business Loan",
    desc: "Scale your business with fast disbursals, minimal documentation, and tailored financial solutions.",
    rate: "11% p.a.",
  },
  {
    icon: "🚗",
    title: "Car Loan",
    desc: "Drive your dream car today. Quick approvals with up to 100% on-road funding available.",
    rate: "9.2% p.a.",
  },
  {
    icon: "🎓",
    title: "Education Loan",
    desc: "Invest in your future. We fund top institutions across India and abroad with moratorium flexibility.",
    rate: "10% p.a.",
  },
  {
    icon: "👤",
    title: "Personal Loan",
    desc: "Instant funds for any personal need. No collateral required, doorstep service available.",
    rate: "12% p.a.",
  },
  {
    icon: "🏗️",
    title: "Loan Against Property",
    desc: "Unlock the value of your property. Highest amounts at lowest rates with long tenure options.",
    rate: "10.5% p.a.",
  },
];

const stats = [
  { value: "₹500Cr+", label: "Loans Disbursed" },
  { value: "15,000+", label: "Happy Clients" },
  { value: "50+", label: "Banking Partners" },
  { value: "98%", label: "Approval Rate" },
];

const testimonials = [
  {
    name: "Ramesh Gupta",
    role: "Business Owner, Bhopal",
    text: "Ekaaki Finance made my business loan process incredibly smooth. Got funds within 3 days!",
    avatar: "R",
  },
  {
    name: "Priya Sharma",
    role: "Software Engineer, Indore",
    text: "Home loan at best rates. The team guided me through every step. Highly recommend!",
    avatar: "P",
  },
  {
    name: "Arjun Mehta",
    role: "Doctor, Bhopal",
    text: "Professional, transparent, and genuinely helpful. Best financial partner in Madhya Pradesh.",
    avatar: "A",
  },
];

function App() {
  const [form, setForm] = useState({ name: "", contact: "", email: "", loanType: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.contact.trim()) e.contact = "Contact number is required";
    else if (!/^[6-9]\d{9}$/.test(form.contact)) e.contact = "Enter a valid 10-digit mobile number";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address";
    if (!form.loanType) e.loanType = "Please select a loan type";
    return e;
  };

  // ✅ UPDATED: handleSubmit now sends data to Netlify Forms
  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSubmitting(true);
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": "loan-inquiry",
          name: form.name,
          contact: form.contact,
          email: form.email,
          loanType: form.loanType,
        }).toString(),
      });
      setSubmitted(true);
    } catch (err) {
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const styles = {
    root: {
      fontFamily: "'Playfair Display', 'Georgia', serif",
      background: "#0a0000",
      color: "#f5e6d3",
      minHeight: "100vh",
      overflowX: "hidden" as const,
    },

    nav: {
      position: "fixed" as const, top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(10,0,0,0.97)" : "transparent",
      borderBottom: scrolled ? "1px solid rgba(180,30,30,0.3)" : "none",
      transition: "all 0.4s ease",
      padding: "0 5%",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      height: 72,
      backdropFilter: scrolled ? "blur(16px)" : "none",
    },
    navLogo: {
      display: "flex", alignItems: "center", gap: 12,
    },
    navLogoCircle: {
      width: 44, height: 44, borderRadius: "50%",
      background: "linear-gradient(135deg, #b81c1c, #7a0000)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 20,
      color: "#fff", border: "2px solid rgba(255,120,0,0.4)",
      boxShadow: "0 0 20px rgba(180,30,30,0.5)",
    },
    navBrand: {
      fontFamily: "'Cinzel', 'Playfair Display', serif",
      fontSize: 15, letterSpacing: "0.2em", color: "#f5e6d3",
      textTransform: "uppercase" as const,
    },
    navBrandSub: {
      fontSize: 10, color: "#cc4400", letterSpacing: "0.3em",
    },
    navLinks: {
      display: "flex", gap: 36, listStyle: "none", margin: 0, padding: 0,
    },
    navLink: {
      fontFamily: "'Cormorant Garamond', serif", fontSize: 14,
      letterSpacing: "0.12em", color: "#c9a87c", cursor: "pointer",
      textTransform: "uppercase" as const, textDecoration: "none",
      transition: "color 0.3s",
    },
    navCta: {
      background: "linear-gradient(135deg, #b81c1c, #7a0000)",
      color: "#fff", border: "none", padding: "10px 24px",
      fontFamily: "'Cormorant Garamond', serif", fontSize: 13,
      letterSpacing: "0.15em", textTransform: "uppercase" as const,
      cursor: "pointer", borderRadius: 2,
      boxShadow: "0 4px 20px rgba(180,30,30,0.4)",
      transition: "all 0.3s",
    },

    hero: {
      minHeight: "100vh",
      background: `
        radial-gradient(ellipse at 20% 50%, rgba(180,30,30,0.25) 0%, transparent 60%),
        radial-gradient(ellipse at 80% 20%, rgba(120,0,0,0.2) 0%, transparent 50%),
        linear-gradient(180deg, #0a0000 0%, #150000 50%, #0a0000 100%)
      `,
      display: "flex", alignItems: "center",
      padding: "120px 5% 60px",
      position: "relative" as const, overflow: "hidden",
    },
    heroGlow: {
      position: "absolute" as const, top: "20%", left: "50%", transform: "translateX(-50%)",
      width: 600, height: 600, borderRadius: "50%",
      background: "radial-gradient(circle, rgba(180,30,30,0.08) 0%, transparent 70%)",
      pointerEvents: "none" as const,
    },
    heroDiya: {
      position: "absolute" as const, bottom: 0, right: "5%",
      fontSize: 180, opacity: 0.06, transform: "rotate(-15deg)",
      filter: "sepia(1) saturate(2)",
    },
    heroContent: { maxWidth: 680, position: "relative" as const, zIndex: 2 },
    heroTag: {
      display: "inline-flex", alignItems: "center", gap: 8,
      background: "rgba(180,30,30,0.15)", border: "1px solid rgba(180,30,30,0.35)",
      padding: "6px 18px", borderRadius: 100, marginBottom: 28,
      fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase" as const,
      color: "#ff6633", fontFamily: "'Cormorant Garamond', serif",
    },
    heroH1: {
      fontFamily: "'Playfair Display', serif",
      fontSize: "clamp(42px, 5vw, 72px)",
      lineHeight: 1.1, fontWeight: 700, marginBottom: 8,
      color: "#f5e6d3",
    },
    heroH1Accent: {
      background: "linear-gradient(90deg, #ff6633, #b81c1c, #ff9900)",
      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    heroSub: {
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: "clamp(16px, 2vw, 20px)", lineHeight: 1.7,
      color: "#c9a87c", marginBottom: 40, maxWidth: 520,
    },
    heroBtns: { display: "flex", gap: 16, flexWrap: "wrap" as const },
    btnPrimary: {
      background: "linear-gradient(135deg, #b81c1c 0%, #7a0000 100%)",
      color: "#fff", border: "none", padding: "16px 36px",
      fontFamily: "'Cormorant Garamond', serif", fontSize: 15,
      letterSpacing: "0.15em", textTransform: "uppercase" as const,
      cursor: "pointer", borderRadius: 2,
      boxShadow: "0 8px 32px rgba(180,30,30,0.45)",
      transition: "all 0.3s",
    },
    btnSecondary: {
      background: "transparent", color: "#c9a87c",
      border: "1px solid rgba(180,180,120,0.35)",
      padding: "16px 36px",
      fontFamily: "'Cormorant Garamond', serif", fontSize: 15,
      letterSpacing: "0.15em", textTransform: "uppercase" as const,
      cursor: "pointer", borderRadius: 2, transition: "all 0.3s",
    },

    statsBar: {
      background: "linear-gradient(90deg, #7a0000, #b81c1c, #7a0000)",
      padding: "28px 5%",
      display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
      gap: 0, textAlign: "center" as const,
    },
    statItem: { padding: "8px 0", borderRight: "1px solid rgba(255,255,255,0.15)" },
    statValue: {
      fontFamily: "'Playfair Display', serif",
      fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 700,
      color: "#fff", display: "block",
    },
    statLabel: {
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: 12, letterSpacing: "0.2em", color: "rgba(255,230,200,0.7)",
      textTransform: "uppercase" as const, display: "block", marginTop: 4,
    },

    section: { padding: "80px 5%" },
    sectionDark: { padding: "80px 5%", background: "#0d0000" },
    sectionTag: {
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: 12, letterSpacing: "0.3em", color: "#cc4400",
      textTransform: "uppercase" as const, display: "block", marginBottom: 12,
    },
    sectionH2: {
      fontFamily: "'Playfair Display', serif",
      fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700,
      color: "#f5e6d3", marginBottom: 16, lineHeight: 1.2,
    },
    sectionDesc: {
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: 17, color: "#c9a87c", lineHeight: 1.7, maxWidth: 560,
    },
    divider: {
      width: 60, height: 3, marginBottom: 20,
      background: "linear-gradient(90deg, #b81c1c, #ff6633)",
      borderRadius: 2,
    },

    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: 24, marginTop: 48,
    },
    card: {
      background: "linear-gradient(135deg, rgba(30,5,5,0.9), rgba(15,0,0,0.95))",
      border: "1px solid rgba(180,30,30,0.2)",
      borderRadius: 4, padding: 32,
      transition: "all 0.4s ease",
      cursor: "default" as const, position: "relative" as const, overflow: "hidden",
    },
    cardIcon: { fontSize: 36, marginBottom: 16, display: "block" },
    cardTitle: {
      fontFamily: "'Playfair Display', serif",
      fontSize: 20, fontWeight: 700, color: "#f5e6d3", marginBottom: 10,
    },
    cardDesc: {
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: 15, color: "#a08070", lineHeight: 1.65, marginBottom: 16,
    },
    cardRate: {
      display: "inline-block",
      background: "rgba(180,30,30,0.2)", border: "1px solid rgba(180,30,30,0.4)",
      padding: "4px 12px", borderRadius: 100,
      fontFamily: "'Cormorant Garamond', serif", fontSize: 13,
      color: "#ff6633", letterSpacing: "0.05em",
    },
    cardGlow: {
      position: "absolute" as const, top: -40, right: -40,
      width: 120, height: 120, borderRadius: "50%",
      background: "radial-gradient(circle, rgba(180,30,30,0.08) 0%, transparent 70%)",
    },

    formWrap: {
      maxWidth: 620, margin: "48px auto 0",
      background: "linear-gradient(135deg, rgba(20,3,3,0.95), rgba(12,0,0,0.98))",
      border: "1px solid rgba(180,30,30,0.3)",
      borderRadius: 6, padding: "48px 40px",
      boxShadow: "0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,100,50,0.1)",
      position: "relative" as const, overflow: "hidden",
    },
    formGlow: {
      position: "absolute" as const, top: -80, left: "50%", transform: "translateX(-50%)",
      width: 400, height: 200, borderRadius: "50%",
      background: "radial-gradient(ellipse, rgba(180,30,30,0.12) 0%, transparent 70%)",
      pointerEvents: "none" as const,
    },
    formTitle: {
      fontFamily: "'Playfair Display', serif",
      fontSize: 28, fontWeight: 700, color: "#f5e6d3",
      textAlign: "center" as const, marginBottom: 6,
    },
    formSub: {
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: 15, color: "#a08070", textAlign: "center" as const, marginBottom: 36,
    },
    formGroup: { marginBottom: 22 },
    label: {
      display: "block",
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase" as const,
      color: "#c9a87c", marginBottom: 8,
    },
    input: {
      width: "100%", boxSizing: "border-box" as const,
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(180,30,30,0.25)",
      borderRadius: 3, padding: "14px 16px",
      fontFamily: "'Cormorant Garamond', serif", fontSize: 16,
      color: "#f5e6d3", outline: "none",
      transition: "border-color 0.3s, box-shadow 0.3s",
    },
    select: {
      width: "100%", boxSizing: "border-box" as const,
      background: "rgba(10,0,0,0.9)",
      border: "1px solid rgba(180,30,30,0.25)",
      borderRadius: 3, padding: "14px 16px",
      fontFamily: "'Cormorant Garamond', serif", fontSize: 16,
      color: "#f5e6d3", outline: "none",
      cursor: "pointer", appearance: "none" as const,
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23cc4400' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
      backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center",
    },
    errorText: {
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: 13, color: "#ff4444", marginTop: 4,
    },
    submitBtn: {
      width: "100%", marginTop: 8,
      background: "linear-gradient(135deg, #b81c1c 0%, #7a0000 50%, #b81c1c 100%)",
      backgroundSize: "200% 100%",
      color: "#fff", border: "none", padding: "18px",
      fontFamily: "'Playfair Display', serif", fontSize: 16,
      letterSpacing: "0.2em", textTransform: "uppercase" as const,
      cursor: "pointer", borderRadius: 3,
      boxShadow: "0 8px 32px rgba(180,30,30,0.5)",
      transition: "all 0.3s",
    },
    successBox: {
      textAlign: "center" as const, padding: "40px 20px",
    },
    successIcon: { fontSize: 64, marginBottom: 20, display: "block" },
    successTitle: {
      fontFamily: "'Playfair Display', serif",
      fontSize: 28, color: "#f5e6d3", marginBottom: 10,
    },
    successMsg: {
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: 16, color: "#c9a87c", lineHeight: 1.7,
    },

    testimonialsGrid: {
      display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: 24, marginTop: 48,
    },
    tCard: {
      background: "rgba(20,3,3,0.8)",
      border: "1px solid rgba(180,30,30,0.15)",
      borderRadius: 4, padding: 28,
    },
    tQuote: {
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: 16, color: "#c9a87c", lineHeight: 1.7,
      marginBottom: 20, fontStyle: "italic" as const,
    },
    tAuthor: { display: "flex", alignItems: "center", gap: 12 },
    tAvatar: {
      width: 44, height: 44, borderRadius: "50%",
      background: "linear-gradient(135deg, #b81c1c, #7a0000)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'Playfair Display', serif", fontWeight: 700,
      fontSize: 18, color: "#fff",
      border: "2px solid rgba(255,100,50,0.3)",
    },
    tName: {
      fontFamily: "'Playfair Display', serif",
      fontSize: 15, fontWeight: 700, color: "#f5e6d3",
    },
    tRole: {
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: 13, color: "#804030",
    },

    footer: {
      background: "#050000",
      borderTop: "1px solid rgba(180,30,30,0.2)",
      padding: "40px 5% 24px",
    },
    footerGrid: {
      display: "grid", gridTemplateColumns: "2fr 1fr 1fr",
      gap: 48, marginBottom: 36,
    },
    footerBrand: {
      fontFamily: "'Playfair Display', serif", fontSize: 20,
      fontWeight: 700, color: "#f5e6d3", marginBottom: 12,
    },
    footerDesc: {
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: 14, color: "#804030", lineHeight: 1.7,
    },
    footerH: {
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase" as const,
      color: "#cc4400", marginBottom: 16,
    },
    footerLink: {
      display: "block",
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: 14, color: "#7a5040", marginBottom: 8, cursor: "pointer",
      textDecoration: "none", transition: "color 0.2s",
    },
    footerBottom: {
      borderTop: "1px solid rgba(80,10,10,0.4)", paddingTop: 20,
      display: "flex", justifyContent: "space-between", alignItems: "center",
    },
    footerCopy: {
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: 12, color: "#4a2020", letterSpacing: "0.05em",
    },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Cinzel:wght@400;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: #0a0000; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0000; }
        ::-webkit-scrollbar-thumb { background: #7a0000; border-radius: 2px; }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(180,30,30,0.3); }
          50% { box-shadow: 0 0 40px rgba(180,30,30,0.6); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .hero-content > * { animation: fadeInUp 0.8s ease forwards; opacity: 0; }
        .hero-content > *:nth-child(1) { animation-delay: 0.1s; }
        .hero-content > *:nth-child(2) { animation-delay: 0.25s; }
        .hero-content > *:nth-child(3) { animation-delay: 0.4s; }
        .hero-content > *:nth-child(4) { animation-delay: 0.55s; }
        .logo-circle { animation: pulse-glow 3s ease-in-out infinite; }
        .card:hover {
          border-color: rgba(180,30,30,0.5) !important;
          transform: translateY(-4px);
          box-shadow: 0 20px 60px rgba(180,30,30,0.15);
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(180,30,30,0.6) !important;
        }
        .btn-secondary:hover {
          background: rgba(180,30,30,0.1) !important;
          border-color: rgba(180,30,30,0.5) !important;
          color: #f5e6d3 !important;
        }
        .nav-link:hover { color: #ff6633 !important; }
        input:focus { border-color: rgba(180,30,30,0.6) !important; box-shadow: 0 0 0 3px rgba(180,30,30,0.1) !important; }
        select:focus { border-color: rgba(180,30,30,0.6) !important; box-shadow: 0 0 0 3px rgba(180,30,30,0.1) !important; }
        .submit-btn:hover { background-position: right center !important; box-shadow: 0 12px 40px rgba(180,30,30,0.7) !important; transform: translateY(-1px); }
        .footer-link:hover { color: #c9a87c !important; }
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
          .stats-bar { grid-template-columns: repeat(2,1fr) !important; }
          .nav-links { display: none !important; }
          .hero-section { padding: 100px 5% 60px !important; }
          .form-wrap { padding: 32px 24px !important; }
        }
      `}</style>

      <div style={styles.root}>

        {/* ✅ ADDED: Hidden form for Netlify bot detection — required for React apps */}
        <form name="loan-inquiry" data-netlify="true" hidden>
          <input type="text" name="name" />
          <input type="text" name="contact" />
          <input type="email" name="email" />
          <input type="text" name="loanType" />
        </form>

        <nav style={styles.nav}>
          <div style={styles.navLogo}>
            <div style={styles.navLogoCircle} className="logo-circle">E</div>
            <div>
              <div style={styles.navBrand}>Ekaaki Finance</div>
              <div style={styles.navBrandSub}>Bhopal • Madhya Pradesh</div>
            </div>
          </div>
          <ul style={styles.navLinks} className="nav-links">
            {["Services", "About", "Testimonials", "Contact"].map(l => (
              <li key={l}>
                <a style={styles.navLink} className="nav-link"
                  onClick={() => document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: "smooth" })}>
                  {l}
                </a>
              </li>
            ))}
          </ul>
          <button style={styles.navCta} className="btn-primary" onClick={scrollToForm}>
            Apply Now
          </button>
        </nav>

        <section id="hero" style={{ ...styles.hero }} className="hero-section">
          <div style={styles.heroGlow} />
          <div style={styles.heroDiya}>🪔</div>
          <div style={styles.heroContent} className="hero-content">
            <div style={styles.heroTag}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#ff6633", display: "inline-block" }} />
              Trusted Financial Partner — Bhopal
            </div>
            <h1 style={styles.heroH1}>
              Your Dreams,{" "}
              <span style={styles.heroH1Accent}>Our Commitment</span>
            </h1>
            <p style={{ ...styles.heroSub }}>
              Strategic financial solutions with seamless processes. From home loans to business funding — Ekaaki Finance empowers your every aspiration.
            </p>
            <div style={styles.heroBtns}>
              <button style={styles.btnPrimary} className="btn-primary" onClick={scrollToForm}>
                Apply for Loan
              </button>
              <button style={styles.btnSecondary} className="btn-secondary"
                onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}>
                Explore Services
              </button>
            </div>
          </div>
        </section>

        <div style={styles.statsBar} className="stats-bar">
          {stats.map((s, i) => (
            <div key={i} style={{ ...styles.statItem, borderRight: i < 3 ? "1px solid rgba(255,255,255,0.15)" : "none" }}>
              <span style={styles.statValue}>{s.value}</span>
              <span style={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>

        <section id="services" style={styles.section}>
          <span style={styles.sectionTag}>What We Offer</span>
          <div style={styles.divider} />
          <h2 style={styles.sectionH2}>Financial Solutions<br />Tailored for You</h2>
          <p style={styles.sectionDesc}>
            From personal aspirations to business ambitions — we offer comprehensive loan products at competitive rates with minimal documentation.
          </p>
          <div style={styles.grid}>
            {services.map((s, i) => (
              <div key={i} style={styles.card} className="card">
                <div style={styles.cardGlow} />
                <span style={styles.cardIcon}>{s.icon}</span>
                <div style={styles.cardTitle}>{s.title}</div>
                <p style={styles.cardDesc}>{s.desc}</p>
                <span style={styles.cardRate}>Starting {s.rate}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="about" style={styles.sectionDark}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
            <div>
              <span style={styles.sectionTag}>About Ekaaki Finance</span>
              <div style={styles.divider} />
              <h2 style={styles.sectionH2}>Leading Financial Growth Partner</h2>
              <p style={{ ...styles.sectionDesc, marginBottom: 24 }}>
                Based in the heart of Bhopal, Ekaaki Finance has been transforming financial dreams into reality. Our team of experts brings decades of experience across banking and financial services.
              </p>
              <p style={{ ...styles.sectionDesc, marginBottom: 32 }}>
                We believe in personalized solutions — because every client's financial journey is unique. From salaried professionals to business owners, we craft strategies that work.
              </p>
              <div style={{ display: "flex", gap: 16 }}>
                {["Strategic Advice", "Seamless Process", "Best Rates"].map(t => (
                  <div key={t} style={{
                    background: "rgba(180,30,30,0.1)", border: "1px solid rgba(180,30,30,0.25)",
                    padding: "8px 16px", borderRadius: 100,
                    fontFamily: "'Cormorant Garamond', serif", fontSize: 12,
                    letterSpacing: "0.1em", color: "#ff6633",
                  }}>{t}</div>
                ))}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { icon: "📋", t: "50+ Bank Partners", d: "Access to best rates across all major lenders" },
                { icon: "⚡", t: "48-Hour Approval", d: "Fast-track processing for eligible applicants" },
                { icon: "🔒", t: "100% Transparent", d: "No hidden fees, complete documentation clarity" },
                { icon: "🤝", t: "Doorstep Service", d: "We come to you — Bhopal & surrounding areas" },
              ].map((f, i) => (
                <div key={i} style={{
                  background: "rgba(20,3,3,0.8)", border: "1px solid rgba(180,30,30,0.15)",
                  borderRadius: 4, padding: 20,
                }}>
                  <div style={{ fontSize: 28, marginBottom: 10 }}>{f.icon}</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, color: "#f5e6d3", marginBottom: 6 }}>{f.t}</div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, color: "#7a5040", lineHeight: 1.5 }}>{f.d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" style={styles.section}>
          <span style={styles.sectionTag}>Client Stories</span>
          <div style={styles.divider} />
          <h2 style={styles.sectionH2}>Voices of Trust</h2>
          <div style={styles.testimonialsGrid}>
            {testimonials.map((t, i) => (
              <div key={i} style={styles.tCard}>
                <div style={{ fontSize: 28, color: "#7a0000", marginBottom: 12, fontFamily: "serif" }}>"</div>
                <p style={styles.tQuote}>{t.text}</p>
                <div style={styles.tAuthor}>
                  <div style={styles.tAvatar}>{t.avatar}</div>
                  <div>
                    <div style={styles.tName}>{t.name}</div>
                    <div style={styles.tRole}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" style={styles.sectionDark}>
          <div style={{ textAlign: "center" }}>
            <span style={styles.sectionTag}>Loan Inquiry</span>
            <div style={{ ...styles.divider, margin: "0 auto 16px" }} />
            <h2 style={{ ...styles.sectionH2, textAlign: "center" }}>Apply in Minutes</h2>
            <p style={{ ...styles.sectionDesc, margin: "0 auto", textAlign: "center" }}>
              Fill in your details below and our loan advisor will reach out within 24 hours with a tailored offer.
            </p>
          </div>

          <div style={styles.formWrap} ref={formRef} className="form-wrap">
            <div style={styles.formGlow} />

            {submitted ? (
              <div style={styles.successBox}>
                <span style={styles.successIcon}>🎉</span>
                <div style={styles.successTitle}>Inquiry Received!</div>
                <p style={styles.successMsg}>
                  Thank you, <strong style={{ color: "#f5e6d3" }}>{form.name}</strong>! Our financial advisor will contact you at <strong style={{ color: "#f5e6d3" }}>{form.contact}</strong> within 24 hours to discuss your {form.loanType} requirements.
                </p>
                <div style={{ marginTop: 24, padding: "12px 24px", background: "rgba(180,30,30,0.15)", border: "1px solid rgba(180,30,30,0.3)", borderRadius: 4 }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, color: "#cc4400", letterSpacing: "0.15em" }}>
                    📞 For urgent queries: 8889444930
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div style={styles.formTitle}>Loan Inquiry Form</div>
                <div style={styles.formSub}>Quick • Confidential • No Obligation</div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Full Name *</label>
                  <input
                    style={{ ...styles.input, borderColor: errors.name ? "#ff4444" : undefined }}
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={e => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: "" }); }}
                  />
                  {errors.name && <div style={styles.errorText}>⚠ {errors.name}</div>}
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Mobile Number *</label>
                  <input
                    style={{ ...styles.input, borderColor: errors.contact ? "#ff4444" : undefined }}
                    placeholder="10-digit mobile number"
                    value={form.contact} maxLength={10}
                    onChange={e => { setForm({ ...form, contact: e.target.value.replace(/\D/g, "") }); setErrors({ ...errors, contact: "" }); }}
                  />
                  {errors.contact && <div style={styles.errorText}>⚠ {errors.contact}</div>}
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Email Address *</label>
                  <input
                    style={{ ...styles.input, borderColor: errors.email ? "#ff4444" : undefined }}
                    placeholder="your@email.com" type="email"
                    value={form.email}
                    onChange={e => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: "" }); }}
                  />
                  {errors.email && <div style={styles.errorText}>⚠ {errors.email}</div>}
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Loan Type *</label>
                  <select
                    style={{ ...styles.select, borderColor: errors.loanType ? "#ff4444" : undefined }}
                    value={form.loanType}
                    onChange={e => { setForm({ ...form, loanType: e.target.value }); setErrors({ ...errors, loanType: "" }); }}
                  >
                    <option value="" style={{ background: "#0a0000" }}>Select loan type...</option>
                    {loanTypes.map(l => (
                      <option key={l} value={l} style={{ background: "#0a0000" }}>{l}</option>
                    ))}
                  </select>
                  {errors.loanType && <div style={styles.errorText}>⚠ {errors.loanType}</div>}
                </div>

                <button
                  style={{ ...styles.submitBtn, opacity: submitting ? 0.8 : 1 }}
                  className="submit-btn"
                  onClick={handleSubmit}
                  disabled={submitting}
                >
                  {submitting ? "Submitting..." : "Submit Loan Inquiry →"}
                </button>

                <div style={{ textAlign: "center", marginTop: 16, fontFamily: "'Cormorant Garamond', serif", fontSize: 12, color: "#4a3020", letterSpacing: "0.05em" }}>
                  🔒 Your information is 100% secure and confidential
                </div>
              </>
            )}
          </div>
        </section>

        <footer style={styles.footer}>
          <div style={styles.footerGrid} className="footer-grid">
            <div>
              <div style={styles.footerBrand}>Ekaaki Finance</div>
              <p style={styles.footerDesc}>
                MF 12, First Floor, Block A, Mansarovar Complex,<br />
                Near Rani Kamlapati Railway Station,<br />
                Bhopal, Madhya Pradesh 462016
              </p>
              <div style={{ marginTop: 20, fontFamily: "'Cormorant Garamond', serif", fontSize: 15, color: "#cc4400" }}>
                📞 8889444930
              </div>
            </div>
            <div>
              <div style={styles.footerH}>Loan Products</div>
              {["Home Loan", "Business Loan", "Personal Loan", "Car Loan", "Education Loan"].map(l => (
                <a key={l} style={styles.footerLink} className="footer-link">{l}</a>
              ))}
            </div>
            <div>
              <div style={styles.footerH}>Company</div>
              {["About Us", "Our Team", "Blog", "Careers", "Privacy Policy"].map(l => (
                <a key={l} style={styles.footerLink} className="footer-link">{l}</a>
              ))}
            </div>
          </div>
          <div style={styles.footerBottom}>
            <div style={styles.footerCopy}>© 2024 Ekaaki Finance. All rights reserved.</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, color: "#4a2020" }}>
              Strategic Advice • Seamless Loan Processes • Leading Financial Growth
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}

export default App;