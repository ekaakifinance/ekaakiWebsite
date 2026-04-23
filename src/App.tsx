import { useState, useEffect, useRef } from "react";

const loanTypes = [
  "Home Loan","Personal Loan","Business Loan","Car Loan",
  "Education Loan","Gold Loan","Loan Against Property",
  "Two-Wheeler Loan","Cash Credit Limit","Over Draft Limit",
  "Small and Medium Enterprises","Builder Finance",
];

const services = [
  { icon: "🏠", title: "Home Loan", desc: "Fulfill your dream of owning a home with competitive interest rates and flexible repayment options.", rate: "8.5% p.a." },
  { icon: "💼", title: "Business Loan", desc: "Scale your business with fast disbursals, minimal documentation, and tailored financial solutions.", rate: "11% p.a." },
  { icon: "🚗", title: "Car Loan", desc: "Drive your dream car today. Quick approvals with up to 100% on-road funding available.", rate: "9.2% p.a." },
  { icon: "🎓", title: "Education Loan", desc: "Invest in your future. We fund top institutions across India and abroad with moratorium flexibility.", rate: "10% p.a." },
  { icon: "👤", title: "Personal Loan", desc: "Instant funds for any personal need. No collateral required, doorstep service available.", rate: "12% p.a." },
  { icon: "🏗️", title: "Loan Against Property", desc: "Unlock the value of your property. Highest amounts at lowest rates with long tenure options.", rate: "10.5% p.a." },
];

const stats = [
  { value: "₹500Cr+", label: "Loans Disbursed" },
  { value: "15,000+", label: "Happy Clients" },
  { value: "50+", label: "Banking Partners" },
  { value: "98%", label: "Approval Rate" },
];

const testimonials = [
  { name: "Ramesh Gupta", role: "Business Owner, Bhopal", text: "Ekaaki Finance made my business loan process incredibly smooth. Got funds within 3 days!", avatar: "R" },
  { name: "Priya Sharma", role: "Software Engineer, Indore", text: "Home loan at best rates. The team guided me through every step. Highly recommend!", avatar: "P" },
  { name: "Arjun Mehta", role: "Doctor, Bhopal", text: "Professional, transparent, and genuinely helpful. Best financial partner in Madhya Pradesh.", avatar: "A" },
];

