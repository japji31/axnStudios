import { type ReactNode, useEffect, useRef, useState } from 'react';

export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
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
  return (
    <div ref={ref} className={`reveal ${visible ? 'visible' : ''} ${className}`}>
      {children}
    </div>
  );
}
