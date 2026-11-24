import { useEffect } from 'react';
import { X, Ruler } from 'lucide-react';

const LENGTH_ROWS = [
  { size: '52"', heightRange: '4\'11" – 5\'1"', shoulderToHem: '52 in', chest: '42 in', sleeve: '23 in' },
  { size: '54"', heightRange: '5\'2" – 5\'4"', shoulderToHem: '54 in', chest: '44 in', sleeve: '23.5 in' },
  { size: '56"', heightRange: '5\'5" – 5\'7"', shoulderToHem: '56 in', chest: '46 in', sleeve: '24 in' },
  { size: '58"', heightRange: '5\'8" – 5\'10"', shoulderToHem: '58 in', chest: '48 in', sleeve: '24.5 in' },
  { size: '60"', heightRange: '5\'11" – 6\'1"', shoulderToHem: '60 in', chest: '50 in', sleeve: '25 in' },
];

export default function SizeChartModal({ isOpen, onClose, selectedSize, onSelectSize }) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label="Abaya Size Chart">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Ruler size={20} color="var(--brand-primary)" />
            <h3 style={{ fontFamily: 'Georgia, serif', color: 'var(--brand-primary)' }}>
              Abaya Length &amp; Fit Guide
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Size Chart"
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)' }}
          >
            <X size={22} />
          </button>
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px' }}>
          Measure from the highest point of your shoulder straight down to your ankle. Click any size row to select it directly.
        </p>

        <div style={{ overflowX: 'auto' }}>
          <table className="size-table">
            <thead>
              <tr>
                <th>Length</th>
                <th>Wearer Height</th>
                <th>Shoulder to Hem</th>
                <th>Chest</th>
                <th>Sleeve</th>
              </tr>
            </thead>
            <tbody>
              {LENGTH_ROWS.map((row) => {
                const isCurrent = selectedSize === row.size;
                return (
                  <tr
                    key={row.size}
                    className={isCurrent ? 'active-row' : ''}
                    onClick={() => {
                      if (onSelectSize) onSelectSize(row.size);
                      onClose();
                    }}
                  >
                    <td><strong>{row.size}</strong></td>
                    <td>{row.heightRange}</td>
                    <td>{row.shoulderToHem}</td>
                    <td>{row.chest}</td>
                    <td>{row.sleeve}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="modal-tip">
          <strong>Styling Tip:</strong> Prefer a floor-grazing modest drape or plan to wear heeled sandals? Choose one length up.
        </div>
      </div>
    </div>
  );
}