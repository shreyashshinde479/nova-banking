import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({
    meta: [
      { title: "Login — NexBank" },
      { name: "description", content: "Login to NexBank to manage accounts, loans, transactions, and admin tools." },
      { property: "og:title", content: "Login — NexBank" },
      { property: "og:description", content: "Securely access your NexBank dashboard." },
    ],
  }),
});

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.24 1.4-1.7 4.1-5.5 4.1-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.2.8 3.9 1.5l2.7-2.6C16.9 3.3 14.7 2.3 12 2.3 6.9 2.3 2.8 6.4 2.8 11.5S6.9 20.7 12 20.7c6.9 0 9.5-4.8 9.5-7.3 0-.5 0-.9-.1-1.3H12z"/>
    </svg>
  );
}

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!email.trim()) next.email = "Email is required";
    if (!password) next.password = "Password is required";
    setErrors(next);
    if (Object.keys(next).length === 0) {
      navigate({ to: "/dashboard/customers" });
    }
  };

  return (
    <div className="min-h-screen w-full bg-background text-foreground grid lg:grid-cols-2 overflow-hidden">
      {/* Brand panel */}
      <aside className="relative hidden lg:flex flex-col justify-between p-12 overflow-hidden border-r border-[var(--glass-border)]">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[oklch(0.12_0.05_270)] via-[oklch(0.09_0.04_290)] to-[oklch(0.08_0.05_250)]" />
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-[var(--neon-blue)]/25 blur-3xl animate-float-slow" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[var(--neon-purple)]/25 blur-3xl animate-float-reverse" />
        <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--neon-cyan)]/10 blur-3xl animate-pulse-glow" />

        <Link to="/" className="flex items-center gap-2 relative z-10">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[var(--neon-blue)] to-[var(--neon-purple)] flex items-center justify-center text-white font-black">N</div>
          <span className="text-2xl font-bold">Nex<span className="text-primary">Bank</span></span>
        </Link>

        <div className="relative z-10 space-y-6">
          <div className="relative h-56 w-full max-w-sm">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--neon-blue)] via-[var(--primary)] to-[var(--neon-purple)] p-6 shadow-[0_30px_80px_-20px_oklch(0.65_0.2_260_/_60%)] animate-float-slow">
              <div className="flex justify-between text-white/90 text-xs font-medium">
                <span>NEXBANK</span>
                <span>VISA</span>
              </div>
              <div className="mt-10 text-white text-xl tracking-[0.3em]">•••• •••• •••• 4829</div>
              <div className="mt-6 flex justify-between text-white/80 text-xs">
                <div><div className="opacity-70">CARDHOLDER</div><div>ALEX RIVERA</div></div>
                <div><div className="opacity-70">EXPIRES</div><div>09/29</div></div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 h-40 w-64 rounded-2xl bg-gradient-to-br from-[var(--neon-purple)] to-[var(--neon-cyan)] opacity-60 blur-sm animate-float-reverse" />
          </div>

          <h2 className="text-4xl font-bold leading-tight max-w-md">
            Banking, <span className="bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-purple)] bg-clip-text text-transparent">reimagined</span> for the next generation.
          </h2>
          <p className="text-muted-foreground max-w-md">Secure, instant, and intelligent — your finances, fully under control.</p>

          <div className="flex gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><Shield className="h-4 w-4 text-[var(--neon-cyan)]" />Bank-grade encryption</div>
            <div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-[var(--neon-purple)]" />Trusted by 2M+</div>
          </div>
        </div>

        <div className="relative z-10 text-xs text-muted-foreground">© {new Date().getFullYear()} NexBank Financial</div>
      </aside>

      {/* Form panel */}
      <main className="flex items-center justify-center p-6 sm:p-12 relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-background via-[oklch(0.1_0.03_280)] to-background" />
        <div
          className="w-full max-w-md rounded-2xl border border-[var(--glass-border)] bg-[var(--glass)] backdrop-blur-xl p-8 shadow-[0_30px_80px_-30px_oklch(0.65_0.2_260_/_40%)]"
          style={{ animation: "fadeSlideUp 0.7s cubic-bezier(0.22,1,0.36,1) both" }}
        >
          <Link to="/" className="lg:hidden mb-6 flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[var(--neon-blue)] to-[var(--neon-purple)] flex items-center justify-center text-white font-black text-sm">N</div>
            <span className="text-lg font-bold">Nex<span className="text-primary">Bank</span></span>
          </Link>

          <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground via-[var(--neon-cyan)] to-[var(--neon-purple)] bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Login to manage accounts, loans, transactions, and admin tools.
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-5" noValidate>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="h-11 pl-10 bg-transparent border-[var(--glass-border)] focus-visible:ring-[var(--neon-cyan)]"
                />
              </div>
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <button type="button" className="text-xs text-[var(--neon-cyan)] hover:text-[var(--neon-purple)] transition-colors">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-11 pl-10 pr-10 bg-transparent border-[var(--glass-border)] focus-visible:ring-[var(--neon-cyan)]"
                />
                <button type="button" onClick={() => setShowPw((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" aria-label="Toggle password">
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
            </div>

            <Button
              type="submit"
              className="w-full h-11 text-white font-semibold bg-gradient-to-r from-[var(--neon-blue)] via-[var(--primary)] to-[var(--neon-purple)] shadow-[0_0_24px_oklch(0.65_0.2_260_/_40%)] hover:shadow-[0_0_40px_oklch(0.65_0.2_260_/_65%)] hover:scale-[1.02] transition-all"
            >
              Login
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--glass-border)] to-transparent" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-[var(--glass)] px-3 text-muted-foreground">or</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full h-11 bg-transparent border-[var(--glass-border)] hover:bg-white/5 hover:border-[var(--neon-cyan)]"
            >
              <GoogleIcon />
              <span className="ml-2">Continue with Google</span>
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            New user?{" "}
            <Link to="/signup" className="text-[var(--neon-cyan)] hover:text-[var(--neon-purple)] font-medium transition-colors">
              Sign Up
            </Link>
          </p>
        </div>

        <style>{`
          @keyframes fadeSlideUp {
            from { opacity: 0; transform: translateY(16px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </main>
    </div>
  );
}
