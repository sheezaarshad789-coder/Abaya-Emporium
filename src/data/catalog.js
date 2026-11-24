/**
 * Catalog taxonomy for Abaya Emporium.
 *
 * Product records live in ./products.js and follow this shape:
 * {
 *   id, slug, title, categoryId, subcategoryId, fabric,
 *   price,            // fallback when a variant omits price
 *   rating, reviewCount, images, whatItIs, whyBuyIt,
 *   relatedProductIds?, // optional explicit cross-sells; overrides the category rule
 *   variants: [{ id, sku, size, color, price, stock }]
 * }
 *
 * `size` is an option id from SIZE_SYSTEMS (`52`…`60`, or `free`).
 * Stock status is derived from `stock` so it cannot drift from the quantity:
 *   0        -> out_of_stock
 *   1–3      -> low_stock
 *   4+       -> in_stock
 */

export const STOCK_STATUS = {
  in_stock: { id: 'in_stock', label: 'In stock' },
  low_stock: { id: 'low_stock', label: 'Low stock' },
  out_of_stock: { id: 'out_of_stock', label: 'Sold out' },
};

export const SIZE_SYSTEMS = {
  length: {
    id: 'length',
    label: 'Length',
    appliesTo: 'Abayas and jilbabs',
    options: [
      { id: '52', label: '52"' },
      { id: '54', label: '54"' },
      { id: '56', label: '56"' },
      { id: '58', label: '58"' },
      { id: '60', label: '60"' },
    ],
  },
  free: {
    id: 'free',
    label: 'Size',
    appliesTo: 'Prayer wear, accessories, hijabs, niqabs, khimar, and chadars',
    options: [{ id: 'free', label: 'Free Size' }],
  },
};

export const PRICE_RANGES = [
  { id: 'under-1500', label: 'Under PKR 1,500', min: 0, max: 1499 },
  { id: '1500-3500', label: 'PKR 1,500 – 3,500', min: 1500, max: 3500 },
  { id: '3500-5500', label: 'PKR 3,500 – 5,500', min: 3500, max: 5500 },
  { id: '5500-plus', label: 'PKR 5,500 & above', min: 5500, max: null },
];

/**
 * Cross-sell targets are subcategory ids.
 * Abaya and hijab pages suggest magnets, pastel pins, and niqabs.
 * Prayer wear pages suggest ring counters (manual counters sit beside them).
 */
export const CROSS_SELL = {
  abayas: ['hijab-magnets', 'soft-pastel-hijab-pins', 'saudi-niqabs', 'simple-niqabs'],
  'hijabs-stoles': ['hijab-magnets', 'soft-pastel-hijab-pins', 'saudi-niqabs', 'simple-niqabs'],
  'jilbabs-khimar': ['hijab-magnets', 'soft-pastel-hijab-pins', 'simple-niqabs'],
  niqabs: ['hijab-magnets', 'soft-pastel-hijab-pins'],
  'irani-chadar': ['hijab-magnets', 'soft-pastel-hijab-pins'],
  'prayer-wear': ['ring-counters', 'manual-counters'],
  accessories: ['common-pins', 'hijab-magnets'],
};

