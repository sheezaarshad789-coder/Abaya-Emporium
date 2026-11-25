import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, SlidersHorizontal } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import {
  CATEGORIES,
  PRICE_RANGES,
  categoryPath,
  collectFacets,
  filterProducts,
  getCategory,
  priceSummary,
  sizeOptionsFor,
} from '../data/catalog';
import ProductCard from '../components/ProductCard';

const HERO_MODEL_IMAGE =
  'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85';

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [advancedFiltersOpen, setAdvancedFiltersOpen] = useState(false);

  const category = searchParams.get('category') || 'all';
  const subcategory = searchParams.get('subcategory') || 'all';
  const fabric = searchParams.get('fabric') || 'all';
  const color = searchParams.get('color') || 'all';
  const size = searchParams.get('size') || 'all';
  const price = searchParams.get('price') || 'all';
  const query = searchParams.get('q') || '';
  const sort = searchParams.get('sort') || 'featured';

  useEffect(() => {
    if (!searchParams.has('category') && !searchParams.has('subcategory')) return;

    const frame = window.requestAnimationFrame(() => {
      document.getElementById('catalog')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [searchParams]);

  const startingPrice = useMemo(
    () => {
      const prices = PRODUCTS.map((product) => priceSummary(product).min).filter(Number.isFinite);
      return prices.length ? Math.min(...prices) : 0;
    },
    [PRODUCTS]
  );

  const { fabrics, colors } = useMemo(() => collectFacets(PRODUCTS), [PRODUCTS]);
  const sizeOptions = useMemo(
    () => sizeOptionsFor(category, subcategory),
    [category, subcategory]
  );

  const activeCategory = category === 'all' ? null : getCategory(category);

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (!value || value === 'all' || value === 'featured') {
      next.delete(key);
    } else {
      next.set(key, value);
    }

    if (key === 'category') {
      next.delete('subcategory');
      const allowed = sizeOptionsFor(value, null).map((option) => option.id);
      if (next.get('size') && !allowed.includes(next.get('size'))) next.delete('size');
    }

    if (key === 'subcategory' && value && value !== 'all') {
      const parent = CATEGORIES.find((item) =>
        item.subcategories.some((sub) => sub.id === value)
      );
      if (parent) next.set('category', parent.id);
      const allowed = sizeOptionsFor(parent?.id, value).map((option) => option.id);
      if (next.get('size') && !allowed.includes(next.get('size'))) next.delete('size');
    }

    setSearchParams(next);
  };

  const resetFilters = () => setSearchParams({});

  const visibleProducts = useMemo(() => {
    const filtered = filterProducts(PRODUCTS, {
      category,
      subcategory,
      fabric,
      color,
      size,
      price,
      query,
    });
    return filtered.sort((a, b) => {
      if (sort === 'price-asc') return priceSummary(a).min - priceSummary(b).min;
      if (sort === 'price-desc') return priceSummary(b).min - priceSummary(a).min;
      return 0;
    });
  }, [PRODUCTS, category, subcategory, fabric, color, size, price, query, sort]);

  const filtersActive =
    category !== 'all' ||
    subcategory !== 'all' ||
    fabric !== 'all' ||
    color !== 'all' ||
    size !== 'all' ||
    price !== 'all' ||
    query ||
    sort !== 'featured';

  const subcategoryGroups =
    activeCategory != null
      ? [activeCategory]
      : CATEGORIES;

  return (
    <main>
      <section className="hero-editorial">
        <div
          className="hero-photo-layer"
          style={{ backgroundImage: `url(${HERO_MODEL_IMAGE})` }}
          aria-hidden="true"
        />
        <div className="hero-scrim" aria-hidden="true" />

        <div className="container hero-editorial-inner">
          <div className="hero-copy">
            <span className="hero-tag">
              Starting from PKR {startingPrice.toLocaleString()}
            </span>
            <h1>
              Timeless Modesty.
              <br />
              Modern Grace.
            </h1>
            <p>
              Abayas, jilbabs, hijabs, prayer wear, and the small pieces that finish a modest wardrobe.
            </p>
            <div className="hero-actions">
              <button
                type="button"
                className="btn-hero-dark"
                onClick={() => {
                  updateParam('category', 'abayas');
                  document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                SHOP ABAYAS
              </button>
              <a href="#catalog" className="btn-hero-ghost">
                EXPLORE COLLECTIONS <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="container">
        <div className="filter-bar">
          <div className="filter-primary">
            <input
              type="search"
              placeholder="Search products..."
              value={query}
              onChange={(e) => updateParam('q', e.target.value)}
              aria-label="Search products"
            />

            <select
              value={category}
              onChange={(e) => updateParam('category', e.target.value)}
              aria-label="Filter by category"
            >
              <option value="all">All Categories</option>
              {CATEGORIES.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>

            <select
              value={subcategory}
              onChange={(e) => updateParam('subcategory', e.target.value)}
              aria-label="Filter by subcategory"
            >
              <option value="all">All Subcategories</option>
              {subcategoryGroups.map((item) => (
                <optgroup key={item.id} label={item.name}>
                  {item.subcategories.map((sub) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.name}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>

            <button
              type="button"
              className={`filter-toggle ${advancedFiltersOpen ? 'active' : ''}`}
              onClick={() => setAdvancedFiltersOpen((open) => !open)}
              aria-expanded={advancedFiltersOpen}
            >
              <SlidersHorizontal size={16} />
              Filters
            </button>

            <select
              className="sort-select"
              value={sort}
              onChange={(e) => updateParam('sort', e.target.value)}
              aria-label="Sort products"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          {advancedFiltersOpen && (
            <div className="filter-advanced">
              <select
                value={price}
                onChange={(e) => updateParam('price', e.target.value)}
                aria-label="Filter by price"
              >
                <option value="all">All Prices</option>
                {PRICE_RANGES.map((range) => (
                  <option key={range.id} value={range.id}>{range.label}</option>
                ))}
              </select>
              <select
                value={color}
                onChange={(e) => updateParam('color', e.target.value)}
                aria-label="Filter by color"
              >
                <option value="all">All Colors</option>
                {colors.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
              <select
                value={fabric}
                onChange={(e) => updateParam('fabric', e.target.value)}
                aria-label="Filter by fabric"
              >
                <option value="all">All Fabrics</option>
                {fabrics.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
              <select
                value={sizeOptions.some((option) => option.id === size) ? size : 'all'}
                onChange={(e) => updateParam('size', e.target.value)}
                aria-label="Filter by size"
              >
                <option value="all">All Sizes</option>
                {sizeOptions.map((option) => (
                  <option key={option.id} value={option.id}>{option.label}</option>
                ))}
              </select>
              {filtersActive && (
                <button type="button" className="filter-reset" onClick={resetFilters}>
                  Clear all
                </button>
              )}
            </div>
          )}
        </div>

        {activeCategory && (
          <div className="subcat-row" aria-label={`${activeCategory.name} subcategories`}>
            <Link
              to={categoryPath(activeCategory.id)}
              className={subcategory === 'all' ? 'active' : ''}
            >
              All {activeCategory.name}
            </Link>
            {activeCategory.subcategories.map((sub) => (
              <Link
                key={sub.id}
                to={categoryPath(activeCategory.id, sub.id)}
                className={subcategory === sub.id ? 'active' : ''}
              >
                {sub.name}
              </Link>
            ))}
          </div>
        )}

        <p className="catalog-count">
          {visibleProducts.length} {visibleProducts.length === 1 ? 'piece' : 'pieces'}
          {activeCategory ? ` in ${activeCategory.name}` : ''}
        </p>

        {visibleProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <h3 style={{ marginBottom: '8px' }}>No products available</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '18px' }}>
              The product catalog is currently empty.
            </p>
          </div>
        ) : (
          <div className="product-grid">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
