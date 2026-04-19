import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import {
  User,
  Phone,
  Mail,
  MapPin,
  KeyRound,
  IdCard,
  Calendar,
  Search,
  UserPlus,
  RotateCcw,
  Users,
  Sparkles,
  Shield,
  CheckCircle2,
  Wifi,
  Fingerprint,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/dashboard/customers")({
  component: CustomerManagementPage,
  head: () => ({
    meta: [
      { title: "Customer Management — NexBank" },
      {
        name: "description",
        content:
          "Create, search, and manage NexBank customer accounts with KYC verification.",
      },
      { property: "og:title", content: "Customer Management — NexBank" },
      {
        property: "og:description",
        content: "Onboard customers and look up KYC details instantly.",
      },
    ],
  }),
});

type FormState = {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  pin: string;
  aadhar: string;
  dob: string;
  status: "active" | "inactive";
};

const initialForm: FormState = {
  fullName: "Aarav Sharma",
  phone: "9876543210",
  email: "aarav.sharma@example.com",
  address: "221B Baker Street, Mumbai, MH",
  pin: "400001",
  aadhar: "234512345678",
  dob: "1995-08-15",
  status: "active",
};

const emptyForm: FormState = {
  fullName: "",
  phone: "",
  email: "",
  address: "",
  pin: "",
  aadhar: "",
  dob: "",
  status: "active",
};

type Particle = {
  id: number;
  angle: number;
  distance: number;
  color: string;
  size: number;
  rot: number;
  shape: "rect" | "circle" | "star";
  duration: number;
};

const PARTICLE_COLORS = [
  "oklch(0.8 0.15 195)",
  "oklch(0.65 0.2 260)",
  "oklch(0.6 0.25 300)",
  "oklch(0.85 0.18 90)",
  "oklch(0.75 0.2 30)",
  "oklch(0.8 0.2 140)",
];

function CustomerManagementPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [success, setSuccess] = useState(false);
  const [searchAadhar, setSearchAadhar] = useState("");
  const [searchError, setSearchError] = useState("");
  const [particles, setParticles] = useState<Particle[]>([]);
  const [burstOrigin, setBurstOrigin] = useState({ x: 0, y: 0 });
  const submitBtnRef = useRef<HTMLButtonElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  // Live KYC progress ring
  const completion = useMemo(() => {
    const fields: Array<keyof FormState> = [
      "fullName",
      "phone",
      "email",
      "address",
      "pin",
      "aadhar",
      "dob",
    ];
    const filled = fields.filter((f) => String(form[f]).trim().length > 0).length;
    return Math.round((filled / fields.length) * 100);
  }, [form]);

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
    setSuccess(false);
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.fullName.trim()) next.fullName = "Full name is required";
    if (!/^\d{10}$/.test(form.phone)) next.phone = "Enter a valid 10-digit phone number";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email";
    if (!form.address.trim()) next.address = "Address is required";
    if (!/^\d{6}$/.test(form.pin)) next.pin = "PIN must be 6 digits";
    if (!/^\d{12}$/.test(form.aadhar)) next.aadhar = "Aadhar must be 12 digits";
    if (!form.dob) next.dob = "Date of birth is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const fireConfetti = () => {
    const page = pageRef.current;
    const btn = submitBtnRef.current;
    if (!page || !btn) return;
    const pageRect = page.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    setBurstOrigin({
      x: btnRect.left - pageRect.left + btnRect.width / 2,
      y: btnRect.top - pageRect.top + btnRect.height / 2,
    });

    const shapes: Particle["shape"][] = ["rect", "circle", "star"];
    const burst: Particle[] = Array.from({ length: 90 }).map((_, i) => ({
      id: Date.now() + i,
      angle: Math.random() * Math.PI * 2,
      distance: 180 + Math.random() * 320,
      color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
      size: 6 + Math.random() * 10,
      rot: Math.random() * 720 - 360,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      duration: 1100 + Math.random() * 900,
    }));
    setParticles(burst);
    window.setTimeout(() => setParticles([]), 2200);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo mode: celebrate immediately on click
    setSuccess(true);
    setErrors({});
    fireConfetti();
  };

  const onReset = () => {
    setForm(emptyForm);
    setErrors({});
    setSuccess(false);
  };

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{12}$/.test(searchAadhar)) {
      setSearchError("Enter a valid 12-digit Aadhaar number");
      return;
    }
    setSearchError("");
  };

  const maskedAadhar = form.aadhar
    ? form.aadhar.padEnd(12, "•").replace(/(.{4})/g, "$1 ").trim()
    : "•••• •••• ••••";

  return (
    <div ref={pageRef} className="min-h-screen w-full bg-background text-foreground relative overflow-hidden">
      {/* Aurora mesh background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-background via-[oklch(0.1_0.03_280)] to-background" />
      <div className="aurora-layer -z-10" />
      <div className="grid-overlay -z-10" />
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-[var(--neon-blue)]/15 blur-3xl animate-float-slow -z-10" />
      <div className="absolute -bottom-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-[var(--neon-purple)]/15 blur-3xl animate-float-reverse -z-10" />
      <div className="absolute top-1/3 right-1/4 h-72 w-72 rounded-full bg-[var(--neon-cyan)]/10 blur-3xl animate-pulse-glow -z-10" />

      {/* Top bar */}
      <header className="sticky top-0 z-20 border-b border-[var(--glass-border)] bg-[var(--glass)] backdrop-blur-xl">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-[var(--neon-blue)] to-[var(--neon-purple)] flex items-center justify-center text-white font-black shadow-[0_0_20px_oklch(0.65_0.2_260_/_60%)] group-hover:shadow-[0_0_30px_oklch(0.65_0.2_260_/_90%)] transition-shadow">
              N
            </div>
            <span className="text-xl font-bold">
              Nex<span className="text-primary">Bank</span>
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-[var(--neon-cyan)] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--neon-cyan)]" />
              </span>
              Secure session active
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
              <Shield className="h-4 w-4 text-[var(--neon-cyan)]" />
              Admin Console
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* Page heading */}
        <div
          className="mb-10"
          style={{ animation: "fadeSlideUp 0.6s cubic-bezier(0.22,1,0.36,1) both" }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-[var(--glass)] px-3 py-1 text-xs text-[var(--neon-cyan)] backdrop-blur-xl">
            <Sparkles className="h-3 w-3" />
            Admin Dashboard
          </div>
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold bg-gradient-to-r from-foreground via-[var(--neon-cyan)] to-[var(--neon-purple)] bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_auto]">
            Customer Management
          </h1>
          <p className="mt-3 text-muted-foreground max-w-2xl">
            Create and manage customer accounts. Verify KYC details and onboard new
            customers in seconds.
          </p>

          {/* Quick stats */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl">
            {[
              { label: "Total Customers", value: "12,480", icon: Users },
              { label: "Active KYC", value: "11,902", icon: CheckCircle2 },
              { label: "New Today", value: "47", icon: UserPlus },
              { label: "Verified", value: "99.4%", icon: Shield },
            ].map((s, i) => (
              <div
                key={s.label}
                className="group relative rounded-xl border border-[var(--glass-border)] bg-[var(--glass)] backdrop-blur-xl p-4 overflow-hidden transition-transform hover:-translate-y-1"
                style={{ animation: `fadeSlideUp 0.5s ${0.1 * i + 0.2}s cubic-bezier(0.22,1,0.36,1) both` }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-[var(--neon-blue)]/10 via-transparent to-[var(--neon-purple)]/10" />
                <div className="relative flex items-center justify-between text-muted-foreground">
                  <span className="text-xs">{s.label}</span>
                  <s.icon className="h-4 w-4 text-[var(--neon-cyan)]" />
                </div>
                <div className="relative mt-1 text-xl font-bold">{s.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Holographic live KYC card */}
        <HoloCard
          name={form.fullName || "NEW CUSTOMER"}
          aadhar={maskedAadhar}
          status={form.status}
          completion={completion}
        />

        <div className="grid lg:grid-cols-3 gap-6 mt-8">
          {/* Create Customer card */}
          <section
            className="lg:col-span-2 relative rounded-2xl border border-[var(--glass-border)] bg-[var(--glass)] backdrop-blur-xl p-6 sm:p-8 shadow-[0_30px_80px_-30px_oklch(0.65_0.2_260_/_40%)] overflow-hidden"
            style={{ animation: "fadeSlideUp 0.7s cubic-bezier(0.22,1,0.36,1) both" }}
          >
            {/* Animated border shimmer */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl border-shimmer" />

            <div className="flex items-start justify-between gap-4 mb-6 relative">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-[var(--neon-blue)] to-[var(--neon-purple)] flex items-center justify-center shadow-[0_0_20px_oklch(0.65_0.2_260_/_60%)]">
                    <UserPlus className="h-4 w-4 text-white" />
                  </span>
                  Create New Customer
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  All fields marked <span className="text-destructive">*</span> are required.
                </p>
              </div>
              <ProgressRing value={completion} />
            </div>

            {success && (
              <div
                className="mb-6 flex items-center gap-2 rounded-lg border border-[var(--neon-cyan)]/40 bg-[var(--neon-cyan)]/10 px-4 py-3 text-sm"
                style={{ animation: "popIn 0.4s cubic-bezier(0.22,1,0.36,1) both" }}
              >
                <CheckCircle2 className="h-4 w-4 text-[var(--neon-cyan)]" />
                Customer account created successfully.
              </div>
            )}

            <form onSubmit={onSubmit} noValidate className="grid sm:grid-cols-2 gap-5 relative">
              <Field id="fullName" label="Full Name" required icon={User} placeholder="Enter full name" value={form.fullName} onChange={(v) => update("fullName", v)} error={errors.fullName} />
              <Field id="phone" label="Phone Number" required icon={Phone} placeholder="10-digit mobile number" inputMode="numeric" maxLength={10} value={form.phone} onChange={(v) => update("phone", v.replace(/\D/g, ""))} error={errors.phone} />
              <Field id="email" label="Email" required icon={Mail} type="email" placeholder="email@example.com" value={form.email} onChange={(v) => update("email", v)} error={errors.email} />
              <Field id="address" label="Address" required icon={MapPin} placeholder="Enter address" value={form.address} onChange={(v) => update("address", v)} error={errors.address} />
              <Field id="pin" label="Customer PIN" required icon={KeyRound} placeholder="6-digit PIN" inputMode="numeric" maxLength={6} type="password" value={form.pin} onChange={(v) => update("pin", v.replace(/\D/g, ""))} error={errors.pin} />
              <Field id="aadhar" label="Aadhar Number" required icon={IdCard} placeholder="12-digit Aadhar number" inputMode="numeric" maxLength={12} value={form.aadhar} onChange={(v) => update("aadhar", v.replace(/\D/g, ""))} error={errors.aadhar} />
              <Field id="dob" label="Date of Birth" required icon={Calendar} type="date" placeholder="dd-mm-yyyy" value={form.dob} onChange={(v) => update("dob", v)} error={errors.dob} />

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={form.status} onValueChange={(v) => update("status", v as FormState["status"])}>
                  <SelectTrigger id="status" className="h-11 bg-transparent border-[var(--glass-border)] focus:ring-[var(--neon-cyan)]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="sm:col-span-2 flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  ref={submitBtnRef}
                  type="submit"
                  className="relative h-11 flex-1 text-white font-semibold bg-gradient-to-r from-[var(--neon-blue)] via-[var(--primary)] to-[var(--neon-purple)] shadow-[0_0_24px_oklch(0.65_0.2_260_/_40%)] hover:shadow-[0_0_50px_oklch(0.65_0.2_260_/_75%)] hover:scale-[1.01] transition-all overflow-hidden btn-shimmer"
                >
                  <UserPlus className="h-4 w-4" />
                  Create Customer
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={onReset}
                  className="h-11 sm:w-40 bg-transparent border-[var(--glass-border)] hover:bg-white/5 hover:border-[var(--neon-cyan)] hover:rotate-[-2deg] transition-transform"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </Button>
              </div>
            </form>
          </section>

          {/* Search Customer card */}
          <aside
            className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass)] backdrop-blur-xl p-6 sm:p-8 shadow-[0_30px_80px_-30px_oklch(0.6_0.25_300_/_40%)] h-fit"
            style={{ animation: "fadeSlideUp 0.8s cubic-bezier(0.22,1,0.36,1) both" }}
          >
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-[var(--neon-cyan)] to-[var(--neon-purple)] flex items-center justify-center shadow-[0_0_20px_oklch(0.8_0.15_195_/_50%)]">
                <Search className="h-4 w-4 text-white" />
              </span>
              Search Customer
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Enter Aadhaar number to find customer details.
            </p>

            {/* Animated scanner */}
            <div className="mt-5 relative h-24 rounded-xl border border-[var(--glass-border)] overflow-hidden bg-gradient-to-br from-[oklch(0.12_0.03_270)] to-[oklch(0.08_0.04_290)]">
              <Fingerprint className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-16 w-16 text-[var(--neon-cyan)]/40" />
              <div className="scanner-line" />
              <div className="absolute inset-0 grid-overlay opacity-40" />
              <span className="absolute bottom-2 right-3 text-[10px] uppercase tracking-widest text-[var(--neon-cyan)]/70">Bio-scan</span>
            </div>

            <form onSubmit={onSearch} noValidate className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="searchAadhar">Aadhaar Number</Label>
                <div className="relative">
                  <IdCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="searchAadhar"
                    inputMode="numeric"
                    maxLength={12}
                    placeholder="Enter 12-digit Aadhaar Number"
                    value={searchAadhar}
                    onChange={(e) => {
                      setSearchAadhar(e.target.value.replace(/\D/g, ""));
                      setSearchError("");
                    }}
                    className="h-11 pl-10 bg-transparent border-[var(--glass-border)] focus-visible:ring-[var(--neon-cyan)]"
                  />
                </div>
                {searchError && <p className="text-xs text-destructive">{searchError}</p>}
              </div>

              <Button
                type="submit"
                className="w-full h-11 text-white font-semibold bg-gradient-to-r from-[var(--neon-cyan)] via-[var(--primary)] to-[var(--neon-purple)] shadow-[0_0_24px_oklch(0.65_0.2_260_/_40%)] hover:shadow-[0_0_40px_oklch(0.65_0.2_260_/_65%)] hover:scale-[1.02] transition-all btn-shimmer overflow-hidden relative"
              >
                <Search className="h-4 w-4" />
                Search
              </Button>
            </form>

            <div className="mt-6 rounded-xl border border-dashed border-[var(--glass-border)] p-4 text-xs text-muted-foreground flex gap-2">
              <Zap className="h-4 w-4 text-[var(--neon-cyan)] flex-shrink-0" />
              Aadhaar lookups are encrypted end-to-end and audited for compliance.
            </div>
          </aside>
        </div>
      </main>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes popIn {
          0%   { opacity: 0; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes auroraShift {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50%      { transform: translate(40px, -30px) rotate(8deg); }
        }
        @keyframes scannerSweep {
          0%   { top: 0%;   opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes borderShimmerMove {
          0%   { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes btnShimmerMove {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes holoFloat {
          0%, 100% { transform: rotateY(-8deg) rotateX(4deg) translateY(0); }
          50%      { transform: rotateY(-4deg) rotateX(-2deg) translateY(-6px); }
        }

        .aurora-layer {
          position: absolute; inset: -20%;
          background:
            radial-gradient(circle at 20% 30%, oklch(0.65 0.2 260 / 25%) 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, oklch(0.6 0.25 300 / 22%) 0%, transparent 45%),
            radial-gradient(circle at 50% 50%, oklch(0.8 0.15 195 / 18%) 0%, transparent 50%);
          filter: blur(60px);
          animation: auroraShift 18s ease-in-out infinite;
        }
        .grid-overlay {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(oklch(0.4 0.05 270 / 8%) 1px, transparent 1px),
            linear-gradient(90deg, oklch(0.4 0.05 270 / 8%) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%);
        }
        .scanner-line {
          position: absolute; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, var(--neon-cyan), transparent);
          box-shadow: 0 0 12px var(--neon-cyan);
          animation: scannerSweep 2.6s ease-in-out infinite;
        }
        .border-shimmer {
          background: linear-gradient(90deg,
            transparent 0%,
            oklch(0.8 0.15 195 / 35%) 25%,
            oklch(0.6 0.25 300 / 35%) 50%,
            oklch(0.8 0.15 195 / 35%) 75%,
            transparent 100%);
          background-size: 200% 100%;
          -webkit-mask:
            linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
                  mask-composite: exclude;
          padding: 1px;
          animation: borderShimmerMove 6s linear infinite;
        }
        .btn-shimmer::before {
          content: ""; position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent);
          width: 40%;
          animation: btnShimmerMove 2.8s ease-in-out infinite;
        }
        .holo-card { animation: holoFloat 6s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

/* ----------------- Holographic Live Card ----------------- */
function HoloCard({
  name,
  aadhar,
  status,
  completion,
}: {
  name: string;
  aadhar: string;
  status: "active" | "inactive";
  completion: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, mx: 50, my: 50 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setTilt({
      x: (py - 0.5) * -10,
      y: (px - 0.5) * 14,
      mx: px * 100,
      my: py * 100,
    });
  };
  const onLeave = () => setTilt({ x: 0, y: 0, mx: 50, my: 50 });

  return (
    <div
      className="relative max-w-md mx-auto lg:mx-0"
      style={{ animation: "fadeSlideUp 0.9s cubic-bezier(0.22,1,0.36,1) both", perspective: "1200px" }}
    >
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="holo-card relative rounded-2xl p-6 overflow-hidden border border-white/10 shadow-[0_30px_80px_-20px_oklch(0.65_0.2_260_/_60%)]"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.2 0.08 260) 0%, oklch(0.18 0.12 300) 50%, oklch(0.22 0.1 200) 100%)",
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: "transform 0.15s ease-out",
        }}
      >
        {/* Holo sheen following cursor */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(circle at ${tilt.mx}% ${tilt.my}%, rgba(255,255,255,0.35) 0%, transparent 40%)`,
            mixBlendMode: "overlay",
          }}
        />
        {/* Rainbow holo strip */}
        <div className="pointer-events-none absolute -inset-1 opacity-40"
          style={{
            background: `conic-gradient(from ${tilt.mx * 3.6}deg, #ff0080, #7928ca, #00d4ff, #00ff88, #ffea00, #ff0080)`,
            filter: "blur(40px)",
          }}
        />

        <div className="relative flex items-center justify-between text-white/90">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-md bg-gradient-to-br from-white/30 to-white/10 backdrop-blur flex items-center justify-center font-black text-xs">
              N
            </div>
            <span className="text-xs font-semibold tracking-widest">NEXBANK · KYC</span>
          </div>
          <Wifi className="h-4 w-4 text-white/70 rotate-90" />
        </div>

        {/* Chip */}
        <div className="relative mt-6 h-9 w-12 rounded-md bg-gradient-to-br from-yellow-200 via-yellow-400 to-amber-600 shadow-inner overflow-hidden">
          <div className="absolute inset-1 rounded-sm border border-amber-700/40 grid grid-cols-3 grid-rows-3 gap-px">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="bg-amber-700/30" />
            ))}
          </div>
        </div>

        <div className="relative mt-5 text-white text-lg tracking-[0.25em] font-mono">
          {aadhar}
        </div>

        <div className="relative mt-5 flex justify-between items-end text-white/85 text-xs">
          <div>
            <div className="opacity-60 uppercase">Cardholder</div>
            <div className="font-semibold uppercase truncate max-w-[180px]">{name}</div>
          </div>
          <div className="text-right">
            <div className="opacity-60 uppercase">Status</div>
            <div className={`font-semibold flex items-center gap-1 ${status === "active" ? "text-[var(--neon-cyan)]" : "text-muted-foreground"}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${status === "active" ? "bg-[var(--neon-cyan)] animate-pulse" : "bg-muted-foreground"}`} />
              {status.toUpperCase()}
            </div>
          </div>
        </div>

        {/* Bottom progress bar */}
        <div className="relative mt-5 h-1 w-full bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[var(--neon-cyan)] via-[var(--neon-blue)] to-[var(--neon-purple)] transition-all duration-500"
            style={{ width: `${completion}%` }}
          />
        </div>
        <div className="relative mt-2 text-[10px] uppercase tracking-widest text-white/60">
          KYC profile {completion}% complete
        </div>
      </div>
    </div>
  );
}

/* ----------------- Circular progress ring ----------------- */
function ProgressRing({ value }: { value: number }) {
  const r = 22;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div className="relative h-14 w-14 shrink-0">
      <svg viewBox="0 0 56 56" className="h-14 w-14 -rotate-90">
        <circle cx="28" cy="28" r={r} stroke="var(--glass-border)" strokeWidth="4" fill="none" />
        <circle
          cx="28" cy="28" r={r}
          stroke="url(#ringGrad)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.5s ease" }}
        />
        <defs>
          <linearGradient id="ringGrad" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--neon-cyan)" />
            <stop offset="100%" stopColor="var(--neon-purple)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-xs font-bold">
        {value}%
      </div>
    </div>
  );
}