export const CATEGORIES = [
  {
    id: 'abayas',
    name: 'Abayas',
    sizeSystem: 'length',
    subcategories: [
      { id: 'black-abayas', name: 'Black Abayas', sizeSystem: 'length' },
      { id: 'daily-wear-abayas', name: 'Daily Wear Abayas', sizeSystem: 'length' },
      { id: 'coloured-abayas', name: 'Coloured Abayas', sizeSystem: 'length' },
      { id: 'occasion-wear-abayas', name: 'Occasion Wear Abayas', sizeSystem: 'length' },
    ],
  },
  {
    id: 'jilbabs-khimar',
    name: 'Jilbabs & Khimar',
    sizeSystem: 'length',
    subcategories: [
      { id: 'saudi-jilbabs', name: 'Saudi Jilbabs', sizeSystem: 'length' },
      { id: 'khimar', name: 'Khimar', sizeSystem: 'free' },
    ],
  },
  {
    id: 'irani-chadar',
    name: 'Irani Chadar',
    sizeSystem: 'free',
    subcategories: [
      { id: 'traditional-modern-cuts', name: 'Traditional & Modern Cuts', sizeSystem: 'free' },
    ],
  },
  {
    id: 'niqabs',
    name: 'Niqabs',
    sizeSystem: 'free',
    subcategories: [
      { id: 'saudi-niqabs', name: 'Saudi Niqabs', sizeSystem: 'free' },
      { id: 'simple-niqabs', name: 'Simple Niqabs', sizeSystem: 'free' },
    ],
  },
  {
    id: 'hijabs-stoles',
    name: 'Hijabs & Stoles',
    sizeSystem: 'free',
    subcategories: [
      { id: 'georgette', name: 'Georgette', sizeSystem: 'free' },
      { id: 'chiffon', name: 'Chiffon', sizeSystem: 'free' },
      { id: 'lawn-cotton', name: 'Lawn/Cotton', sizeSystem: 'free' },
      { id: 'silk', name: 'Silk', sizeSystem: 'free' },
      { id: 'jersey', name: 'Jersey', sizeSystem: 'free' },
    ],
  },
  {
    id: 'prayer-wear',
    name: 'Prayer Wear',
    sizeSystem: 'free',
    subcategories: [
      { id: 'one-piece-prayer-abayas', name: '1-Piece Prayer Abayas', sizeSystem: 'free' },
      { id: 'two-piece-prayer-sets', name: '2-Piece Prayer Sets (Khimar + Skirt)', sizeSystem: 'free' },
      { id: 'travel-prayer-sets', name: 'Travel Prayer Sets', sizeSystem: 'free' },
      { id: 'prayer-chadars', name: 'Prayer Chadars', sizeSystem: 'free' },
    ],
  },
  {
    id: 'accessories',
    name: 'Accessories',
    sizeSystem: 'free',
    subcategories: [
      { id: 'hijab-magnets', name: 'Hijab Magnets', sizeSystem: 'free' },
      { id: 'soft-pastel-hijab-pins', name: 'Soft Pastel Hijab Pins', sizeSystem: 'free' },
      { id: 'common-pins', name: 'Common Pins', sizeSystem: 'free' },
      { id: 'ring-counters', name: 'Ring Counters (Digital Tasbih)', sizeSystem: 'free' },
      { id: 'manual-counters', name: 'Manual Counters', sizeSystem: 'free' },
    ],
  },
];

export function stockStatus(stock) {
  if (stock <= 0) return 'out_of_stock';
  if (stock <= 3) return 'low_stock';
  return 'in_stock';
}

export function getCategory(categoryId) {
  return CATEGORIES.find((category) => category.id === categoryId) || null;
}

export function getSubcategory(categoryId, subcategoryId) {
  return getCategory(categoryId)?.subcategories.find((sub) => sub.id === subcategoryId) || null;
}

export function categoryPath(categoryId, subcategoryId) {
  const params = new URLSearchParams();
  if (categoryId) params.set('category', categoryId);
  if (subcategoryId) params.set('subcategory', subcategoryId);
  const query = params.toString();
  return query ? `/?${query}` : '/';
}

export function sizeSystemFor(categoryId, subcategoryId) {
  const subcategory = getSubcategory(categoryId, subcategoryId);
  if (subcategory?.sizeSystem) return SIZE_SYSTEMS[subcategory.sizeSystem];
  const category = getCategory(categoryId);
  if (category?.sizeSystem) return SIZE_SYSTEMS[category.sizeSystem];
  return null;
}

export function sizeLabel(sizeId) {
  for (const system of Object.values(SIZE_SYSTEMS)) {
    const match = system.options.find((option) => option.id === sizeId);
    if (match) return match.label;
  }
  return sizeId;
}

export function sizeOptionsFor(categoryId, subcategoryId) {
  const systems = new Set();

  if (subcategoryId && subcategoryId !== 'all') {
    const system = sizeSystemFor(categoryId, subcategoryId);
    if (system) systems.add(system.id);
  } else if (categoryId && categoryId !== 'all') {
    const category = getCategory(categoryId);
    category?.subcategories.forEach((sub) => systems.add(sub.sizeSystem || category.sizeSystem));
  } else {
    systems.add('length');
    systems.add('free');
  }

  return [...systems].flatMap((id) =>
    SIZE_SYSTEMS[id].options.map((option) => ({
      ...option,
      group: SIZE_SYSTEMS[id].label,
    }))
  );
}

