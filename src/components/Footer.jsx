import { Link } from 'react-router-dom';
import { Camera, MapPin, MessageCircle, Music2 } from 'lucide-react';
import { CATEGORIES, categoryPath } from '../data/catalog';

const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://www.instagram.com/', icon: Camera },
  { label: 'WhatsApp', href: 'https://www.whatsapp.com/', icon: MessageCircle },
  { label: 'TikTok', href: 'https://www.tiktok.com/', icon: Music2 },
];

const CARE_LINKS = [
  { label: 'Size & Length Guide', to: '/' },
  { label: 'Nationwide Delivery Info', to: '/checkout' },
  { label: 'Exchange Policy', to: '/' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h4 style={{ fontFamily: 'Georgia, serif', fontSize: '1.15rem', letterSpacing: '1.5px' }}>
              ABAYA EMPORIUM
            </h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Abayas, jilbabs, prayer wear, and modest essentials made for everyday grace.
            </p>
          </div>

          <div>
            <h4>Shop</h4>
            <ul>
              {CATEGORIES.filter((category) => category.id !== 'irani-chadar').map((category) => (
                <li key={category.id}>
                  <Link to={categoryPath(category.id)}>{category.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Customer Care</h4>
            <ul>
              {CARE_LINKS.map((item) => (
                <li key={item.label}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-connect">
            <h4>Connect with us</h4>
            <ul className="footer-social-links">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noreferrer" aria-label={label} title={label}>
                    <Icon size={18} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
            <a
              className="footer-location"
              href="https://www.google.com/maps/search/?api=1&query=Sialkot"
              target="_blank"
              rel="noreferrer"
            >
              <MapPin size={18} aria-hidden="true" />
              <span>Sialkot, Pakistan</span>
            </a>
          </div>
        </div>

        <div
          style={{
            borderTop: '1px solid var(--border-light)',
            paddingTop: '18px',
            textAlign: 'center',
            color: 'var(--text-muted)',
            fontSize: '0.85rem',
          }}
        >
          © {new Date().getFullYear()} Abaya Emporium. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
