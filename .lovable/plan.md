

# Premium Banking Homepage

## Overview
A single-page, dark-themed fintech homepage with glassmorphism, smooth animations, and rich visuals — inspired by Stripe/Razorpay aesthetics.

## Sections (all on index.tsx)

1. **Navbar** — Fixed top bar with glass blur background. Logo left, Login (outline) + Sign Up (glowing gradient) buttons right. Hover animations on all items.

2. **Hero Section** — Full-viewport with large fintech background image, gradient overlay, bold headline ("Next Generation Digital Banking Experience"), subtext, two CTA buttons (Get Started, Explore Features), and floating animated credit card mockups.

3. **Features Section** — 4 glass cards (Account Management, Instant Transactions, Secure Payments, Loan Services) each with an icon, image, title, description, and hover glow/scale effects.

4. **Dashboard Preview** — Mock banking dashboard UI with balance display, mini chart, and transaction list — presented as a floating glass panel with scroll-triggered fade+slide animation.

5. **Security Section** — Shield/lock imagery, encryption messaging, glass cards highlighting security features with subtle glow animations.

6. **Footer** — Simple dark footer with links and branding.

## Visual Design
- Dark background (#0a0a1a range) with blue/purple/neon gradient accents
- Glassmorphism cards (backdrop-blur, semi-transparent backgrounds, glowing borders)
- High-quality stock images from Unsplash (banking, fintech, dashboards, mobile banking)
- Soft shadows, gradient glows, smooth transitions

## Animations
- GSAP + ScrollTrigger for scroll-based reveal animations (fade-in, slide-up, parallax)
- Floating credit cards with gentle continuous motion
- Hover effects on cards and buttons (scale, glow intensify)
- Staggered entrance animations for feature cards

## Tech
- GSAP library (added as dependency)
- All content in a single homepage component
- Fully responsive with Tailwind breakpoints
- Images sourced from Unsplash URLs