export function priceSummary(product) {
  const prices = product.variants.map((variant) => variant.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return { min, max, varies: min !== max };
}

export function productStock(product) {
  return product.variants.reduce((sum, variant) => sum + variant.stock, 0);
}

export function productStatus(product) {
  return stockStatus(productStock(product));
}

export function variantById(product, variantId) {
  return product.variants.find((variant) => variant.id === variantId) || null;
}

export function uniqueColors(product) {
  return [...new Set(product.variants.map((variant) => variant.color))];
}

export function sizesForColor(product, color) {
  const seen = new Set();
  return product.variants
    .filter((variant) => variant.color === color)
    .filter((variant) => {
      if (seen.has(variant.size)) return false;
      seen.add(variant.size);
      return true;
    })
    .map((variant) => variant.size);
}

export function findVariant(product, size, color) {
  return (
    product.variants.find((variant) => variant.size === size && variant.color === color) || null
  );
}

export function collectFacets(products) {
  const fabrics = [...new Set(products.map((product) => product.fabric))].sort((a, b) =>
    a.localeCompare(b)
  );
  const colors = [...new Set(products.flatMap((product) => uniqueColors(product)))].sort((a, b) =>
    a.localeCompare(b)
  );
  return { fabrics, colors };
}

export function matchesPriceRange(amount, rangeId) {
  if (!rangeId || rangeId === 'all') return true;
  const range = PRICE_RANGES.find((item) => item.id === rangeId);
  if (!range) return true;
  if (amount < range.min) return false;
  if (range.max != null && amount > range.max) return false;
  return true;
}

export function filterProducts(products, filters) {
  const category = filters.category || 'all';
  const subcategory = filters.subcategory || 'all';
  const fabric = filters.fabric || 'all';
  const color = filters.color || 'all';
  const size = filters.size || 'all';
  const price = filters.price || 'all';
  const query = (filters.query || '').trim().toLowerCase();

  return products.filter((product) => {
    if (category !== 'all' && product.categoryId !== category) return false;
    if (subcategory !== 'all' && product.subcategoryId !== subcategory) return false;
    if (fabric !== 'all' && product.fabric !== fabric) return false;
    if (color !== 'all' && !product.variants.some((variant) => variant.color === color)) return false;
    if (size !== 'all' && !product.variants.some((variant) => variant.size === size)) return false;
    if (!matchesPriceRange(priceSummary(product).min, price)) return false;

    if (query) {
      const cat = getCategory(product.categoryId);
      const sub = getSubcategory(product.categoryId, product.subcategoryId);
      const haystack = [
        product.title,
        product.fabric,
        cat?.name,
        sub?.name,
        ...uniqueColors(product),
      ]
        .join(' ')
        .toLowerCase();
      if (!haystack.includes(query)) return false;
    }

    return true;
  });
}

export function crossSellHeading(categoryId) {
  if (categoryId === 'prayer-wear') return 'For your prayer routine';
  if (categoryId === 'abayas' || categoryId === 'hijabs-stoles') return 'Often paired with';
  return 'You may also like';
}

export function getRelatedProducts(product, products, limit = 4) {
  const byId = new Map(products.map((item) => [item.id, item]));
  const explicit = (product.relatedProductIds || [])
    .map((id) => byId.get(id))
    .filter(Boolean)
    .filter((item) => item.id !== product.id);

  const pool = explicit.length
    ? explicit
    : products.filter(
        (item) =>
          item.id !== product.id &&
          (CROSS_SELL[product.categoryId] || []).includes(item.subcategoryId)
      );

  const inStock = pool.filter((item) => productStatus(item) !== 'out_of_stock');
  const soldOut = pool.filter((item) => productStatus(item) === 'out_of_stock');
  return [...inStock, ...soldOut].slice(0, limit);
}
