

## Plan: Login & Signup Pages

Create two new routes matching the NexBank dark/glass/neon aesthetic.

### Routes
- `src/routes/login.tsx` → `/login`
- `src/routes/signup.tsx` → `/signup`

### Shared Layout (per page)
Split-screen on desktop, stacked on mobile:
- **Left panel (hidden on mobile)** — Brand showcase: NexBank logo, tagline, animated background orbs (reusing existing `animate-float-slow`, `animate-pulse-glow`), floating credit card mockup, trust badges. Same dark gradient backdrop as homepage.
- **Right panel** — Glass card form with neon-bordered inputs, gradient CTA button.

### Color Theme (already in styles.css — reuse)
- Background: `--background` (deep indigo/black)
- Card: glassmorphism using `--glass` + `--glass-border` with `backdrop-blur-xl`
- Primary CTA: gradient `from-[--neon-blue] via-[--primary] to-[--neon-purple]` with glow shadow
- Inputs: transparent bg, `--glass-border`, focus ring `--neon-cyan`
- Accents: `--neon-cyan` for links, `--neon-purple` for hover

### Login Page (`/login`)
- Heading: "Welcome Back" (gradient text)
- Subtext: "Login to manage accounts, loans, transactions, and admin tools."
- Fields: Email, Password (with show/hide eye toggle)
- "Forgot password?" link (right-aligned, neon-cyan)
- Primary button: "Login" (gradient, glow on hover)
- Divider: "or" with neon line
- Secondary: "Continue with Google" (outline glass button + Google icon SVG)
- Footer link: "New user? Sign Up" → `/signup`

### Signup Page (`/signup`)
- Heading: "Create Your Account" (gradient text)
- Subtext: "Join NexBank — next-gen digital banking."
- Fields: Full Name *, Email *, Password * (show/hide), Confirm Password *
- Inline validation messages (red `--destructive`) shown on blur/submit:
  - "Full name is required", "Email is required", "Password is required", "Please confirm your password", "Passwords do not match"
- Primary button: "Create Account" (gradient)
- Divider + "Continue with Google"
- Footer link: "Already have an account? Login" → `/login`

### Form behavior
- Local React state (`useState`) — no backend wiring (auth not requested)
- Required-field validation on submit; show error text under each field
- Use existing shadcn `Input`, `Label`, `Button` components for consistency

### Navbar wiring (`src/routes/index.tsx`)
- Wrap existing "Login" and "Sign Up" buttons (desktop + mobile menu) with `<Link to="/login">` and `<Link to="/signup">` from `@tanstack/react-router`.

### Per-route SEO
Each route defines its own `head()` with unique title, description, og:title, og:description (e.g., "Login — NexBank", "Sign Up — NexBank").

### Animations
- Form card: fade-in + slide-up on mount (CSS keyframe, no GSAP needed)
- Floating orbs on left panel reuse existing utility classes
- Button hover: scale + intensified glow shadow

