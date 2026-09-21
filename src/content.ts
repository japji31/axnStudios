export type Project = {
  slug: string; title: string; year: string; category: string; client: string; role: string;
  summary: string; challenge: string; approach: string; outcome: string; tools: string[];
  images: { src: string; alt: string; tone: string }[];
  liveUrl?: string;
};

const asset = (name: string) => `${import.meta.env.BASE_URL}${name}`;

export const site = {
  name: 'Japji Soni', role: 'Data Scientist — NLP & Agentic AI', location: 'Mohali, Punjab , India',
  positioning: 'I build AI agents that hold up in production.',
  intro: 'Data Scientist working on voice AI, LLM agents and retrieval systems — who also designs, builds and deploys scalable websites end to end.',
  email: 'yps.japji@gmail.com', phone: '',
  resume: asset('japji-soni-resume.pdf'),
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/japji-soni-07aa501a6/' },
  ],
  seo: { title: 'Japji Soni — Data Scientist, NLP & Agentic AI', description: 'Portfolio of Japji Soni, a Data Scientist building production voice AI agents, LLM copilots and RAG systems at Birdeye.', url: 'https://yourdomain.com' },
};

export const projects: Project[] = [
  {
    slug: 'loomsville', title: 'Loomsville', year: 'Live', category: 'Web / E-commerce', client: 'Loomsville',
    role: 'Design, development & deployment', summary: 'A fast, responsive online store for a luxury farm-cotton bedding brand — designed, built and deployed end to end.',
    challenge: 'A premium bedding label needed an online storefront that feels as calm as its product, while handling collections, bundle offers and a clear path to checkout.',
    approach: 'Built the storefront with collection browsing and filtering, a shopping cart with an automatic 20% discount on 3+ items, a LOOM10 promo code, customer reviews and a newsletter sign-up. Responsive across devices and deployed on Vercel.',
    outcome: 'A live store for four collections, priced from ₹1,999, with free shipping, 90-day returns and a 2-year warranty presented clearly on the page.',
    tools: ['Web development', 'E-commerce', 'Responsive UI', 'Vercel'],
    liveUrl: 'https://looms-taupe.vercel.app/',
    images: [],
  },
  {
    slug: 'myna-voice-agents', title: 'Myna Voice Agents', year: '2024 — now', category: 'Voice AI / Healthcare', client: 'Birdeye',
    role: 'Owner, end-to-end agent architecture', summary: 'Production voice AI agents for Birdeye’s Myna, an Operations AI Coworker serving healthcare and automotive businesses.',
    challenge: 'Dental and automotive clients needed patients and customers to book, cancel and reschedule appointments by phone — accurately, safely and without a human on the line.',
    approach: 'Owned the architecture for the booking, cancellation and rescheduling flows: EHR-integrated identity verification, multi-provider slot negotiation and HIPAA-compliant conversation guardrails. Clinical workflows were rewritten into natural, text-to-speech-optimised dialogue. On top sits an AI call-quality system that analyses live agent interactions and surfaces coaching insights.',
    outcome: 'Autonomous, enterprise-grade patient interactions trusted by top dental and automotive clients, with a feedback loop that keeps improving call containment and resolution rates.',
    tools: ['Voice AI', 'LLM agents', 'EHR integration', 'Guardrails'],
    images: [
      { src: asset('project-tidal.jpg'), alt: 'Abstract cobalt ribbon artwork', tone: 'blue' },
      { src: asset('project-arc.jpg'), alt: 'Abstract amber and plum artwork', tone: 'cream' },
    ],
  },
  {
    slug: 'email-template-copilot', title: 'Email Template Copilot', year: 'Now', category: 'Agentic AI / Marketing', client: 'Birdeye',
    role: 'Design & development', summary: 'A copilot agent that turns a plain-language prompt into a production-grade HTML email campaign.',
    challenge: 'Building on-brand email templates and running several business-specific campaigns meant juggling tools, designers and manual personalisation.',
    approach: 'A LangGraph-based workflow inside the Marketing Automation ecosystem. Users describe the campaign in natural language; the agent generates polished HTML templates, personalises content at scale and manages the campaigns in one place.',
    outcome: 'An end-to-end solution, currently in development, for creating, personalising and executing campaigns from a single platform.',
    tools: ['LangGraph', 'Copilot architecture', 'HTML generation', 'Prompt engineering'],
    images: [{ src: asset('project-arc.jpg'), alt: 'Abstract amber glass artwork', tone: 'amber' }, { src: asset('project-tidal.jpg'), alt: 'Abstract cobalt artwork', tone: 'plum' }],
  },
  {
    slug: 'review-insights-and-content', title: 'Reviews, Insights & Content AI', year: '2024 — 25', category: 'NLP / LLM / RAG', client: 'Birdeye',
    role: 'Data Scientist', summary: 'Recommendation, insight and content-generation models built on real customer feedback.',
    challenge: 'Business owners have thousands of reviews and posts to act on, and little time to work out what to improve or what to say next.',
    approach: 'Fine-tuned Meta-Llama-3-8B to turn negative review snippets into concrete recommendations; built Insights Summary and Brand Voice features; added RAG to “Robin”, Birdeye’s chatbot; and a content pipeline using strategic hook extraction plus image recommendations from semantic embeddings on AWS OpenSearch 2.9 k-NN (FAISS).',
    outcome: 'The recommendation model reached roughly 86% accuracy after fine-tuning, and owners get brand-aligned summaries to track their progress.',
    tools: ['Llama-3-8B', 'RAG', 'AWS OpenSearch', 'FAISS'],
    images: [{ src: asset('project-kin.jpg'), alt: 'Abstract chrome and lacquer red artwork', tone: 'lilac' }, { src: asset('project-arc.jpg'), alt: 'Abstract plum artwork', tone: 'red' }],
  },
  {
    slug: 'legal-compliance-app', title: 'Legal Compliance App', year: '2023 — 24', category: 'Computer Vision / GenAI', client: 'Createbytes',
    role: 'Associate Software Engineer', summary: 'An ML service that checks product packaging against legal compliance rules.',
    challenge: 'Checking packaging for compliance was slow, manual and expensive to scale — and GPT-4 costs mattered.',
    approach: 'YOLOv8 object detection, OpenCV image analysis, regex text extraction and structured GPT-4 prompts, served through FastAPI on Azure and AWS. LangChain-based prompt compression kept the API bill down.',
    outcome: 'About 95% overall accuracy, with a 28% reduction in GPT-4 API cost.',
    tools: ['YOLOv8', 'OpenCV', 'GPT-4', 'FastAPI', 'Azure', 'Docker'],
    images: [{ src: asset('project-kin.jpg'), alt: 'Abstract chrome artwork', tone: 'lilac' }, { src: asset('project-tidal.jpg'), alt: 'Abstract cobalt artwork', tone: 'blue' }],
  },
];

