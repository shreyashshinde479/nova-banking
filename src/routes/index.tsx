import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "NexBank — Next Generation Digital Banking" },
      { name: "description", content: "Secure, fast, smart banking at your fingertips. Experience the future of digital finance with NexBank." },
    ],
  }),
});

/* ─────────────── Navbar ─────────────── */
function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    const onScroll = () => {
      el.style.backdropFilter = window.scrollY > 40 ? "blur(20px)" : "blur(8px)";
      el.style.borderBottomColor = window.scrollY > 40 ? "var(--glass-border)" : "transparent";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 transition-all duration-300"
        style={{ backgroundColor: "oklch(0.09 0.02 270 / 70%)", borderBottom: "1px solid transparent" }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-[var(--neon-blue)] to-[var(--neon-purple)] flex items-center justify-center text-white font-black text-sm">
            N
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">
            Nex<span className="text-primary">Bank</span>
          </span>
        </div>

        {/* Nav links — hidden on mobile */}
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {["Features", "Security", "About"].map((item) => (
            <button
              key={item}
              className="relative py-1 transition-colors hover:text-foreground after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Auth buttons — hidden on mobile */}
        <div className="hidden md:flex items-center gap-3">
          <button className="px-5 py-2 text-sm rounded-lg border border-[var(--glass-border)] text-foreground transition-all hover:border-primary hover:text-primary">
            Login
          </button>
          <button className="px-5 py-2 text-sm rounded-lg font-medium text-white bg-gradient-to-r from-[var(--neon-blue)] to-[var(--neon-purple)] shadow-[0_0_24px_oklch(0.65_0.2_260_/_35%)] transition-all hover:shadow-[0_0_36px_oklch(0.65_0.2_260_/_55%)] hover:scale-105">
            Sign Up
          </button>
        </div>

        {/* Hamburger — visible on mobile */}
        <button
          className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-[5px]"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-[2px] bg-foreground rounded transition-all duration-300 ${mobileOpen ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`block w-5 h-[2px] bg-foreground rounded transition-all duration-300 ${mobileOpen ? "opacity-0 scale-0" : ""}`} />
          <span className={`block w-5 h-[2px] bg-foreground rounded transition-all duration-300 ${mobileOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 md:hidden ${mobileOpen ? "visible opacity-100" : "invisible opacity-0"}`}
        style={{ backgroundColor: "oklch(0.09 0.02 270 / 95%)", backdropFilter: "blur(24px)" }}
      >
        <div className={`flex flex-col items-center justify-center h-full gap-8 transition-transform duration-500 ${mobileOpen ? "translate-y-0" : "-translate-y-8"}`}>
          {["Features", "Security", "About"].map((item) => (
            <button
              key={item}
              onClick={() => setMobileOpen(false)}
              className="text-2xl font-semibold text-foreground hover:text-primary transition-colors"
            >
              {item}
            </button>
          ))}
          <div className="flex flex-col gap-3 mt-4 w-56">
            <button
              onClick={() => setMobileOpen(false)}
              className="w-full py-3 text-sm rounded-lg border border-[var(--glass-border)] text-foreground transition-all hover:border-primary"
            >
              Login
            </button>
            <button
              onClick={() => setMobileOpen(false)}
              className="w-full py-3 text-sm rounded-lg font-medium text-white bg-gradient-to-r from-[var(--neon-blue)] to-[var(--neon-purple)] shadow-[0_0_24px_oklch(0.65_0.2_260_/_35%)]"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─────────────── Hero ─────────────── */
function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-title", { y: 60, opacity: 0, duration: 1, ease: "power3.out" });
      gsap.from(".hero-sub", { y: 40, opacity: 0, duration: 1, delay: 0.3, ease: "power3.out" });
      gsap.from(".hero-btns", { y: 30, opacity: 0, duration: 0.8, delay: 0.6, ease: "power3.out" });
      gsap.from(".hero-card", { y: 80, opacity: 0, rotation: 6, duration: 1.2, delay: 0.5, ease: "power3.out", stagger: 0.2 });

      // Floating animation for cards
      gsap.to(".hero-card-1", { y: -18, rotation: -2, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(".hero-card-2", { y: 14, rotation: 3, duration: 3.5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.5 });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      {/* BG image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1920&q=80"
          alt="Abstract fintech background"
          className="w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--neon-blue)]/10 via-transparent to-[var(--neon-purple)]/10" />
      </div>

      {/* Animated glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[var(--neon-blue)] opacity-[0.08] blur-[120px] animate-float-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[var(--neon-purple)] opacity-[0.08] blur-[120px] animate-float-reverse" />
      <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] rounded-full bg-[var(--neon-cyan)] opacity-[0.05] blur-[100px] animate-pulse-glow" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <div className="flex flex-col gap-6">
          <div className="hero-title">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-primary/15 text-primary border border-primary/25 mb-6">
              #1 Digital Banking Platform
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight">
              Next Generation{" "}
              <span className="bg-gradient-to-r from-[var(--neon-blue)] via-[var(--neon-cyan)] to-[var(--neon-purple)] bg-clip-text text-transparent animate-gradient-shift">
                Digital Banking
              </span>{" "}
              Experience
            </h1>
          </div>
          <p className="hero-sub text-lg text-muted-foreground max-w-lg">
            Secure. Fast. Smart banking at your fingertips. Manage your finances with cutting-edge technology and bank-level security.
          </p>
          <div className="hero-btns flex flex-wrap gap-4">
            <button className="px-7 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-[var(--neon-blue)] to-[var(--neon-purple)] shadow-[0_0_30px_oklch(0.65_0.2_260_/_30%)] transition-all hover:shadow-[0_0_50px_oklch(0.65_0.2_260_/_50%)] hover:scale-105">
              Get Started
            </button>
            <button className="px-7 py-3 rounded-xl font-semibold border border-[var(--glass-border)] text-foreground backdrop-blur-sm transition-all hover:border-primary hover:bg-primary/10">
              Explore Features
            </button>
          </div>
        </div>

        {/* Floating cards */}
        <div className="relative h-[400px] md:h-[500px] hidden md:block">
          {/* Credit card 1 */}
          <div className="hero-card hero-card-1 absolute top-8 right-4 w-[340px] h-[210px] rounded-2xl p-6 flex flex-col justify-between bg-gradient-to-br from-[var(--neon-blue)] to-[var(--neon-purple)] shadow-[0_20px_60px_oklch(0.65_0.2_260_/_30%)]">
            <div className="flex justify-between items-start">
              <span className="text-white/80 text-xs font-medium tracking-widest uppercase">NexBank</span>
              <svg className="w-10 h-10 text-white/90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="9" cy="12" r="5.5" /><circle cx="15" cy="12" r="5.5" /></svg>
            </div>
            <div>
              <div className="text-white/70 text-xs tracking-[0.3em] font-mono mb-2">•••• •••• •••• 4829</div>
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-white/50 text-[10px] uppercase">Card Holder</div>
                  <div className="text-white text-sm font-medium">Alex Johnson</div>
                </div>
                <div>
                  <div className="text-white/50 text-[10px] uppercase">Expires</div>
                  <div className="text-white text-sm font-medium">09/28</div>
                </div>
              </div>
            </div>
          </div>

          {/* Credit card 2 */}
          <div className="hero-card hero-card-2 absolute bottom-12 left-0 w-[300px] h-[190px] rounded-2xl p-5 flex flex-col justify-between bg-gradient-to-br from-[oklch(0.3_0.05_270)] to-[oklch(0.18_0.03_270)] border border-[var(--glass-border)] backdrop-blur-xl shadow-[0_20px_60px_oklch(0_0_0_/_40%)]">
            <div className="flex justify-between items-center">
              <span className="text-white/60 text-xs tracking-widest uppercase">Platinum</span>
              <div className="w-8 h-6 rounded bg-gradient-to-r from-yellow-400 to-yellow-600 opacity-80" />
            </div>
            <div>
              <div className="text-white/50 text-xs tracking-[0.3em] font-mono mb-2">•••• •••• •••• 7153</div>
              <div className="text-white text-sm font-medium">$24,850.00</div>
            </div>
          </div>

          {/* Floating stat pill with pulsing ring */}
          <div className="hero-card absolute top-1/2 left-12 px-4 py-2.5 rounded-xl bg-[var(--glass)] backdrop-blur-xl border border-[var(--glass-border)] flex items-center gap-3 shadow-lg">
            <div className="relative w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-emerald-500/40 animate-ping-slow" />
              <svg className="relative w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            </div>
            <div>
              <div className="text-[10px] text-muted-foreground">Monthly Growth</div>
              <div className="text-sm font-bold text-emerald-400">+24.5%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground animate-bounce">
        <span className="text-xs">Scroll</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 14l-7 7m0 0l-7-7" /></svg>
      </div>
    </section>
  );
}

/* ─────────────── Features ─────────────── */
const features = [
  {
    title: "Account Management",
    desc: "Full control over your accounts with real-time balance tracking, spending insights, and automated budgeting tools.",
    img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
    ),
  },
  {
    title: "Instant Transactions",
    desc: "Send and receive money instantly with zero fees. Lightning-fast transfers powered by next-gen infrastructure.",
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
    ),
  },
  {
    title: "Secure Payments",
    desc: "Bank-grade encryption protects every transaction. Multi-factor auth and biometric security built in.",
    img: "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=600&q=80",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
    ),
  },
  {
    title: "Loan Services",
    desc: "Get pre-approved loans in minutes. Competitive rates, flexible terms, and a fully digital application process.",
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    ),
  },
];

function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".feat-heading", {
        scrollTrigger: { trigger: ".feat-heading", start: "top 85%" },
        y: 40, opacity: 0, duration: 0.8,
      });
      gsap.from(".feat-card", {
        scrollTrigger: { trigger: ".feat-grid", start: "top 80%" },
        y: 60, opacity: 0, duration: 0.7, stagger: 0.15, ease: "power3.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative py-28 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="feat-heading text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-primary/15 text-primary border border-primary/25 mb-4">
            Why Choose NexBank
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
            Powerful Features for{" "}
            <span className="bg-gradient-to-r from-[var(--neon-blue)] to-[var(--neon-purple)] bg-clip-text text-transparent">
              Modern Banking
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to manage, grow, and protect your finances — all in one platform.
          </p>
        </div>

        <div className="feat-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="feat-card group relative rounded-2xl overflow-hidden bg-[var(--glass)] backdrop-blur-xl border border-[var(--glass-border)] transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_40px_oklch(0.65_0.2_260_/_20%)] hover:-translate-y-2"
            >
              <div className="h-40 overflow-hidden">
                <img src={f.img} alt={f.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 h-40 bg-gradient-to-b from-transparent to-[var(--glass)]" />
              </div>
              <div className="p-5 relative">
                <div className="w-10 h-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center mb-3 border border-primary/25">
                  {f.icon}
                </div>
                <h3 className="font-bold text-lg mb-2 text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Dashboard Preview ─────────────── */
function DashboardSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".dash-text", {
        scrollTrigger: { trigger: ".dash-text", start: "top 85%" },
        x: -60, opacity: 0, duration: 0.9, ease: "power3.out",
      });
      gsap.from(".dash-panel", {
        scrollTrigger: { trigger: ".dash-panel", start: "top 85%" },
        x: 60, opacity: 0, duration: 0.9, ease: "power3.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const transactions = [
    { name: "Netflix", amount: "-$14.99", type: "Subscription", time: "2h ago", color: "bg-red-500" },
    { name: "Salary Deposit", amount: "+$5,400.00", type: "Income", time: "1d ago", color: "bg-emerald-500" },
    { name: "Amazon", amount: "-$89.50", type: "Shopping", time: "2d ago", color: "bg-orange-500" },
    { name: "Transfer to Sarah", amount: "-$250.00", type: "Transfer", time: "3d ago", color: "bg-primary" },
  ];

  return (
    <section ref={ref} className="relative py-28 px-6 md:px-12 overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[var(--neon-blue)] opacity-[0.05] blur-[150px]" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="dash-text">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-primary/15 text-primary border border-primary/25 mb-4">
            Smart Dashboard
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Your Finances,{" "}
            <span className="bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-blue)] bg-clip-text text-transparent">
              At a Glance
            </span>
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg">
            A beautifully designed dashboard that puts you in control. Track spending, monitor investments, and manage cards — all from one place.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Active Users", value: "2.4M+" },
              { label: "Transactions/Day", value: "10M+" },
              { label: "Countries", value: "150+" },
              { label: "Uptime", value: "99.99%" },
            ].map((s) => (
              <div key={s.label} className="p-4 rounded-xl bg-[var(--glass)] backdrop-blur border border-[var(--glass-border)]">
                <div className="text-2xl font-extrabold text-foreground">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Mock dashboard panel */}
        <div className="dash-panel rounded-2xl bg-[var(--glass)] backdrop-blur-xl border border-[var(--glass-border)] p-6 shadow-[0_20px_80px_oklch(0_0_0_/_40%)]">
          {/* Balance header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="text-xs text-muted-foreground mb-1">Total Balance</div>
              <div className="text-3xl font-extrabold text-foreground">$48,295.60</div>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-emerald-400 text-xs font-medium">↑ 12.5%</span>
                <span className="text-muted-foreground text-xs">vs last month</span>
              </div>
            </div>
            <div className="flex gap-2">
              {["1W", "1M", "1Y"].map((t) => (
                <button key={t} className={`px-3 py-1 text-xs rounded-lg transition ${t === "1M" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Mini chart (SVG) */}
          <div className="h-32 mb-6 relative">
            <svg viewBox="0 0 400 100" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.65 0.2 260)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="oklch(0.65 0.2 260)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,70 Q50,60 100,50 T200,35 T300,25 T400,15" fill="none" stroke="oklch(0.65 0.2 260)" strokeWidth="2" />
              <path d="M0,70 Q50,60 100,50 T200,35 T300,25 T400,15 L400,100 L0,100 Z" fill="url(#chartGrad)" />
            </svg>
          </div>

          {/* Transactions */}
          <div className="text-xs text-muted-foreground mb-3 font-medium">Recent Transactions</div>
          <div className="space-y-3">
            {transactions.map((tx) => (
              <div key={tx.name} className="flex items-center justify-between py-2 border-b border-[var(--glass-border)] last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg ${tx.color} bg-opacity-20 flex items-center justify-center`}>
                    <div className={`w-2.5 h-2.5 rounded-full ${tx.color}`} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">{tx.name}</div>
                    <div className="text-xs text-muted-foreground">{tx.type} · {tx.time}</div>
                  </div>
                </div>
                <div className={`text-sm font-semibold ${tx.amount.startsWith("+") ? "text-emerald-400" : "text-foreground"}`}>
                  {tx.amount}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Security ─────────────── */
function SecuritySection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".sec-item", {
        scrollTrigger: { trigger: ".sec-grid", start: "top 80%" },
        y: 50, opacity: 0, duration: 0.7, stagger: 0.12, ease: "power3.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const securityFeatures = [
    { title: "256-bit Encryption", desc: "Military-grade AES-256 encryption secures every byte of your data in transit and at rest.", icon: "🔐" },
    { title: "Biometric Auth", desc: "Face ID, Touch ID, and fingerprint authentication for instant yet secure access.", icon: "👁️" },
    { title: "Real-time Monitoring", desc: "AI-powered fraud detection monitors every transaction 24/7 and alerts you instantly.", icon: "🛡️" },
    { title: "Zero-Knowledge Proof", desc: "We can verify your identity without ever seeing your private data. True privacy by design.", icon: "🔒" },
  ];

  return (
    <section ref={ref} className="relative py-28 px-6 md:px-12 overflow-hidden">
      {/* BG image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920&q=80"
          alt="Cybersecurity background"
          className="w-full h-full object-cover opacity-10"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background" />
      </div>

      <div className="relative max-w-7xl mx-auto text-center">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 mb-4">
          Bank-Level Security
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
          Your Money is{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-[var(--neon-cyan)] bg-clip-text text-transparent">
            Always Safe
          </span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-14">
          Bank-level security with advanced encryption. We protect your finances with the same technology used by the world's leading financial institutions.
        </p>

        <div className="sec-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {securityFeatures.map((f) => (
            <div
              key={f.title}
              className="sec-item group p-6 rounded-2xl bg-[var(--glass)] backdrop-blur-xl border border-[var(--glass-border)] transition-all duration-500 hover:border-emerald-500/40 hover:shadow-[0_0_40px_oklch(0.75_0.15_180_/_15%)] text-left"
            >
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="font-bold text-lg mb-2 text-foreground">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── CTA ─────────────── */
function CTASection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cta-inner", {
        scrollTrigger: { trigger: ".cta-inner", start: "top 85%" },
        y: 40, opacity: 0, duration: 0.8, ease: "power3.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-28 px-6 md:px-12">
      <div className="cta-inner max-w-4xl mx-auto text-center p-12 md:p-16 rounded-3xl relative overflow-hidden bg-gradient-to-br from-[var(--neon-blue)] to-[var(--neon-purple)] shadow-[0_0_80px_oklch(0.65_0.2_260_/_30%)]">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,white_0%,transparent_50%)]" />
        </div>
        <div className="relative">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Ready to Transform Your Banking?
          </h2>
          <p className="text-white/70 max-w-lg mx-auto mb-8">
            Join 2.4 million users who already trust NexBank for their daily finances. Open your account in under 5 minutes.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-3.5 rounded-xl font-semibold bg-white text-[oklch(0.2_0.05_270)] transition-all hover:scale-105 hover:shadow-[0_8px_30px_rgba(255,255,255,0.3)]">
              Open Free Account
            </button>
            <button className="px-8 py-3.5 rounded-xl font-semibold border-2 border-white/30 text-white transition-all hover:bg-white/10 hover:border-white/60">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Footer ─────────────── */
function Footer() {
  const cols = [
    { title: "Product", links: ["Features", "Security", "Pricing", "API"] },
    { title: "Company", links: ["About", "Careers", "Blog", "Press"] },
    { title: "Support", links: ["Help Center", "Contact", "Status", "Terms"] },
  ];

  return (
    <footer className="border-t border-[var(--glass-border)] py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-5 gap-12">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[var(--neon-blue)] to-[var(--neon-purple)] flex items-center justify-center text-white font-black text-xs">
              N
            </div>
            <span className="text-lg font-bold tracking-tight text-foreground">
              Nex<span className="text-primary">Bank</span>
            </span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
            Next-generation digital banking for the modern world. Secure, fast, and beautifully simple.
          </p>
        </div>
        {cols.map((col) => (
          <div key={col.title}>
            <div className="font-semibold text-sm text-foreground mb-4">{col.title}</div>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l}>
                  <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-[var(--glass-border)] flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-xs text-muted-foreground">© 2026 NexBank. All rights reserved.</div>
        <div className="flex gap-6 text-xs text-muted-foreground">
          <button className="hover:text-foreground transition-colors">Privacy</button>
          <button className="hover:text-foreground transition-colors">Terms</button>
          <button className="hover:text-foreground transition-colors">Cookies</button>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────── Trust Marquee ─────────────── */
function TrustMarquee() {
  const items = ["VISA", "Mastercard", "PayPal", "Stripe", "American Express", "Apple Pay", "Google Pay", "SWIFT"];
  const loop = [...items, ...items];
  return (
    <section className="py-10 border-y border-[var(--glass-border)] bg-[var(--glass)] backdrop-blur overflow-hidden">
      <div className="text-center text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
        Trusted by leading payment networks
      </div>
      <div className="relative">
        <div className="flex gap-16 animate-marquee whitespace-nowrap w-max">
          {loop.map((item, i) => (
            <span key={i} className="text-2xl font-bold text-muted-foreground/60 hover:text-foreground transition-colors">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Main Page ─────────────── */
function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <TrustMarquee />
      <FeaturesSection />
      <DashboardSection />
      <SecuritySection />
      <CTASection />
      <Footer />
    </div>
  );
}
