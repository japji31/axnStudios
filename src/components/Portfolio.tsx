import { useEffect, useState, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { LiveBadge, LiveShowcase, ScaledFrame } from '@/components/LiveShowcase';
import { experience, projects, services, site, skills, type Project } from '@/content';

const nav = [{ label: 'Home', href: '/' }, { label: 'Projects', href: '/projects' }, { label: 'About', href: '/about' }, { label: 'Expertise', href: '/services' }, { label: 'Contact', href: '/contact' }];

export function Seo({ title, description, path, type = 'website' }: { title: string; description: string; path: string; type?: string }) {
  useEffect(() => {
    document.title = title;
    const set = (selector: string, attr: string, value: string) => {
      let el = document.head.querySelector(selector) as HTMLMetaElement | null;
      if (!el) { el = document.createElement('meta'); document.head.appendChild(el); }
      el.setAttribute(attr, value);
    };
    set('meta[name="description"]', 'content', description); set('meta[property="og:title"]', 'content', title); set('meta[property="og:description"]', 'content', description); set('meta[property="og:type"]', 'content', type); set('meta[property="og:url"]', 'content', `${site.seo.url}${path}`); set('meta[name="twitter:title"]', 'content', title); set('meta[name="twitter:description"]', 'content', description);
    let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
    canonical.href = `${site.seo.url}${path}`;
    const schemaId = 'portfolio-structured-data';
    document.getElementById(schemaId)?.remove();
    const schema = document.createElement('script');
    schema.id = schemaId; schema.type = 'application/ld+json';
    schema.textContent = JSON.stringify({ '@context': 'https://schema.org', '@type': type === 'article' ? 'CreativeWork' : 'Person', name: site.name, jobTitle: site.role, description, url: `${site.seo.url}${path}`, sameAs: site.socials.map(s => s.href).filter(href => !href.startsWith('[')) });
    document.head.appendChild(schema);
  }, [description, path, title, type]);
  return null;
}

export function Shell({ children }: { children: ReactNode }) {
  const [location] = useLocation(); const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
  }, [location]);
  return <div className="noise min-h-[100dvh]">
    <aside className="rail fixed inset-y-0 left-0 z-40 hidden flex-col justify-between border-r border-foreground/15 bg-background px-5 py-6 md:flex">
      <Link href="/" aria-label="Go to home" data-testid="link-logo" className="display text-2xl font-semibold leading-none">JS<span className="text-primary">.</span></Link>
      <nav aria-label="Primary navigation" className="flex -rotate-90 gap-8 whitespace-nowrap origin-center">
        {nav.map(item => <Link key={item.href} href={item.href} data-testid={`link-nav-${item.label.toLowerCase()}`} className={`mono transition-colors hover:text-primary ${location === item.href ? 'text-primary' : ''}`}>{item.label}</Link>)}
      </nav>
      <div className="mono text-[9px] leading-4 text-muted-foreground">© {new Date().getFullYear()}<br />Japji<br />Soni</div>
    </aside>
    <header className="flex items-center justify-between border-b border-foreground/15 px-5 py-5 md:hidden">
      <Link href="/" className="display text-2xl font-semibold" data-testid="link-mobile-logo">JS<span className="text-primary">.</span></Link>
      <button type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)} data-testid="button-mobile-menu" className="rounded-full p-2 hover:bg-secondary">{open ? <X size={21} /> : <Menu size={21} />}</button>
    </header>
    {open && <nav className="mobile-menu fixed inset-x-0 top-[69px] z-30 border-b border-foreground/15 bg-background p-6 md:hidden">{nav.map(item => <Link onClick={() => setOpen(false)} key={item.href} href={item.href} data-testid={`link-mobile-${item.label.toLowerCase()}`} className="display block border-b border-foreground/15 py-4 text-3xl">{item.label}</Link>)}</nav>}
    <main key={location} className="page-shell page-transition">{children}</main>
  </div>;
}

