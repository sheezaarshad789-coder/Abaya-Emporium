import { useNavigate } from 'react-router-dom';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../context/useCart';

export default function CartDrawer() {
  const { items, subtotal, drawerOpen, setDrawerOpen, updateQty, removeItem } = useCart();
  const navigate = useNavigate();

  if (!drawerOpen) return null;

  const handleCheckout = () => {
    setDrawerOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="drawer-backdrop" onClick={() => setDrawerOpen(false)}>
      <aside className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: '16px',
            borderBottom: '1px solid var(--border-light)',
          }}
        >
          <h3 style={{ fontFamily: 'Georgia, serif', color: 'var(--brand-primary)' }}>Your Bag</h3>
          <button
            type="button"
            onClick={() => setDrawerOpen(false)}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)' }}
            aria-label="Close Bag"
          >
            <X size={22} />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 0' }}>
          {items.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: '48px' }}>
              Your shopping bag is currently empty.
            </p>
          ) : (
            items.map((item) => (
              <div
                key={item.key}
                style={{
                  display: 'flex',
                  gap: '12px',
                  paddingBottom: '14px',
                  marginBottom: '14px',
                  borderBottom: '1px solid var(--border-light)',
                }}
              >
                <img
                  src={item.images[0]}
                  alt={item.title}
                  style={{ width: '64px', height: '82px', objectFit: 'cover', borderRadius: '8px' }}
                />
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '0.95rem' }}>{item.title}</h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    {item.selectedColor ? `${item.selectedColor} · ` : ''}
                    {item.selectedSize}
                  </p>
                  <p
                    style={{
                      fontWeight: 600,
                      color: 'var(--brand-primary)',
                      fontSize: '0.9rem',
                      marginTop: '4px',
                    }}
                  >
                    PKR {(item.price * item.quantity).toLocaleString()}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '8px' }}>
                    <button
                      type="button"
                      onClick={() => updateQty(item.key, -1)}
                      style={{
                        border: '1px solid var(--border-light)',
                        background: '#fff',
                        borderRadius: '6px',
                        padding: '3px 7px',
                      }}
                    >
                      <Minus size={14} />
                    </button>
                    <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQty(item.key, 1)}
                      style={{
                        border: '1px solid var(--border-light)',
                        background: '#fff',
                        borderRadius: '6px',
                        padding: '3px 7px',
                      }}
                    >
                      <Plus size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeItem(item.key)}
                      style={{
                        marginLeft: 'auto',
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-muted)',
                      }}
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '16px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '14px',
                fontWeight: 700,
              }}
            >
              <span>Subtotal</span>
              <span>PKR {subtotal.toLocaleString()}</span>
            </div>
            <button
              type="button"
              className="btn-primary"
              style={{ width: '100%' }}
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}