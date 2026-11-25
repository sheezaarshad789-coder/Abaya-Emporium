import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Check,
  ChevronRight,
  Minus,
  Plus,
  Ruler,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
} from 'lucide-react';
import { PRODUCTS, getProductBySlug } from '../data/products';
import {
  STOCK_STATUS,
  crossSellHeading,
  findVariant,
  getCategory,
  getRelatedProducts,
  getSubcategory,
  sizeLabel,
  sizesForColor,
  stockStatus,
  uniqueColors,
  categoryPath,
} from '../data/catalog';
import { useCart } from '../context/useCart';
import ProductCard from '../components/ProductCard';
import SizeChartModal from '../components/SizeChartModal';

const SWATCH_COLORS = {
  black: '#201c1e',
  white: '#fff',
  cream: '#f1e7d4',
  beige: '#d8c3a5',
  brown: '#795548',
  navy: '#253653',
  blue: '#49749b',
  grey: '#929092',
  gray: '#929092',
  maroon: '#702d3c',
  olive: '#85815b',
  green: '#536b57',
  pink: '#d9a7ad',
  rose: '#bd7d83',
};

function colorSwatch(colorName) {
  const name = colorName.toLowerCase();
  const match = Object.keys(SWATCH_COLORS).find((key) => name.includes(key));
  return match ? SWATCH_COLORS[match] : '#cbbbc4';
}

