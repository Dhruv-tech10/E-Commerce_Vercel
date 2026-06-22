// src/component/BeautyOralCare.jsx
import  { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Slider } from "@mui/material";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import ProductCard from '../ProductCard';
import { loadAllProducts } from '../ProductsData';

// ✨ ORAL CARE FILTER CONFIGURATION
const FILTER_CONFIG = {
  brands: ["Colgate", "Oral-B", "Sensodyne", "Himalaya", "Dabur", "Patanjali", "Closeup", "Pepsodent", "Listerine", "Crest", "Parodontax", "Aquafresh"],
  type: ["Toothbrush", "Toothpaste", "Mouthwash", "Dental Floss", "Tongue Cleaner", "Teeth Whitening Kit", "Interdental Brush", "Dental Pick", "Gum Care", "Complete Kit"],
  bristleType: ["Soft", "Medium", "Hard", "Ultra Soft", "Charcoal Infused", "Silicone"],
  formulation: ["Natural/Herbal", "With Fluoride", "Fluoride Free", "Charcoal Based", "Salt Based", "Ayurvedic", "Sensitive Formula", "Whitening"],
  powerSource: ["Manual", "Battery Operated", "USB Rechargeable", "Electric"],
  concern: ["Cavity Protection", "Sensitivity Relief", "Gum Care", "Whitening", "Fresh Breath", "Plaque Removal", "Tartar Control", "Enamel Protection"],
  features: ["Timer", "Pressure Sensor", "Travel Case", "Replaceable Head", "Tongue Cleaner", "Bluetooth", "Multiple Modes"],
  packSize: ["Single", "Pack of 2", "Pack of 3", "Family Pack", "Value Pack"]
};

