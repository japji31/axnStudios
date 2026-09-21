import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Monitor, RotateCw, Smartphone } from 'lucide-react';
import type { Project } from '@/content';

type Device = 'desktop' | 'mobile';
const sizes: Record<Device, { w: number; h: number }> = { desktop: { w: 1440, h: 900 }, mobile: { w: 390, h: 800 } };

/** Renders a live site at a fixed design size and scales it to fit its container. */
export function ScaledFrame({ url, device = 'desktop', interactive = false, title, reloadKey = 0 }: { url: string; device?: Device; interactive?: boolean; title: string; reloadKey?: number }) {
  const { w, h } = sizes[device];
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.4);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / w));
    ro.observe(el);
    return () => ro.disconnect();
  }, [w]);
  useEffect(() => setLoaded(false), [url, device, reloadKey]);
  return <div ref={ref} className="relative w-full overflow-hidden bg-secondary" style={{ aspectRatio: `${w} / ${h}` }}>
    {!loaded && <div className="absolute inset-0 flex items-center justify-center"><span className="mono animate-pulse text-muted-foreground">Loading live site…</span></div>}
    <iframe key={`${device}-${reloadKey}`} src={url} title={title} loading="lazy" onLoad={() => setLoaded(true)} tabIndex={interactive ? 0 : -1} aria-hidden={!interactive}
      className={`absolute left-0 top-0 border-0 bg-white transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      style={{ width: w, height: h, transform: `scale(${scale})`, transformOrigin: '0 0', pointerEvents: interactive ? 'auto' : 'none' }} />
  </div>;
}

/** Small "Live" badge used on cards. */
export function LiveBadge() {
  return <span className="mono absolute left-4 top-4 z-10 flex items-center gap-2 bg-background/90 px-3 py-1.5 text-foreground backdrop-blur">
    <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" /><span className="relative inline-flex h-2 w-2 rounded-full bg-primary" /></span>Live site
  </span>;
}

function useCountUp(target: number, start: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setValue(target); return; }
    let raf = 0; const t0 = performance.now(); const dur = 1400;
    const tick = (now: number) => {
      const p = Math.min((now - t0) / dur, 1);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target]);
  return value;
}

const facts = [
  { value: 4, label: 'Product collections', prefix: '', suffix: '' },
  { value: 20, label: 'Auto bundle discount at 3+ items', prefix: '', suffix: '%' },
  { value: 1999, label: 'Starting price', prefix: '₹', suffix: '' },
  { value: 90, label: 'Day returns', prefix: '', suffix: '' },
];

function Fact({ value, label, prefix, suffix, go }: (typeof facts)[number] & { go: boolean }) {
  const n = useCountUp(value, go);
  return <div className="border-t border-foreground/15 pt-4">
    <p className="display text-4xl font-semibold leading-none md:text-5xl">{prefix}{n.toLocaleString('en-IN')}<span className="text-primary">{suffix}</span></p>
    <p className="mt-3 text-xs leading-snug text-muted-foreground">{label}</p>
  </div>;
}

/** Interactive browser mock-up of a live project with device toggle and stats. */
export function LiveShowcase({ project }: { project: Project }) {
  const url = project.liveUrl!;
  const [device, setDevice] = useState<Device>('desktop');
  const [reloadKey, setReloadKey] = useState(0);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const host = url.replace(/^https?:\/\//, '').replace(/\/$/, '');
  const toggle = (d: Device, Icon: typeof Monitor, label: string) => <button type="button" onClick={() => setDevice(d)} aria-pressed={device === d} data-testid={`button-device-${d}`}
    className={`flex items-center gap-2 px-4 py-2 text-xs transition-colors ${device === d ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground'}`}><Icon size={14} />{label}</button>;

  return <section ref={sectionRef} className="mx-auto max-w-[1440px] px-6 pb-24 md:px-14 md:pb-36" aria-label={`${project.title} live preview`}>
    <div className="mb-10 grid gap-6 md:grid-cols-12 md:items-end">
      <div className="md:col-span-8"><p className="eyebrow text-primary">Live build · Web &amp; DevOps</p><h2 className="display mt-5 text-5xl font-semibold leading-none md:text-7xl">{project.title}<span className="text-primary">.</span></h2></div>
      <p className="max-w-md text-muted-foreground md:col-span-4">{project.summary}</p>
    </div>

    <div className="border border-foreground/15 bg-background">
      <div className="flex flex-wrap items-center gap-3 border-b border-foreground/15 px-4 py-3">
        <div className="flex gap-1.5" aria-hidden><span className="h-2.5 w-2.5 rounded-full bg-foreground/20" /><span className="h-2.5 w-2.5 rounded-full bg-foreground/20" /><span className="h-2.5 w-2.5 rounded-full bg-primary" /></div>
        <div className="mono order-3 w-full min-w-0 truncate border border-foreground/15 px-3 py-1.5 text-muted-foreground md:order-none md:w-auto md:flex-1">{host}</div>
        <div className="ml-auto flex items-center border border-foreground/15">
          {toggle('desktop', Monitor, 'Desktop')}{toggle('mobile', Smartphone, 'Mobile')}
        </div>
        <button type="button" onClick={() => setReloadKey(k => k + 1)} aria-label="Reload preview" data-testid="button-reload-preview" className="border border-foreground/15 p-2 text-muted-foreground transition-colors hover:text-primary"><RotateCw size={14} /></button>
      </div>
      <div className={`flex justify-center bg-secondary transition-[padding] duration-500 ${device === 'mobile' ? 'py-8 md:py-12' : 'p-0'}`}>
        <div className={`w-full transition-[max-width] duration-500 ease-out ${device === 'mobile' ? 'max-w-[300px] border-[6px] border-foreground shadow-2xl' : 'max-w-full'}`}>
          <ScaledFrame url={url} device={device} interactive title={`${project.title} live preview`} reloadKey={reloadKey} />
        </div>
      </div>
    </div>
    <p className="mono mt-4 text-muted-foreground">Fully interactive — scroll, click and add to cart inside the preview.</p>

    <div className="mt-14 grid gap-10 md:grid-cols-12">
      <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:col-span-7 md:grid-cols-4">{facts.map(f => <Fact key={f.label} {...f} go={inView} />)}</div>
      <div className="flex flex-wrap items-center gap-6 md:col-span-4 md:col-start-9 md:justify-end">
        <a href={url} target="_blank" rel="noopener noreferrer" data-testid="link-visit-live" className="group flex w-fit items-center gap-4 rounded-full bg-foreground px-6 py-4 text-sm text-background transition-transform duration-300 hover:scale-[1.02]">Visit live site <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-foreground transition-transform duration-300 group-hover:rotate-45"><ArrowUpRight size={16} /></span></a>
      </div>
    </div>
  </section>;
}
