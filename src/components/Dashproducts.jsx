import React, { useState, useEffect, useRef } from 'react';
import './Dashproducts.css';
import { FaSearch, FaPlus, FaCamera, FaStar } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const BASE_URL = "https://etqanproject.runasp.net";

const Dashproducts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('all');
  const [visibleCount, setVisibleCount] = useState(7);
  const [showAddModal, setShowAddModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '', brand: '', price: '', discount: '', image: null
  });
  const [errors, setErrors] = useState({});

  // ── Init ──
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
    fetchProducts();
  }, []);

  // ── جلب المنتجات ──
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const [bestRes, offersRes] = await Promise.all([
        fetch(`${BASE_URL}/api/Products/best-sellers`),
        fetch(`${BASE_URL}/api/Products/offers`),
      ]);
      const best = bestRes.ok ? await bestRes.json() : [];
      const offers = offersRes.ok ? await offersRes.json() : [];
      setProducts([...best, ...offers]);
    } catch (err) {
      console.error("فشل جلب المنتجات:", err);
    } finally {
      setLoading(false);
    }
  };

  // ── فلترة وترتيب ──
  const filteredProducts = products
    .filter(p => {
      const matchSearch = p.name?.includes(searchTerm);
      if (sortBy === 'all' || sortBy === 'rating') return matchSearch;
      if (sortBy === 'كهربائية' || sortBy === 'يدوية') return matchSearch && p.categoryName === sortBy;
      return matchSearch && p.brandName === sortBy;
    })
    .sort((a, b) => sortBy === 'rating' ? (b.rating ?? 0) - (a.rating ?? 0) : 0);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  // ── صورة ──
  const handleImageClick = () => fileInputRef.current.click();
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setFormData(prev => ({ ...prev, image: file }));
  };

  // ── حذف ──
  const handleDelete = async (id) => {
    if (!window.confirm("هل تريد حذف هذا المنتج نهائياً؟")) return;
    try {
      const res = await fetch(`${BASE_URL}/api/Products/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch {
      // alert("فشل الحذف، حاول مجدداً");
    }
  };

  // ── حفظ ──
  const handleSave = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.image) newErrors.image = 'يرجى إدراج صورة';
    if (!formData.name) newErrors.name = 'يرجى إدخال اسم المنتج';
    if (!formData.brand) newErrors.brand = 'يرجى إدخال العلامة التجارية';
    if (!formData.price) newErrors.price = 'يرجى إدخال السعر';
    if (!formData.discount) newErrors.discount = 'يرجى إدخال الخصم';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setSaving(true);
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("price", formData.price);
      data.append("oldPrice", 0);
      data.append("stockQuantity", 10);
      data.append("isOffer", false);
      data.append("categoryId", 0);
      data.append("brandId", 0);
      if (formData.image) data.append("imageFile", formData.image);

      const res = await fetch(`${BASE_URL}/api/Products`, { method: 'POST', body: data });
      if (!res.ok) { const err = await res.json(); throw new Error(err.message || "فشل الحفظ"); }

      // alert('تم حفظ المنتج بنجاح ✅');
      setShowAddModal(false);
      setFormData({ name: '', brand: '', price: '', discount: '', image: null });
      fetchProducts();
    } catch (err) {
      // alert(`❌ خطأ: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="dashproducts-page" data-aos="fade-up">

      {/* ── Header ── */}
      <div className="top-header-row">
        <h1 className="page-title">المنتجات</h1>
        <div className="top-actions-left">
          <div className="filter-dropdown">
            <select value={sortBy} onChange={(e) => { setSortBy(e.target.value); setVisibleCount(7); }}>
              <option value="all">جميع المنتجات</option>
              <option value="rating">الأعلى تقييماً</option>
              <optgroup label="── حسب النوع ──">
                <option value="كهربائية">معدات كهربائية</option>
                <option value="يدوية">معدات يدوية</option>
              </optgroup>
              <optgroup label="── الماركات العالمية ──">
                <option value="Milwaukee">Milwaukee</option>
                <option value="DeWalt">DeWalt</option>
                <option value="Makita">Makita</option>
                <option value="Bosch">Bosch</option>
                <option value="Snap-on">Snap-on</option>
                <option value="Knipex">Knipex</option>
                <option value="Bahco">Bahco</option>
                <option value="Metabo">Metabo</option>
                <option value="Ryobi">Ryobi</option>
              </optgroup>
            </select>
          </div>
          <button className="add-btn-main" onClick={() => setShowAddModal(true)}>
            <FaPlus /> إضافة منتج
          </button>
        </div>
      </div>

      {/* ── Search ── */}
      <div className="search-section-wrapper">
        <div className="search-input-box">
          <input
            type="text"
            placeholder="البحث عن منتج ..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setVisibleCount(7); }}
          />
          <FaSearch className="search-icon-left" />
        </div>
      </div>

      {/* ── Table ── */}
      <div className="table-main-wrapper">
        <table className="products-data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>اسم المنتج</th>
              <th>السعر</th>
              <th>الخصم</th>
              <th>التقييم</th>
              <th>اجراءات</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" style={{ padding: '50px' }}>جاري التحميل...</td></tr>
            ) : displayedProducts.length > 0 ? (
              displayedProducts.map((product, index) => (
                <tr key={product.id} data-aos="fade-up">
                  <td data-label="#">{index + 1}</td>
                  <td data-label="اسم المنتج" className="product-name-cell">
                    {product.name} <br />
                    <span className="brand-tag">{product.brandName || product.brand}</span>
                  </td>
                  <td data-label="السعر" className="price-text">{product.price} ج.م</td>
                  <td data-label="الخصم" className="discount-text">{product.discount || '0%'}</td>
                  <td data-label="التقييم" className="rating-cell">
                    <div className="rating-flex"><FaStar className="star-icon" /> {product.rating ?? '—'}</div>
                  </td>
                  <td data-label="اجراءات" className="actions-btns">
                    <button className="edit-btn">تعديل</button>
                    <button className="delete-btn" onClick={() => handleDelete(product.id)}>حذف</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="6" style={{ padding: '50px' }}>عذراً، لم يتم العثور على نتائج تطابق بحثك</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ── Show More ── */}
      {visibleCount < filteredProducts.length && (
        <div className="footer-action">
          <button className="show-all-btn-styled" onClick={() => setVisibleCount(visibleCount + 7)}>
            عرض المزيد من المنتجات ↓
          </button>
        </div>
      )}

      {/* ── Modal ── */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content-new product-modal" data-aos="zoom-in">
            <h2 className="modal-title-new">إضافة منتج جديد</h2>
            <form className="modal-form-new" onSubmit={handleSave}>

              <div className="image-upload-wrapper" onClick={handleImageClick}>
                {formData.image ? (
                  <img src={URL.createObjectURL(formData.image)} alt="preview" className="preview-img" />
                ) : (
                  <div className="upload-placeholder">
                    <FaCamera className="camera-icon-upload" />
                    <p>أضف صورة</p>
                  </div>
                )}
                <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} accept="image/*" />
              </div>
              {errors.image && <p className="error-text-msg" style={{ textAlign: 'center', marginBottom: '10px' }}>{errors.image}</p>}

              <div className="input-group-valid full-width">
                <input type="text" placeholder="اسم المنتج" value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                {errors.name && <span className="error-text-msg">{errors.name}</span>}
              </div>

              <div className="input-group-valid full-width">
                <input type="text" placeholder="العلامة التجارية" value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })} />
                {errors.brand && <span className="error-text-msg">{errors.brand}</span>}
              </div>

              <div className="form-row-new">
                <div className="input-group-valid">
                  <input type="number" placeholder="السعر" value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
                  {errors.price && <span className="error-text-msg">{errors.price}</span>}
                </div>
                <div className="input-group-valid">
                  <input type="text" placeholder="الخصم" value={formData.discount}
                    onChange={(e) => setFormData({ ...formData, discount: e.target.value })} />
                  {errors.discount && <span className="error-text-msg">{errors.discount}</span>}
                </div>
              </div>

              <div className="modal-btns-new">
                <button type="submit" className="confirm-btn-new" disabled={saving}>
                  {saving ? 'جاري الحفظ...' : 'حفظ'}
                </button>
                <button type="button" className="cancel-btn-new" onClick={() => setShowAddModal(false)}>إلغاء</button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Dashproducts;
