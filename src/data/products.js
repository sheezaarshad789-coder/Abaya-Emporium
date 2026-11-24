import { stockStatus } from './catalog';

const IMG = {
  blackAbaya:
    'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
  drape:
    'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80',
  occasion:
    'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80',
  walk:
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
  silk:
    'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=800&q=80',
  set:
    'https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&w=800&q=80',
  niqab:
    'https://images.unsplash.com/photo-1605763240000-7e93b172d754?auto=format&fit=crop&w=800&q=80',
  niqabAlt:
    'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
  textile:
    'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80',
};

const LENGTHS = ['52', '54', '56', '58', '60'];

function lengthVariants(color, stocks, price) {
  return LENGTHS.map((size, index) => ({
    size,
    color,
    price,
    stock: stocks[index] ?? 0,
  }));
}

function freeVariants(entries) {
  return entries.map((entry) => ({
    size: 'free',
    color: entry.color,
    price: entry.price,
    stock: entry.stock,
  }));
}

function withVariants(product) {
  return {
    ...product,
    variants: product.variants.map((variant) => {
      const colorSlug = variant.color.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      return {
        id: `${product.id}-${variant.size}-${colorSlug}`,
        sku: `${product.id}-${variant.size}-${colorSlug}`.toUpperCase(),
        size: variant.size,
        color: variant.color,
        price: variant.price ?? product.price,
        stock: variant.stock,
        status: stockStatus(variant.stock),
      };
    }),
  };
}

