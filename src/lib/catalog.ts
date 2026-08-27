export type Product = {
  slug: string;
  name: string;
  collection: string;
  collectionSlug: string;
  threadCount: string;
  weave: string;
  type: "bedsheet" | "comforter";
  price: number;
  was?: number;
  desc: string;
  detail: string;
  fill: string;
  image?: string;
  colours: { name: string; hex: string }[];
  sizes: string[];
  stock: number;
};

export type Collection = {
  slug: string;
  name: string;
  tagline: string;
  desc: string;
  threadCount: string;
  fill: string;
  image?: string;
  typeLabel?: string;
};

export const collections: Collection[] = [
  {
    slug: "cotton-muse",
    name: "Cotton Muse",
    tagline: "300 TC · Block Print",
    desc: "Pure farm cotton in hand block prints — soft, breathable, understated. The everyday weave, made to be lived on.",
    threadCount: "300 TC",
    fill: "linear-gradient(135deg,#8f9a7d,#c9a876)",
  },
  {
    slug: "loom-elan",
    name: "Loom Elan",
    tagline: "400 TC · Jacquard",
    desc: "Woven jacquard texture with a refined hand — quietly luxurious, with a subtle sheen that catches evening light.",
    threadCount: "400 TC",
    fill: "linear-gradient(135deg,#4d4a45,#a98266)",
  },
  {
    slug: "artisan-prints",
    name: "Artisan Prints",
    tagline: "380 TC · Artisan Print",
    desc: "Botanical motifs printed by hand — for rooms with real character. Each length carries the mark of the block.",
    threadCount: "380 TC",
    fill: "linear-gradient(135deg,#c9a876,#c6a199)",
  },
  {
    slug: "loomsville-royale",
    name: "Loomsville Royale",
    tagline: "450 TC · Signature Hybrid",
    desc: "Jacquard and plain weave, brought together — the flagship, made to be an heirloom.",
    threadCount: "450 TC",
    fill: "linear-gradient(135deg,#2b2621,#6e7c87)",
  },
];

const CDN = "https://loomsville.com/cdn/shop/files";
const SIZES = ["Single", "Double", "Queen", "King"];

