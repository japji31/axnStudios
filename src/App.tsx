import { type ReactNode, useEffect, useState } from 'react';
import {
  ArrowUpRight,
  Asterisk,
  Bot,
  Code2,
  Layers3,
  Mail,
  MapPin,
  Menu,
  Workflow,
  X,
  type LucideIcon,
} from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { lcpImage, PageMeta } from '@/components/page-meta';
import { Reveal } from '@/components/reveal';
import { Testimonials } from '@/components/testimonials';
import { visibleTestimonials } from '@/testimonials';
import NotFound from '@/pages/not-found';
import { Link, Route, Router as WouterRouter, Switch, useLocation } from 'wouter';

const site = {
  name: 'AXN Studios',
  location: '97-10 62nd Dr Rego Park, NY 11374',
  email: 'axnstudios31@gmail.com',
};

const mailto = (subject: string, body?: string) =>
  `mailto:${site.email}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ''}`;

function Header() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];
  return (
    <header className="header">
      <div className="container-wide header-inner">
        <Link href="/" className="brand" aria-label="AXN Studios — home" data-testid="link-brand">
          <img src="/logo-dark.png" alt="AXN Studios" width={767} height={273} />
        </Link>
        <nav className="main-nav" aria-label="Primary navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link ${location === link.href ? 'active' : ''}`}
              data-testid={`link-nav-${link.label.toLowerCase().replaceAll(' ', '-')}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <a href={mailto('Project inquiry')} className="button button-dark" data-testid="link-header-cta">
          Let’s Talk <ArrowUpRight size={14} />
        </a>
        <button
          type="button"
          className="menu-toggle"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          data-testid="button-mobile-menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <nav className="mobile-menu" aria-label="Mobile navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link ${location === link.href ? 'active' : ''}`}
              onClick={() => setOpen(false)}
              data-testid={`link-mobile-${link.label.toLowerCase().replaceAll(' ', '-')}`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={mailto('Project inquiry')}
            className="button button-dark"
            onClick={() => setOpen(false)}
            data-testid="link-mobile-cta"
          >
            Let’s Talk <ArrowUpRight size={14} />
          </a>
        </nav>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container-wide">
        <div className="footer-grid">
          <div>
            <Link href="/" className="footer-brand" aria-label="AXN Studios — home" data-testid="link-footer-brand">
              <img src="/logo-light.png" alt="AXN Studios" width={767} height={273} />
            </Link>
          </div>
          <div>
            <span className="footer-label">Pages</span>
            <div className="footer-links">
              <Link href="/" data-testid="link-footer-home">
                Home
              </Link>
              <Link href="/about" data-testid="link-footer-about">
                About
              </Link>
              <Link href="/contact" data-testid="link-footer-contact">
                Contact
              </Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}

function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="site-shell">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

const services: {
  number: string;
  icon: LucideIcon;
  title: string;
  headline: string;
  description: string;
  list: string[];
}[] = [
  {
    number: '01',
    icon: Code2,
    title: 'Web Development',
    headline: 'Websites that work as hard as you do.',
    description:
      'We build fast, responsive websites and powerful web experiences designed to turn visitors into customers and ideas into digital products.',
    list: [
      'Business Websites',
      'E-commerce Solutions',
      'Web Applications & Dashboards',
      'UI Systems & Responsive Design',
    ],
  },
  {
    number: '02',
    icon: Layers3,
    title: 'App Development',
    headline: 'Custom software. Built around your business.',
    description:
      'From SaaS platforms to internal business tools, we develop scalable applications that simplify complex processes and help your business move faster.',
    list: [
      'Custom Web & App Development',
      'SaaS Platforms',
      'Admin Panels & Dashboards',
      'Internal Tools & Workflow Systems',
    ],
  },
  {
    number: '03',
    icon: Workflow,
    title: 'Marketing Automation',
    headline: 'Less manual work. More meaningful growth.',
    description:
      'We connect your tools, automate repetitive tasks, and create seamless marketing workflows that help you nurture leads and build stronger customer relationships.',
    list: [
      'CRM & API Integrations',
      'Email & Campaign Automation',
      'Lead Nurturing Workflows',
      'Process Automation & Monitoring',
    ],
  },
  {
    number: '04',
    icon: Bot,
    title: 'AI Agents & Chatbots',
    headline: 'Smarter interactions. Automated workflows.',
    description:
      'We build intelligent AI agents that engage customers, qualify leads, answer questions, and handle repetitive tasks — giving your team more time to focus on what matters.',
    list: [
      'AI Agents & Assistants',
      'Customer Support Chatbots',
      'Lead Qualification & Routing',
      'Voice AI & Conversational Systems',
    ],
  },
];

type Project = {
  title: string;
  meta: string;
  status?: string;
  role?: string;
  stack?: string;
  description: string;
  image: string;
  href: string;
};

const projects: Project[] = [
  {
    title: 'Loomsville',
    meta: 'Web / E-commerce',
    status: 'Live',
    role: 'Design, development & deployment',
    description:
      'A calm online store for a luxury farm-cotton bedding brand — collections, bundle offers and a clear path to checkout, built and deployed end to end.',
    image: '/images/project-interface.jpg',
    href: 'https://hbcqzk-1z.myshopify.com/',
  },
  {
    title: 'NewsFinder',
    meta: 'AI / Intelligence',
    description:
      'Context-aware news discovery for niche research — helping users find relevant stories, connect events and explore information through natural-language search.',
    image: '/images/news.jpg',
    href: '',
  },
  {
    title: 'Email Template Copilot',
    meta: 'AI Integration / Marketing',
    status: 'In development',
    role: 'Design & development',
    stack: 'LangGraph · Prompt engineering · HTML generation',
    description:
      'A copilot that turns a plain-language prompt into a production-grade HTML email campaign, personalized at scale.',
    image: '/images/template.jpg',
    href: '',
  },
];

const process = [
  [
    '01',
    'Define',
    'Start with the outcome the work has to serve, not the tech. What does done look like, and how will we know?',
  ],
  [
    '02',
    'Build',
    'Make the smallest honest version end to end — flows, interface and data — and put it in front of real use.',
  ],
  [
    '03',
    'Harden',
    'Add the unglamorous parts that make it production-grade: testing, monitoring, versioning, rollback and guardrails.',
  ],
  [
    '04',
    'Ship & learn',
    'Ship to real users, instrument everything, and turn each version into the experiment for the next.',
  ],
];

/**
 * Shows a static screenshot with a "Live site" badge, linking out to the real
 * URL. Real embedding via <iframe> was tried and dropped: most production
 * sites (Shopify, Vercel auth-gated previews, etc.) send X-Frame-Options /
 * frame-ancestors headers that block embedding outright, and a blocked frame
 * still fires `onLoad`, so there is no reliable way to detect the failure and
 * fall back — the iframe just renders blank on top of the fallback image.
 */
function LivePreview({ image, alt }: { image: string; alt: string }) {
  return (
    <div className="live-preview">
      <img
        src={image}
        alt={alt}
        width={900}
        height={image.includes('project-interface') ? 900 : 600}
        loading="lazy"
        decoding="async"
      />
      <span className="live-badge">
        <span className="live-dot" />
        Live site
      </span>
    </div>
  );
}

function Home() {
  // Link straight to the reviews when that section exists; otherwise just to the About page.
  const aboutHref = visibleTestimonials(import.meta.env.DEV).length > 0 ? '/about#testimonials' : '/about';
  return (
    <>
      <PageMeta page="/" />
      <section className="hero">
        <div className="container-wide hero-grid">
          <Reveal className="hero-copy">
            <span className="eyebrow">web · automation · ai</span>
            <h1 className="display">
              Websites, apps
              <br />
              &amp; automation,
              <br />
              with AI where
              <br />
              it counts.
            </h1>
            <p>
              At {site.name}, we design and ship websites and web products, automate the work behind them, and add AI
              features that earn their place — from first sketch to shipped product.
            </p>
            <div className="hero-actions">
              <Link href="/contact" className="button button-dark" data-testid="link-hero-contact">
                Start a project <ArrowUpRight className="button-arrow" size={15} />
              </Link>
              <a href="#work" className="button button-light" data-testid="link-hero-work">
                See selected work
              </a>
            </div>
          </Reveal>
          <Reveal className="hero-media">
            <img
              {...lcpImage('/')}
              width={1536}
              height={1024}
              fetchPriority="high"
              alt="An AI core connecting web applications, automation, AI agents and API integrations above a laptop on a desk"
              data-testid="img-home-hero"
            />
            <span className="media-caption">Web / Automation / AI</span>
          </Reveal>
        </div>
      </section>

      <section className="section" id="services">
        <div className="container-wide">
          <Reveal className="section-heading">
            <div>
              <span className="eyebrow">What we do</span>
              <h2 className="display">
                Websites, apps,
                <br />
                automation, AI.
              </h2>
            </div>
            <p>
              Four capabilities, engineered end to end — combining thoughtful interfaces with the intelligent systems
              that power them.
            </p>
          </Reveal>
          <div className="service-grid">
            {services.map(({ number, icon: Icon, title, headline, description, list }) => (
              <Reveal key={number} className="service-card" data-testid={`service-${number}`}>
                <Icon aria-hidden="true" />
                <span className="card-index">{number}</span>
                <h3>{title}</h3>
                <p className="service-headline">{headline}</p>
                <p>{description}</p>
                <ul className="service-list">
                  {list.map((item) => (
                    <li key={item}>
                      <Asterisk aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section proof">
        <div className="container-wide proof-layout">
          <Reveal>
            <span className="eyebrow">Delivery &amp; engagement</span>
            <h2 className="display">Clear milestones. Steady updates. Work that ships.</h2>
            <p className="proof-intro">
              Every project has one point of contact, defined milestones and regular check-ins, so you always know what
              ships next. You’re involved from the first brief to launch day — and we stay accountable for it after.
            </p>
          </Reveal>
          {/* PLACEHOLDER stats — replace with your real figures before publishing. */}
          <Reveal className="stats">
            <div className="stat" data-testid="stat-projects">
              <span className="stat-number">50+</span>
              <span className="stat-label">Projects delivered</span>
            </div>
            <div className="stat" data-testid="stat-clients">
              <span className="stat-number">20+</span>
              <span className="stat-label">Clients supported</span>
            </div>
            <div className="stat" data-testid="stat-ontime">
              <span className="stat-number">98%</span>
              <span className="stat-label">On-time delivery</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" id="work">
        <div className="container-wide">
          <Reveal className="work-head">
            <div>
              <span className="eyebrow">Selected work</span>
              <h2 className="display">Work that shipped.</h2>
            </div>
            <Link href={aboutHref} className="text-link" data-testid="link-work-more">
              More about us <ArrowUpRight size={14} />
            </Link>
          </Reveal>
          <div className="projects">
            {projects.map((project, index) => (
              <Reveal key={project.title} className="project-card">
                <div className="project-media">
                  {project.href ? (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${project.title} live site`}
                      data-testid={`preview-project-${index + 1}`}
                    >
                      <LivePreview image={project.image} alt={`${project.title} project preview`} />
                    </a>
                  ) : (
                    <img
                      src={project.image}
                      alt={`${project.title} project preview`}
                      width={900}
                      height={project.image.includes('project-interface') ? 900 : 600}
                      loading="lazy"
                      decoding="async"
                      data-testid={`img-project-${index + 1}`}
                    />
                  )}
                </div>
                <h3>{project.title}</h3>
                <p>{project.status ? `${project.meta} · ${project.status}` : project.meta}</p>
                <p>{project.description}</p>
                {project.role && (
                  <p className="project-fact">
                    <span>Role</span> {project.role}
                  </p>
                )}
                {project.stack && (
                  <p className="project-fact">
                    <span>Stack</span> {project.stack}
                  </p>
                )}
                {project.href && (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link"
                    data-testid={`link-project-${index + 1}`}
                  >
                    Visit live site <ArrowUpRight size={14} />
                  </a>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section process">
        <div className="container-wide">
          <Reveal className="section-heading">
            <div>
              <span className="eyebrow">How we work</span>
              <h2 className="display">
                From first sketch
                <br />
                to shipped.
              </h2>
            </div>
            <p>
              One team accountable for the whole thing — from the first question to the version running in production.
            </p>
          </Reveal>
          <div className="process-grid">
            {process.map(([number, title, text]) => (
              <Reveal key={number} className="process-step">
                <span className="process-num">{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

function CtaBand() {
  return (
    <section className="dark-cta" id="contact-cta">
      <div className="container-wide cta-row">
        <Reveal>
          <span className="eyebrow">Say hi</span>
          <h2 className="display">Have something to build?</h2>
          <p>
            Tell us about your project — we take ideas from first sketch to shipped product. We read every inquiry and
            reply within a few working days.
          </p>
        </Reveal>
        <Link href="/contact" className="button button-light" data-testid="link-cta-contact">
          Start a project <ArrowUpRight size={15} />
        </Link>
      </div>
    </section>
  );
}

const skills: [string, string[]][] = [
  ['Web Development', ['Responsive front-end', 'E-commerce', 'Design systems', 'Vercel deployments', 'Git']],
  ['App Development', ['FastAPI', 'Django REST Framework', 'Redis', 'Full-stack products', 'Admin panels']],
  ['Marketing Automation', ['LangGraph', 'API & system integrations', 'Process orchestration']],
  ['AI Agents & Chatbots', ['LangChain', 'RAG', 'Vector databases', 'Embedding models', 'Prompt engineering']],
  ['Cloud & infra', ['AWS Bedrock', 'OpenSearch', 'Azure Service Bus', 'Firebase', 'Kafka', 'Docker']],
  ['ML & vision', ['Deep learning', 'MLOps', 'OpenCV', 'Transformers']],
  ['Languages', ['HTML', 'CSS', 'JavaScript', 'Python', 'SQL', 'Java', 'Kotlin', 'WordPress']],
];

function About() {
  return (
    <>
      <PageMeta page="/about" />
      <section className="page-hero">
        <div className="container-wide page-hero-grid">
          <Reveal>
            <span className="eyebrow">About</span>
            <h1 className="display">
              Built for the
              <br />
              whole problem.
            </h1>
            <p>
              {site.name} builds websites, apps, automations and AI features — and you work with one team, from the
              first conversation to launch. We start with the problem, then build only what it needs. Recent work
              includes an online store for a bedding brand and an AI tool that drafts marketing emails from a short
              prompt.
            </p>
          </Reveal>
          <Reveal className="hero-media">
            <img
              {...lcpImage('/about')}
              width={1555}
              height={1012}
              alt="A desk with three monitors and a laptop showing the AXN Studios website, an AI assistant chat and an automation workflow, next to sketchbooks"
              data-testid="img-about-hero"
            />
          </Reveal>
        </div>
      </section>
      <Testimonials items={visibleTestimonials(import.meta.env.DEV)} />

      <section className="section proof">
        <div className="container-wide stand-grid">
          <Reveal>
            <span className="eyebrow">Skills</span>
            <h2 className="display">The toolbox.</h2>
            <p className="proof-intro">
              The languages, frameworks and platforms behind every project — from the interface down to the systems
              running underneath it.
            </p>
          </Reveal>
          <Reveal className="stand-list">
            {skills.map(([area, items]) => (
              <div className="stand-item" key={area}>
                <h3>{area}</h3>
                <div className="tag-list">
                  {items.map((item) => (
                    <span className="tag" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

function Contact() {
  return (
    <>
      <PageMeta page="/contact" />
      <section className="page-hero">
        <div className="container-wide page-hero-grid">
          <Reveal>
            <span className="eyebrow">Contact</span>
            <h1 className="display">
              Have something
              <br />
              to build?
            </h1>
            <p>Tell us about your project — we take ideas from first sketch to shipped product.</p>
          </Reveal>
          <Reveal className="hero-media">
            <img
              {...lcpImage('/contact')}
              width={1555}
              height={1012}
              alt="A desk with a notebook sketching an idea into a website, app, AI agent or automation, next to a laptop and phone showing the AXN Studios site and chat"
              data-testid="img-contact-hero"
            />
          </Reveal>
        </div>
      </section>
      <section className="section">
        <div className="container-wide contact-layout">
          <Reveal className="contact-form">
            <span className="eyebrow">Say hello</span>
            <h2 className="display">Skip the form. Send an email.</h2>
            <p>
              Tell us what you want to build, your rough budget and your deadline — that helps us reply with something
              useful. We read every inquiry and reply within a few working days.
            </p>
            <a
              href={mailto('Project inquiry', 'What I want to build:\n\nBudget:\n\nDeadline:\n')}
              className="button button-dark form-submit"
              data-testid="link-contact-cta"
            >
              Email {site.name} <ArrowUpRight size={15} />
            </a>
          </Reveal>
          <Reveal className="contact-details">
            <span className="eyebrow">Details</span>
            <h2 className="display">
              Reach us
              <br />
              directly.
            </h2>
            <div className="detail-list">
              <div className="detail-item">
                <Mail />
                <div>
                  <h3>Email</h3>
                  <a href={`mailto:${site.email}`} data-testid="link-contact-email">
                    {site.email}
                  </a>
                </div>
              </div>
              <div className="detail-item">
                <MapPin />
                <div>
                  <h3>Location</h3>
                  <p>{site.location}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/** After each navigation, jump to the #hash target if there is one, otherwise to the top of the page. */
function ScrollManager() {
  const [location] = useLocation();
  useEffect(() => {
    const id = window.location.hash.slice(1);
    const target = id ? document.getElementById(id) : null;
    if (target) target.scrollIntoView({ block: 'start', behavior: 'instant' });
    else window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location]);
  return null;
}

function Router() {
  return (
    <ErrorBoundary resetKey={useLocation()[0]}>
      <ScrollManager />
      <Shell>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </Shell>
    </ErrorBoundary>
  );
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <Router />
    </WouterRouter>
  );
}

export default App;