export const services = [
  { number: '01', name: 'Voice & conversational AI', detail: 'Agents that talk to real customers and stay accurate, compliant and natural.', list: ['Appointment workflows', 'EHR integrations', 'HIPAA guardrails', 'Call-quality analysis'] },
  { number: '02', name: 'Agentic AI & RAG', detail: 'Copilots and retrieval systems that turn a plain prompt into finished work.', list: ['LangGraph workflows', 'RAG pipelines', 'Vector databases', 'Prompt engineering'] },
  { number: '03', name: 'Applied ML & vision', detail: 'Fine-tuned models and pipelines, from research to a monitored deployment.', list: ['LLM fine-tuning', 'Computer vision', 'MLOps', 'Cloud & event-driven systems'] },
  { number: '04', name: 'Web & DevOps', detail: 'Scalable websites for real businesses, built and shipped without hand-offs.', list: ['Responsive front-end', 'E-commerce builds', 'Docker & Git workflows', 'Deployment on Vercel'] },
];

export const experience = [
  { dates: 'Jun 2024 — now', role: 'Data Scientist, NLP', company: 'Birdeye · Gurugram', detail: 'Voice AI agents for Myna, an email template copilot, RAG for the Robin chatbot, and LLM-driven review insights.' },
  { dates: 'Sep 2023 — Jun 2024', role: 'Associate Software Engineer', company: 'Createbytes · Gurugram', detail: 'A legal compliance ML service (~95% accuracy), vector-search recommendations for a 100K+ download app, and contextual news search.' },
  { dates: '2019 — 2023', role: 'B.Tech, Computer Science', company: 'Chitkara University', detail: 'Graduated with a 9.74 CGPA.' },
];

export const skills = [
  { area: 'Languages', items: 'Python' },
  { area: 'Agentic AI & RAG', items: 'LangGraph, LangChain, vector databases (Pinecone, Chroma), embedding models' },
  { area: 'LLMs', items: 'Prompt engineering, fine-tuning (Llama-3, GPT-4 APIs)' },
  { area: 'Cloud & infra', items: 'AWS Bedrock, OpenSearch, Azure Service Bus, Firebase, Kafka, Docker' },
  { area: 'ML & vision', items: 'Deep learning, MLOps, OpenCV, YOLOv8, transformers' },
  { area: 'Web & DevOps', items: 'Responsive front-end, e-commerce, Vercel deployments, Docker, Git' },
  { area: 'Backend', items: 'FastAPI, Django REST Framework, Redis' },
];