const RAW_PRODUCTS = [
  {
    id: 'abaya-black-nidha',
    slug: 'noir-nidha-closed-abaya',
    title: 'Noir Nidha Closed Abaya',
    categoryId: 'abayas',
    subcategoryId: 'black-abayas',
    fabric: 'Korean Nidha',
    price: 4950,
    rating: 4.9,
    reviewCount: 81,
    images: [IMG.blackAbaya, IMG.drape, IMG.textile],
    whatItIs:
      'A closed-front black abaya in matte Korean Nidha with a full A-line flare and a matching chiffon stole.',
    whyBuyIt: [
      'Opaque everyday black that stays smooth without clinging',
      'Front zipper is discreet and practical',
      'Cut in lengths 52 through 60',
    ],
    relatedProductIds: ['acc-hijab-magnets', 'acc-pastel-pins', 'niqab-saudi-georgette'],
    variants: lengthVariants('Black', [6, 8, 5, 4, 0], 4950),
  },
  {
    id: 'abaya-daily-serene',
    slug: 'serene-nidha-umbrella-abaya',
    title: 'Serene Nidha Umbrella Abaya',
    categoryId: 'abayas',
    subcategoryId: 'daily-wear-abayas',
    fabric: 'Korean Nidha',
    price: 4850,
    rating: 4.9,
    reviewCount: 64,
    images: [IMG.blackAbaya, IMG.drape, IMG.textile],
    whatItIs:
      'A full-flare umbrella abaya in matte Korean Nidha, finished with a matching rectangular chiffon shawl for easy everyday styling.',
    whyBuyIt: [
      'Fluid, full-coverage drape designed to move comfortably without clinging',
      'Smooth, wrinkle-resistant fabric that stays polished through a busy day',
      'Discreet front zipper offers practical nursing access',
      'Lightweight, opaque construction suited to year-round wear',
    ],
    variants: [
      ...lengthVariants('Ivory', [4, 7, 6, 3, 2], 4850),
      ...lengthVariants('Sand', [3, 5, 4, 2, 1], 4850),
    ],
  },
  {
    id: 'abaya-coloured-rose',
    slug: 'rose-quartz-open-front-kimono-abaya',
    title: 'Rose Quartz Open-Front Kimono Abaya',
    categoryId: 'abayas',
    subcategoryId: 'coloured-abayas',
    fabric: 'Medina Silk',
    price: 5400,
    rating: 4.9,
    reviewCount: 41,
    images: [IMG.occasion, IMG.walk],
    whatItIs:
      'An open-front kimono abaya in muted dusty-rose Medina Silk, paired with a matching waist belt and hijab.',
    whyBuyIt: [
      'Soft satin-matte finish transitions easily from everyday wear to gatherings',
      'Relaxed kimono sleeves allow comfortable movement',
      'Concealed side pockets keep daily essentials close',
    ],
    variants: lengthVariants('Dusty Rose', [2, 4, 5, 3, 2], 5400),
  },
  {
    id: 'abaya-coloured-plum',
    slug: 'plum-mist-pleated-sleeve-abaya',
    title: 'Plum Mist Pleated-Sleeve Abaya',
    categoryId: 'abayas',
    subcategoryId: 'coloured-abayas',
    fabric: 'Cey Airflow',
    price: 4650,
    rating: 4.8,
    reviewCount: 37,
    images: [IMG.drape, IMG.blackAbaya],
    whatItIs:
      'A relaxed A-line abaya in textured Cey Airflow fabric, finished with delicate pleated cuffs and a matching stole.',
    whyBuyIt: [
      'Textured, easy-care weave helps the abaya look neat with minimal ironing',
      'Pleated cuffs add a refined detail and stay comfortably in place',
      'Soft plum colour brings a gentle accent to a modest wardrobe',
    ],
    variants: lengthVariants('Plum', [5, 4, 3, 2, 2], 4650),
  },
  {
    id: 'abaya-occasion-emerald',
    slug: 'emerald-belted-occasion-abaya',
    title: 'Emerald Belted Occasion Abaya',
    categoryId: 'abayas',
    subcategoryId: 'occasion-wear-abayas',
    fabric: 'Medina Silk',
    price: 7200,
    rating: 4.8,
    reviewCount: 22,
    images: [IMG.occasion, IMG.silk, IMG.walk],
    whatItIs:
      'A belted occasion abaya in deep emerald Medina Silk with a modest front opening and wide flowing sleeves.',
    whyBuyIt: [
      'Richer drape intended for gatherings and Eid',
      'Self-belt defines the waist without tightness',
      'Fully lined through the body',
    ],
    variants: lengthVariants('Emerald', [2, 3, 3, 1, 2], 7200),
  },
  {
    id: 'jilbab-saudi-classic',
    slug: 'classic-saudi-jilbab',
    title: 'Classic Saudi Jilbab',
    categoryId: 'jilbabs-khimar',
    subcategoryId: 'saudi-jilbabs',
    fabric: 'Cey Crepe',
    price: 5600,
    rating: 4.8,
    reviewCount: 33,
    images: [IMG.silk, IMG.drape],
    whatItIs:
      'A one-piece Saudi jilbab with an attached overhead panel, side seam pockets, and a straight modest hem.',
    whyBuyIt: [
      'Overhead panel stays in place without pins',
      'Crepe falls straight and opaque',
      'Offered in the same lengths as the abaya line',
    ],
    variants: [
      ...lengthVariants('Black', [4, 6, 5, 3, 2], 5600),
      ...lengthVariants('Navy', [2, 3, 3, 1, 1], 5750),
    ],
  },
  {
    id: 'khimar-overhead',
    slug: 'ivory-overhead-khimar',
    title: 'Ivory Overhead Khimar',
    categoryId: 'jilbabs-khimar',
    subcategoryId: 'khimar',
    fabric: 'Medina Silk',
    price: 2450,
    rating: 4.7,
    reviewCount: 29,
    images: [IMG.set, IMG.silk],
    whatItIs: 'A tie-back overhead khimar in ivory Medina Silk that covers the chest and shoulders in one piece.',
    whyBuyIt: [
      'Free size with an adjustable tie at the nape',
      'Second layer can sit forward or be worn back',
      'Light enough to layer over a dress or prayer skirt',
    ],
    variants: freeVariants([
      { color: 'Ivory', price: 2450, stock: 9 },
      { color: 'Black', price: 2450, stock: 7 },
    ]),
  },
  {
    id: 'chadar-traditional',
    slug: 'traditional-irani-chadar',
    title: 'Traditional Irani Chadar',
    categoryId: 'irani-chadar',
    subcategoryId: 'traditional-modern-cuts',
    fabric: 'Nida',
    price: 3900,
    rating: 4.8,
    reviewCount: 18,
    images: [IMG.blackAbaya, IMG.textile],
    whatItIs: 'A full traditional-cut Irani chadar in matte black nida, wide enough to wrap from head to hem.',
    whyBuyIt: [
      'Generous width for a secure wrap',
      'Matte finish with little sheen',
      'Free size, worn over your own clothing',
    ],
    variants: freeVariants([{ color: 'Black', price: 3900, stock: 6 }]),
  },
  {
    id: 'chadar-modern',
    slug: 'modern-cut-irani-chadar',
    title: 'Modern-Cut Irani Chadar',
    categoryId: 'irani-chadar',
    subcategoryId: 'traditional-modern-cuts',
    fabric: 'Cey Crepe',
    price: 4200,
    rating: 4.6,
    reviewCount: 14,
    images: [IMG.drape, IMG.silk],
    whatItIs:
      'A modern-cut Irani chadar with a shaped shoulder and a slightly narrower wrap, in stone crepe.',
    whyBuyIt: [
      'Shaped shoulder sits more smoothly than a rectangle',
      'Still covers head to ankle',
      'Free size with a soft matte hand',
    ],
    variants: freeVariants([{ color: 'Stone', price: 4200, stock: 4 }]),
  },
  {
    id: 'niqab-saudi-georgette',
    slug: 'velvet-touch-two-layer-niqab',
    title: 'Velvet-Touch Two-Layer Niqab',
    categoryId: 'niqabs',
    subcategoryId: 'saudi-niqabs',
    fabric: 'Saudi Georgette',
    price: 1450,
    rating: 4.8,
    reviewCount: 92,
    images: [IMG.niqab, IMG.niqabAlt],
    whatItIs:
      'A classic tie-back, two-layer niqab made from soft Saudi Georgette, with neatly finished edges around the eye opening.',
    whyBuyIt: [
      'Airy fabric offers comfortable coverage for extended wear',
      'Soft forehead band helps the fit feel gentle and secure',
      'Wear the second layer down for added coverage or flipped back for ease',
    ],
    variants: freeVariants([
      { color: 'Black', price: 1450, stock: 14 },
      { color: 'Graphite', price: 1450, stock: 3 },
    ]),
  },
  {
    id: 'niqab-simple-chiffon',
    slug: 'nose-piece-chiffon-niqab',
    title: 'Breathable Nose-Piece Chiffon Niqab',
    categoryId: 'niqabs',
    subcategoryId: 'simple-niqabs',
    fabric: 'Chiffon',
    price: 1250,
    rating: 4.7,
    reviewCount: 78,
    images: [IMG.niqabAlt, IMG.niqab],
    whatItIs:
      'A simple single-layer niqab in lightweight matte chiffon, with a light nose piece so the cloth sits away from the mouth.',
    whyBuyIt: [
      'Nose piece helps the fabric stay clear of the face',
      'Feather-light chiffon for warm days',
      'Free size tie-back',
    ],
    variants: freeVariants([{ color: 'Black', price: 1250, stock: 11 }]),
  },
  {
    id: 'hijab-georgette',
    slug: 'pearl-georgette-hijab',
    title: 'Pearl Georgette Hijab',
    categoryId: 'hijabs-stoles',
    subcategoryId: 'georgette',
    fabric: 'Georgette',
    price: 1450,
    rating: 4.8,
    reviewCount: 44,
    images: [IMG.textile, IMG.set],
    whatItIs: 'A rectangular georgette hijab with a soft grain and a narrow rolled hem.',
    whyBuyIt: ['Holds a drape without stiffness', 'Opaque enough for a single wrap', 'Free size'],
    variants: freeVariants([
      { color: 'Pearl', price: 1450, stock: 8 },
      { color: 'Black', price: 1450, stock: 10 },
    ]),
  },
  {
    id: 'hijab-chiffon',
    slug: 'dusk-chiffon-stole',
    title: 'Dusk Chiffon Stole',
    categoryId: 'hijabs-stoles',
    subcategoryId: 'chiffon',
    fabric: 'Chiffon',
    price: 1350,
    rating: 4.7,
    reviewCount: 39,
    images: [IMG.walk, IMG.textile],
    whatItIs: 'A sheer-matte chiffon stole, long enough for a modest wrap over the chest.',
    whyBuyIt: ['Light hand for layering', 'Finished edges that do not fray', 'Free size'],
    variants: freeVariants([
      { color: 'Dusk', price: 1350, stock: 6 },
      { color: 'Blush', price: 1350, stock: 5 },
    ]),
  },
  {
    id: 'hijab-lawn',
    slug: 'everyday-lawn-cotton-hijab',
    title: 'Everyday Lawn Cotton Hijab',
    categoryId: 'hijabs-stoles',
    subcategoryId: 'lawn-cotton',
    fabric: 'Lawn/Cotton',
    price: 980,
    rating: 4.6,
    reviewCount: 51,
    images: [IMG.textile, IMG.drape],
    whatItIs: 'A breathable lawn-cotton hijab for daily wear, with a soft matte surface.',
    whyBuyIt: ['Cooler weave for long days', 'Easy to pin or wear with magnets', 'Free size'],
    variants: freeVariants([
      { color: 'White', price: 980, stock: 12 },
      { color: 'Sage', price: 980, stock: 4 },
    ]),
  },
  {
    id: 'hijab-silk',
    slug: 'medina-silk-hijab',
    title: 'Medina Silk Hijab',
    categoryId: 'hijabs-stoles',
    subcategoryId: 'silk',
    fabric: 'Silk',
    price: 2100,
    rating: 4.9,
    reviewCount: 27,
    images: [IMG.silk, IMG.occasion],
    whatItIs: 'A smooth Medina silk hijab with a quiet sheen, cut long for a full wrap.',
    whyBuyIt: ['Slips neatly under an abaya collar', 'Soft sheen for gatherings', 'Free size'],
    variants: freeVariants([
      { color: 'Ivory', price: 2100, stock: 5 },
      { color: 'Emerald', price: 2100, stock: 2 },
    ]),
  },
  {
    id: 'hijab-jersey',
    slug: 'soft-jersey-hijab',
    title: 'Soft Jersey Hijab',
    categoryId: 'hijabs-stoles',
    subcategoryId: 'jersey',
    fabric: 'Jersey',
    price: 1150,
    rating: 4.8,
    reviewCount: 63,
    images: [IMG.set, IMG.textile],
    whatItIs: 'A stretch jersey hijab that stays in place with little pinning, in a relaxed tube cut.',
    whyBuyIt: ['Stretch fit in free size', 'Matte and opaque', 'A practical daily layer'],
    variants: freeVariants([
      { color: 'Black', price: 1150, stock: 15 },
      { color: 'Taupe', price: 1150, stock: 7 },
    ]),
  },
  {
    id: 'prayer-one-piece',
    slug: 'one-piece-prayer-abaya',
    title: 'One-Piece Prayer Abaya',
    categoryId: 'prayer-wear',
    subcategoryId: 'one-piece-prayer-abayas',
    fabric: 'Cey Crepe',
    price: 3200,
    rating: 4.8,
    reviewCount: 46,
    images: [IMG.silk, IMG.blackAbaya],
    whatItIs: 'A one-piece prayer abaya with an attached khimar, elastic cuffs, and a front opening.',
    whyBuyIt: [
      'Slips on over clothing',
      'Free size with a relaxed body',
      'Lightweight crepe that folds small',
    ],
    variants: freeVariants([
      { color: 'Black', price: 3200, stock: 8 },
      { color: 'Sage', price: 3200, stock: 3 },
    ]),
  },
  {
    id: 'prayer-two-piece',
    slug: 'medina-silk-khimar-and-skirt-set',
    title: 'Medina Silk Khimar and Skirt Set',
    categoryId: 'prayer-wear',
    subcategoryId: 'two-piece-prayer-sets',
    fabric: 'Medina Silk',
    price: 5950,
    rating: 4.9,
    reviewCount: 53,
    images: [IMG.silk, IMG.set],
    whatItIs:
      'A two-piece prayer set with an overhead tie-back khimar and a high-waisted, flowing maxi skirt in Medina Silk.',
    whyBuyIt: [
      'Khimar and skirt arrive as one set',
      'Adjustable tie-back chin panel',
      'Free size skirt with a wide elastic waist',
    ],
    relatedProductIds: ['acc-ring-counter', 'acc-manual-counter'],
    variants: freeVariants([{ color: 'Ivory', price: 5950, stock: 4 }]),
  },
  {
    id: 'prayer-travel',
    slug: 'foldable-travel-prayer-set',
    title: 'Foldable Travel Prayer Set',
    categoryId: 'prayer-wear',
    subcategoryId: 'travel-prayer-sets',
    fabric: 'Lawn/Cotton',
    price: 2750,
    rating: 4.7,
    reviewCount: 31,
    images: [IMG.set, IMG.textile],
    whatItIs: 'A compact travel prayer set: a short khimar, a drawstring skirt, and a small pouch.',
    whyBuyIt: ['Packs into the included pouch', 'Free size', 'Matte cotton that washes easily'],
    variants: freeVariants([{ color: 'Sand', price: 2750, stock: 9 }]),
  },
  {
    id: 'prayer-chadar',
    slug: 'plain-prayer-chadar',
    title: 'Plain Prayer Chadar',
    categoryId: 'prayer-wear',
    subcategoryId: 'prayer-chadars',
    fabric: 'Chiffon',
    price: 1850,
    rating: 4.6,
    reviewCount: 24,
    images: [IMG.textile, IMG.drape],
    whatItIs: 'A large rectangular prayer chadar in opaque chiffon, meant to wrap over the head and body.',
    whyBuyIt: ['Wide enough for a full wrap', 'Free size', 'Soft hem that does not scratch'],
    variants: freeVariants([
      { color: 'White', price: 1850, stock: 7 },
      { color: 'Black', price: 1850, stock: 6 },
    ]),
  },
  {
    id: 'acc-hijab-magnets',
    slug: 'matte-hijab-magnets',
    title: 'Matte Hijab Magnets',
    categoryId: 'accessories',
    subcategoryId: 'hijab-magnets',
    fabric: 'Metal',
    price: 650,
    rating: 4.8,
    reviewCount: 102,
    images: [IMG.textile],
    whatItIs: 'A pair of matte no-snag hijab magnets with a soft inner face.',
    whyBuyIt: ['Holds a wrap without pin holes', 'Matte finish in black or pearl', 'Free size'],
    variants: freeVariants([
      { color: 'Black', price: 650, stock: 20 },
      { color: 'Pearl', price: 650, stock: 12 },
    ]),
  },
  {
    id: 'acc-pastel-pins',
    slug: 'soft-pastel-hijab-pins',
    title: 'Soft Pastel Hijab Pins',
    categoryId: 'accessories',
    subcategoryId: 'soft-pastel-hijab-pins',
    fabric: 'Enamel',
    price: 480,
    rating: 4.7,
    reviewCount: 58,
    images: [IMG.set],
    whatItIs: 'A set of eight short hijab pins with rounded pastel heads and a locking clutch.',
    whyBuyIt: ['Shorter length for jersey and chiffon', 'Pastel set', 'Free size'],
    variants: freeVariants([{ color: 'Pastel', price: 480, stock: 16 }]),
  },
  {
    id: 'acc-common-pins',
    slug: 'common-hijab-pins',
    title: 'Common Hijab Pins',
    categoryId: 'accessories',
    subcategoryId: 'common-pins',
    fabric: 'Metal',
    price: 250,
    rating: 4.5,
    reviewCount: 40,
    images: [IMG.textile],
    whatItIs: 'A tin of straight black hijab pins for everyday wraps.',
    whyBuyIt: ['Simple straight pins', 'Black heads', 'Free size'],
    variants: freeVariants([{ color: 'Black', price: 250, stock: 0 }]),
  },
  {
    id: 'acc-ring-counter',
    slug: 'digital-ring-counter',
    title: 'Digital Ring Counter',
    categoryId: 'accessories',
    subcategoryId: 'ring-counters',
    fabric: 'Resin',
    price: 890,
    rating: 4.9,
    reviewCount: 73,
    images: [IMG.walk],
    whatItIs: 'A digital tasbih ring counter with a silent click and a reset button.',
    whyBuyIt: ['Worn on the finger during prayer', 'Quiet press', 'Free size band'],
    variants: freeVariants([
      { color: 'Black', price: 890, stock: 11 },
      { color: 'Sage', price: 890, stock: 2 },
    ]),
  },
  {
    id: 'acc-manual-counter',
    slug: 'manual-tally-counter',
    title: 'Manual Tally Counter',
    categoryId: 'accessories',
    subcategoryId: 'manual-counters',
    fabric: 'Wood',
    price: 420,
    rating: 4.6,
    reviewCount: 19,
    images: [IMG.drape],
    whatItIs: 'A small handheld tally counter with a thumb press and a reset dial.',
    whyBuyIt: ['No battery', 'Sits easily in a prayer pouch', 'Free size'],
    variants: freeVariants([{ color: 'Natural', price: 420, stock: 8 }]),
  },
];

export const PRODUCTS = RAW_PRODUCTS.map(withVariants);

export function getProductBySlug(slug) {
  return getStoreProducts().find((product) => product.slug === slug) || null;
}

export const ADMIN_PRODUCTS_KEY = 'abaya_emporium_products';

export function getStoreProducts() {
  try {
    const saved = localStorage.getItem(ADMIN_PRODUCTS_KEY);
    if (!saved) return PRODUCTS;
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) return PRODUCTS;
    return parsed.filter(
      (product) =>
        product &&
        product.id &&
        product.slug &&
        product.title &&
        Array.isArray(product.images) &&
        Array.isArray(product.variants)
    );
  } catch {
    return PRODUCTS;
  }
}

export function saveStoreProducts(products) {
  try {
    localStorage.setItem(ADMIN_PRODUCTS_KEY, JSON.stringify(products));
    return true;
  } catch {
    return false;
  }
}