export default function App() {
  const [form, setForm] = useState({ name: "", contact: "", email: "", loanType: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.contact.trim()) e.contact = "Contact number is required";
    else if (!/^[6-9]\d{9}$/.test(form.contact)) e.contact = "Enter a valid 10-digit mobile number";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address";
    if (!form.loanType) e.loanType = "Please select a loan type";
    return e;
  };

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
          "bot-field": "",
          name: form.name,
          contact: form.contact,
          email: form.email,
          loanType: form.loanType,
        }).toString(),
      });
      setSubmitted(true);
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenu(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');

        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; font-size: 16px; }
        body { background: #0c0101; color: #f0e6d8; -webkit-font-smoothing: antialiased; }

        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #0c0101; }
        ::-webkit-scrollbar-thumb { background: #8b1a1a; border-radius: 2px; }

        /* ── Typography System ── */
        .display { font-family: 'DM Serif Display', Georgia, serif; }
        .body-text, body { font-family: 'DM Sans', system-ui, sans-serif; }
        .serif { font-family: 'Libre Baskerville', Georgia, serif; }

        /* ── Navigation ── */
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 200;
          height: 68px; padding: 0 6%;
          display: flex; align-items: center; justify-content: space-between;
          transition: background 0.4s, border-color 0.4s;
          border-bottom: 1px solid transparent;
        }
        .nav.scrolled {
          background: rgba(12,1,1,0.96);
          border-bottom-color: rgba(139,26,26,0.25);
          backdrop-filter: blur(20px);
        }
        .nav-logo { display: flex; align-items: center; gap: 12px; text-decoration: none; cursor: pointer; }
        .nav-emblem {
          width: 40px; height: 40px; border-radius: 50%;
          background: linear-gradient(145deg, #c0392b, #7a0000);
          display: grid; place-items: center;
          font-family: 'DM Serif Display', serif; font-size: 18px; color: #fff;
          border: 1.5px solid rgba(255,100,50,0.3);
          box-shadow: 0 0 0 0 rgba(192,57,43,0.4);
          animation: emblem-pulse 3s ease-in-out infinite;
        }
        @keyframes emblem-pulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(192,57,43,0.4); }
          50% { box-shadow: 0 0 0 8px rgba(192,57,43,0); }
        }
        .nav-brand-name {
          font-family: 'DM Serif Display', serif;
          font-size: 17px; color: #f0e6d8; letter-spacing: 0.04em;
          line-height: 1.2;
        }
        .nav-brand-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px; color: #c0392b; letter-spacing: 0.2em;
          text-transform: uppercase; font-weight: 500;
        }
        .nav-links { display: flex; gap: 32px; list-style: none; }
        .nav-link {
          font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
          letter-spacing: 0.08em; color: #b89070; cursor: pointer;
          text-transform: uppercase; text-decoration: none;
          transition: color 0.25s; border: none; background: none; padding: 0;
        }
        .nav-link:hover { color: #ff6b35; }
        .nav-cta {
          background: linear-gradient(135deg, #c0392b, #8b0000);
          color: #fff; border: none; padding: 10px 22px;
          font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase;
          cursor: pointer; border-radius: 3px;
          box-shadow: 0 4px 20px rgba(192,57,43,0.35);
          transition: all 0.25s;
        }
        .nav-cta:hover { transform: translateY(-1px); box-shadow: 0 8px 28px rgba(192,57,43,0.5); }
        .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; border: none; background: none; padding: 4px; }
        .hamburger span { display: block; width: 22px; height: 2px; background: #b89070; border-radius: 2px; transition: all 0.3s; }
        .mobile-menu {
          display: none; position: fixed; top: 68px; left: 0; right: 0;
          background: rgba(12,1,1,0.98); backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(139,26,26,0.2);
          padding: 20px 6%; flex-direction: column; gap: 16px; z-index: 199;
        }
        .mobile-menu.open { display: flex; }
        .mobile-link {
          font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500;
          letter-spacing: 0.08em; text-transform: uppercase; color: #b89070;
          cursor: pointer; background: none; border: none; text-align: left;
          padding: 8px 0; border-bottom: 1px solid rgba(139,26,26,0.1);
          transition: color 0.2s;
        }

        /* ── Hero ── */
        .hero {
          min-height: 100vh; padding: 120px 6% 80px;
          display: flex; align-items: center;
          position: relative; overflow: hidden;
          background: radial-gradient(ellipse 80% 60% at 15% 60%, rgba(192,57,43,0.18) 0%, transparent 60%),
                      radial-gradient(ellipse 60% 40% at 85% 15%, rgba(122,0,0,0.15) 0%, transparent 55%),
                      linear-gradient(160deg, #0c0101 0%, #110202 55%, #0c0101 100%);
        }
        .hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; width: 100%; max-width: 1200px; margin: 0 auto; }
        .hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(192,57,43,0.12); border: 1px solid rgba(192,57,43,0.3);
          padding: 6px 16px; border-radius: 100px; margin-bottom: 24px;
          font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 600;
          letter-spacing: 0.18em; text-transform: uppercase; color: #ff6b35;
        }
        .hero-badge-dot { width: 6px; height: 6px; border-radius: 50%; background: #ff6b35; animation: blink 2s ease-in-out infinite; }
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
        .hero-h1 {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(38px, 4.5vw, 64px); line-height: 1.08;
          color: #f0e6d8; margin-bottom: 20px; letter-spacing: -0.01em;
        }
        .hero-h1-accent {
          background: linear-gradient(100deg, #ff6b35 0%, #c0392b 40%, #ff9933 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          display: block;
        }
        .hero-sub {
          font-family: 'DM Sans', sans-serif; font-size: 16px; font-weight: 300;
          line-height: 1.75; color: #a08060; margin-bottom: 36px; max-width: 480px;
        }
        .hero-btns { display: flex; gap: 14px; flex-wrap: wrap; }
        .btn-primary {
          background: linear-gradient(135deg, #c0392b, #8b0000);
          color: #fff; border: none; padding: 15px 32px;
          font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase;
          cursor: pointer; border-radius: 3px;
          box-shadow: 0 6px 28px rgba(192,57,43,0.4);
          transition: all 0.25s;
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 36px rgba(192,57,43,0.55); }
        .btn-outline {
          background: transparent; color: #b89070;
          border: 1px solid rgba(180,160,120,0.3);
          padding: 15px 32px;
          font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase;
          cursor: pointer; border-radius: 3px; transition: all 0.25s;
        }
        .btn-outline:hover { background: rgba(192,57,43,0.08); border-color: rgba(192,57,43,0.4); color: #f0e6d8; }

        /* Hero Right — Floating Card Stack */
        .hero-right { position: relative; display: flex; flex-direction: column; gap: 16px; }
        .stat-card {
          background: linear-gradient(135deg, rgba(28,5,5,0.95), rgba(18,2,2,0.98));
          border: 1px solid rgba(139,26,26,0.2); border-radius: 8px;
          padding: 20px 24px; display: flex; align-items: center; gap: 16px;
          backdrop-filter: blur(10px);
          transition: border-color 0.3s, transform 0.3s;
        }
        .stat-card:hover { border-color: rgba(192,57,43,0.4); transform: translateX(4px); }
        .stat-card-icon { font-size: 28px; flex-shrink: 0; }
        .stat-card-val {
          font-family: 'DM Serif Display', serif; font-size: 26px; color: #f0e6d8;
          line-height: 1; letter-spacing: -0.01em;
        }
        .stat-card-label {
          font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 500;
          color: #7a5040; letter-spacing: 0.08em; text-transform: uppercase; margin-top: 3px;
        }
        .hero-accent-line {
          position: absolute; left: -30px; top: 50%; transform: translateY(-50%);
          width: 3px; height: 60%; background: linear-gradient(180deg, transparent, #c0392b, transparent);
          border-radius: 2px;
        }

        /* ── Stats Bar ── */
        .stats-bar {
          background: linear-gradient(90deg, #8b0000, #c0392b 50%, #8b0000);
          padding: 0; display: grid; grid-template-columns: repeat(4,1fr);
        }
        .stat-bar-item {
          padding: 26px 20px; text-align: center;
          border-right: 1px solid rgba(255,255,255,0.12);
          position: relative; overflow: hidden;
        }
        .stat-bar-item:last-child { border-right: none; }
        .stat-bar-val {
          font-family: 'DM Serif Display', serif; font-size: clamp(22px, 3vw, 34px);
          color: #fff; display: block; line-height: 1;
        }
        .stat-bar-label {
          font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 500;
          letter-spacing: 0.15em; color: rgba(255,220,190,0.65);
          text-transform: uppercase; display: block; margin-top: 6px;
        }

        /* ── Sections ── */
        .section { padding: 90px 6%; }
        .section-alt { padding: 90px 6%; background: #0e0202; }
        .section-inner { max-width: 1200px; margin: 0 auto; }
        .section-label {
          font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 700;
          letter-spacing: 0.25em; text-transform: uppercase; color: #c0392b;
          display: block; margin-bottom: 10px;
        }
        .section-rule {
          width: 48px; height: 2px; border-radius: 1px;
          background: linear-gradient(90deg, #c0392b, #ff6b35);
          margin-bottom: 18px;
        }
        .section-h2 {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(26px, 3.5vw, 44px); line-height: 1.15;
          color: #f0e6d8; margin-bottom: 14px; letter-spacing: -0.01em;
        }
        .section-desc {
          font-family: 'DM Sans', sans-serif; font-size: 16px; font-weight: 300;
          color: #a08060; line-height: 1.75; max-width: 520px;
        }

        /* ── Service Cards ── */
        .services-grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(300px,1fr));
          gap: 20px; margin-top: 52px;
        }
        .service-card {
          background: linear-gradient(145deg, rgba(24,4,4,0.9), rgba(14,2,2,0.96));
          border: 1px solid rgba(139,26,26,0.18); border-radius: 6px;
          padding: 28px 26px; position: relative; overflow: hidden;
          transition: all 0.35s ease; cursor: default;
        }
        .service-card::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(192,57,43,0.05) 0%, transparent 60%);
          opacity: 0; transition: opacity 0.35s;
        }
        .service-card:hover { border-color: rgba(192,57,43,0.45); transform: translateY(-5px); box-shadow: 0 20px 50px rgba(192,57,43,0.12); }
        .service-card:hover::before { opacity: 1; }
        .service-icon { font-size: 32px; display: block; margin-bottom: 14px; }
        .service-title { font-family: 'DM Serif Display', serif; font-size: 19px; color: #f0e6d8; margin-bottom: 10px; }
        .service-desc { font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 300; color: #90604e; line-height: 1.65; margin-bottom: 16px; }
        .service-rate {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(192,57,43,0.15); border: 1px solid rgba(192,57,43,0.3);
          padding: 4px 12px; border-radius: 100px;
          font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 600;
          color: #ff6b35; letter-spacing: 0.04em;
        }

        /* ── About ── */
        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
        .feature-tag {
          display: inline-block;
          background: rgba(192,57,43,0.1); border: 1px solid rgba(192,57,43,0.22);
          padding: 6px 14px; border-radius: 100px;
          font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 600;
          letter-spacing: 0.1em; color: #ff6b35; margin: 4px 4px 4px 0;
        }
        .features-mini { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .feature-mini-card {
          background: rgba(20,3,3,0.7); border: 1px solid rgba(139,26,26,0.13);
          border-radius: 6px; padding: 18px;
          transition: border-color 0.25s;
        }
        .feature-mini-card:hover { border-color: rgba(192,57,43,0.3); }
        .fmc-icon { font-size: 24px; margin-bottom: 8px; display: block; }
        .fmc-title { font-family: 'DM Serif Display', serif; font-size: 14px; color: #f0e6d8; margin-bottom: 5px; }
        .fmc-desc { font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 300; color: #6a4030; line-height: 1.5; }

        /* ── Testimonials ── */
        .testi-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px,1fr)); gap: 20px; margin-top: 52px; }
        .testi-card {
          background: rgba(18,3,3,0.8); border: 1px solid rgba(139,26,26,0.13);
          border-radius: 6px; padding: 28px;
          transition: border-color 0.25s, transform 0.25s;
        }
        .testi-card:hover { border-color: rgba(192,57,43,0.3); transform: translateY(-3px); }
        .testi-mark { font-size: 36px; color: #7a0000; line-height: 1; margin-bottom: 12px; font-family: Georgia, serif; display: block; }
        .testi-text { font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 300; font-style: italic; color: #b89070; line-height: 1.7; margin-bottom: 20px; }
        .testi-author { display: flex; align-items: center; gap: 12px; }
        .testi-avatar {
          width: 42px; height: 42px; border-radius: 50%;
          background: linear-gradient(135deg, #c0392b, #7a0000);
          display: grid; place-items: center;
          font-family: 'DM Serif Display', serif; font-size: 17px; color: #fff;
          border: 1.5px solid rgba(255,100,50,0.25); flex-shrink: 0;
        }
        .testi-name { font-family: 'DM Serif Display', serif; font-size: 15px; color: #f0e6d8; }
        .testi-role { font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 400; color: #7a4030; margin-top: 2px; }

        /* ── Form ── */
        .form-section { padding: 90px 6%; background: #0e0202; }
        .form-header { text-align: center; margin-bottom: 48px; }
        .form-card {
          max-width: 580px; margin: 0 auto;
          background: linear-gradient(145deg, rgba(20,3,3,0.97), rgba(12,1,1,0.99));
          border: 1px solid rgba(139,26,26,0.28); border-radius: 8px;
          padding: 44px 40px;
          box-shadow: 0 40px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,100,50,0.08);
          position: relative; overflow: hidden;
        }
        .form-card::before {
          content: ''; position: absolute; top: -100px; left: 50%; transform: translateX(-50%);
          width: 400px; height: 200px; border-radius: 50%;
          background: radial-gradient(ellipse, rgba(192,57,43,0.1) 0%, transparent 70%);
          pointer-events: none;
        }
        .form-title { font-family: 'DM Serif Display', serif; font-size: 26px; color: #f0e6d8; text-align: center; margin-bottom: 4px; }
        .form-sub { font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 400; color: #7a5040; text-align: center; margin-bottom: 32px; letter-spacing: 0.04em; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .form-group { margin-bottom: 18px; }
        .form-label {
          display: block; font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 600;
          letter-spacing: 0.15em; text-transform: uppercase; color: #b89070; margin-bottom: 7px;
        }
        .form-input {
          width: 100%; background: rgba(255,255,255,0.03);
          border: 1px solid rgba(139,26,26,0.22); border-radius: 4px;
          padding: 13px 15px;
          font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 400;
          color: #f0e6d8; outline: none;
          transition: border-color 0.25s, box-shadow 0.25s;
          box-sizing: border-box;
        }
        .form-input::placeholder { color: rgba(150,100,70,0.5); }
        .form-input:focus { border-color: rgba(192,57,43,0.55); box-shadow: 0 0 0 3px rgba(192,57,43,0.09); }
        .form-input.error { border-color: #e74c3c; }
        .form-select {
          width: 100%; background: rgba(10,1,1,0.9);
          border: 1px solid rgba(139,26,26,0.22); border-radius: 4px;
          padding: 13px 40px 13px 15px;
          font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 400;
          color: #f0e6d8; outline: none; cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='7' viewBox='0 0 12 7'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23c0392b' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 14px center;
          transition: border-color 0.25s, box-shadow 0.25s;
          box-sizing: border-box;
        }
        .form-select:focus { border-color: rgba(192,57,43,0.55); box-shadow: 0 0 0 3px rgba(192,57,43,0.09); }
        .form-select.error { border-color: #e74c3c; }
        .form-error { font-family: 'DM Sans', sans-serif; font-size: 12px; color: #e74c3c; margin-top: 4px; display: flex; align-items: center; gap: 4px; }
        .submit-btn {
          width: 100%; margin-top: 6px;
          background: linear-gradient(135deg, #c0392b 0%, #8b0000 50%, #c0392b 100%);
          background-size: 200% 100%;
          color: #fff; border: none; padding: 16px;
          font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 700;
          letter-spacing: 0.15em; text-transform: uppercase;
          cursor: pointer; border-radius: 4px;
          box-shadow: 0 8px 28px rgba(192,57,43,0.45);
          transition: all 0.3s; display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .submit-btn:hover:not(:disabled) { background-position: right center; box-shadow: 0 12px 36px rgba(192,57,43,0.6); transform: translateY(-1px); }
        .submit-btn:disabled { opacity: 0.7; cursor: default; }
        .form-secure {
          text-align: center; margin-top: 14px;
          font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 400;
          color: #3e2015; letter-spacing: 0.05em;
        }
        .success-box { text-align: center; padding: 32px 16px; }
        .success-icon { font-size: 56px; display: block; margin-bottom: 18px; }
        .success-title { font-family: 'DM Serif Display', serif; font-size: 26px; color: #f0e6d8; margin-bottom: 10px; }
        .success-msg { font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 300; color: #b89070; line-height: 1.7; }
        .success-contact {
          margin-top: 22px; padding: 12px 20px;
          background: rgba(192,57,43,0.12); border: 1px solid rgba(192,57,43,0.25); border-radius: 4px;
          font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; color: #c0392b; letter-spacing: 0.1em;
        }

        /* ── Footer ── */
        footer {
          background: #050000; border-top: 1px solid rgba(139,26,26,0.18);
          padding: 52px 6% 24px;
        }
        .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 48px; margin-bottom: 40px; }
        .footer-brand { font-family: 'DM Serif Display', serif; font-size: 20px; color: #f0e6d8; margin-bottom: 12px; }
        .footer-desc { font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 300; color: #5a3020; line-height: 1.7; }
        .footer-phone { font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 500; color: #c0392b; margin-top: 16px; letter-spacing: 0.04em; }
        .footer-col-h { font-family: 'DM Sans', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase; color: #c0392b; margin-bottom: 16px; }
        .footer-link {
          display: block; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 400;
          color: #5a3020; margin-bottom: 8px; cursor: pointer; text-decoration: none;
          transition: color 0.2s;
        }
        .footer-link:hover { color: #b89070; }
        .footer-bottom {
          border-top: 1px solid rgba(60,10,10,0.35); padding-top: 20px;
          display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;
        }
        .footer-copy { font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 400; color: #3a1810; letter-spacing: 0.04em; }
        .footer-tagline { font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 400; color: #3a1810; }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr; gap: 40px; }
          .hero-right { display: none; }
          .about-grid { grid-template-columns: 1fr; gap: 40px; }
          .footer-grid { grid-template-columns: 1fr; gap: 28px; }
          .stats-bar { grid-template-columns: repeat(2,1fr); }
          .stat-bar-item:nth-child(2) { border-right: none; }
          .hamburger { display: flex; }
          .nav-links-wrap { display: none; }
          .form-card { padding: 32px 22px; }
          .form-row { grid-template-columns: 1fr; }
        }
        @media (max-width: 600px) {
          .hero { padding: 100px 5% 60px; }
          .section, .section-alt, .form-section { padding: 60px 5%; }
          footer { padding: 40px 5% 20px; }
          .nav { padding: 0 5%; }
          .hero-btns { flex-direction: column; }
          .btn-primary, .btn-outline { width: 100%; text-align: center; }
        }
      `}</style>

      {/* Hidden Netlify form */}
      <form name="loan-inquiry" data-netlify="true" data-netlify-honeypot="bot-field" hidden>
        <input type="hidden" name="form-name" value="loan-inquiry" />
        <input name="bot-field" />
        <input name="name" /><input name="contact" /><input name="email" /><input name="loanType" />
      </form>

      <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", background: "#0c0101", color: "#f0e6d8", minHeight: "100vh", overflowX: "hidden" }}>

        {/* ── NAV ── */}
        <nav className={`nav${scrolled ? " scrolled" : ""}`}>
          <div className="nav-logo" onClick={() => scrollTo("hero")}>
            <div className="nav-emblem">E</div>
            <div>
              <div className="nav-brand-name">Ekaaki Finance</div>
              <div className="nav-brand-sub">Bhopal · Madhya Pradesh</div>
            </div>
          </div>
          <div className="nav-links-wrap">
            <ul className="nav-links">
              {[["services","Services"],["about","About"],["testimonials","Testimonials"],["contact","Contact"]].map(([id,label]) => (
                <li key={id}><button className="nav-link" onClick={() => scrollTo(id)}>{label}</button></li>
              ))}
            </ul>
          </div>
          <button className="nav-cta" onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })}>Apply Now</button>
          <button className="hamburger" onClick={() => setMobileMenu(m => !m)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </nav>
        <div className={`mobile-menu${mobileMenu ? " open" : ""}`}>
          {[["services","Services"],["about","About"],["testimonials","Testimonials"],["contact","Contact"]].map(([id,label]) => (
            <button key={id} className="mobile-link" onClick={() => scrollTo(id)}>{label}</button>
          ))}
        </div>

        {/* ── HERO ── */}
        <section id="hero" className="hero">
          <div className="hero-grid">
            <div>
              <div className="hero-badge">
                <span className="hero-badge-dot" />
                Trusted Financial Partner — Bhopal
              </div>
              <h1 className="hero-h1">
                Your Dreams,
                <span className="hero-h1-accent">Our Commitment</span>
              </h1>
              <p className="hero-sub">
                Strategic financial solutions with seamless processes. From home loans to business funding — Ekaaki Finance empowers your every aspiration.
              </p>
              <div className="hero-btns">
                <button className="btn-primary" onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })}>Apply for Loan</button>
                <button className="btn-outline" onClick={() => scrollTo("services")}>Explore Services</button>
              </div>
            </div>
            <div className="hero-right" style={{ position: "relative" }}>
              <div className="hero-accent-line" />
              {stats.map((s, i) => (
                <div key={i} className="stat-card" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="stat-card-icon">{["💰","😊","🏦","✅"][i]}</div>
                  <div>
                    <div className="stat-card-val">{s.value}</div>
                    <div className="stat-card-label">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── STATS BAR ── */}
        <div className="stats-bar">
          {stats.map((s, i) => (
            <div key={i} className="stat-bar-item">
              <span className="stat-bar-val">{s.value}</span>
              <span className="stat-bar-label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* ── SERVICES ── */}
        <section id="services" className="section">
          <div className="section-inner">
            <span className="section-label">What We Offer</span>
            <div className="section-rule" />
            <h2 className="section-h2">Financial Solutions<br />Tailored for You</h2>
            <p className="section-desc">Comprehensive loan products at competitive rates with minimal documentation and fast approvals.</p>
            <div className="services-grid">
              {services.map((s, i) => (
                <div key={i} className="service-card">
                  <span className="service-icon">{s.icon}</span>
                  <div className="service-title">{s.title}</div>
                  <p className="service-desc">{s.desc}</p>
                  <span className="service-rate">Starting {s.rate}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section id="about" className="section-alt">
          <div className="section-inner">
            <div className="about-grid">
              <div>
                <span className="section-label">About Ekaaki Finance</span>
                <div className="section-rule" />
                <h2 className="section-h2">Leading Financial Growth Partner</h2>
                <p className="section-desc" style={{ marginBottom: 20 }}>
                  Based in the heart of Bhopal, Ekaaki Finance has been transforming financial dreams into reality. Our team brings decades of experience across banking and financial services.
                </p>
                <p className="section-desc" style={{ marginBottom: 28 }}>
                  We believe in personalized solutions — because every client's financial journey is unique. From salaried professionals to business owners, we craft strategies that work.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {["Strategic Advice", "Seamless Process", "Best Rates", "Transparent Terms"].map(t => (
                    <span key={t} className="feature-tag">{t}</span>
                  ))}
                </div>
              </div>
              <div className="features-mini">
                {[
                  { icon: "📋", t: "50+ Bank Partners", d: "Access to best rates across all major lenders" },
                  { icon: "⚡", t: "48-Hr Approval", d: "Fast-track processing for eligible applicants" },
                  { icon: "🔒", t: "100% Transparent", d: "No hidden fees, complete documentation clarity" },
                  { icon: "🤝", t: "Doorstep Service", d: "We come to you — Bhopal & surrounding areas" },
                ].map((f, i) => (
                  <div key={i} className="feature-mini-card">
                    <span className="fmc-icon">{f.icon}</span>
                    <div className="fmc-title">{f.t}</div>
                    <div className="fmc-desc">{f.d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section id="testimonials" className="section">
          <div className="section-inner">
            <span className="section-label">Client Stories</span>
            <div className="section-rule" />
            <h2 className="section-h2">Voices of Trust</h2>
            <div className="testi-grid">
              {testimonials.map((t, i) => (
                <div key={i} className="testi-card">
                  <span className="testi-mark">"</span>
                  <p className="testi-text">{t.text}</p>
                  <div className="testi-author">
                    <div className="testi-avatar">{t.avatar}</div>
                    <div>
                      <div className="testi-name">{t.name}</div>
                      <div className="testi-role">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT / FORM ── */}
        <section id="contact" className="form-section">
          <div className="form-header">
            <span className="section-label">Loan Inquiry</span>
            <div className="section-rule" style={{ margin: "0 auto 14px" }} />
            <h2 className="section-h2" style={{ textAlign: "center" }}>Apply in Minutes</h2>
            <p className="section-desc" style={{ margin: "0 auto", textAlign: "center" }}>
              Fill in your details and our loan advisor will reach out within 24 hours with a tailored offer.
            </p>
          </div>

          <div className="form-card" ref={formRef}>
            {submitted ? (
              <div className="success-box">
                <span className="success-icon">🎉</span>
                <div className="success-title">Inquiry Received!</div>
                <p className="success-msg">
                  Thank you, <strong style={{ color: "#f0e6d8" }}>{form.name}</strong>! Our financial advisor will contact you at <strong style={{ color: "#f0e6d8" }}>{form.contact}</strong> within 24 hours to discuss your {form.loanType} requirements.
                </p>
                <div className="success-contact">📞 Urgent queries: 8889444930</div>
              </div>
            ) : (
              <>
                <div className="form-title">Loan Inquiry Form</div>
                <div className="form-sub">Quick · Confidential · No Obligation</div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input
                      className={`form-input${errors.name ? " error" : ""}`}
                      placeholder="Your full name"
                      value={form.name}
                      onChange={e => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: "" }); }}
                    />
                    {errors.name && <div className="form-error">⚠ {errors.name}</div>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Mobile Number *</label>
                    <input
                      className={`form-input${errors.contact ? " error" : ""}`}
                      placeholder="10-digit number"
                      value={form.contact} maxLength={10}
                      onChange={e => { setForm({ ...form, contact: e.target.value.replace(/\D/g, "") }); setErrors({ ...errors, contact: "" }); }}
                    />
                    {errors.contact && <div className="form-error">⚠ {errors.contact}</div>}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    className={`form-input${errors.email ? " error" : ""}`}
                    placeholder="your@email.com" type="email"
                    value={form.email}
                    onChange={e => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: "" }); }}
                  />
                  {errors.email && <div className="form-error">⚠ {errors.email}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label">Loan Type *</label>
                  <select
                    className={`form-select${errors.loanType ? " error" : ""}`}
                    value={form.loanType}
                    onChange={e => { setForm({ ...form, loanType: e.target.value }); setErrors({ ...errors, loanType: "" }); }}
                  >
                    <option value="" style={{ background: "#0c0101" }}>Select loan type...</option>
                    {loanTypes.map(l => (
                      <option key={l} value={l} style={{ background: "#0c0101" }}>{l}</option>
                    ))}
                  </select>
                  {errors.loanType && <div className="form-error">⚠ {errors.loanType}</div>}
                </div>

                <button className="submit-btn" onClick={handleSubmit} disabled={submitting}>
                  {submitting ? "Submitting…" : <>Submit Loan Inquiry <span>→</span></>}
                </button>
                <div className="form-secure">🔒 Your information is 100% secure and confidential</div>
              </>
            )}
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer>
          <div className="footer-grid">
            <div>
              <div className="footer-brand">Ekaaki Finance</div>
              <p className="footer-desc">
                MF 12, First Floor, Block A, Mansarovar Complex,<br />
                Near Rani Kamlapati Railway Station,<br />
                Bhopal, Madhya Pradesh — 462016
              </p>
              <div className="footer-phone">📞 8889444930</div>
            </div>
            <div>
              <div className="footer-col-h">Loan Products</div>
              {["Home Loan","Business Loan","Personal Loan","Car Loan","Education Loan"].map(l => (
                <a key={l} className="footer-link">{l}</a>
              ))}
            </div>
            <div>
              <div className="footer-col-h">Company</div>
              {["About Us","Our Team","Blog","Careers","Privacy Policy"].map(l => (
                <a key={l} className="footer-link">{l}</a>
              ))}
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-copy">© 2025 Ekaaki Finance. All rights reserved.</div>
            <div className="footer-tagline">Strategic Advice · Seamless Loan Processes · Leading Financial Growth</div>
          </div>
        </footer>

      </div>
    </>
  );
}