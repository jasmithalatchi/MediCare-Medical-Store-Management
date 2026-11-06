import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import medicineService from '../services/medicineService';
import { Search, Filter, ArrowUpDown, X, ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react';

const STATIC_CATEGORIES = [
  'All',
  'Tablets',
  'Capsules',
  'Syrups and Tonics',
  'Injections',
  'Serums',
  'Baby Care',
  'Personal Care',
  'Skin Care',
  'Vitamins and Supplements',
  'First Aid',
  'Medical Equipment',
  'ORS and Hydration',
  'Healthcare Essentials',
];

const Catalogue = () => {
  const [searchParams] = useSearchParams();
  const initialCat = searchParams.get('category') || 'All';
  const initialKw = searchParams.get('search') || searchParams.get('keyword') || '';

  const [medicines, setMedicines] = useState([]);
  const [categories, setCategories] = useState(STATIC_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [searchKeyword, setSearchKeyword] = useState(initialKw);
  const [searchInput, setSearchInput] = useState(initialKw);
  const [sortOption, setSortOption] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(24);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);

  // Sync with URL query parameters
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setSelectedCategory(cat);
      setPage(1);
    }
    const kw = searchParams.get('search') || searchParams.get('keyword');
    if (kw !== null && kw !== undefined) {
      setSearchKeyword(kw);
      setSearchInput(kw);
      setPage(1);
    }
  }, [searchParams]);

  // Fetch dynamic categories on mount
  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await medicineService.getCategories();
        if (res?.data && res.data.length > 0) {
          const merged = ['All', ...new Set([...STATIC_CATEGORIES.slice(1), ...res.data])];
          setCategories(merged);
        }
      } catch (err) {
        // Fallback to STATIC_CATEGORIES if backend not reachable
      }
    };
    fetchCats();
  }, []);

  // Fetch medicines whenever filters, page, sorting, or search changes
  useEffect(() => {
    const fetchMedicines = async () => {
      setLoading(true);
      try {
        const params = {
          page,
          limit: pageSize,
        };
        if (selectedCategory && selectedCategory !== 'All') {
          params.category = selectedCategory;
        }
        if (searchKeyword.trim()) {
          params.keyword = searchKeyword.trim();
        }
        if (sortOption) {
          params.sort = sortOption;
        }
        if (inStockOnly) {
          params.inStock = 'true';
        }

        const res = await medicineService.getMedicines(params);
        if (res?.data) {
          setMedicines(res.data);
          setTotalItems(res.total || res.data.length);
          setTotalPages(res.pages || Math.ceil((res.total || res.data.length) / pageSize) || 1);
        }
      } catch (err) {
        console.error('Failed to load catalogue products', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, [selectedCategory, searchKeyword, sortOption, inStockOnly, page, pageSize]);

  // Handle Search Submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    setSearchKeyword(searchInput);
  };

  const handleClearSearch = () => {
    setSearchInput('');
    setSearchKeyword('');
    setPage(1);
  };

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchInput('');
    setSearchKeyword('');
    setSortOption('');
    setInStockOnly(false);
    setPage(1);
  };

  const isFiltered = selectedCategory !== 'All' || searchKeyword !== '' || sortOption !== '' || inStockOnly;

  return (
    <div className="container" style={{ padding: '36px 1.5rem' }}>
      {/* Header Banner */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
          Medicine Catalogue & Pharmacy Store
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
          Explore 300+ certified medicines, generics, healthcare supplies, and wellness essentials with real-time stock availability.
        </p>
      </div>

      {/* Search Bar & Primary Controls */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
        }}
      >
        {/* Search Input */}
        <form
          onSubmit={handleSearchSubmit}
          style={{
            position: 'relative',
            flex: '1 1 360px',
            maxWidth: '560px',
            display: 'flex',
          }}
        >
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search by name, generic, brand, or category..."
            style={{
              width: '100%',
              padding: '12px 40px 12px 42px',
              borderRadius: '10px',
              border: '1px solid #cbd5e1',
              fontSize: '0.95rem',
              outline: 'none',
              backgroundColor: '#ffffff',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            }}
          />
          <Search
            size={18}
            color="#94a3b8"
            style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
          />
          {searchInput && (
            <button
              type="button"
              onClick={handleClearSearch}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
              }}
            >
              <X size={16} />
            </button>
          )}
        </form>

        {/* Sort and Per-Page Dropdowns */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          {/* Sort Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ArrowUpDown size={16} color="#64748b" />
            <select
              value={sortOption}
              onChange={(e) => {
                setSortOption(e.target.value);
                setPage(1);
              }}
              style={{
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '0.85rem',
                fontWeight: 600,
                backgroundColor: '#ffffff',
                color: '#334155',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              <option value="">Sort: Featured / Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="discount">Highest Discount</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>

          {/* Page Size Selector */}
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(e.target.value === 'all' ? 'all' : Number(e.target.value));
              setPage(1);
            }}
            style={{
              padding: '10px 12px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              fontSize: '0.85rem',
              fontWeight: 600,
              backgroundColor: '#ffffff',
              color: '#334155',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <option value={24}>Show 24</option>
            <option value={48}>Show 48</option>
            <option value={96}>Show 96</option>
            <option value="all">Show All (300+)</option>
          </select>

          {/* In-Stock Toggle */}
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: '#475569',
              cursor: 'pointer',
              userSelect: 'none',
              padding: '8px 12px',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              backgroundColor: inStockOnly ? '#ecfdf5' : '#ffffff',
            }}
          >
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => {
                setInStockOnly(e.target.checked);
                setPage(1);
              }}
            />
            <span>In Stock Only</span>
          </label>
        </div>
      </div>

      {/* Category Pills Slider */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '14px',
          marginBottom: '20px',
          scrollbarWidth: 'thin',
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setPage(1);
            }}
            style={{
              padding: '8px 16px',
              borderRadius: '24px',
              border: selectedCategory === cat ? '1px solid #059669' : '1px solid #cbd5e1',
              backgroundColor: selectedCategory === cat ? '#059669' : '#ffffff',
              color: selectedCategory === cat ? '#ffffff' : '#334155',
              fontSize: '0.85rem',
              fontWeight: 700,
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease',
              cursor: 'pointer',
              boxShadow: selectedCategory === cat ? '0 2px 4px rgba(5,150,105,0.2)' : 'none',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results Count & Reset Controls */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          borderBottom: '1px solid #e2e8f0',
          paddingBottom: '12px',
        }}
      >
        <span style={{ fontSize: '0.9rem', color: '#475569', fontWeight: 600 }}>
          Showing <strong>{medicines.length}</strong> of <strong>{totalItems}</strong> medicines
          {selectedCategory !== 'All' && <span> in <em>{selectedCategory}</em></span>}
          {searchKeyword && <span> matching "<em>{searchKeyword}</em>"</span>}
        </span>

        {isFiltered && (
          <button
            onClick={handleResetFilters}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              background: 'none',
              border: 'none',
              color: '#ef4444',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <RefreshCw size={14} /> Reset All Filters
          </button>
        )}
      </div>

      {/* Loading & Content View */}
      {loading ? (
        <Loader message="Fetching pharmacy medicines catalog..." />
      ) : medicines.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '60px 1.5rem',
            background: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
          }}
        >
          <p style={{ fontSize: '1.15rem', color: '#475569', fontWeight: 600, marginBottom: '8px' }}>
            No medicines match the selected filter or query.
          </p>
          <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '20px' }}>
            Try adjusting your search keyword or selecting a different category.
          </p>
          <button
            onClick={handleResetFilters}
            style={{
              backgroundColor: '#059669',
              color: '#ffffff',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              fontSize: '0.9rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            View All Medicines
          </button>
        </div>
      ) : (
        <>
          {/* Products Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '24px',
              marginBottom: '36px',
            }}
          >
            {medicines.map((med) => (
              <ProductCard key={med._id} medicine={med} />
            ))}
          </div>

          {/* Pagination Controls */}
          {pageSize !== 'all' && totalPages > 1 && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px',
                paddingTop: '20px',
                borderTop: '1px solid #e2e8f0',
              }}
            >
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  background: page === 1 ? '#f1f5f9' : '#ffffff',
                  color: page === 1 ? '#94a3b8' : '#334155',
                  cursor: page === 1 ? 'not-allowed' : 'pointer',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                }}
              >
                <ChevronLeft size={16} /> Previous
              </button>

              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#334155', padding: '0 12px' }}>
                Page {page} of {totalPages}
              </span>

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  background: page === totalPages ? '#f1f5f9' : '#ffffff',
                  color: page === totalPages ? '#94a3b8' : '#334155',
                  cursor: page === totalPages ? 'not-allowed' : 'pointer',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                }}
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Catalogue;