export function PageIntro({ index, title, lead }: { index: string; title: ReactNode; lead: string }) {
  return <section className="page-intro mx-auto max-w-[1440px] px-6 pb-20 pt-20 md:px-14 md:pb-32 md:pt-32">
    <div className="eyebrow mb-10 flex items-center gap-4 text-muted-foreground"><span className="text-primary">{index}</span><span className="h-px w-14 bg-border" />{site.role}</div>
    <h1 className="display max-w-5xl text-6xl font-semibold leading-[.88] md:text-[clamp(5rem,11vw,10.5rem)]">{title}</h1>
    <p className="mt-10 max-w-xl text-lg leading-relaxed text-muted-foreground md:ml-[25%] md:text-xl">{lead}</p>
  </section>;
}

function ImageFrame({ image, className = '', eager = false }: { image: { src: string; alt: string; tone: string }; className?: string; eager?: boolean }) {
  const [failed, setFailed] = useState(!image.src);
  return <div className={`image-frame relative ${className}`}>
    {!failed ? <img src={image.src} alt={image.alt} loading={eager ? 'eager' : 'lazy'} onError={() => setFailed(true)} className="h-full w-full object-cover" /> : <div aria-label={image.alt} role="img" className={`flex h-full w-full items-end justify-between p-5 ${image.tone === 'blue' ? 'bg-primary' : image.tone === 'red' ? 'bg-accent' : image.tone === 'amber' ? 'bg-[#d7a064]' : image.tone === 'plum' ? 'bg-[#493548]' : image.tone === 'lilac' ? 'bg-[#b9b4cf]' : 'bg-secondary'}`}><span className="display max-w-[10ch] text-4xl leading-[.9] text-foreground/80">Image<br />coming soon</span><span className="mono text-foreground/65">[01]</span></div>}
  </div>;
}

export function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return <Link href={`/projects/${project.slug}`} data-testid={`link-project-${project.slug}`} className="group block">
    {project.liveUrl ? <div className="image-frame relative"><LiveBadge /><ScaledFrame url={project.liveUrl} title={`${project.title} preview`} /></div> : <ImageFrame image={project.images[0]} eager={featured} className={`aspect-[4/3] ${featured ? 'md:aspect-[1.25/1]' : ''}`} />}
    <div className="mt-4 flex items-start justify-between gap-5">
      <div><p className="display text-2xl font-semibold leading-none md:text-3xl">{project.title}</p><p className="mt-2 text-sm text-muted-foreground">{project.category} · {project.year}</p></div>
      <ArrowUpRight className="mt-1 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" size={22} strokeWidth={1.5} />
    </div>
  </Link>;
}

export function Footer() {
  return <footer className="mx-auto max-w-[1440px] border-t border-foreground/15 px-6 pb-8 pt-16 md:px-14 md:pt-24">
    <div className="grid gap-14 md:grid-cols-12">
      <div className="md:col-span-6"><p className="eyebrow text-primary">Got a problem for an AI agent?</p><Link href="/contact" data-testid="link-footer-contact" className="display mt-5 block max-w-lg text-5xl font-semibold leading-[.9] transition-colors hover:text-primary md:text-7xl">Let's build<br />something useful.</Link></div>
      <div className="md:col-span-2"><p className="eyebrow mb-5 text-muted-foreground">Pages</p>{nav.map(item => <Link key={item.href} href={item.href} data-testid={`link-footer-${item.label.toLowerCase()}`} className="mb-2 block text-sm hover:text-primary">{item.label}</Link>)}</div>
      <div className="md:col-span-2"><p className="eyebrow mb-5 text-muted-foreground">Elsewhere</p>{site.socials.map(item => <a href={item.href.startsWith('[') ? '#' : item.href} key={item.label} data-testid={`link-social-${item.label.toLowerCase()}`} className="mb-2 block text-sm hover:text-primary">{item.label}</a>)}</div>
      <div className="md:col-span-2"><p className="eyebrow mb-5 text-muted-foreground">Contact</p><a href={`mailto:${site.email}`} data-testid="link-footer-email" className="break-all text-sm hover:text-primary">{site.email}</a><p className="mt-3 text-sm text-muted-foreground">{site.location}</p></div>
    </div>
    <div className="mt-20 flex flex-col justify-between gap-3 border-t border-foreground/15 pt-5 text-xs text-muted-foreground md:flex-row"><span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span><span></span></div>
  </footer>;
}

