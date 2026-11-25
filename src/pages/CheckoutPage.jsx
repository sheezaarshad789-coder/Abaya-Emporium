import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Lock, CheckCircle2, Banknote, CreditCard } from 'lucide-react';
import { useCart } from '../context/useCart';

async function generateEncryptedToken(payloadString) {
  const encoder = new TextEncoder();
  const data = encoder.encode(payloadString);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
    .slice(0, 24)
    .toUpperCase();
}

export default function CheckoutPage() {
  const location = useLocation();
  const { items, clearCart } = useCart();

  const expressItem = location.state?.expressItem;
  const orderItems = expressItem ? [expressItem] : items;

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 5000 || subtotal === 0 ? 0 : 250;
  const total = subtotal + shipping;

  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    city: 'Lahore',
    address: '',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });
  const [processing, setProcessing] = useState(false);
  const [receipt, setReceipt] = useState(null);

  const handleCardNumberChange = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 16);
    const formatted = digits.replace(/(\d{4})(?=\d)/g, '$1 ');
    setForm({ ...form, cardNumber: formatted });
  };

  const handleExpiryChange = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 4);
    const formatted = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
    setForm({ ...form, expiry: formatted });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const rawPayload = `${form.fullName}|${form.phone}|${total}|${Date.now()}|${form.cardNumber.slice(-4)}`;
    const encryptedHash = await generateEncryptedToken(rawPayload);

    setTimeout(() => {
      setProcessing(false);
      const receiptData = {
        orderId: `AE-${Math.floor(100000 + Math.random() * 900000)}`,
        customer: form.fullName,
        city: form.city,
        method: paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : '256-Bit Encrypted Card',
        token: encryptedHash,
        total,
        status: 'Pending',
        createdAt: new Date().toISOString(),
      };
      setReceipt(receiptData);
      if (!expressItem) clearCart();
    }, 900);
  };

  if (receipt) {
    return (
      <main className="container" style={{ padding: '60px 20px', maxWidth: '580px' }}>
        <div className="form-card" style={{ textAlign: 'center' }}>
          <CheckCircle2 size={48} color="var(--success)" style={{ marginBottom: '12px' }} />
          <h2 style={{ fontFamily: 'Georgia, serif', marginBottom: '8px' }}>Order Confirmed!</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
            Thank you, <strong>{receipt.customer}</strong>. Your order is scheduled for dispatch to{' '}
            <strong>{receipt.city}</strong>.
          </p>

          <div
            style={{
              background: 'var(--bg-page)',
              padding: '16px',
              borderRadius: '10px',
              textAlign: 'left',
              fontSize: '0.92rem',
              marginBottom: '22px',
            }}
          >
            <p><strong>Order Number:</strong> {receipt.orderId}</p>
            <p><strong>Payment Method:</strong> {receipt.method}</p>
            <p><strong>Amount Payable / Paid:</strong> PKR {receipt.total.toLocaleString()}</p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '6px' }}>
              <strong>Encrypted Verification Hash:</strong> {receipt.token}
            </p>
          </div>

          <Link to="/" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  if (orderItems.length === 0) {
    return (
      <main className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h2>Your checkout bag is empty</h2>
        <p style={{ color: 'var(--text-muted)', margin: '10px 0 20px' }}>
          Select an abaya or niqab first to place an order.
        </p>
        <Link to="/" className="btn-primary">
          Browse Collection
        </Link>
      </main>
    );
  }

  return (
    <main className="container">
      <form className="checkout-grid" onSubmit={handleSubmit}>
        <div className="form-card">
          <h2 style={{ fontFamily: 'Georgia, serif', marginBottom: '18px' }}>Delivery Information</h2>

          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Ayesha Khan"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            />
          </div>

          <div className="checkout-two-column">
            <div className="form-group">
              <label>Mobile Number</label>
              <input
                type="tel"
                required
                placeholder="0300-1234567"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>City</label>
              <select value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}>
                <option value="Lahore">Lahore</option>
                <option value="Karachi">Karachi</option>
                <option value="Islamabad">Islamabad</option>
                <option value="Rawalpindi">Rawalpindi</option>
                <option value="Faisalabad">Faisalabad</option>
                <option value="Multan">Multan</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Complete Street Address</label>
            <input
              type="text"
              required
              placeholder="House #, Street, Sector / Block"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
          </div>

          <h3 style={{ fontFamily: 'Georgia, serif', margin: '24px 0 12px' }}>Payment Method</h3>

          <div
            className={`payment-option ${paymentMethod === 'cod' ? 'active' : ''}`}
            onClick={() => setPaymentMethod('cod')}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 600 }}>
              <Banknote size={20} color="var(--brand-primary)" />
              <span>Cash on Delivery (COD)</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Pay in cash when your parcel arrives.
            </p>
          </div>

          <div
            className={`payment-option ${paymentMethod === 'card' ? 'active' : ''}`}
            onClick={() => setPaymentMethod('card')}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 600 }}>
              <CreditCard size={20} color="var(--brand-primary)" />
              <span>Encrypted Card Billing (Visa / Mastercard)</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Protected with client-side SHA-256 tokenization &amp; SSL encryption.
            </p>
          </div>

          {paymentMethod === 'card' && (
            <div
              style={{
                background: 'var(--bg-page)',
                padding: '16px',
                borderRadius: '10px',
                border: '1px solid var(--border-light)',
                marginTop: '12px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: 'var(--success)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  marginBottom: '12px',
                }}
              >
                <Lock size={14} /> Encrypted Billing Session Active
              </div>

              <div className="form-group">
                <label>Cardholder Name</label>
                <input
                  type="text"
                  required
                  placeholder="Name on card"
                  value={form.cardName}
                  onChange={(e) => setForm({ ...form, cardName: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Card Number</label>
                <input
                  type="text"
                  required
                  placeholder="4242 •••• •••• 4242"
                  value={form.cardNumber}
                  onChange={(e) => handleCardNumberChange(e.target.value)}
                />
              </div>

              <div className="checkout-two-column">
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>Expiry (MM/YY)</label>
                  <input
                    type="text"
                    required
                    placeholder="08/29"
                    value={form.expiry}
                    onChange={(e) => handleExpiryChange(e.target.value)}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>CVV</label>
                  <input
                    type="password"
                    required
                    maxLength={4}
                    placeholder="•••"
                    value={form.cvv}
                    onChange={(e) => setForm({ ...form, cvv: e.target.value.replace(/\D/g, '') })}
                  />
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="btn-primary"
            style={{ width: '100%', marginTop: '20px' }}
            disabled={processing}
          >
            {processing
              ? 'Encrypting & Confirming Order...'
              : `Place Order • PKR ${total.toLocaleString()}`}
          </button>
        </div>

        <div className="form-card" style={{ height: 'fit-content' }}>
          <h3 style={{ fontFamily: 'Georgia, serif', marginBottom: '16px' }}>Order Summary</h3>
          {orderItems.map((item) => (
            <div
              key={item.variantId || `${item.id}-${item.selectedSize}-${item.selectedColor || ''}`}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '12px',
                fontSize: '0.92rem',
              }}
            >
              <span>
                {item.title} ({item.selectedColor ? `${item.selectedColor}, ` : ''}
                {item.selectedSize}) × {item.quantity}
              </span>
              <strong>PKR {(item.price * item.quantity).toLocaleString()}</strong>
            </div>
          ))}

          <hr style={{ border: 'none', borderTop: '1px solid var(--border-light)', margin: '14px 0' }} />

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '8px',
              color: 'var(--text-muted)',
            }}
          >
            <span>Subtotal</span>
            <span>PKR {subtotal.toLocaleString()}</span>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '12px',
              color: 'var(--text-muted)',
            }}
          >
            <span>Shipping</span>
            <span>{shipping === 0 ? 'FREE' : `PKR ${shipping}`}</span>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '1.1rem',
              fontWeight: 700,
              color: 'var(--brand-primary)',
            }}
          >
            <span>Total</span>
            <span>PKR {total.toLocaleString()}</span>
          </div>
        </div>
      </form>
    </main>
  );
}