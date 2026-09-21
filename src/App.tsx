import { type ReactNode, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Linkedin, Mail, MapPin, Menu, X } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Link, Route, Router as WouterRouter, Switch, useLocation } from 'wouter';

const queryClient = new QueryClient();

const site = {
  name: 'Japji Soni',
  role: 'Data Scientist — NLP & Agentic AI',
  location: 'Mohali, Punjab, India',
  positioning: 'I build AI agents that hold up in production.',
  intro: 'Data Scientist working on voice AI, LLM agents and retrieval systems — who also designs, builds and deploys scalable websites end to end.',
  email: 'yps.japji@gmail.com',
  linkedin: 'https://www.linkedin.com/in/japji-soni-07aa501a6/',
  resume: '/japji-soni-resume.pdf',
  seoTitle: 'Japji Soni — Data Scientist, NLP & Agentic AI',
  seoDescription: 'Portfolio of Japji Soni, a Data Scientist building production voice AI agents, LLM copilots and RAG systems at Birdeye.',
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
        <Link href="/" className="brand" data-testid="link-brand">JAPJI SONI</Link>
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
        <Link href="/contact" className="button button-dark" data-testid="link-header-cta">
          Let’s Talk <ArrowUpRight size={14} />
        </Link>
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
          <Link href="/contact" className="button button-dark" onClick={() => setOpen(false)} data-testid="link-mobile-cta">
            Let’s Talk <ArrowUpRight size={14} />
          </Link>
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
            <Link href="/" className="footer-brand" data-testid="link-footer-brand">JAPJI SONI</Link>
            <p>{site.role}</p>
          </div>
          <div>
            <span className="footer-label">Pages</span>
            <div className="footer-links">
              <Link href="/" data-testid="link-footer-home">Home</Link>
              <Link href="/about" data-testid="link-footer-about">About</Link>
              <Link href="/contact" data-testid="link-footer-contact">Contact</Link>
            </div>
          </div>
          <div>
            <span className="footer-label">Elsewhere</span>
            <div className="social-links">
              <a href={site.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" data-testid="link-social-linkedin"><Linkedin size={15} /></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
          <span>{site.positioning}</span>
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
  { number: '01', title: 'Voice & conversational AI', description: 'Agents that talk to real customers and stay accurate, compliant and natural.', list: ['Appointment workflows', 'EHR integrations', 'HIPAA guardrails', 'Call-quality analysis'] },
  { number: '02', title: 'Agentic AI & RAG', description: 'Copilots and retrieval systems that turn a plain prompt into finished work.', list: ['LangGraph workflows', 'RAG pipelines', 'Vector databases', 'Prompt engineering'] },
  { number: '03', title: 'Applied ML & vision', description: 'Fine-tuned models and pipelines, from research to a monitored deployment.', list: ['LLM fine-tuning', 'Computer vision', 'MLOps', 'Cloud & event-driven systems'] },
  { number: '04', title: 'Web & DevOps', description: 'Scalable websites for real businesses, built and shipped without hand-offs.', list: ['Responsive front-end', 'E-commerce builds', 'Docker & Git workflows', 'Deployment on Vercel'] },
];

const projects = [
  { title: 'Loomsville', meta: 'Web / E-commerce · Live', description: 'A fast, responsive online store for a luxury farm-cotton bedding brand — designed, built and deployed end to end.', image: '/images/project-interface.png', href: 'https://looms-taupe.vercel.app/' },
  { title: 'Myna Voice Agents', meta: 'Voice AI / Healthcare · 2024 — now', description: 'Production voice AI agents for Birdeye’s Myna, an Operations AI Coworker serving healthcare and automotive businesses.', image: '/images/contact-studio.png', href: '' },
  { title: 'Email Template Copilot', meta: 'Agentic AI / Marketing · Now', description: 'A copilot agent that turns a plain-language prompt into a production-grade HTML email campaign.', image: '/images/about-studio.png', href: '' },
];

const process = [
  ['01', 'Understand the workflow', 'Map how the business actually works before choosing a model.'],
  ['02', 'Prototype against real data', 'Evaluate on real conversations, documents and edge cases early.'],
  ['03', 'Ship with guardrails', 'Add monitoring, safety and cost controls before it reaches customers.'],
  ['04', 'Keep improving', 'Feed what real conversations teach back into the system.'],
];

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
            <span className="eyebrow">Data Scientist · NLP &amp; Agentic AI</span>
            <h1 className="display">Agents that<br />ship.</h1>
            <p>I’m {site.name}. I build production voice AI agents, LLM copilots and retrieval systems at Birdeye in Gurugram — and I like the parts where the demo becomes a product.</p>
            <div className="hero-actions">
              <a href="#work" className="button button-dark" data-testid="link-hero-work">See selected work <ArrowUpRight className="button-arrow" size={15} /></a>
              <a href={site.resume} target="_blank" rel="noopener noreferrer" className="button button-light" data-testid="link-hero-resume">Download résumé</a>
            </div>
          </Reveal>
          <Reveal className="hero-media">
            <img src="/images/hero-workspace.png" alt="Monochrome creative technology workspace with a laptop" data-testid="img-home-hero" />
            <span className="media-caption">Voice AI / LLM agents / RAG</span>
          </Reveal>
        </div>
      </section>

      <section className="section" id="services">
        <div className="container-wide">
          <Reveal className="section-heading">
            <div>
              <span className="eyebrow">Expertise</span>
              <h2 className="display">What I do.</h2>
            </div>
            <p>Where I do my best work: conversational agents, agentic workflows, applied machine learning, and the web.</p>
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
            <span className="eyebrow">How I work</span>
            <h2 className="display">AI should feel reliable first — and a little magical second.</h2>
            <p className="proof-intro">The best agents aren’t the flashiest. They verify identity, respect guardrails, handle the messy real-world edge case, and keep improving from what they hear.</p>
          </Reveal>
          <Reveal className="stats">
            <div className="stat" data-testid="stat-accuracy"><span className="stat-number">~95%</span><span className="stat-label">Packaging-compliance accuracy</span></div>
            <div className="stat" data-testid="stat-cost"><span className="stat-number">28%</span><span className="stat-label">Lower GPT-4 API cost</span></div>
            <div className="stat" data-testid="stat-recommendations"><span className="stat-number">~86%</span><span className="stat-label">Recommendation accuracy after fine-tuning</span></div>
          </Reveal>
        </div>
      </section>

      <section className="section" id="work">
        <div className="container-wide">
          <Reveal className="work-head">
            <div><span className="eyebrow">Selected work</span><h2 className="display">Things I’ve built.</h2></div>
            <Link href="/about" className="text-link" data-testid="link-work-more">More about me <ArrowUpRight size={14} /></Link>
          </Reveal>
          <div className="projects">
            {projects.map((project, index) => (
              <Reveal key={project.title} className="project-card">
                <div className="project-media"><img src={project.image} alt={`${project.title} project preview`} data-testid={`img-project-${index + 1}`} /></div>
                <h3>{project.title}</h3>
                <p>{project.meta}</p>
                <p>{project.description}</p>
                {project.href && <a href={project.href} target="_blank" rel="noopener noreferrer" className="text-link" data-testid={`link-project-${index + 1}`}>Visit live site <ArrowUpRight size={14} /></a>}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <TrustedBy />

      <section className="section process">
        <div className="container-wide">
          <Reveal className="section-heading">
            <div><span className="eyebrow">How I build</span><h2 className="display">Reliable beats<br />flashy.</h2></div>
            <p>Clear thinking about the real workflow first, then models, evaluation and guardrails.</p>
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
          <span className="eyebrow">Got a problem for an AI agent?</span>
          <h2 className="display">Let’s build something useful.</h2>
          <p>Tell me what you’re building or what isn’t working yet. I’ll get back to you within a few working days.</p>
        </Reveal>
        <Link href="/contact" className="button button-light" data-testid="link-cta-contact">Get in Touch <ArrowUpRight size={15} /></Link>
      </div>
    </section>
  );
}

const experience = [
  { dates: 'Jun 2024 — now', role: 'Data Scientist, NLP', company: 'Birdeye · Gurugram', detail: 'Voice AI agents for Myna, an email template copilot, RAG for the Robin chatbot, and LLM-driven review insights.' },
  { dates: 'Sep 2023 — Jun 2024', role: 'Associate Software Engineer', company: 'Createbytes · Gurugram', detail: 'A legal compliance ML service (~95% accuracy), vector-search recommendations for a 100K+ download app, and contextual news search.' },
  { dates: '2019 — 2023', role: 'B.Tech, Computer Science', company: 'Chitkara University', detail: 'Graduated with a 9.74 CGPA.' },
];

const skills = [
  ['Languages', 'Python'],
  ['Agentic AI & RAG', 'LangGraph, LangChain, vector databases (Pinecone, Chroma), embedding models'],
  ['LLMs', 'Prompt engineering, fine-tuning (Llama-3, GPT-4 APIs)'],
  ['Cloud & infra', 'AWS Bedrock, OpenSearch, Azure Service Bus, Firebase, Kafka, Docker'],
  ['ML & vision', 'Deep learning, MLOps, OpenCV, YOLOv8, transformers'],
  ['Web & DevOps', 'Responsive front-end, e-commerce, Vercel deployments, Docker, Git'],
  ['Backend', 'FastAPI, Django REST Framework, Redis'],
];

function About() {
  return (
    <>
      <PageMeta title={`About — ${site.name}`} description="Background, experience and skills of Japji Soni." />
      <section className="page-hero">
        <div className="container-wide page-hero-grid">
          <Reveal>
            <span className="eyebrow">About</span>
            <h1 className="display">Hello,<br />I’m Japji.</h1>
            <p>{site.intro}</p>
          </Reveal>
          <Reveal className="hero-media">
            <img src="/images/about-studio.png" alt="Monochrome studio workspace" data-testid="img-about-hero" />
          </Reveal>
        </div>
      </section>
      <section className="section about-section">
        <div className="container-wide story-grid">
          <Reveal><span className="eyebrow">Background</span><h2 className="display">I turn LLM prototypes into systems businesses can trust.</h2></Reveal>
          <Reveal className="story-copy">
            <p>I’m a Data Scientist at Birdeye, where I own end-to-end architecture for voice AI agents used in healthcare and automotive. Before that, I built computer vision and recommendation systems at Createbytes. I graduated from Chitkara University with a 9.74 CGPA.</p>
            <p style={{ marginTop: '20px' }}>I care about accuracy, cost and safety as much as capability — whether that’s guardrails for patient conversations or cutting GPT-4 spend by 28%.</p>
          </Reveal>
        </div>
      </section>
      <section className="section next-steps">
        <div className="container-wide">
          <Reveal><span className="eyebrow">Experience &amp; education</span><h2 className="display">Where I’ve worked.</h2></Reveal>
          <div className="next-grid">
            {experience.map(({ dates, role, company, detail }) => (
              <Reveal className="next-card" key={dates}>
                <span className="next-num">{dates}</span>
                <h3>{role}</h3>
                <p><strong>{company}</strong></p>
                <p>{detail}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section proof">
        <div className="container-wide stand-grid">
          <Reveal>
            <span className="eyebrow">Skills</span>
            <h2 className="display">The toolbox.</h2>
            <p className="proof-intro"><a href={site.resume} target="_blank" rel="noopener noreferrer" className="text-link" data-testid="link-about-resume">Download résumé (PDF) <ArrowUpRight size={14} /></a></p>
          </Reveal>
          <Reveal className="stand-list">
            {skills.map(([area, items]) => <div className="stand-item" key={area}><h3>{area}</h3><p>{items}</p></div>)}
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
      <PageMeta title={`Contact — ${site.name}`} description="Get in touch with Japji Soni about AI, NLP and agentic systems." />
      <section className="page-hero">
        <div className="container-wide page-hero-grid">
          <Reveal>
            <span className="eyebrow">Contact</span>
            <h1 className="display">Let’s talk.</h1>
            <p>Tell me what you’re building or what isn’t working yet. I’ll get back to you within a few working days.</p>
          </Reveal>
          <Reveal className="hero-media"><img src="/images/contact-studio.png" alt="Monochrome workspace ready for a conversation" data-testid="img-contact-hero" /></Reveal>
        </div>
      </section>
      <section className="section">
        <div className="container-wide contact-layout">
          <Reveal className="contact-form">
            <span className="eyebrow">Say hello</span>
            <h2 className="display">Skip the form. Send an email.</h2>
            <a href={`mailto:${site.email}`} className="button button-dark form-submit" data-testid="link-contact-cta">Email {site.name} <ArrowUpRight size={15} /></a>
          </Reveal>
          <Reveal className="contact-details">
            <span className="eyebrow">Elsewhere</span><h2 className="display">Find me<br />online.</h2>
            <div className="detail-list">
              <div className="detail-item"><Mail /><div><h3>Email</h3><a href={`mailto:${site.email}`} data-testid="link-contact-email">{site.email}</a></div></div>
              <div className="detail-item"><Linkedin /><div><h3>LinkedIn</h3><a href={site.linkedin} target="_blank" rel="noopener noreferrer" data-testid="link-contact-linkedin">Japji Soni</a></div></div>
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
