import { type ReactNode, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Mail, MapPin, Menu, X } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Link, Route, Router as WouterRouter, Switch, useLocation } from 'wouter';

const queryClient = new QueryClient();

const site = {
  name: 'axnstudios',
  location: '97-10 62nd Dr Rego Park, NY,11374',
  intro: 'Data Scientist working on voice AI, LLM agents and retrieval systems — who also designs, builds and deploys scalable websites end to end.',
  email: 'axnstudios31@gmail.com',
  linkedin: 'https://www.linkedin.com/in/japji-soni-07aa501a6/',
  resume: '/japji-soni-resume.pdf',
  seoTitle: 'Japji Soni — Web Development, Automation & AI',
  seoDescription: 'Japji Soni designs and ships websites, web and app products, automates the work behind them, and adds AI features that earn their place.',
};

function PageMeta({ title, description }: { title: string; description: string }) {
  useEffect(() => {
    document.title = title;
    let tag = document.querySelector('meta[name="description"]');
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('name', 'description');
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', description);
  }, [title, description]);
  return null;
}

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${visible ? 'visible' : ''} ${className}`}>{children}</div>;
}

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
        <Link href="/" className="brand" aria-label="AXN Studios — home" data-testid="link-brand"><img src="/logo-dark.png" alt="AXN Studios" /></Link>
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
        <a href={`mailto:${site.email}`} className="button button-dark" data-testid="link-header-cta">
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
          <a href={`mailto:${site.email}`} className="button button-dark" onClick={() => setOpen(false)} data-testid="link-mobile-cta">
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
            <Link href="/" className="footer-brand" aria-label="AXN Studios — home" data-testid="link-footer-brand"><img src="/logo-light.png" alt="AXN Studios" /></Link>
          </div>
          <div>
            <span className="footer-label">Pages</span>
            <div className="footer-links">
              <Link href="/" data-testid="link-footer-home">Home</Link>
              <Link href="/about" data-testid="link-footer-about">About</Link>
              <Link href="/contact" data-testid="link-footer-contact">Contact</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} axnstudios. All rights reserved.</span>
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

const services = [
  { number: '01', title: 'Web Development', description: 'Production websites, web apps, dashboards and design systems — designed and shipped end to end.', list: ['Business websites', 'E-commerce builds', 'Dashboards', 'Design systems'] },
  { number: '02', title: 'App Development', description: 'Full-stack web and app products, admin panels and the internal tools that keep a business running.', list: ['Full-stack products', 'Admin panels', 'Internal tools', 'Responsive front-ends'] },
  { number: '03', title: 'Marketing Automation', description: 'Intelligent marketing systems that connect your channels, automate customer journeys, and turn every interaction into an opportunity.', list: ['AI agents & workflows', 'API & system integrations', 'Process orchestration', 'Monitoring & human handoff'] },
{ number: '04', title: 'AI Agents & Chatbots', description: 'Intelligent agents that understand your business, communicate naturally, and take action — from customer support and lead qualification to internal workflows.', list: ['AI agents & assistants', 'Voice AI & conversational systems'] }
];

const projects = [
  { title: 'Loomsville', meta: 'Web / E-commerce · Live', description: 'A calm online store for a luxury farm-cotton bedding brand — collections, bundle offers and a clear path to checkout, built and deployed end to end.', image: '/images/project-interface.png', href: 'https://looms-taupe.vercel.app/' },
  { title: 'NewsFinder', meta: 'AI / Intelligence ', description: 'Context-aware news discovery for niche research — helping users find relevant stories, connect events and explore information through natural-language search.', image: '/images/news.png', href: '' },
  { title: 'Email Template Copilot', meta: 'AI Integration / Marketing ', description: 'A copilot that turns a plain-language prompt into a production-grade HTML email campaign, personalised at scale.', image: '/images/template.png', href: '' },
];

const process = [
  ['01', 'Define', 'Start with the outcome the work has to serve, not the tech. What does done look like, and how will we know?'],
  ['02', 'Build', 'Make the smallest honest version end to end — flows, interface and data — and put it in front of real use.'],
  ['03', 'Harden', 'Add the unglamorous parts that make it production-grade: testing, monitoring, versioning, rollback and guardrails.'],
  ['04', 'Ship & learn', 'Ship to real users, instrument everything, and turn each version into the experiment for the next.'],
];

const PREVIEW_WIDTH = 1440;

/** Renders a live site at desktop width and scales it down to fill its container. */
function LivePreview({ url, title, fallback }: { url: string; title: string; fallback: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => setSize({ w: entry.contentRect.width, h: entry.contentRect.height }));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  const scale = size.w ? size.w / PREVIEW_WIDTH : 0.3;
  return (
    <div ref={ref} className="live-preview">
      <img src={fallback} alt="" aria-hidden="true" />
      {size.w > 0 && (
        <iframe
          src={url}
          title={title}
          loading="lazy"
          tabIndex={-1}
          aria-hidden="true"
          onLoad={() => setLoaded(true)}
          className={loaded ? 'loaded' : ''}
          style={{ width: PREVIEW_WIDTH, height: size.h / scale, transform: `scale(${scale})` }}
        />
      )}
      <span className="live-badge"><span className="live-dot" />Live site</span>
    </div>
  );
}

// Placeholder partners — replace with real names (and optional logo image paths, e.g. '/images/partners/acme.png').
const partners: { name: string; logo?: string }[] = Array.from({ length: 30 }, (_, index) => ({
  name: `Partner ${String(index + 1).padStart(2, '0')}`,
}));
const PARTNERS_PER_ROW = 6;

function TrustedBy() {
  const rows: (typeof partners)[] = [];
  for (let i = 0; i < partners.length; i += PARTNERS_PER_ROW) rows.push(partners.slice(i, i + PARTNERS_PER_ROW));
  return (
    <section className="section trusted" id="trusted" aria-label="Trusted partners">
      <div className="container-wide">
        <Reveal className="trusted-head">
          <h2 className="display">Trusted by leaders<span>from various industries</span></h2>
        </Reveal>
      </div>
      <div className="trusted-rows">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className={`trusted-row ${rowIndex % 2 ? 'reverse' : ''}`} aria-hidden={rowIndex > 0}>
            <div className="trusted-track">
              {[...row, ...row].map((partner, index) => (
                <div className="partner" key={`${partner.name}-${index}`} data-testid={`partner-${rowIndex + 1}-${(index % row.length) + 1}`}>
                  <span className="partner-logo">
                    {partner.logo ? <img src={partner.logo} alt="" loading="lazy" /> : <span>{partner.name.slice(0, 1)}</span>}
                  </span>
                  <span className="partner-name">{partner.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Home() {
  return (
    <>
      <PageMeta title={site.seoTitle} description={site.seoDescription} />
      <section className="hero">
        <div className="container-wide hero-grid">
          <Reveal className="hero-copy">
            <span className="eyebrow">web · automation · ai</span>
            <h1 className="display">Websites, apps<br />&amp; automation —<br />with AI where<br />it counts.</h1>
            <p>I’m {site.name}. I design and ship websites and web products, automate the work behind them, and add AI features that earn their place — from first sketch to shipped product.</p>
            <div className="hero-actions">
              <Link href="/contact" className="button button-dark" data-testid="link-hero-contact">Start a project <ArrowUpRight className="button-arrow" size={15} /></Link>
              <a href="#work" className="button button-light" data-testid="link-hero-work">Deliverables</a>
            </div>
          </Reveal>
          <Reveal className="hero-media">
            <img src="/images/hero-axn.jpg" alt="An AI core connecting web applications, automation, AI agents and API integrations above a laptop on a desk" data-testid="img-home-hero" />
            <span className="media-caption">Web / Automation / AI</span>
          </Reveal>
        </div>
      </section>

      <section className="section" id="services">
        <div className="container-wide">
          <Reveal className="section-heading">
            <div>
              <span className="eyebrow">What we do</span>
              <h2 className="display">Websites, apps,<br />automation, AI.</h2>
            </div>
            <p>Four capabilities, engineered end to end — combining thoughtful interfaces with the intelligent systems that power them.</p>
          </Reveal>
          <div className="service-grid">
            {services.map(({ number, title, description, list }) => (
              <Reveal key={number} className="service-card" >
                <span className="card-index">{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
                <p>{list.join(' · ')}</p>
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
            <p className="proof-intro">Every project has one point of contact, defined milestones and regular check-ins, so you always know what ships next. You’re involved from the first brief to launch day — and I stay accountable for it after.</p>
          </Reveal>
          {/* PLACEHOLDER stats — replace with your real figures before publishing. */}
          <Reveal className="stats">
            <div className="stat" data-testid="stat-projects"><span className="stat-number">50+</span><span className="stat-label">Projects delivered</span></div>
            <div className="stat" data-testid="stat-clients"><span className="stat-number">20+</span><span className="stat-label">Clients supported</span></div>
            <div className="stat" data-testid="stat-ontime"><span className="stat-number">98%</span><span className="stat-label">On-time delivery</span></div>
          </Reveal>
        </div>
      </section>

      <section className="section" id="work">
        <div className="container-wide">
          <Reveal className="work-head">
            <div><span className="eyebrow">Selected work</span><h2 className="display">Work that shipped.</h2></div>
            <Link href="/about" className="text-link" data-testid="link-work-more">More about me <ArrowUpRight size={14} /></Link>
          </Reveal>
          <div className="projects">
            {projects.map((project, index) => (
              <Reveal key={project.title} className="project-card">
                <div className="project-media">
                  {project.href ? (
                    <a href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} live site`} data-testid={`preview-project-${index + 1}`}>
                      <LivePreview url={project.href} title={`${project.title} live preview`} fallback={project.image} />
                    </a>
                  ) : (
                    <img src={project.image} alt={`${project.title} project preview`} data-testid={`img-project-${index + 1}`} />
                  )}
                </div>
                <h3>{project.title}</h3>
                <p>{project.meta}</p>
                <p>{project.description}</p>
                {project.href && <a href={project.href} target="_blank" rel="noopener noreferrer" className="text-link" data-testid={`link-project-${index + 1}`}>Visit live site <ArrowUpRight size={14} /></a>}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Hidden for now — restore by uncommenting once the partner list is ready: <TrustedBy /> */}

      <section className="section process">
        <div className="container-wide">
          <Reveal className="section-heading">
            <div><span className="eyebrow">How We Work</span><h2 className="display">From first sketch<br />to shipped.</h2></div>
            <p>One person accountable for the whole thing — from the first question to the version running in production.</p>
          </Reveal>
          <div className="process-grid">
            {process.map(([number, title, text]) => (
              <Reveal key={number} className="process-step">
                <span className="process-num">{number}</span><h3>{title}</h3><p>{text}</p>
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
          <p>Tell me about your project — I take ideas from first sketch to shipped product. I read every enquiry and reply within a few working days.</p>
        </Reveal>
        <Link href="/contact" className="button button-light" data-testid="link-cta-contact">Start a project <ArrowUpRight size={15} /></Link>
      </div>
    </section>
  );
}

const skills: [string, string[]][] = [
  ['Web Development', ['Responsive front-end', 'E-commerce', 'Design systems', 'Vercel deployments', 'Docker', 'Git']],
  ['App Development', ['FastAPI', 'Django REST Framework', 'Redis', 'Full-stack products', 'Admin panels']],
  ['Marketing Automation', ['LangGraph', 'API & system integrations', 'Process orchestration']],
  ['AI Agents & Chatbots', ['LangChain', 'RAG', 'Vector databases', 'Embedding models', 'Prompt engineering']],
  ['Cloud & infra', ['AWS Bedrock', 'OpenSearch', 'Azure Service Bus', 'Firebase', 'Kafka', 'Docker']],
  ['ML & vision', ['Deep learning', 'MLOps', 'OpenCV', 'Transformers']],
  ['Languages', ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Python', 'SQL', 'Java', 'C#', 'PHP', 'Dart', 'Swift', 'Kotlin']],
];

function About() {
  return (
    <>
      <PageMeta title={`About — ${site.name}`} description="A web development and automation practice that takes ideas from first sketch to shipped product and stays accountable for the whole thing." />
      <section className="page-hero">
        <div className="container-wide page-hero-grid">
          <Reveal>
            <span className="eyebrow">About</span>
            <h1 className="display">Built for the<br />whole problem.</h1>
            <p>Digital technology studio AXN Studios creates applications, websites, artificial intelligence systems, and automation to help companies run smarter. We combine design, development, and artificial intelligence to produce digital goods anchored on actual business need. We cover the whole digital experience from high-performance websites and custom applications to AI agents, intelligent chatbots, automated workflows, and system integrations. First we grasp the problem; then, we design and build the correct answer without including technology just for its sake. Every interface exists for a specific use. Every system performs a function. Every system of automation should add value. From the initial concept through the finished work, AXN Studios transforms difficult challenges into straightforward, scalable, and practical digital experiences.</p>
          </Reveal>
          <Reveal className="hero-media">
            <img src="/images/about-axn.jpg" alt="A desk with three monitors and a laptop showing the AXN Studios website, an AI assistant chat and an automation workflow, next to sketchbooks" data-testid="img-about-hero" />
          </Reveal>
        </div>
      </section>
      <section className="section proof">
        <div className="container-wide stand-grid">
          <Reveal>
            <span className="eyebrow">Skills</span>
            <h2 className="display">The toolbox.</h2>
            <p className="proof-intro">The languages, frameworks and platforms behind every project — from the interface down to the systems running underneath it.</p>
          </Reveal>
          <Reveal className="stand-list">
            {skills.map(([area, items]) => (
              <div className="stand-item" key={area}>
                <h3>{area}</h3>
                <div className="tag-list">
                  {items.map((item) => <span className="tag" key={item}>{item}</span>)}
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
      <PageMeta title={`Contact — ${site.name}`} description="Have something to build? Tell Japji Soni about your website, app, automation or AI project." />
      <section className="page-hero">
        <div className="container-wide page-hero-grid">
          <Reveal>
            <span className="eyebrow">Contact</span>
            <h1 className="display">Have something<br />to build?</h1>
            <p>Tell me about your project — I take ideas from first sketch to shipped product.</p>
          </Reveal>
          <Reveal className="hero-media"><img src="/images/contact-axn.jpg" alt="A desk with a notebook sketching an idea into a website, app, AI agent or automation, next to a laptop and phone showing the AXN Studios site and chat" data-testid="img-contact-hero" /></Reveal>
        </div>
      </section>
      <section className="section">
        <div className="container-wide contact-layout">
          <Reveal className="contact-form">
            <span className="eyebrow">Say hello</span>
            <h2 className="display">Skip the form. Send an email.</h2>
            <p>Web development · App development · Automation · AI integration. I read every enquiry and reply within a few working days.</p>
            <a href={`mailto:${site.email}`} className="button button-dark form-submit" data-testid="link-contact-cta">Email {site.name} <ArrowUpRight size={15} /></a>
          </Reveal>
          <Reveal className="contact-details">
            <span className="eyebrow">Elsewhere</span><h2 className="display">Find me<br />online.</h2>
            <div className="detail-list">
              <div className="detail-item"><Mail /><div><h3>Email</h3><a href={`mailto:${site.email}`} data-testid="link-contact-email">{site.email}</a></div></div>
              <div className="detail-item"><MapPin /><div><h3>Location</h3><p>{site.location}</p></div></div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Router() {
  return (
    <ErrorBoundary resetKey={useLocation()[0]}>
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
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
