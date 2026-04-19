import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
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
  fullName: "",
  phone: "",
  email: "",
  address: "",
  pin: "",
  aadhar: "",
  dob: "",
  status: "active",
};

function CustomerManagementPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [success, setSuccess] = useState(false);
  const [searchAadhar, setSearchAadhar] = useState("");
  const [searchError, setSearchError] = useState("");

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

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSuccess(true);
      setForm(initialForm);
    }
  };

  const onReset = () => {
    setForm(initialForm);
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

  return (
    <div className="min-h-screen w-full bg-background text-foreground relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-background via-[oklch(0.1_0.03_280)] to-background" />
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-[var(--neon-blue)]/15 blur-3xl animate-float-slow -z-10" />
      <div className="absolute -bottom-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-[var(--neon-purple)]/15 blur-3xl animate-float-reverse -z-10" />
      <div className="absolute top-1/3 right-1/4 h-72 w-72 rounded-full bg-[var(--neon-cyan)]/10 blur-3xl animate-pulse-glow -z-10" />

      {/* Top bar */}
      <header className="sticky top-0 z-20 border-b border-[var(--glass-border)] bg-[var(--glass)] backdrop-blur-xl">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-[var(--neon-blue)] to-[var(--neon-purple)] flex items-center justify-center text-white font-black">
              N
            </div>
            <span className="text-xl font-bold">
              Nex<span className="text-primary">Bank</span>
            </span>
          </Link>
          <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
            <Shield className="h-4 w-4 text-[var(--neon-cyan)]" />
            Admin Console
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
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold bg-gradient-to-r from-foreground via-[var(--neon-cyan)] to-[var(--neon-purple)] bg-clip-text text-transparent">
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
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-[var(--glass-border)] bg-[var(--glass)] backdrop-blur-xl p-4"
              >
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="text-xs">{s.label}</span>
                  <s.icon className="h-4 w-4 text-[var(--neon-cyan)]" />
                </div>
                <div className="mt-1 text-xl font-bold">{s.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Create Customer card */}
          <section
            className="lg:col-span-2 rounded-2xl border border-[var(--glass-border)] bg-[var(--glass)] backdrop-blur-xl p-6 sm:p-8 shadow-[0_30px_80px_-30px_oklch(0.65_0.2_260_/_40%)]"
            style={{ animation: "fadeSlideUp 0.7s cubic-bezier(0.22,1,0.36,1) both" }}
          >
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-[var(--neon-blue)] to-[var(--neon-purple)] flex items-center justify-center">
                    <UserPlus className="h-4 w-4 text-white" />
                  </span>
                  Create New Customer
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  All fields marked <span className="text-destructive">*</span> are required.
                </p>
              </div>
            </div>

            {success && (
              <div className="mb-6 flex items-center gap-2 rounded-lg border border-[var(--neon-cyan)]/40 bg-[var(--neon-cyan)]/10 px-4 py-3 text-sm">
                <CheckCircle2 className="h-4 w-4 text-[var(--neon-cyan)]" />
                Customer account created successfully.
              </div>
            )}

            <form onSubmit={onSubmit} noValidate className="grid sm:grid-cols-2 gap-5">
              <Field
                id="fullName"
                label="Full Name"
                required
                icon={User}
                placeholder="Enter full name"
                value={form.fullName}
                onChange={(v) => update("fullName", v)}
                error={errors.fullName}
              />
              <Field
                id="phone"
                label="Phone Number"
                required
                icon={Phone}
                placeholder="10-digit mobile number"
                inputMode="numeric"
                maxLength={10}
                value={form.phone}
                onChange={(v) => update("phone", v.replace(/\D/g, ""))}
                error={errors.phone}
              />
              <Field
                id="email"
                label="Email"
                required
                icon={Mail}
                type="email"
                placeholder="email@example.com"
                value={form.email}
                onChange={(v) => update("email", v)}
                error={errors.email}
              />
              <Field
                id="address"
                label="Address"
                required
                icon={MapPin}
                placeholder="Enter address"
                value={form.address}
                onChange={(v) => update("address", v)}
                error={errors.address}
              />
              <Field
                id="pin"
                label="Customer PIN"
                required
                icon={KeyRound}
                placeholder="6-digit PIN"
                inputMode="numeric"
                maxLength={6}
                type="password"
                value={form.pin}
                onChange={(v) => update("pin", v.replace(/\D/g, ""))}
                error={errors.pin}
              />
              <Field
                id="aadhar"
                label="Aadhar Number"
                required
                icon={IdCard}
                placeholder="12-digit Aadhar number"
                inputMode="numeric"
                maxLength={12}
                value={form.aadhar}
                onChange={(v) => update("aadhar", v.replace(/\D/g, ""))}
                error={errors.aadhar}
              />
              <Field
                id="dob"
                label="Date of Birth"
                required
                icon={Calendar}
                type="date"
                placeholder="dd-mm-yyyy"
                value={form.dob}
                onChange={(v) => update("dob", v)}
                error={errors.dob}
              />

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={form.status}
                  onValueChange={(v) => update("status", v as FormState["status"])}
                >
                  <SelectTrigger
                    id="status"
                    className="h-11 bg-transparent border-[var(--glass-border)] focus:ring-[var(--neon-cyan)]"
                  >
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
                  type="submit"
                  className="h-11 flex-1 text-white font-semibold bg-gradient-to-r from-[var(--neon-blue)] via-[var(--primary)] to-[var(--neon-purple)] shadow-[0_0_24px_oklch(0.65_0.2_260_/_40%)] hover:shadow-[0_0_40px_oklch(0.65_0.2_260_/_65%)] hover:scale-[1.01] transition-all"
                >
                  <UserPlus className="h-4 w-4" />
                  Create Customer
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={onReset}
                  className="h-11 sm:w-40 bg-transparent border-[var(--glass-border)] hover:bg-white/5 hover:border-[var(--neon-cyan)]"
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
              <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-[var(--neon-cyan)] to-[var(--neon-purple)] flex items-center justify-center">
                <Search className="h-4 w-4 text-white" />
              </span>
              Search Customer
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Enter Aadhaar number to find customer details.
            </p>

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
                className="w-full h-11 text-white font-semibold bg-gradient-to-r from-[var(--neon-cyan)] via-[var(--primary)] to-[var(--neon-purple)] shadow-[0_0_24px_oklch(0.65_0.2_260_/_40%)] hover:shadow-[0_0_40px_oklch(0.65_0.2_260_/_65%)] hover:scale-[1.02] transition-all"
              >
                <Search className="h-4 w-4" />
                Search
              </Button>
            </form>

            <div className="mt-6 rounded-xl border border-dashed border-[var(--glass-border)] p-4 text-xs text-muted-foreground">
              Tip: Aadhaar lookups are encrypted end-to-end and audited for compliance.
            </div>
          </aside>
        </div>
      </main>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
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
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          id={id}
          type={type}
          value={value}
          placeholder={placeholder}
          inputMode={inputMode}
          maxLength={maxLength}
          onChange={(e) => onChange(e.target.value)}
          className="h-11 pl-10 bg-transparent border-[var(--glass-border)] focus-visible:ring-[var(--neon-cyan)]"
        />
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