export const products: Product[] = [
  {
    slug: "cotton-muse-block-print",
    name: "Cotton Muse",
    collection: "Cotton Muse",
    collectionSlug: "cotton-muse",
    threadCount: "300 TC",
    weave: "Block Print",
    type: "bedsheet",
    price: 1999,
    desc: "Pure farm cotton in hand block prints — soft, breathable, understated.",
    detail:
      "Woven from long-staple farm cotton and finished without chemical softeners. The block print is hand-set, small irregularities are part of the cloth.",
    fill: "linear-gradient(135deg,#8f9a7d,#c9a876)",
    image: `${CDN}/CMbeige1.jpg?v=1759325188&width=1000`,
    colours: [
      { name: "Sage Grove", hex: "#7E8A6B" },
      { name: "Sand Dune", hex: "#C9A876" },
    ],
    sizes: SIZES,
    stock: 24,
  },
  {
    slug: "loom-elan-jacquard",
    name: "Loom Elan",
    collection: "Loom Elan",
    collectionSlug: "loom-elan",
    threadCount: "400 TC",
    weave: "Jacquard",
    type: "bedsheet",
    price: 3899,
    desc: "Woven jacquard texture with a refined hand — quietly luxurious.",
    detail:
      "The pattern is woven, not printed, so the texture is permanent. Denser than our plain weaves, with a cool hand that suits year-round use.",
    fill: "linear-gradient(135deg,#4d4a45,#a98266)",
    image: `${CDN}/JCdarkgrey1.jpg?v=1759153481&width=1000`,
    colours: [
      { name: "Dark Grey", hex: "#4A4A4A" },
      { name: "Dusty Rose", hex: "#C6A199" },
      { name: "Ivory", hex: "#F5EFE2" },
      { name: "Mocha", hex: "#6B4E3D" },
      { name: "Slate Blue", hex: "#6E7C87" },
      { name: "Tea Green", hex: "#8BA888" },
      { name: "Silver Grey", hex: "#A8A8A8" },
      { name: "Beige", hex: "#D4C4A8" },
      { name: "Pearl White", hex: "#E8E4DA" },
      { name: "Charcoal", hex: "#2B2621" },
    ],
    sizes: SIZES,
    stock: 30,
  },
  {
    slug: "cotton-sole-plain",
    name: "Cotton Sole",
    collection: "Cotton Muse",
    collectionSlug: "cotton-muse",
    threadCount: "300 TC",
    weave: "Plain",
    type: "bedsheet",
    price: 2999,
    desc: "Pure farm cotton in a clean plain weave — endlessly versatile.",
    detail:
      "Our foundational plain weave. Finishes without chemical softeners so the weave breaks in naturally over time.",
    fill: "linear-gradient(135deg,#6e7c87,#aeb9c0)",
    image: `${CDN}/CSslateblue1.jpg?v=1759213402&width=1000`,
    colours: [
      { name: "Slate Blue", hex: "#6E7C87" },
      { name: "Tea Green", hex: "#8BA888" },
      { name: "Silver Grey", hex: "#A8A8A8" },
      { name: "Beige", hex: "#D4C4A8" },
      { name: "Dusty Rose", hex: "#C6A199" },
      { name: "Ivory", hex: "#F5EFE2" },
      { name: "Mocha", hex: "#6B4E3D" },
    ],
    sizes: SIZES,
    stock: 20,
  },
  {
    slug: "artisans-prints-loom",
    name: "Artisans Prints Loom",
    collection: "Artisan Prints",
    collectionSlug: "artisan-prints",
    threadCount: "380 TC",
    weave: "Printed",
    type: "bedsheet",
    price: 2799,
    desc: "Intricate maze prints by hand — for rooms with real character.",
    detail:
      "Printed block by block across a sateen base. Expect gentle variation between panels; the honest signature of hand printing.",
    fill: "linear-gradient(135deg,#c9a876,#e0cfae)",
    image: `${CDN}/APpearlmaze1.jpg?v=1759326274&width=1000`,
    colours: [
      { name: "Pearl Loom", hex: "#E8E4DA" },
      { name: "Grey Loom", hex: "#A8A8A8" },
    ],
    sizes: SIZES,
    stock: 16,
  },
  {
    slug: "artisans-prints-creeper",
    name: "Artisans Prints Creeper",
    collection: "Artisan Prints",
    collectionSlug: "artisan-prints",
    threadCount: "380 TC",
    weave: "Printed",
    type: "bedsheet",
    price: 2799,
    desc: "Golden creeper vines, hand-printed on farm cotton.",
    detail:
      "A climbing vine motif across the panel. The golden pigment is plant-based and deepens slightly with each wash.",
    fill: "linear-gradient(135deg,#c9a876,#a98266)",
    image: `${CDN}/APgoldcreeper1.jpg?v=1759326228&width=1000`,
    colours: [{ name: "Golden Creeper", hex: "#C9A876" }],
    sizes: SIZES,
    stock: 12,
  },
  {
    slug: "artisans-prints-bloom",
    name: "Artisans Prints Bloom",
    collection: "Artisan Prints",
    collectionSlug: "artisan-prints",
    threadCount: "380 TC",
    weave: "Printed",
    type: "bedsheet",
    price: 2799,
    desc: "Floral bloom motifs, block-printed with botanical pigments.",
    detail:
      "Our most popular print — a round flower repeat in multiple colourways. Each metre requires hundreds of precise manual impressions.",
    fill: "linear-gradient(135deg,#c6a199,#e4cfc7)",
    image: `${CDN}/AProundflowerblushgreyprints1.jpg?v=1759326282&width=1000`,
    colours: [
      { name: "Smoky Bloom", hex: "#888888" },
      { name: "Rose Cameo", hex: "#C4958C" },
      { name: "Silver Bloom", hex: "#A8A8A8" },
      { name: "Golden Bloom", hex: "#C9A876" },
      { name: "Pearl Bloom", hex: "#E8E4DA" },
    ],
    sizes: SIZES,
    stock: 22,
  },
  {
    slug: "artisans-prints-aura",
    name: "Artisans Prints Aura",
    collection: "Artisan Prints",
    collectionSlug: "artisan-prints",
    threadCount: "380 TC",
    weave: "Printed",
    type: "bedsheet",
    price: 2799,
    desc: "Circular aura motifs — the calmest print we make.",
    detail:
      "A geometric circle repeat printed at low contrast so it recedes rather than announces itself.",
    fill: "linear-gradient(135deg,#c4a06b,#e0cfae)",
    image: `${CDN}/AProsegoldcircle2.jpg?v=1759216467&width=1000`,
    colours: [
      { name: "Beige Aura", hex: "#D4C4A8" },
      { name: "Silver Aura", hex: "#A8A8A8" },
      { name: "Rose Gold Aura", hex: "#C4A06B" },
    ],
    sizes: SIZES,
    stock: 14,
  },
  {
    slug: "artisans-prints-leaves",
    name: "Artisans Prints Leaves",
    collection: "Artisan Prints",
    collectionSlug: "artisan-prints",
    threadCount: "380 TC",
    weave: "Printed",
    type: "bedsheet",
    price: 2799,
    desc: "Botanical leaf prints — a quiet garden for your bedroom.",
    detail:
      "A leaf scatter repeat across a sateen base. Available in four colourways from pale to earthy.",
    fill: "linear-gradient(135deg,#8f9a7d,#c6a199)",
    image: `${CDN}/APpearlleaves3.jpg?v=1759216543&width=1000`,
    colours: [
      { name: "Blush Leaves", hex: "#E0B8A8" },
      { name: "Earthy Leaves", hex: "#9C7856" },
      { name: "Twilight Leaves", hex: "#6E7C87" },
      { name: "Pearl Leaves", hex: "#E8E4DA" },
      { name: "Purple Leaves", hex: "#7C6B8A" },
    ],
    sizes: SIZES,
    stock: 18,
  },
  {
    slug: "empress-edit",
    name: "Empress Edit",
    collection: "Loom Elan",
    collectionSlug: "loom-elan",
    threadCount: "400 TC",
    weave: "Plain · Embroidered",
    type: "bedsheet",
    price: 3599,
    desc: "400 TC plain weave with hand-embroidered pillow covers.",
    detail:
      "Our plain weave elevated by chic pillow embroidery — understated luxury for the discerning bedroom.",
    fill: "linear-gradient(135deg,#f2eee3,#c6a199)",
    image: `${CDN}/emplvory1.jpg?v=1759745696&width=1000`,
    colours: [
      { name: "Ivory", hex: "#F5EFE2" },
      { name: "Moss Green", hex: "#6B8B5E" },
      { name: "Cameo Rose", hex: "#C4958C" },
      { name: "Dark Grey", hex: "#4A4A4A" },
      { name: "Dusty Rose", hex: "#C6A199" },
      { name: "Slate Blue", hex: "#6E7C87" },
      { name: "Sand", hex: "#C9A876" },
      { name: "Mocha", hex: "#6B4E3D" },
      { name: "Charcoal", hex: "#2B2621" },
    ],
    sizes: SIZES,
    stock: 10,
  },
  {
    slug: "royal-weave-jacara",
    name: "The Royal Weave",
    collection: "Loomsville Royale",
    collectionSlug: "loomsville-royale",
    threadCount: "450 TC",
    weave: "Jacara",
    type: "bedsheet",
    price: 3999,
    desc: "Our finest bedsheet weave — the Jacara 450 TC.",
    detail:
      "The Royal Weave uses our densest plain weave construction. Finished with a hand-turned hem.",
    fill: "linear-gradient(135deg,#c6a199,#6b4e3d)",
    image: `${CDN}/RWdustyrose1.jpg?v=1759154548&width=1000`,
    colours: [
      { name: "Dusty Rose", hex: "#C6A199" },
      { name: "Mocha", hex: "#6B4E3D" },
      { name: "Slate Blue", hex: "#6E7C87" },
      { name: "Green", hex: "#6B8B5E" },
      { name: "Ivory", hex: "#F5EFE2" },
    ],
    sizes: SIZES,
    stock: 8,
  },
  {
    slug: "loomsville-suite-comforter",
    name: "The Loomsville Suite",
    collection: "Loomsville Royale",
    collectionSlug: "loomsville-royale",
    threadCount: "350 TC",
    weave: "All-Season Comforter",
    type: "comforter",
    price: 9999,
    desc: "350 TC all-season pure farm cotton comforter set.",
    detail:
      "Our signature comforter — farm cotton shell, breathable fill, designed to regulate temperature through the year.",
    fill: "linear-gradient(135deg,#6e7c87,#2b2621)",
    image: `${CDN}/comforter1.jpg?v=1759324552&width=1000`,
    colours: [
      { name: "Sea Pearl", hex: "#D4E0E0" },
      { name: "Aqua Green", hex: "#80B8A8" },
      { name: "Beige", hex: "#D4C4A8" },
      { name: "Charcoal Grey", hex: "#3A3A3A" },
      { name: "Dusty Rose", hex: "#C6A199" },
      { name: "Slate Blue", hex: "#6E7C87" },
    ],
    sizes: ["Double", "Queen", "King"],
    stock: 15,
  },
  {
    slug: "loomsville-royale-blend",
    name: "The Loomsville Royale Blend",
    collection: "Loomsville Royale",
    collectionSlug: "loomsville-royale",
    threadCount: "450 TC",
    weave: "Jacquard + Plain Hybrid",
    type: "comforter",
    price: 12999,
    desc: "The flagship comforter — jacquard body, plain weave reverse.",
    detail:
      "Made in small runs. Jacquard body with a 300 TC plain weave reverse and a woven mark on the underside of the hem.",
    fill: "linear-gradient(135deg,#2b2621,#6b4e3d)",
    image: `${CDN}/Comforters_Jacquard_Mocha1.jpg?v=1763393453&width=1000`,
    colours: [
      { name: "Mocha", hex: "#6B4E3D" },
      { name: "Silver Grey", hex: "#A8A8A8" },
      { name: "Slate Blue", hex: "#6E7C87" },
    ],
    sizes: ["Queen", "King"],
    stock: 5,
  },
];

export const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getCollection = (slug: string) => collections.find((c) => c.slug === slug);
export const productsInCollection = (slug: string) =>
  products.filter((p) => p.collectionSlug === slug);

export const stockLabel = (stock: number) =>
  stock === 0 ? "Out of stock" : stock <= 5 ? `Only ${stock} left` : `In stock · ${stock}`;
