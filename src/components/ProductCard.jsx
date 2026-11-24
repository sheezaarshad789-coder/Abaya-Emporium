import { Link } from 'react-router-dom';
import { getSubcategory, priceSummary, productStatus, STOCK_STATUS } from '../data/catalog';

export default function ProductCard({ product }) {
  const subcategory = getSubcategory(product.categoryId, product.subcategoryId);
  const { min, varies } = priceSummary(product);
  const status = productStatus(product);

  return (
    <Link to={`/product/${product.slug}`} className="product-card">
      <div className="card-img-wrap">
        <img src={product.images[0]} alt={product.title} loading="lazy" />
        <span className="fabric-pill">{product.fabric}</span>
        {status === 'out_of_stock' && (
          <span className="stock-pill">{STOCK_STATUS.out_of_stock.label}</span>
        )}
      </div>
      <div className="card-body">
        <span className="card-category">{subcategory?.name || product.subcategoryId}</span>
        <h3 className="card-title">{product.title}</h3>
        <p className="card-price">
          {varies ? 'From ' : ''}PKR {min.toLocaleString()}
        </p>
      </div>
    </Link>
  );
}
