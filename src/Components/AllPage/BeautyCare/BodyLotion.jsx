// src/component/BeautyBodyLotion.jsx
import  { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Slider } from "@mui/material";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import ProductCard from '../ProductCard';
import { loadAllProducts } from '../ProductsData';

// 🧴 BODY LOTION FILTER CONFIGURATION
const FILTER_CONFIG = {
  brands: ["Nivea", "Vaseline", "Ponds", "Himalaya", "Biotique", "Plum", "Mamaearth", "Lotus", "Dove", "Jergens"],
  type: ["Body Lotion", "Body Butter", "Body Milk", "Body Cream", "Hand Lotion", "Foot Cream", "Sunscreen Lotion", "Whitening Lotion"],
  skinType: ["Normal", "Dry", "Oily", "Sensitive", "All Skin Types"],
  concern: ["Moisturizing", "Whitening", "Anti-aging", "Sun Protection", "Firming", "Brightening", "Soothing", "Repair"],
  formulation: ["Non-Greasy", "Fast Absorbing", "24H Moisture", "With SPF", "Natural", "Paraben Free", "Mineral Oil Free"],
  fragrance: ["Fragrance Free", "Floral", "Fruity", "Herbal", "Cocoa Butter", "Aloe Vera", "Rose"],
  size: ["50ml", "100ml", "200ml", "250ml", "300ml", "400ml", "500ml"]
};

