const freeVariant = (id, color, price) => ({
  id: `${id}-free-${color.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
  sku: `${id.toUpperCase()}-FREE`,
  size: 'free',
  color,
  price,
  stock: 12,
});

const hijab = (id, title, color, subcategoryId, fabric, image, price) => ({
  id,
  slug: `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`,
  title,
  categoryId: 'hijabs-stoles',
  subcategoryId,
  fabric,
  price,
  rating: 4.8,
  reviewCount: 12,
  images: [`/images/${image}`],
  whatItIs: `A soft, elegant ${title.toLowerCase()} designed for comfortable everyday and occasion wear.`,
  whyBuyIt: ['Lightweight and breathable', 'Soft, graceful drape', 'Free size'],
  variants: [freeVariant(id, color, price)],
});

export const PRODUCTS = [
  hijab('georgette-dark-beige', 'Dark Beige Georgette Hijab', 'Dark Beige', 'georgette', 'Georgette', 'georgette-dark-beige.jpg', 1800),
  hijab('georgette-cool-grey', 'Cool Grey Georgette Hijab', 'Cool Grey', 'georgette', 'Georgette', 'georgette-cool-grey.jpg', 1800),
  hijab('georgette-dusty-pink', 'Dusty Pink Georgette Hijab', 'Dusty Pink', 'georgette', 'Georgette', 'georgette-dusty-pink.jpg', 1800),
  hijab('georgette-dusty-teal', 'Dusty Teal Georgette Hijab', 'Dusty Teal', 'georgette', 'Georgette', 'georgette-dusty-teal.jpg', 1800),
  hijab('georgette-sky-blue', 'Sky Blue Georgette Hijab', 'Sky Blue', 'georgette', 'Georgette', 'georgette-sky-blue.jpg', 1800),
  hijab('georgette-ivory', 'Ivory Georgette Hijab', 'Ivory', 'georgette', 'Georgette', 'georgette-ivory.jpg', 1800),
  hijab('georgette-mocha-brown', 'Mocha Brown Georgette Hijab', 'Mocha Brown', 'georgette', 'Georgette', 'georgette-mocha-brown.jpg', 1800),
  hijab('georgette-plum', 'Plum Georgette Hijab', 'Plum', 'georgette', 'Georgette', 'georgette-plum.jpg', 1800),
  hijab('georgette-coral', 'Coral Georgette Hijab', 'Coral', 'georgette', 'Georgette', 'georgette-coral.jpg', 1800),

  hijab('jersey-charcoal-grey', 'Charcoal Grey Jersey Hijab', 'Charcoal Grey', 'jersey', 'Jersey', 'charcoal-grey-jersey-hijab.jpg', 1600),
  hijab('jersey-deep-plum-burgundy', 'Deep Plum Burgundy Jersey Hijab', 'Deep Plum Burgundy', 'jersey', 'Jersey', 'deep-plum-burgundy-jersey-hijab.jpg', 1600),
  hijab('jersey-dusty-rose', 'Dusty Rose Jersey Hijab', 'Dusty Rose', 'jersey', 'Jersey', 'dusty-rose-jersey-hijab.jpg', 1600),
  hijab('jersey-lavender', 'Lavender Silk-Look Jersey Hijab', 'Lavender', 'jersey', 'Jersey', 'lavender-silk-look-jersey-hijab.jpg', 1700),
  hijab('jersey-midnight-navy', 'Midnight Navy Jersey Hijab', 'Midnight Navy', 'jersey', 'Jersey', 'midnight-navy-jersey-hijab.jpg', 1600),
  hijab('jersey-sage', 'Sage Jersey Hijab', 'Sage', 'jersey', 'Jersey', 'sage-jersey-hijab.jpg', 1600),
  hijab('jersey-sage-mint', 'Sage Mint Jersey Hijab', 'Sage Mint', 'jersey', 'Jersey', 'sage-mint-jersey-hijab.jpg', 1600),
  hijab('jersey-wine-red', 'Wine Red Jersey Hijab', 'Wine Red', 'jersey', 'Jersey', 'wine-red-jersey-hijab.jpg', 1600),

  hijab('cotton-batik-grey', 'Batik Grey Cotton Hijab', 'Batik Grey', 'lawn-cotton', 'Lawn/Cotton', 'cotton-hijab-batik-grey.jpg', 1500),
  hijab('cotton-caribbean-green', 'Caribbean Green Cotton Hijab', 'Caribbean Green', 'lawn-cotton', 'Lawn/Cotton', 'cotton-hijab-caribbean-green.jpg', 1500),
  hijab('cotton-celadon-green', 'Celadon Green Cotton Hijab', 'Celadon Green', 'lawn-cotton', 'Lawn/Cotton', 'cotton-hijab-celadon-green.jpg', 1500),
  hijab('cotton-coffee-brown', 'Coffee Brown Cotton Hijab', 'Coffee Brown', 'lawn-cotton', 'Lawn/Cotton', 'cotton-hijab-coffee-brown.jpg', 1500),
  hijab('cotton-cream-beige', 'Cream Beige Cotton Hijab', 'Cream Beige', 'lawn-cotton', 'Lawn/Cotton', 'cotton-hijab-cream-beige.jpg', 1500),
  hijab('cotton-dark-maroon', 'Dark Maroon Cotton Hijab', 'Dark Maroon', 'lawn-cotton', 'Lawn/Cotton', 'cotton-hijab-dark-maroon.jpg', 1500),
  hijab('cotton-denim-blue', 'Denim Blue Cotton Hijab', 'Denim Blue', 'lawn-cotton', 'Lawn/Cotton', 'cotton-hijab-denim-blue.jpg', 1500),
  hijab('cotton-dolphin-grey', 'Dolphin Grey Cotton Hijab', 'Dolphin Grey', 'lawn-cotton', 'Lawn/Cotton', 'cotton-hijab-dolphin-grey.jpg', 1500),
  hijab('cotton-floral-blue', 'Floral Blue Cotton Hijab', 'Floral Blue', 'lawn-cotton', 'Lawn/Cotton', 'cotton-hijab-floral-blue.jpg', 1500),
  hijab('cotton-green', 'Green Cotton Hijab', 'Green', 'lawn-cotton', 'Lawn/Cotton', 'cotton-hijab-green.jpg', 1500),
  hijab('cotton-heathered-grey', 'Heathered Grey Cotton Hijab', 'Heathered Grey', 'lawn-cotton', 'Lawn/Cotton', 'cotton-hijab-heathered-grey.jpg', 1500),
  hijab('cotton-mauve', 'Mauve Cotton Hijab', 'Mauve', 'lawn-cotton', 'Lawn/Cotton', 'cotton-hijab-mauve.jpg', 1500),
  hijab('cotton-olive-green', 'Olive Green Cotton Hijab', 'Olive Green', 'lawn-cotton', 'Lawn/Cotton', 'cotton-hijab-olive-green.jpg', 1500),

  hijab('silk-blush-pink', 'Blush Pink Satin Silk Hijab', 'Blush Pink', 'silk', 'Satin Silk', 'satin-silk-hijab-blush-pink.jpg', 2200),
  hijab('silk-emerald', 'Emerald Satin Silk Hijab', 'Emerald', 'silk', 'Satin Silk', 'satin-silk-hijab-emerald.jpg', 2200),
  hijab('silk-lilac', 'Lilac Satin Silk Hijab', 'Lilac', 'silk', 'Satin Silk', 'satin-silk-hijab-lilac.jpg', 2200),
  hijab('silk-mauve', 'Mauve Satin Silk Hijab', 'Mauve', 'silk', 'Satin Silk', 'satin-silk-hijab-mauve.jpg', 2200),
  hijab('silk-plum', 'Plum Satin Silk Hijab', 'Plum', 'silk', 'Satin Silk', 'satin-silk-hijab-plum.jpg', 2200),
  hijab('silk-seafoam', 'Seafoam Satin Silk Hijab', 'Seafoam', 'silk', 'Satin Silk', 'satin-silk-hijab-seafoam.jpg', 2200),
  hijab('silk-silver', 'Silver Satin Silk Hijab', 'Silver', 'silk', 'Satin Silk', 'satin-silk-hijab-silver.jpg', 2200),
  hijab('silk-sky-blue', 'Sky Blue Satin Silk Hijab', 'Sky Blue', 'silk', 'Satin Silk', 'satin-silk-hijab-sky-blue.jpg', 2200),
  hijab('silk-taupe', 'Taupe Satin Silk Hijab', 'Taupe', 'silk', 'Satin Silk', 'satin-silk-hijab-taupe.jpg', 2200),
];

export function getProductBySlug(slug) {
  return PRODUCTS.find((product) => product.slug === slug) || null;
}