export function HomePage() {
  return <><Seo title={site.seo.title} description={site.seo.description} path="/" /><Shell>
    <section className="relative mx-auto flex min-h-[calc(100dvh-1px)] max-w-[1440px] flex-col justify-end overflow-hidden px-6 pb-14 pt-24 md:px-14 md:pb-16">
      <img src={`${import.meta.env.BASE_URL}profile.jpg`} alt={`Portrait of ${site.name}`} width={128} height={128} fetchPriority="high" data-testid="img-profile" className="mb-8 h-24 w-24 animate-rise rounded-full border border-foreground/15 object-cover object-[50%_25%] md:h-32 md:w-32" />
      <div className="eyebrow mb-9 animate-rise text-primary">Data Scientist · NLP &amp; Agentic AI</div>
      <h1 className="display max-w-6xl animate-rise text-[clamp(4.5rem,12vw,13rem)] font-semibold leading-[.79] [animation-delay:.08s]">Agents that<br /><span className="ml-[12%] text-primary">ship.</span></h1>
      <div className="mt-12 grid gap-7 md:grid-cols-12">
        <p data-testid="text-home-intro" className="max-w-md text-lg leading-relaxed text-muted-foreground md:col-span-5 md:col-start-7">I’m {site.name}. I build production voice AI agents, LLM copilots and retrieval systems at Birdeye in Gurugram — and I like the parts where the demo becomes a product.</p>
        <Link href="/projects" data-testid="link-home-projects" className="group flex items-center gap-3 text-sm font-medium md:col-span-3 md:col-start-10">See selected work <span className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-background transition-transform group-hover:rotate-45"><ArrowUpRight size={16} /></span></Link>
        <a href={site.resume} target="_blank" rel="noopener noreferrer" data-testid="link-home-resume" className="link-line w-fit self-center text-sm md:col-span-3 md:col-start-10 md:row-start-2">Download résumé ↗</a>
      </div>
    </section>
    <section className="bg-foreground px-6 py-24 text-background md:px-14 md:py-36"><div className="mx-auto max-w-[1440px]"><div className="eyebrow text-primary">How I work</div><p className="display mt-10 max-w-5xl text-5xl font-medium leading-[.95] md:text-[clamp(4rem,8vw,8rem)]">AI should feel <em className="font-normal text-primary">reliable</em> first — and a little magical second.</p><div className="mt-16 grid gap-10 md:grid-cols-12"><p className="text-sm leading-relaxed text-background/60 md:col-span-4 md:col-start-7">The best agents aren’t the flashiest. They verify identity, respect guardrails, handle the messy real-world edge case, and keep improving from what they hear.</p><Link href="/about" data-testid="link-home-about" className="link-line text-sm md:col-span-3 md:col-start-11">More about me ↗</Link></div></div></section>
    <section className="mx-auto max-w-[1440px] px-6 py-24 md:px-14 md:py-36"><div className="mb-14 flex items-end justify-between"><div><div className="eyebrow text-primary">02 / Selected work</div><h2 className="display mt-5 text-5xl font-semibold leading-none md:text-7xl">Things I’ve built.</h2></div><Link href="/projects" data-testid="link-home-all-projects" className="hidden text-sm hover:text-primary md:block">View all projects ↗</Link></div><div className="project-grid grid gap-x-8 md:grid-cols-12">{projects.map((p, i) => <ProjectCard key={p.slug} project={p} featured={i === 0} />)}</div></section>
    <Footer />
  </Shell></>;
}

