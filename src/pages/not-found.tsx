import { ArrowUpRight } from 'lucide-react';
import { Link } from 'wouter';
import { PageMeta } from '@/components/page-meta';

export default function NotFound() {
  return (
    <>
      <PageMeta page="notFound" />
      <section className="page-hero">
        <div className="container-wide">
          <span className="eyebrow">404</span>
          <h1 className="display">Page not found.</h1>
          <p>The page you’re looking for doesn’t exist or has moved.</p>
          <div className="hero-actions">
            <Link href="/" className="button button-dark" data-testid="link-not-found-home">
              Back to home <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