/* ----------------- Field component ----------------- */
function Field({
  id,
  label,
  required,
  icon: Icon,
  error,
  value,
  onChange,
  type = "text",
  placeholder,
  inputMode,
  maxLength,
}: {
  id: string;
  label: string;
  required?: boolean;
  icon: React.ComponentType<{ className?: string }>;
  error?: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  inputMode?: "text" | "numeric" | "email" | "tel";
  maxLength?: number;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="flex items-center gap-1">
        {label}
        {required && <span className="text-destructive">*</span>}
        {value && !error && <CheckCircle2 className="h-3 w-3 text-[var(--neon-cyan)] ml-1" />}
      </Label>
      <div className="relative group">
        {/* Glow on focus */}
        <div
          className="pointer-events-none absolute -inset-px rounded-md transition-opacity"
          style={{
            opacity: focused ? 1 : 0,
            background: "linear-gradient(90deg, var(--neon-cyan), var(--neon-purple))",
            filter: "blur(8px)",
          }}
        />
        <div className="relative">
          <Icon className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors ${focused ? "text-[var(--neon-cyan)]" : "text-muted-foreground"}`} />
          <Input
            id={id}
            type={type}
            value={value}
            placeholder={placeholder}
            inputMode={inputMode}
            maxLength={maxLength}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={(e) => onChange(e.target.value)}
            className={`h-11 pl-10 bg-transparent border-[var(--glass-border)] focus-visible:ring-[var(--neon-cyan)] transition-all ${error ? "border-destructive/60" : ""}`}
          />
        </div>
      </div>
      {error && (
        <p className="text-xs text-destructive" style={{ animation: "fadeSlideUp 0.25s ease both" }}>
          {error}
        </p>
      )}
    </div>
  );
}