export function ProjectsPage() {
  return <><Seo title={`Projects — ${site.name}`} description="Live web projects and production AI: voice agents, copilots and retrieval systems." path="/projects" /><Shell><PageIntro index="02 / Archive" title={<>Selected<br /><span className="text-primary">work.</span></>} lead="Live websites I have shipped, and production AI systems from voice agents to retrieval pipelines." />{projects.filter(p => p.liveUrl).map(p => <LiveShowcase key={p.slug} project={p} />)}<section className="mx-auto max-w-[1440px] px-6 pb-32 md:px-14"><div className="mb-10 flex items-end justify-between gap-6 border-t border-foreground/15 pt-12"><div><p className="eyebrow text-primary">AI &amp; machine learning</p><h2 className="display mt-4 text-4xl font-semibold leading-none md:text-6xl">Production AI.</h2></div><span className="mono hidden text-muted-foreground md:block">{projects.filter(p => !p.liveUrl).length} projects</span></div><div className="project-grid grid gap-x-8 md:grid-cols-12">{projects.filter(p => !p.liveUrl).map((p, i) => <ProjectCard key={p.slug} project={p} featured={i === 0} />)}</div></section><Footer /> </Shell></>;
}

export function ProjectPage({ slug }: { slug: string }) {
  const project = projects.find(p => p.slug === slug); const index = projects.findIndex(p => p.slug === slug);
  if (!project) return <NotFoundPage />;
  const prev = projects[(index - 1 + projects.length) % projects.length]; const next = projects[(index + 1) % projects.length];
  return <><Seo title={`${project.title} — ${site.name}`} description={project.summary} path={`/projects/${project.slug}`} type="article" /><Shell><article>
    <header className="mx-auto max-w-[1440px] px-6 pb-16 pt-20 md:px-14 md:pb-24 md:pt-32"><Link href="/projects" data-testid="link-back-projects" className="eyebrow text-muted-foreground hover:text-primary">← Back to projects</Link><div className="mt-14 grid gap-10 md:grid-cols-12 md:items-end"><div className="md:col-span-8"><p className="eyebrow text-primary">{project.category} · {project.year}</p><h1 className="display mt-5 text-6xl font-semibold leading-[.85] md:text-9xl">{project.title}</h1></div><p className="max-w-sm text-lg leading-relaxed text-muted-foreground md:col-span-4">{project.summary}</p></div></header>
    <div className="mx-auto max-w-[1440px] px-6 md:px-14">{project.liveUrl ? <div className="border border-foreground/15"><ScaledFrame url={project.liveUrl} interactive title={`${project.title} live preview`} /></div> : <ImageFrame image={project.images[0]} eager className="aspect-[4/3] md:aspect-[2/1]" />}<div className="grid gap-14 py-20 md:grid-cols-12 md:py-32"><div className="md:col-span-3"><p className="eyebrow text-muted-foreground">At a glance</p><dl className="mt-6 space-y-4 text-sm"><div><dt className="text-muted-foreground">Client</dt><dd>{project.client}</dd></div><div><dt className="text-muted-foreground">Role</dt><dd>{project.role}</dd></div><div><dt className="text-muted-foreground">Tools</dt><dd>{project.tools.join(' · ')}</dd></div></dl></div><div className="md:col-span-7 md:col-start-6"><section><p className="eyebrow text-primary">The challenge</p><p className="display mt-5 text-3xl leading-tight md:text-5xl">{project.challenge}</p></section><section className="mt-20"><p className="eyebrow text-primary">The approach</p><p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{project.approach}</p></section><section className="mt-20"><p className="eyebrow text-primary">The result</p><p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{project.outcome}</p></section></div></div>
    {project.liveUrl && <div className="pb-24 md:pb-36"><a href={project.liveUrl} target="_blank" rel="noopener noreferrer" data-testid="link-detail-live" className="link-line text-sm">Open the live site ↗</a></div>}{project.images.length > 1 && <div className="grid gap-6 pb-24 md:grid-cols-2 md:pb-36">{project.images.slice(1).map((image, i) => <ImageFrame key={image.alt} image={image} className={`aspect-[4/3] ${i % 2 ? 'md:mt-24' : ''}`} />)}</div>}
    <div className="border-y border-foreground/15 py-8 md:py-10"><div className="flex items-center justify-between gap-5"><Link href={`/projects/${prev.slug}`} data-testid="link-previous-project" className="group flex items-center gap-4"><ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" /><span><span className="eyebrow block text-muted-foreground">Previous</span><span className="display text-2xl">{prev.title}</span></span></Link><Link href={`/projects/${next.slug}`} data-testid="link-next-project" className="group flex items-center gap-4 text-right"><span><span className="eyebrow block text-muted-foreground">Next</span><span className="display text-2xl">{next.title}</span></span><ArrowRight size={18} className="transition-transform group-hover:translate-x-1" /></Link></div></div></div>
  </article><Footer /></Shell></>;
}

