import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag, Tags, ArrowLeft } from 'lucide-react';
import { getStoreProducts, saveStoreProducts } from '../data/products';
import { CATEGORIES, productStatus } from '../data/catalog';

const TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'orders', label: 'Orders', icon: ShoppingBag },
  { id: 'categories', label: 'Categories', icon: Tags },
];

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export default function AdminPage() {
  const [tab, setTab] = useState('dashboard');
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState(() => getStoreProducts());
  const [editingProductId, setEditingProductId] = useState(null);
  const [productFormOpen, setProductFormOpen] = useState(false);
  const [productForm, setProductForm] = useState({
    title: '',
    slug: '',
    categoryId: 'abayas',
    subcategoryId: 'black-abayas',
    fabric: '',
    price: '',
    stock: '',
    color: 'Black',
    images: '',
    whatItIs: '',
    whyBuyIt: '',
  });
  const [orders, setOrders] = useState(() => readStorage('abaya_emporium_orders', []));
  const [categories, setCategories] = useState(() =>
    readStorage('abaya_emporium_categories', CATEGORIES)
  );
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    localStorage.setItem('abaya_emporium_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('abaya_emporium_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    const syncProducts = (event) => {
      if (event.key === 'abaya_emporium_products') {
        setProducts(getStoreProducts());
      }
    };

    window.addEventListener('storage', syncProducts);
    return () => window.removeEventListener('storage', syncProducts);
  }, []);

  const lowStockCount = useMemo(
    () =>
      products.reduce(
        (count, product) => count + product.variants.filter((variant) => variant.stock > 0 && variant.stock <= 3).length,
        0
      ),
    [products]
  );

  const revenue = orders
    .filter((order) => order.status !== 'Cancelled')
    .reduce((sum, order) => sum + Number(order.total || 0), 0);

  const filteredProducts = products.filter((product) =>
    `${product.title} ${product.fabric}`.toLowerCase().includes(search.toLowerCase())
  );

  const filteredOrders = orders.filter((order) =>
    `${order.orderId} ${order.customer} ${order.city}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const resetProductForm = () => {
    setEditingProductId(null);
    setProductForm({
      title: '',
      slug: '',
      categoryId: 'abayas',
      subcategoryId: 'black-abayas',
      fabric: '',
      price: '',
      stock: '',
      color: 'Black',
      images: '',
      whatItIs: '',
      whyBuyIt: '',
    });
  };

  const openAddProduct = () => {
    resetProductForm();
    setProductFormOpen(true);
  };

  const openEditProduct = (product) => {
    const firstVariant = product.variants[0];
    setEditingProductId(product.id);
    setProductForm({
      title: product.title,
      slug: product.slug,
      categoryId: product.categoryId,
      subcategoryId: product.subcategoryId,
      fabric: product.fabric,
      price: String(product.price),
      stock: String(firstVariant?.stock ?? 0),
      color: firstVariant?.color ?? 'Black',
      images: product.images.join('\n'),
      whatItIs: product.whatItIs,
      whyBuyIt: (product.whyBuyIt || []).join('\n'),
    });
    setProductFormOpen(true);
  };

  const saveProduct = (event) => {
    event.preventDefault();
    const title = productForm.title.trim();
    const price = Number(productForm.price);
    if (!title || !price || !productForm.categoryId) return;

    const slug =
      productForm.slug.trim() ||
      title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const images = productForm.images
      .split('\n')
      .map((image) => image.trim())
      .filter(Boolean);
    const whyBuyIt = productForm.whyBuyIt
      .split('\n')
      .map((reason) => reason.trim())
      .filter(Boolean);

    const existing = editingProductId
      ? products.find((product) => product.id === editingProductId)
      : null;
    const id = existing?.id || `custom-${Date.now()}`;
    const stock = Math.max(0, Number(productForm.stock) || 0);
    const variantId = `${id}-free-${productForm.color.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
    const savedProduct = {
      id,
      slug,
      title,
      categoryId: productForm.categoryId,
      subcategoryId: productForm.subcategoryId,
      fabric: productForm.fabric.trim() || 'Other',
      price,
      rating: existing?.rating || 5,
      reviewCount: existing?.reviewCount || 0,
      images: images.length ? images : existing?.images || [],
      whatItIs: productForm.whatItIs.trim(),
      whyBuyIt,
      variants: [{
        id: variantId,
        sku: variantId.toUpperCase(),
        size: 'free',
        color: productForm.color.trim() || 'Standard',
        price,
        stock,
        status: stock <= 0 ? 'out_of_stock' : stock <= 3 ? 'low_stock' : 'in_stock',
      }],
    };

    const next = existing
      ? products.map((product) => (product.id === existing.id ? savedProduct : product))
      : [savedProduct, ...products];
    if (!saveStoreProducts(next)) {
      window.alert('Images are too large for browser storage. Upload smaller or compressed images.');
      return;
    }
    setProducts(next);
    setProductFormOpen(false);
    resetProductForm();
  };

  const deleteProduct = (id) => {
    const next = products.filter((product) => product.id !== id);
    setProducts(next);
    saveStoreProducts(next);
  };

  const handleImageUpload = (event) => {
    const files = [...event.target.files];
    if (files.length === 0) return;

    files.forEach((file) => {
      if (!file.type.startsWith('image/')) return;
      if (file.size > 2 * 1024 * 1024) {
        window.alert('Please upload an image smaller than 2 MB.');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const image = new Image();
        image.onload = () => {
          const canvas = document.createElement('canvas');
          const maxWidth = 1200;
          const scale = Math.min(1, maxWidth / image.width);
          canvas.width = Math.round(image.width * scale);
          canvas.height = Math.round(image.height * scale);
          const context = canvas.getContext('2d');
          context.drawImage(image, 0, 0, canvas.width, canvas.height);
          const compressed = canvas.toDataURL('image/jpeg', 0.78);
          setProductForm((current) => ({
            ...current,
            images: current.images
              ? `${current.images}\n${compressed}`
              : compressed,
          }));
        };
        image.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const addCategory = (event) => {
    event.preventDefault();
    const name = categoryName.trim();
    if (!name) return;
    setCategories((current) => [
      ...current,
      {
        id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        name,
        sizeSystem: 'free',
        subcategories: [],
      },
    ]);
    setCategoryName('');
  };

  const removeCategory = (id) => {
    setCategories((current) => current.filter((category) => category.id !== id));
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders((current) =>
      current.map((order) => (order.orderId === orderId ? { ...order, status } : order))
    );
  };

  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <Link to="/" className="admin-brand">ABAYA EMPORIUM</Link>
        <nav className="admin-nav" aria-label="Admin navigation">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              type="button"
              key={id}
              className={tab === id ? 'active' : ''}
              onClick={() => {
                setTab(id);
                setSearch('');
              }}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </nav>
        <Link to="/" className="admin-back">
          <ArrowLeft size={16} /> Back to store
        </Link>
      </aside>

      <section className="admin-content">
        <header className="admin-header">
          <div>
            <p className="admin-eyebrow">Admin Panel</p>
            <h1>{TABS.find((item) => item.id === tab)?.label}</h1>
          </div>
          {tab !== 'dashboard' && (
            <input
              className="admin-search"
              type="search"
              placeholder={tab === 'orders' ? 'Search orders...' : 'Search products...'}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          )}
        </header>

        {tab === 'dashboard' && (
          <>
            <div className="admin-stats">
              <article><span>Products</span><strong>{products.length}</strong></article>
              <article><span>Orders</span><strong>{orders.length}</strong></article>
              <article><span>Revenue</span><strong>PKR {revenue.toLocaleString()}</strong></article>
              <article><span>Low Stock Variants</span><strong>{lowStockCount}</strong></article>
            </div>
            <div className="admin-card">
              <h2>Recent Orders</h2>
              {orders.length === 0 ? (
                <p className="admin-empty">No orders yet. Orders will appear after checkout.</p>
              ) : (
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead><tr><th>Order</th><th>Customer</th><th>Total</th><th>Status</th></tr></thead>
                    <tbody>
                      {orders.slice(0, 5).map((order) => (
                        <tr key={order.orderId}>
                          <td>{order.orderId}</td>
                          <td>{order.customer}</td>
                          <td>PKR {Number(order.total).toLocaleString()}</td>
                          <td><span className="admin-status">{order.status || 'Pending'}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}

        {tab === 'products' && (
          <div className="admin-card">
            <div className="admin-card-toolbar">
              <button type="button" className="btn-primary" onClick={openAddProduct}>
                Add Product
              </button>
            </div>

            {productFormOpen && (
              <form className="admin-product-form" onSubmit={saveProduct}>
                <div className="admin-form-grid">
                  <label>
                    Product title
                    <input
                      required
                      value={productForm.title}
                      onChange={(event) => setProductForm({ ...productForm, title: event.target.value })}
                      placeholder="Rose Nidha Abaya"
                    />
                  </label>
                  <label>
                    URL slug
                    <input
                      value={productForm.slug}
                      onChange={(event) => setProductForm({ ...productForm, slug: event.target.value })}
                      placeholder="rose-nidha-abaya"
                    />
                  </label>
                  <label>
                    Category
                    <select
                      value={productForm.categoryId}
                      onChange={(event) => {
                        const category = CATEGORIES.find((item) => item.id === event.target.value);
                        setProductForm({
                          ...productForm,
                          categoryId: event.target.value,
                          subcategoryId: category?.subcategories[0]?.id || '',
                        });
                      }}
                    >
                      {CATEGORIES.filter((category) => category.id !== 'irani-chadar').map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Subcategory
                    <select
                      value={productForm.subcategoryId}
                      onChange={(event) => setProductForm({ ...productForm, subcategoryId: event.target.value })}
                    >
                      {CATEGORIES.find((category) => category.id === productForm.categoryId)?.subcategories.map((subcategory) => (
                        <option key={subcategory.id} value={subcategory.id}>{subcategory.name}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Fabric
                    <input
                      value={productForm.fabric}
                      onChange={(event) => setProductForm({ ...productForm, fabric: event.target.value })}
                      placeholder="Korean Nidha"
                    />
                  </label>
                  <label>
                    Price (PKR)
                    <input
                      required
                      type="number"
                      min="0"
                      value={productForm.price}
                      onChange={(event) => setProductForm({ ...productForm, price: event.target.value })}
                    />
                  </label>
                  <label>
                    Stock
                    <input
                      required
                      type="number"
                      min="0"
                      value={productForm.stock}
                      onChange={(event) => setProductForm({ ...productForm, stock: event.target.value })}
                    />
                  </label>
                  <label>
                    Color
                    <input
                      value={productForm.color}
                      onChange={(event) => setProductForm({ ...productForm, color: event.target.value })}
                      placeholder="Black"
                    />
                  </label>
                </div>
                <label className="admin-form-full">
                  Image URLs
                  <textarea
                    value={productForm.images}
                    onChange={(event) => setProductForm({ ...productForm, images: event.target.value })}
                    placeholder={'https://example.com/image-1.jpg\nhttps://example.com/image-2.jpg'}
                  />
                  <small>One image URL per line, or separate URLs with commas.</small>
                </label>
                <label className="admin-form-full admin-image-upload">
                  Upload images from this laptop
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                  />
                  <small>Multiple JPG, PNG or WebP images can be selected. Maximum 2 MB per image.</small>
                </label>
                <label className="admin-form-full">
                  What it is
                  <textarea
                    value={productForm.whatItIs}
                    onChange={(event) => setProductForm({ ...productForm, whatItIs: event.target.value })}
                  />
                </label>
                <label className="admin-form-full">
                  Why you will wear it
                  <textarea
                    value={productForm.whyBuyIt}
                    onChange={(event) => setProductForm({ ...productForm, whyBuyIt: event.target.value })}
                    placeholder={'Soft and opaque fabric\nComfortable everyday fit'}
                  />
                  <small>Add one benefit per line.</small>
                </label>
                <div className="admin-form-actions">
                  <button type="submit" className="btn-primary">Save Product</button>
                  <button
                    type="button"
                    className="btn-outline"
                    onClick={() => {
                      setProductFormOpen(false);
                      resetProductForm();
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead><tr><th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>
                  {filteredProducts.map((product) => {
                    const stock = product.variants.reduce((sum, variant) => sum + variant.stock, 0);
                    return (
                      <tr key={product.id}>
                        <td><strong>{product.title}</strong><small>{product.fabric}</small></td>
                        <td>{CATEGORIES.find((item) => item.id === product.categoryId)?.name || product.categoryId}</td>
                        <td>PKR {product.price.toLocaleString()}</td>
                        <td>{stock}</td>
                        <td>
                          <span className={`admin-status ${stock === 0 ? 'out' : ''}`}>
                            {stock === 0 ? 'Sold out' : productStatus(product) === 'low_stock' ? 'Low stock' : 'In stock'}
                          </span>
                        </td>
                        <td>
                          <button type="button" className="admin-action edit" onClick={() => openEditProduct(product)}>Edit</button>
                          <button type="button" className="admin-action delete" onClick={() => deleteProduct(product.id)}>Delete</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'orders' && (
          <div className="admin-card">
            {filteredOrders.length === 0 ? (
              <p className="admin-empty">No matching orders.</p>
            ) : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead><tr><th>Order</th><th>Customer</th><th>City</th><th>Payment</th><th>Total</th><th>Status</th></tr></thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr key={order.orderId}>
                        <td>{order.orderId}</td>
                        <td>{order.customer}</td>
                        <td>{order.city}</td>
                        <td>{order.method}</td>
                        <td>PKR {Number(order.total).toLocaleString()}</td>
                        <td>
                          <select
                            className="admin-status-select"
                            value={order.status || 'Pending'}
                            onChange={(event) => updateOrderStatus(order.orderId, event.target.value)}
                          >
                            <option>Pending</option>
                            <option>Processing</option>
                            <option>Shipped</option>
                            <option>Delivered</option>
                            <option>Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {tab === 'categories' && (
          <div className="admin-card">
            <form className="admin-category-form" onSubmit={addCategory}>
              <input
                type="text"
                placeholder="New category name"
                value={categoryName}
                onChange={(event) => setCategoryName(event.target.value)}
              />
              <button type="submit" className="btn-primary">Add Category</button>
            </form>
            <div className="admin-category-list">
              {categories.map((category) => (
                <div key={category.id}>
                  <span>{category.name}</span>
                  <button type="button" onClick={() => removeCategory(category.id)}>Remove</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