function OralCare() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maxPrice, setMaxPrice] = useState(1500);
  const [sortBy, setSortBy] = useState("default");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  const [filters, setFilters] = useState({ 
    brands: [], 
    type: [], 
    bristleType: [], 
    formulation: [], 
    powerSource: [], 
    concern: [], 
    features: [], 
    packSize: [] 
  });
  
  const [openSections, setOpenSections] = useState({ 
    brands: true, 
    type: true, 
    bristleType: true, 
    formulation: true, 
    powerSource: true, 
    concern: true, 
    features: true, 
    packSize: true 
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await loadAllProducts();
      setProducts(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const oralCareProducts = products.filter((p) => 
    p.category?.toLowerCase() === 'oral care' || 
    p.name?.toLowerCase().includes('oral care')
  );

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleFilterToggle = (key, value, isSingleSelect = false) => {
    setFilters((prev) => {
      const current = prev[key];
      if (isSingleSelect) {
        return { ...prev, [key]: current.includes(value) ? [] : [value] };
      }
      return {
        ...prev,
        [key]: current.includes(value) ? current.filter((item) => item !== value) : [...current, value]
      };
    });
  };

  const clearAllFilters = () => {
    setFilters({ brands: [], type: [], bristleType: [], formulation: [], powerSource: [], concern: [], features: [], packSize: [] });
    setMaxPrice(1500);
  };

  const filteredProducts = oralCareProducts
    .filter((product) => {
      if (product.offerPrice > maxPrice) return false;
      if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) return false;
      if (filters.type.length > 0 && !filters.type.includes(product.type)) return false;
      if (filters.bristleType.length > 0 && !filters.bristleType.includes(product.bristleType)) return false;
      if (filters.formulation.length > 0 && !filters.formulation.includes(product.formulation)) return false;
      if (filters.powerSource.length > 0 && !filters.powerSource.includes(product.powerSource)) return false;
      if (filters.concern.length > 0 && !product.concern?.some((c) => filters.concern.includes(c))) return false;
      if (filters.features.length > 0 && !product.features?.some((f) => filters.features.includes(f))) return false;
      if (filters.packSize.length > 0 && !filters.packSize.includes(product.packSize)) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "price_low") return a.offerPrice - b.offerPrice;
      if (sortBy === "price_high") return b.offerPrice - a.offerPrice;
      if (sortBy === "newest") return b.id - a.id;
      if (sortBy === "popular") return (b.rating || 0) - (a.rating || 0);
      return 0;
    });

  const AccordionSection = ({ title, sectionKey, items }) => (
    <div className="mb-4 border-b border-gray-100 pb-3">
      <button 
        onClick={() => toggleSection(sectionKey)} 
        className="flex justify-between items-center w-full font-semibold text-gray-800 text-sm mb-2 hover:text-amber-700 transition"
      >
        <span>{title}</span>
        {openSections[sectionKey] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      
      {openSections[sectionKey] && (
        <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
          {items.map((item, index) => (
            <label key={index} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1.5 rounded transition">
              <input 
                type="checkbox" 
                checked={filters[sectionKey]?.includes(item) || false}
                onChange={() => handleFilterToggle(sectionKey, item)} 
                className="w-4 h-4 rounded border-gray-300 text-amber-700 focus:ring-amber-500" 
              />
              <span className="text-gray-600 text-xs">{item}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );

  const FilterSidebar = () => (
    <div className="bg-white p-4 rounded-xl shadow-sm space-y-4">
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="font-bold text-base text-gray-800">🦷 Oral Care Filters</h2>
        <button onClick={clearAllFilters} className="text-amber-700 text-xs font-semibold hover:underline">Clear All</button>
      </div>

      <AccordionSection title="🏷️ Brand" sectionKey="brands" items={FILTER_CONFIG.brands} />
      <AccordionSection title="📦 Product Type" sectionKey="type" items={FILTER_CONFIG.type} />
      <AccordionSection title="🪥 Bristle Type" sectionKey="bristleType" items={FILTER_CONFIG.bristleType} />
      <AccordionSection title="🧪 Formulation" sectionKey="formulation" items={FILTER_CONFIG.formulation} />
      <AccordionSection title="🔌 Power Source" sectionKey="powerSource" items={FILTER_CONFIG.powerSource} />
      <AccordionSection title="🎯 Concern" sectionKey="concern" items={FILTER_CONFIG.concern} />
      <AccordionSection title="⚡ Features" sectionKey="features" items={FILTER_CONFIG.features} />

      <div className="mb-4 border-b border-gray-100 pb-3">
        <button onClick={() => toggleSection('packSize')} className="flex justify-between items-center w-full font-semibold text-gray-800 text-sm mb-2">
          <span>📦 Pack Size</span>
          {openSections.packSize ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {openSections.packSize && (
          <div className="flex gap-2 flex-wrap pt-1">
            {FILTER_CONFIG.packSize.map((size, idx) => (
              <button
                key={idx}
                onClick={() => handleFilterToggle('packSize', size, true)}
                className={`border px-3 py-1.5 rounded-md text-xs font-medium transition ${
                  filters.packSize.includes(size) ? 'bg-amber-700 text-white border-amber-700' : 'border-gray-200 hover:border-amber-600 text-gray-600 bg-white'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mb-2 pb-3">
        <h2 className="font-semibold text-gray-800 text-sm mb-1">💰 Max Price: ₹{maxPrice}</h2>
        <Slider
          value={maxPrice}
          onChange={(e, val) => setMaxPrice(val)}
          min={0}
          max={1500}
          step={50}
          sx={{
            color: "#b45309",
            height: 4,
            '& .MuiSlider-thumb': { width: 16, height: 16, backgroundColor: '#b45309' }
          }}
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>₹0</span>
          <span>₹1500</span>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
       <nav className="flex items-center gap-2 text-sm text-gray-500 mt-3">
          <Link to="/" className="!text-lg !no-underline !font-semibold !text-[#1E2D42] transition-colors">Home</Link>
          <span className="text-lg !font-medium">/</span>
          <span className="text-lg !font-medium text-[#E4921A]">Oral Care</span>
        </nav>
        <h2 className="text-2xl !font-bold !mt-3 !mb-3">Oral Care</h2>



        <div className="md:hidden mb-4">
          <button 
            onClick={() => setMobileFiltersOpen(true)} 
            className="flex items-center bg-white px-4 py-3 rounded-xl shadow-sm w-full justify-between border"
          >
            <span className="font-bold text-sm text-gray-700">🦷 Refine Oral Care</span>
            <Menu size={18} />
          </button>
        </div>

        {mobileFiltersOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={() => setMobileFiltersOpen(false)}>
            <div className="absolute top-0 left-0 w-80 h-full bg-white overflow-y-auto p-4 flex flex-col" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center border-b pb-3 mb-2">
                <h2 className="font-black text-gray-800">🦷 Oral Care Filters</h2>
                <button onClick={() => setMobileFiltersOpen(false)} className="text-gray-500 p-1"><X size={20} /></button>
              </div>
              <FilterSidebar />
            </div>
          </div>
        )}

        <div className="flex gap-6 items-start">
          
          <aside className="w-64 hidden md:block sticky top-24 h-[calc(100vh-7rem)] overflow-y-auto pr-1">
            <FilterSidebar />
          </aside>

          <main className="flex-1">
            <div className="bg-white rounded-xl p-3 mb-4 border border-gray-100 flex justify-between items-center shadow-sm">
              <span className="text-xs text-gray-500 font-medium">
                Found <span className="text-amber-700 font-bold">{filteredProducts.length}</span> oral care products
              </span>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)} 
                className="border border-gray-200 outline-none rounded-lg px-3 py-1.5 text-xs text-gray-700 font-medium bg-gray-50 cursor-pointer"
              >
                <option value="default">Sort by: Default</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="newest">Newest First</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-xl border p-16 text-center shadow-sm">
                <div className="mb-4"><span className="text-6xl">🦷</span></div>
                <p className="text-gray-400 font-medium text-sm">No oral care products match your filters.</p>
                <button onClick={clearAllFilters} className="text-amber-700 text-xs font-bold mt-2 underline">Reset Filters</button>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </main>

        </div>

      </div>
    </div>
  );
}

export default OralCare;