function BodyLotion() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maxPrice, setMaxPrice] = useState(2000);
  const [sortBy, setSortBy] = useState("default");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  const [filters, setFilters] = useState({ 
    brands: [], 
    type: [], 
    skinType: [], 
    concern: [], 
    formulation: [], 
    fragrance: [], 
    size: [] 
  });
  
  const [openSections, setOpenSections] = useState({ 
    brands: true, 
    type: true, 
    skinType: true, 
    concern: true, 
    formulation: true, 
    fragrance: true, 
    size: true 
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

  const bodyLotionProducts = products.filter((p) => 
    p.category?.toLowerCase() === 'body lotion' || 
    p.name?.toLowerCase().includes('body lotion')
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
    setFilters({ brands: [], type: [], skinType: [], concern: [], formulation: [], fragrance: [], size: [] });
    setMaxPrice(2000);
  };

  const filteredProducts = bodyLotionProducts
    .filter((product) => {
      if (product.offerPrice > maxPrice) return false;
      if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) return false;
      if (filters.type.length > 0 && !filters.type.includes(product.type)) return false;
      if (filters.skinType.length > 0 && !filters.skinType.includes(product.skinType)) return false;
      if (filters.concern.length > 0 && !filters.concern.includes(product.concern)) return false;
      if (filters.formulation.length > 0 && !filters.formulation.includes(product.formulation)) return false;
      if (filters.fragrance.length > 0 && !filters.fragrance.includes(product.fragrance)) return false;
      if (filters.size.length > 0 && !product.sizes?.some((s) => filters.size.includes(s))) return false;
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
        className="flex justify-between items-center w-full font-semibold text-gray-800 text-sm mb-2 hover:text-sky-600 transition"
      >
        <span>{title}</span>
        {openSections[sectionKey] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      
      {openSections[sectionKey] && (
        <div className="grid grid-cols-1 gap-1.5 max-h-60 overflow-y-auto pr-1">
          {items.map((item, index) => (
            <label key={index} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1.5 rounded transition">
              <input 
                type="checkbox" 
                checked={filters[sectionKey]?.includes(item) || false}
                onChange={() => handleFilterToggle(sectionKey, item)} 
                className="w-3.5 h-3.5 !mr-2 rounded border-gray-300 text-sky-600 focus:ring-sky-500" 
              />
              <span className="text-gray-600 !text-sm">{item}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );

  const FilterSidebar = () => (
    <div className="bg-white p-4 rounded-xl shadow-sm space-y-4">
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="font-bold text-base text-gray-800"> Body Lotion Filters</h2>
        <button onClick={clearAllFilters} className="text-sky-600 text-xs font-semibold hover:underline">Clear All</button>
      </div>

      <AccordionSection title=" Brand" sectionKey="brands" items={FILTER_CONFIG.brands} />
      <AccordionSection title="Product Type" sectionKey="type" items={FILTER_CONFIG.type} />
      <AccordionSection title=" Skin Type" sectionKey="skinType" items={FILTER_CONFIG.skinType} />
      <AccordionSection title=" Concern" sectionKey="concern" items={FILTER_CONFIG.concern} />
      <AccordionSection title=" Formulation" sectionKey="formulation" items={FILTER_CONFIG.formulation} />
      <AccordionSection title="Fragrance" sectionKey="fragrance" items={FILTER_CONFIG.fragrance} />

      <div className="mb-4 border-b border-gray-100 pb-3">
        <button onClick={() => toggleSection('size')} className="flex justify-between items-center w-full font-semibold text-gray-800 text-sm mb-2">
          <span>📏 Size</span>
          {openSections.size ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {openSections.size && (
          <div className="flex gap-2 flex-wrap pt-1">
            {FILTER_CONFIG.size.map((size, idx) => (
              <button
                key={idx}
                onClick={() => handleFilterToggle('size', size, true)}
                className={`border px-3 py-1.5 rounded-md text-xs font-medium transition ${
                  filters.size.includes(size) ? 'bg-sky-600 text-white border-sky-600' : 'border-gray-200 hover:border-sky-500 text-gray-600 bg-white'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mb-2 pb-3">
        <h2 className="font-semibold text-gray-800 text-sm mb-1"> Max Price: ₹{maxPrice}</h2>
        <Slider
          value={maxPrice}
          onChange={(e, val) => setMaxPrice(val)}
          min={0}
          max={2000}
          step={50}
          sx={{
            color: "#0284c7",
            height: 4,
            '& .MuiSlider-thumb': { width: 16, height: 16, backgroundColor: '#0284c7' }
          }}
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>₹0</span>
          <span>₹2000</span>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-8">
      <div className="mx-4 my-4 !shadow-3xl shadow-red-900/30 bg-[#1E2D42] bg-gradient-to-br from-[#EE971D] to-[#1E2D42] rounded-xl text-white text-center py-12 ">
        <h1 className="text-3xl font-bold">Body Lotion</h1>
        <p className="mt-2 text-white/80 text-sm">Timeless Elegance for Every Occasion</p>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
         <nav className="flex items-center gap-2 text-sm text-gray-500 mt-3">
          <Link to="/" className="!text-lg !no-underline !font-semibold !text-[#1E2D42] transition-colors">Home</Link>
          <span className="text-lg !font-medium">/</span>
          <span className="text-lg !font-medium text-[#E4921A]">Body Lotion</span>
        </nav>
        <h2 className="text-2xl !font-bold !mt-3 !mb-3"></h2>


        <div className="md:hidden mb-4">
          <button 
            onClick={() => setMobileFiltersOpen(true)} 
            className="flex items-center bg-white px-4 py-3 rounded-xl shadow-sm w-full justify-between border"
          >
            <span className="font-bold text-sm text-gray-700">Refine Body Lotion</span>
            <Menu size={18} />
          </button>
        </div>

        {mobileFiltersOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={() => setMobileFiltersOpen(false)}>
            <div className="absolute top-0 left-0 w-80 h-full bg-white overflow-y-auto p-4 flex flex-col" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center border-b pb-3 mb-2">
                <h2 className="font-black text-gray-800">Body Lotion Filters</h2>
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
                Found <span className="text-sky-600 font-bold">{filteredProducts.length}</span> body lotions
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
                <div className="mb-4"><span className="text-6xl"></span></div>
                <p className="text-gray-400 font-medium text-sm">No body lotions match your filters.</p>
                <button onClick={clearAllFilters} className="text-sky-600 text-xs font-bold mt-2 underline">Reset Filters</button>
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

export default BodyLotion;