export default function ProductDetailPage() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const colors = useMemo(() => (product ? uniqueColors(product) : []), [product]);
  const [color, setColor] = useState(colors[0] || '');
  const [size, setSize] = useState('');
  const [activeImage, setActiveImage] = useState(0);
  const [chartOpen, setChartOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    if (!product) return;
    const resetSelection = window.setTimeout(() => {
      const nextColors = uniqueColors(product);
      const nextColor = nextColors[0] || '';
      const nextSizes = sizesForColor(product, nextColor);
      const preferred =
        product.variants.find((variant) => variant.color === nextColor && variant.stock > 0) ||
        product.variants[0];
      setColor(nextColor);
      setSize(preferred?.size || nextSizes[0] || '');
      setActiveImage(0);
      setQuantity(1);
      setActiveTab('description');
    }, 0);
    return () => window.clearTimeout(resetSelection);
  }, [product]);

  if (!product) {
    return (
      <main className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'Georgia, serif', marginBottom: '12px' }}>Piece not found</h1>
        <Link to="/" className="btn-primary">
          Back to the shop
        </Link>
      </main>
    );
  }

  const category = getCategory(product.categoryId);
  const subcategory = getSubcategory(product.categoryId, product.subcategoryId);
  const sizes = sizesForColor(product, color);
  const variant = findVariant(product, size, color);
  const status = variant ? stockStatus(variant.stock) : 'out_of_stock';
  const usesLength = sizes.some((option) => option !== 'free');
  const related = getRelatedProducts(product, PRODUCTS);

  const chooseColor = (nextColor) => {
    setColor(nextColor);
    setQuantity(1);
    const nextSizes = sizesForColor(product, nextColor);
    if (!nextSizes.includes(size)) {
      const available = product.variants.find(
        (item) => item.color === nextColor && item.stock > 0
      );
      setSize(available?.size || nextSizes[0] || '');
    }
  };

  const handleAdd = () => {
    if (!variant || variant.stock < quantity) return;
    addToCart({
      id: product.id,
      title: product.title,
      slug: product.slug,
      images: product.images,
      price: variant.price,
      selectedSize: sizeLabel(variant.size),
      selectedColor: variant.color,
      variantId: variant.id,
      quantity,
    });
  };

  const handleBuyNow = () => {
    if (!variant || variant.stock < quantity) return;
    const expressItem = {
      id: product.id,
      title: product.title,
      slug: product.slug,
      images: product.images,
      price: variant.price,
      selectedSize: sizeLabel(variant.size),
      selectedColor: variant.color,
      variantId: variant.id,
      quantity,
    };
    navigate('/checkout', { state: { expressItem } });
  };

  return (
    <main>
      <div className="container pdp-breadcrumb">
        <Link to="/">Home</Link>
        <ChevronRight size={14} aria-hidden="true" />
        <Link to={categoryPath(product.categoryId)}>{category?.name}</Link>
        <ChevronRight size={14} aria-hidden="true" />
        <span>{product.title}</span>
      </div>

      <div className="container pdp-layout">
        <div className="pdp-gallery">
          {product.images.length > 1 && (
            <div className="gallery-thumbs" aria-label="Product images">
              {product.images.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  className={`thumb-btn ${activeImage === index ? 'active' : ''}`}
                  onClick={() => setActiveImage(index)}
                  aria-label={`View product image ${index + 1}`}
                  aria-pressed={activeImage === index}
                >
                  <img src={image} alt="" />
                </button>
              ))}
            </div>
          )}
          <div className="gallery-main">
            <img src={product.images[activeImage] || product.images[0]} alt={product.title} />
          </div>
        </div>

        <div className="pdp-summary">
          <p className="pdp-eyebrow">{subcategory?.name || category?.name}</p>
          <h1>{product.title}</h1>
          {product.rating > 0 && (
            <div className="pdp-rating">
              <span className="pdp-stars" aria-label={`${product.rating} out of 5 stars`}>
                {Array.from({ length: 5 }, (_, index) => (
                  <Star key={index} size={15} fill={index < Math.round(product.rating) ? 'currentColor' : 'none'} />
                ))}
              </span>
              <span>{product.rating.toFixed(1)}</span>
              <span className="pdp-review-count">({product.reviewCount || 0} reviews)</span>
            </div>
          )}
          <p className="pdp-price">PKR {(variant?.price ?? product.price).toLocaleString()}</p>
          <p className="pdp-description">{product.whatItIs}</p>

          <div className="pdp-option-heading">
            <span>Color</span>
            <strong>{color}</strong>
          </div>
          <div className="pdp-colors">
            {colors.map((item) => (
              <button
                key={item}
                type="button"
                className={`pdp-color ${color === item ? 'selected' : ''}`}
                onClick={() => chooseColor(item)}
                aria-label={item}
                aria-pressed={color === item}
                title={item}
                style={{ '--swatch-color': colorSwatch(item) }}
              >
              </button>
            ))}
          </div>

          <div className="pdp-option-heading pdp-size-heading">
            <span>{usesLength ? 'Length' : 'Size'}</span>
            {usesLength && (
              <button type="button" className="size-chart-trigger" onClick={() => setChartOpen(true)}>
                <Ruler size={14} /> Size chart
              </button>
            )}
          </div>
          <div className="pdp-sizes">
            {sizes.map((option) => {
              const optionVariant = findVariant(product, option, color);
              const unavailable = !optionVariant || optionVariant.stock <= 0;
              return (
                <button
                  key={option}
                  type="button"
                  className={`pdp-size ${size === option ? 'selected' : ''} ${unavailable ? 'unavailable' : ''}`}
                  onClick={() => {
                    setSize(option);
                    setQuantity(1);
                  }}
                  aria-pressed={size === option}
                  disabled={unavailable}
                >
                  {sizeLabel(option)}
                </button>
              );
            })}
          </div>

          <p className={`stock-note ${status} pdp-stock`}>
            {status === 'out_of_stock'
              ? 'Sold out in this size and color'
              : status === 'low_stock'
                ? `Low stock · ${variant.stock} left`
                : 'In stock'}
          </p>

          <div className="pdp-purchase">
            <div className="quantity-stepper" aria-label="Quantity">
              <button
                type="button"
                onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                aria-label="Decrease quantity"
                disabled={quantity <= 1}
              >
                <Minus size={15} />
              </button>
              <span aria-live="polite">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((current) => Math.min(variant?.stock || 1, current + 1))}
                aria-label="Increase quantity"
                disabled={!variant || quantity >= variant.stock}
              >
                <Plus size={15} />
              </button>
            </div>
            <button
              type="button"
              className="btn-primary pdp-add-button"
              disabled={!variant || variant.stock < quantity}
              onClick={handleAdd}
            >
              {variant && variant.stock >= quantity
                ? `Add to bag · PKR ${(variant.price * quantity).toLocaleString()}`
                : 'Sold out'}
            </button>
            <button
              type="button"
              className="btn-outline pdp-buy-button"
              disabled={!variant || variant.stock < quantity}
              onClick={handleBuyNow}
            >
              Buy now
            </button>
          </div>

          <div className="pdp-benefits">
            <div><Sparkles size={21} /><strong>Thoughtful design</strong><span>Made for everyday comfort</span></div>
            <div><ShieldCheck size={21} /><strong>Secure checkout</strong><span>Safe, simple ordering</span></div>
            <div><Truck size={21} /><strong>Nationwide delivery</strong><span>Delivery across Pakistan</span></div>
          </div>

          <p className="pdp-sku">
            {STOCK_STATUS[status].label}
            {variant ? ` · SKU ${variant.sku}` : ''}
          </p>
        </div>
      </div>

      <section className="container pdp-information">
        <div className="pdp-tabs" role="tablist" aria-label="Product information">
          {[
            ['description', 'Description'],
            ['fabric', 'Fabric & Care'],
            ['delivery', 'Shipping & Returns'],
            ['reviews', `Reviews (${product.reviewCount || 0})`],
          ].map(([id, label]) => (
            <button
              key={id}
              type="button"
              role="tab"
              id={`pdp-tab-${id}`}
              aria-selected={activeTab === id}
              aria-controls={`pdp-panel-${id}`}
              className={activeTab === id ? 'active' : ''}
              onClick={() => setActiveTab(id)}
            >
              {label}
            </button>
          ))}
        </div>
        <div
          className="pdp-tab-panel"
          role="tabpanel"
          id={`pdp-panel-${activeTab}`}
          aria-labelledby={`pdp-tab-${activeTab}`}
        >
          {activeTab === 'description' && (
            <>
              <p>{product.whatItIs}</p>
              {product.whyBuyIt.length > 0 && (
                <ul className="pdp-feature-list">
                  {product.whyBuyIt.map((reason) => <li key={reason}><Check size={15} />{reason}</li>)}
                </ul>
              )}
            </>
          )}
          {activeTab === 'fabric' && (
            <p>Fabric: <strong>{product.fabric}</strong>. To help preserve your garment, follow the care instructions provided with your order.</p>
          )}
          {activeTab === 'delivery' && (
            <p>Nationwide delivery across Pakistan. Shipping is free on orders above PKR 5,000; otherwise a PKR 250 delivery fee applies. For exchange assistance, please contact customer care.</p>
          )}
          {activeTab === 'reviews' && (
            <div className="pdp-review-summary">
              {product.rating > 0 ? (
                <>
                  <span className="pdp-review-score">{product.rating.toFixed(1)}</span>
                  <span className="pdp-stars" aria-label={`${product.rating} out of 5 stars`}>
                    {Array.from({ length: 5 }, (_, index) => (
                      <Star key={index} size={17} fill={index < Math.round(product.rating) ? 'currentColor' : 'none'} />
                    ))}
                  </span>
                  <span>Based on {product.reviewCount || 0} reviews</span>
                </>
              ) : <p>No reviews yet. Be the first to share your experience.</p>}
            </div>
          )}
        </div>
      </section>

      {related.length > 0 && (
        <section className="container pdp-related">
          <h2>
            {crossSellHeading(product.categoryId)}
          </h2>
          <div className="product-grid">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}

      <SizeChartModal
        isOpen={chartOpen}
        onClose={() => setChartOpen(false)}
        selectedSize={sizeLabel(size)}
        onSelectSize={(label) => {
          const match = sizes.find((option) => sizeLabel(option) === label);
          if (match) setSize(match);
        }}
      />
    </main>
  );
}