export function AboutPage() {
  return <><Seo title={`About — ${site.name}`} description="Background, experience and skills of Japji Soni." path="/about" /><Shell><PageIntro index="03 / About" title={<>Hello,<br />I’m <span className="text-primary">Japji.</span></>} lead={site.intro} /><section className="mx-auto grid max-w-[1440px] gap-16 px-6 pb-32 md:grid-cols-12 md:px-14"><div className="md:col-span-5 md:col-start-2"><div className="image-frame aspect-[4/5]"><img src={`${import.meta.env.BASE_URL}profile.jpg`} alt={`Portrait of ${site.name}`} loading="lazy" className="h-full w-full object-cover" /></div></div><div className="md:col-span-5 md:col-start-8 md:pt-24"><p className="display text-3xl leading-tight md:text-5xl">I turn LLM prototypes into systems businesses can trust.</p><p className="mt-8 leading-relaxed text-muted-foreground">I’m a Data Scientist at Birdeye, where I own end-to-end architecture for voice AI agents used in healthcare and automotive. Before that, I built computer vision and recommendation systems at Createbytes. I graduated from Chitkara University with a 9.74 CGPA.</p><p className="mt-6 leading-relaxed text-muted-foreground">I care about accuracy, cost and safety as much as capability — whether that’s guardrails for patient conversations or cutting GPT-4 spend by 28%.</p></div></section><section className="bg-foreground px-6 py-24 text-background md:px-14 md:py-32"><div className="mx-auto max-w-[1440px]"><div className="eyebrow text-primary">Experience &amp; education</div><div className="mt-12">{experience.map(item => <div key={item.dates} className="grid gap-4 border-t border-background/20 py-7 md:grid-cols-12"><p className="mono text-background/50 md:col-span-2">{item.dates}</p><p className="display text-2xl md:col-span-3">{item.role}<span className="block text-base text-background/50">{item.company}</span></p><p className="max-w-md text-sm leading-relaxed text-background/60 md:col-span-5 md:col-start-8">{item.detail}</p></div>)}</div><div className="mt-4 grid gap-8 border-t border-background/20 pt-10 md:grid-cols-12"><p className="eyebrow text-primary md:col-span-2">Skills</p><dl className="grid gap-6 md:col-span-9 md:col-start-4 md:grid-cols-2">{skills.map(item => <div key={item.area}><dt className="mono text-background/50">{item.area}</dt><dd className="mt-1 text-sm leading-relaxed text-background/80">{item.items}</dd></div>)}</dl></div><a href={site.resume} target="_blank" rel="noopener noreferrer" data-testid="link-about-resume" className="link-line mt-14 inline-block text-sm">Download résumé (PDF) ↗</a></div></section><Footer /></Shell></>;
}

