import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, ShoppingBag, X } from 'lucide-react';
import { CATEGORIES, categoryPath } from '../data/catalog';
import { useCart } from '../context/useCart';

export default function Navbar() {
  const { totalItems, setDrawerOpen } = useCart();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);

  const params = new URLSearchParams(location.search);
  const activeCategory = params.get('category');
  const activeSubcategory = params.get('subcategory');

  useEffect(() => {
    const resetMenu = window.setTimeout(() => {
      setMobileOpen(false);
      setOpenCategory(null);
    }, 0);
    return () => window.clearTimeout(resetMenu);
  }, [location.pathname, location.search]);

  return (
    <>
      <div className="announcement-bar">
        Free Nationwide Delivery on orders above PKR 5,000 • Cash on Delivery & Encrypted Card Checkout
      </div>
      <header className="navbar">
        <div className="container nav-inner">
          <Link to="/" className="brand-link">
            <img
              src="/logo.png"
              alt="Abaya Emporium"
              style={{ width: '48px', height: '48px', objectFit: 'contain', borderRadius: '8px' }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="brand-title">
              <strong>ABAYA</strong>
              <span>EMPORIUM</span>
            </div>
          </Link>

          <nav className={`nav-links ${mobileOpen ? 'open' : ''}`} aria-label="Primary Navigation">
            {CATEGORIES.filter((category) => category.id !== 'irani-chadar').map((category) => {
              const isActive = activeCategory === category.id;
              const expanded = openCategory === category.id;
              return (
                <div
                  key={category.id}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                  onMouseEnter={() => setOpenCategory(category.id)}
                  onMouseLeave={() => setOpenCategory(null)}
                >
                  <div className="nav-item-row">
                    <Link to={categoryPath(category.id)} className={isActive && !activeSubcategory ? 'active' : ''}>
                      {category.name}
                    </Link>
                    <button
                      type="button"
                      className="nav-caret"
                      aria-expanded={expanded}
                      aria-label={`${category.name} subcategories`}
                      onClick={() => setOpenCategory(expanded ? null : category.id)}
                    >
                      <ChevronDown size={14} />
                    </button>
                  </div>
                  <div className={`nav-dropdown ${expanded ? 'open' : ''}`}>
                    {category.subcategories.map((sub) => (
                      <Link
                        key={sub.id}
                        to={categoryPath(category.id, sub.id)}
                        className={activeSubcategory === sub.id ? 'active' : ''}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </nav>

          <div className="nav-actions">
            <button
              type="button"
              className="cart-btn"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open Shopping Cart"
            >
              <ShoppingBag size={18} />
              <span>Cart</span>
              {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            </button>

            <button
              type="button"
              className="nav-toggle"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileOpen((open) => !open)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
