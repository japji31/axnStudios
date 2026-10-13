import raw from '@/testimonials.json';

export type Testimonial = {
  id: string;
  service: 'Web Development' | 'Marketing Automation' | 'AI Agents & Chatbots';
  quote: string;
  client: { name: string | null; role: string | null; company: string | null };
  project_type: string;
  /** Kept for schema compatibility; star ratings are never displayed. */
  rating: number | null;
  /** `verified` = a real client said it; `demo_content` = layout-only placeholder (never published). */
  source_status: 'verified' | 'needs_client_feedback' | 'demo_content';
  approval_status: 'approved' | 'pending';
  publishable: boolean;
};

export const testimonials = raw as Testimonial[];

/**
 * A testimonial may appear on the live site only when it is real, approved and
 * attributable. Setting `publishable: true` alone is not enough.
 */
export function isPublishable(t: Testimonial): boolean {
  return (
    t.publishable &&
    t.approval_status === 'approved' &&
    t.source_status === 'verified' &&
    t.quote.trim().length > 0 &&
    Boolean(t.client.name) &&
    Boolean(t.client.role || t.client.company)
  );
}

/** Production shows publishable entries only; demo cards appear solely in the dev server. */
export function visibleTestimonials(includeDemo: boolean, all: Testimonial[] = testimonials): Testimonial[] {
  return all.filter((t) => isPublishable(t) || (includeDemo && t.source_status === 'demo_content'));
}