export function ServicesPage() {
  return <><Seo title={`Services — ${site.name}`} description="The areas of AI and machine learning I work in." path="/services" /><Shell><PageIntro index="04 / Services" title={<>What I<br /><span className="text-primary">do.</span></>} lead="Three areas where I do my best work: conversational agents, agentic workflows, and applied machine learning." /><section className="mx-auto max-w-[1440px] px-6 pb-24 md:px-14 md:pb-36"><div className="grid border-t border-foreground/15 md:grid-cols-2 xl:grid-cols-4">{services.map(service => <div key={service.number} className="border-b border-foreground/15 p-7 md:min-h-[480px] md:border-r md:p-10"><div className="flex justify-between"><span className="eyebrow text-primary">{service.number}</span><ArrowUpRight size={18} /></div><h2 className="display mt-24 text-4xl font-semibold leading-none">{service.name}</h2><p className="mt-6 leading-relaxed text-muted-foreground">{service.detail}</p><ul className="mt-10 space-y-3 text-sm">{service.list.map(item => <li key={item} className="flex gap-3"><span className="text-primary">—</span>{item}</li>)}</ul></div>)}</div><div className="mt-24 grid gap-10 md:grid-cols-12"><div className="md:col-span-4"><div className="eyebrow text-primary">How I build</div><h2 className="display mt-5 text-5xl leading-none">Reliable beats flashy.</h2></div><div className="md:col-span-6 md:col-start-7"><div className="space-y-0">{['Understand the workflow', 'Prototype against real data', 'Ship with guardrails'].map((step, i) => <div key={step} className="flex gap-7 border-t border-foreground/15 py-6"><span className="mono text-primary">0{i + 1}</span><div><h3 className="display text-2xl">{step}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{['Map how the business actually works before choosing a model.', 'Evaluate on real conversations, documents and edge cases early.', 'Add monitoring, safety and cost controls before it reaches customers.'][i]}</p></div></div>)}</div></div></div></section><Footer /></Shell></>;
}

export function ContactPage() {
  return <><Seo title={`Contact — ${site.name}`} description="Get in touch with Japji Soni about AI, NLP and agentic systems." path="/contact" /><Shell><PageIntro index="05 / Contact" title={<>Let’s<br /><span className="text-primary">talk.</span></>} lead="Tell me what you’re building or what isn’t working yet. I’ll get back to you within a few working days." /><section className="mx-auto max-w-[1440px] px-6 pb-32 md:px-14"><div className="border-t border-foreground/15 pt-12 md:pt-16"><div className="max-w-3xl"><p className="eyebrow text-primary">Say hello</p><p className="display mt-6 text-4xl leading-[.95] md:text-6xl">Skip the form. Send an email.</p><a href={`mailto:${site.email}`} data-testid="link-contact-cta" className="group mt-10 flex w-fit items-center gap-4 rounded-full bg-foreground px-6 py-4 text-sm text-background transition-transform duration-300 hover:scale-[1.02]">Email {site.name} <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-foreground transition-transform duration-300 group-hover:rotate-45"><ArrowUpRight size={16} /></span></a><div className="mt-16 border-t border-foreground/15 pt-8 md:mt-20"><p className="eyebrow text-muted-foreground">Elsewhere</p><div className="mt-5 flex flex-wrap gap-x-8 gap-y-3">{site.socials.map(s => <a href={s.href.startsWith('[') ? '#' : s.href} key={s.label} target="_blank" rel="noopener noreferrer" className="link-line text-sm">{s.label}</a>)}</div></div></div></div></section><Footer /></Shell></>;
}

export function NotFoundPage() { return <Shell><div className="mx-auto flex min-h-[70dvh] max-w-[1440px] flex-col justify-center px-6 md:px-14"><p className="eyebrow text-primary">404 / Not found</p><h1 className="display mt-6 text-7xl font-semibold leading-none md:text-9xl">Wrong<br />turn.</h1><Link href="/" data-testid="link-not-found-home" className="mt-10 w-fit text-sm underline underline-offset-4 hover:text-primary">Take me home ↗</Link></div><Footer /></Shell>; }