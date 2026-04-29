import type { WizardData } from '../types/wizard'
import { DEFAULT_CONSTRAINTS } from '../types/wizard'

export interface Preset {
  id: string
  label: string
  blurb: string
  emoji: string
  data: WizardData
}

export const PRESETS: Preset[] = [
  {
    id: 'saas-landing',
    label: 'SaaS Landing Page',
    blurb: 'Premium B2B marketing site with hero, features, pricing, and CTA',
    emoji: '🚀',
    data: {
      basics: {
        appType: 'marketing website',
        appName: 'YourSaaS',
        purpose: 'Enterprise-grade SaaS platform for team collaboration',
        targetUser: 'Busy CTOs and engineering leads at mid-market companies',
      },
      design: {
        styles: ['premium', 'minimal'],
        moods: ['confident', 'serious'],
        colors: 'Navy blue + gold accents, white space, clean backgrounds',
        typography: 'Serif headers (Playfair), clean sans-serif body (Inter)',
        layout: 'Full-width sections with asymmetric content blocks',
        inspiration: 'Stripe, Notion, Linear — modern SaaS vibes with editorial polish',
      },
      pages: {
        pages: [
          {
            path: '/',
            description: 'Hero with tagline, problem/solution callout, CTA button linking to signup',
          },
          {
            path: '/features',
            description: 'Grid of 6–8 feature cards with icons, descriptions, and benefits',
          },
          {
            path: '/pricing',
            description: 'Comparison table (free/pro/enterprise) with feature checkmarks and CTA per tier',
          },
          {
            path: '/about',
            description: 'Team intro, company mission, social proof (logo wall of customers)',
          },
          {
            path: '/blog',
            description: 'Blog listing with search, tags, featured post highlight',
          },
        ],
      },
      features: {
        features: [
          { description: 'User authentication with email + password' },
          { description: 'Team management and role-based access control' },
          { description: 'Real-time collaboration workspace with activity log' },
          { description: 'Advanced search across all workspaces and documents' },
          { description: 'Webhooks and REST API for third-party integrations' },
          { description: 'SSO support (SAML 2.0) for enterprise customers' },
          { description: 'Audit logs and compliance reporting' },
        ],
        entities: [
          {
            name: 'User',
            fields: 'id, email, password_hash, full_name, avatar_url, role, created_at, updated_at',
          },
          {
            name: 'Team',
            fields: 'id, name, slug, owner_id, logo_url, plan_tier, created_at, updated_at',
          },
          {
            name: 'Workspace',
            fields: 'id, team_id, name, description, members[], settings, created_at, updated_at',
          },
          {
            name: 'Document',
            fields: 'id, workspace_id, title, content, author_id, tags[], last_modified_by, updated_at',
          },
        ],
      },
      backend: {
        auth: 'oauth',
        database: 'supabase',
        storage: 'Supabase Storage for avatars and file uploads',
        constraints: [...DEFAULT_CONSTRAINTS, 'Enterprise-grade security (SOC 2, GDPR compliance)', 'Zero-downtime deployments'],
      },
      final: {
        whatToDoFirst: `Before starting, clarify: (1) Which OAuth providers (Google, GitHub, Microsoft)? (2) What's the exact compliance requirement (SOC 2, HIPAA, GDPR only)? (3) Which integrations are MVP vs. future (Slack, Zapier, etc.)? Then propose: auth → core workspace CRUD → API → then landing page marketing assets. I'll confirm before you code.`,
      },
    },
  },
  {
    id: 'internal-dashboard',
    label: 'Internal Dashboard',
    blurb: 'Analytics and ops dashboard with sidebar nav, real-time charts, and data tables',
    emoji: '📊',
    data: {
      basics: {
        appType: 'admin dashboard',
        appName: 'Analytics Hub',
        purpose: 'Internal analytics and operations platform for real-time business insights',
        targetUser: 'Operators, analysts, and managers who need daily metrics at a glance',
      },
      design: {
        styles: ['minimal', 'developer-focused'],
        moods: ['calm', 'confident'],
        colors: 'Slate/charcoal with accent blues or greens for status indicators',
        typography: 'Monospace for data (Monaco), clean sans-serif for UI (Inter)',
        layout: 'Sidebar nav left, main content area with grid of cards/widgets',
        inspiration: 'Vercel Analytics, Supabase Dashboard, Linear – focused, data-first design',
      },
      pages: {
        pages: [
          {
            path: '/',
            description: 'Overview dashboard with KPI cards, real-time chart, recent activity feed',
          },
          {
            path: '/metrics',
            description: 'Detailed metrics view with time-range picker and export-to-CSV button',
          },
          {
            path: '/users',
            description: 'Table of users (paginated, searchable, sortable) with status badges',
          },
          {
            path: '/logs',
            description: 'Event/error logs with filtering by level, date range, and full-text search',
          },
          {
            path: '/settings',
            description: 'Admin settings: alert thresholds, user permissions, export schedules',
          },
        ],
      },
      features: {
        features: [
          { description: 'Real-time chart rendering (line, bar, pie) with interactivity' },
          { description: 'Searchable, sortable data tables with pagination' },
          { description: 'Date-range picker for filtering metrics' },
          { description: 'CSV/JSON export of reports' },
          { description: 'Role-based access (viewer, editor, admin)' },
          { description: 'Email alerts for threshold breaches' },
          { description: 'Dark mode support for night-shift teams' },
        ],
        entities: [
          {
            name: 'Metric',
            fields: 'id, name, value, unit, timestamp, tags[], category',
          },
          {
            name: 'Event',
            fields: 'id, type, level (info/warn/error), message, user_id, context_data, timestamp',
          },
          {
            name: 'Alert',
            fields: 'id, metric_id, threshold, comparison (gt/lt), triggered_at, resolved_at, recipients[]',
          },
          {
            name: 'UserSession',
            fields: 'id, user_id, login_at, logout_at, ip_address, user_agent',
          },
        ],
      },
      backend: {
        auth: 'email-password',
        database: 'supabase',
        storage: 'Supabase for log archives and export files',
        constraints: [...DEFAULT_CONSTRAINTS, 'Query performance critical – optimize DB indexes', 'Real-time updates via WebSockets'],
      },
      final: {
        whatToDoFirst: `Before building: (1) What metrics matter most (revenue, users, errors)? (2) What's the alert notification channel (email, Slack, PagerDuty)? (3) How long to retain logs (30/90 days)? Then propose: auth → basic KPI cards → charts → tables → alerts. I'll confirm.`,
      },
    },
  },
  {
    id: 'portfolio',
    label: 'Personal Portfolio',
    blurb: 'Bold, expressive designer/developer portfolio with projects gallery',
    emoji: '🎨',
    data: {
      basics: {
        appType: 'portfolio website',
        appName: 'Creative Portfolio',
        purpose: 'Showcase design and development work to potential clients and collaborators',
        targetUser: 'Hiring managers, creative directors, and potential clients browsing for talent',
      },
      design: {
        styles: ['bold', 'expressive'],
        moods: ['energetic', 'warm'],
        colors: 'Vibrant primary (hot pink, teal, or orange) with contrasting neutrals (off-white, charcoal)',
        typography: 'Display serif or geometric sans for headers (Poppins, Clash), smooth sans for body',
        layout: 'Full-width hero, staggered project grid, asymmetric card layouts',
        inspiration: 'Awwwards winners, Design Observer, personal brands by Miklos, Sean Halpin',
      },
      pages: {
        pages: [
          {
            path: '/',
            description: 'Hero with name, one-liner tagline, animated gradient, scroll-to-work CTA',
          },
          {
            path: '/work',
            description: 'Gallery of 8–12 projects in a masonry or staggered grid with hover effects',
          },
          {
            path: '/project/:slug',
            description: 'Detailed project page: hero image, problem/solution, process, results, tech stack',
          },
          {
            path: '/about',
            description: 'Personal story, values, skills + tools, photo, career milestones timeline',
          },
          {
            path: '/contact',
            description: 'Contact form (name, email, message) with email notification integration',
          },
        ],
      },
      features: {
        features: [
          { description: 'Smooth scrolling animations and parallax effects on hero' },
          { description: 'Image lazy-loading and optimization for gallery performance' },
          { description: 'Responsive image galleries with lightbox zoom' },
          { description: 'Contact form with validation and email notification' },
          { description: 'Social media links in footer and header' },
          { description: 'Blog or case studies (optional, with markdown support)' },
          { description: 'Analytics tracking (view counts per project)' },
        ],
        entities: [
          {
            name: 'Project',
            fields: 'id, title, slug, description, images[], tags[], featured, year, link_url, github_url',
          },
          {
            name: 'ContactSubmission',
            fields: 'id, name, email, message, created_at, read_status, replied_at',
          },
          {
            name: 'BlogPost',
            fields: 'id, title, slug, excerpt, content, published_at, tags[], hero_image_url',
          },
        ],
      },
      backend: {
        auth: 'none',
        database: 'supabase',
        storage: 'Supabase Storage for project images and hero images',
        constraints: [...DEFAULT_CONSTRAINTS, 'Optimized images (WebP, responsive sizes)', 'Fast page loads (Lighthouse 90+)'],
      },
      final: {
        whatToDoFirst: `Before writing code: (1) Which projects/case studies to feature (limit to 8–10 best)? (2) Contact form — just email, or also Slack integration? (3) Blog needed on launch or post-MVP? Then propose: static hero → projects grid → single project detail page → contact form. I'll confirm before coding.`,
      },
    },
  },
  {
    id: 'marketplace',
    label: 'Marketplace MVP',
    blurb: 'Two-sided marketplace with buyers, sellers, listings, and transactions',
    emoji: '🏪',
    data: {
      basics: {
        appType: 'two-sided marketplace',
        appName: 'Creative Marketplace',
        purpose: 'Connect creators and buyers for a specific niche (services, digital goods, or physical products)',
        targetUser: 'Both sellers (creators) and buyers (customers) in a specific vertical',
      },
      design: {
        styles: ['minimal', 'premium'],
        moods: ['warm', 'confident'],
        colors: 'Soft, neutral palette (cream, sage, taupe) with warm accent (terracotta or olive)',
        typography: 'Modern serif headers, approachable sans-serif body (Montserrat, Lato)',
        layout: 'Card-based product grid, prominent search/filter bar, merchant profile cards',
        inspiration: 'Etsy, Gumroad, Substack – community-focused, maker-friendly design',
      },
      pages: {
        pages: [
          {
            path: '/',
            description: 'Homepage with search bar, featured sellers carousel, category carousel, trending items',
          },
          {
            path: '/browse',
            description: 'Product grid (infinite scroll or pagination) with category/price/rating filters',
          },
          {
            path: '/product/:id',
            description: 'Product detail: gallery, description, price, seller info, reviews, "Add to cart" CTA',
          },
          {
            path: '/seller/:id',
            description: 'Merchant profile: bio, avatar, reviews, product listing, follow button',
          },
          {
            path: '/cart',
            description: 'Shopping cart with item removal, quantity adjust, shipping estimate, checkout CTA',
          },
          {
            path: '/dashboard',
            description: 'Seller dashboard: earnings, sales chart, pending orders, inventory management',
          },
        ],
      },
      features: {
        features: [
          { description: 'User authentication (email or OAuth) and seller onboarding flow' },
          { description: 'Product listing and inventory management for sellers' },
          { description: 'Search with full-text indexing and smart filters' },
          { description: 'Shopping cart and checkout with Stripe payment processing' },
          { description: 'Order tracking and status updates for buyers and sellers' },
          { description: 'Seller ratings and buyer reviews per product' },
          { description: 'Notification system for orders, messages, and seller updates' },
        ],
        entities: [
          {
            name: 'User',
            fields: 'id, email, password_hash, full_name, avatar_url, bio, is_seller, created_at',
          },
          {
            name: 'Product',
            fields: 'id, seller_id, title, description, price, images[], category, stock, rating, created_at',
          },
          {
            name: 'Order',
            fields: 'id, buyer_id, items[], total_price, status, shipping_address, created_at, delivered_at',
          },
          {
            name: 'Review',
            fields: 'id, product_id, buyer_id, rating (1–5), comment, created_at, helpful_count',
          },
          {
            name: 'SellerProfile',
            fields: 'id, user_id, shop_name, banner_image, bio, response_time, return_policy',
          },
        ],
      },
      backend: {
        auth: 'oauth',
        database: 'supabase',
        storage: 'Supabase Storage for product images and seller banners',
        constraints: [...DEFAULT_CONSTRAINTS, 'Payments via Stripe (production account required)', 'Search indexed for fast queries'],
      },
      final: {
        whatToDoFirst: `Before starting: (1) What category of marketplace (services, digital goods, physical products)? (2) Commission model (flat fee, percentage, free)? (3) Payment flow — Stripe Connect or simple escrow? (4) MVP: buyer-only or seller onboarding too? Then propose: buyer auth → product listing → cart → Stripe checkout → seller dashboard. I'll confirm the order.`,
      },
    },
  },
  {
    id: 'validator',
    label: 'Side-Project Idea Validator',
    blurb: 'Single-page experiment with landing, email capture, and Supabase backend',
    emoji: '💡',
    data: {
      basics: {
        appType: 'landing page + form',
        appName: 'Idea Validator',
        purpose: 'Validate a new side project idea with early user interest and email capture',
        targetUser: 'Prospective users intrigued by a new side project, willing to join a waitlist',
      },
      design: {
        styles: ['playful', 'minimal'],
        moods: ['fun', 'energetic'],
        colors: 'Bright, approachable palette (sky blue, sunny yellow, mint green) with white space',
        typography: 'Friendly, rounded sans-serif throughout (Poppins, Lexend) for approachability',
        layout: 'Single-page with sections: hero, why it matters, how it works, early-bird sign-up, FAQ',
        inspiration: 'Pika, Descript launch pages – playful, conversational, quick scroll',
      },
      pages: {
        pages: [
          {
            path: '/',
            description: 'Single scrollable page with hero, value prop, visual demo/mockup, email capture form, FAQ, footer',
          },
        ],
      },
      features: {
        features: [
          { description: 'Prominent email capture form with email validation' },
          { description: 'Email confirmation / welcome email automation' },
          { description: 'Optional: early-bird incentive (discount, exclusive feature access)' },
          { description: 'FAQ section addressing common objections' },
          { description: 'Embedded demo video or interactive mockup' },
          { description: 'Social share buttons and viral loop (referral bonus)' },
          { description: 'Admin view: subscriber list, email export, conversion metrics' },
        ],
        entities: [
          {
            name: 'Subscriber',
            fields: 'id, email, name (optional), referral_code, referred_by_id, signup_date, email_sent_at',
          },
          {
            name: 'Referral',
            fields: 'id, referrer_id, referred_id, created_at, status (pending/completed)',
          },
        ],
      },
      backend: {
        auth: 'none',
        database: 'supabase',
        storage: 'Supabase for any user-generated content or demo assets',
        constraints: [...DEFAULT_CONSTRAINTS, 'Email sending via SendGrid or similar', 'Spam protection on form (reCAPTCHA or rate limiting)'],
      },
      final: {
        whatToDoFirst: `Before starting: (1) Email automation platform (Sendgrid, Mailchimp, or manual for now)? (2) Any referral incentive (discount code, early access)? (3) Admin access to subscriber list – how restricted? Then propose: build form → email validation → Supabase storage → welcome email trigger → admin dashboard. I'll confirm.`,
      },
    },
  },
]
