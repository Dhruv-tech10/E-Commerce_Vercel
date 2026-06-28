// src/component/Babies.jsx
import { useState, useEffect } from "react";
import { Slider } from "@mui/material";
import ProductCard from "../ProductCard";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { kidsProducts, loadAllKidsProducts } from "../ProductsData";
import { Link } from 'react-router-dom';

// 👶 BABIES FILTER CONFIGURATION DATA
const FILTER_CONFIG = {
  babiesClothing: ["Rompers", "Onesies", "T-Shirts", "Shorts", "Pants", "Dresses", "Jackets", "Sweaters"],
  babiesFootwear: ["Booties", "Crib Shoes", "Sandals", "Slippers"],
  babiesAccessories: ["Hats", "Socks", "Mittens", "Bibs", "Burp Cloths", "Blankets"],
  babiesToys: ["Soft Toys", "Rattles", "Teethers", "Activity Toys", "Musical Toys", "Stacking Toys"],
  sizes: ["0-3M", "3-6M", "6-9M", "9-12M", "12-18M", "18-24M"],
  brands: ["Babyhug", "Mee Mee", "Lilliput", "Fisher Price", "Carter's", "Gerber", "Pampers", "Huggies"]
};

// Sidebar configuration
const SIDEBAR_SECTIONS = [
  { title: "Babies Clothing", key: "babiesClothing" },
  { title: "Babies Footwear", key: "babiesFootwear" },
  { title: "Babies Accessories", key: "babiesAccessories" },
  { title: "Babies Toys", key: "babiesToys" },
  { title: "Brands", key: "brands" }
];

function Babies() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [sortBy, setSortBy] = useState("default");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  // Filter states
  const [filters, setFilters] = useState({ 
    babiesClothing: [], 
    babiesFootwear: [],
    babiesAccessories: [], 
    babiesToys: [], 
    sizes: [], 
    brands: [] 
  });
  
  const [openSections, setOpenSections] = useState({ 
    babiesClothing: true, 
    babiesFootwear: false,
    babiesAccessories: false, 
    babiesToys: false, 
    sizes: true, 
    brands: true 
  });

  // Load products dataset on mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const loadedProducts = await loadAllKidsProducts();
        // Filter only Babies products
        const babiesProducts = loadedProducts.filter(p => 
          p.category === "Babies" || 
          p.for === "Babies" ||
          p.ageGroup === "Babies"
        );
        setProducts(babiesProducts.length > 0 ? babiesProducts : loadedProducts.slice(0, 20));
      } catch (error) {
        setProducts(kidsProducts.filter(p => p.category === "Babies"));
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const toggleSection = (section) => setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));

  const handleFilterToggle = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value) ? prev[key].filter(item => item !== value) : [...prev[key], value]
    }));
  };

  const handleSizeToggle = (value) => {
    setFilters(prev => ({
      ...prev,
      sizes: prev.sizes.includes(value) ? prev.sizes.filter(s => s !== value) : [...prev.sizes, value]
    }));
  };

  const clearAllFilters = () => {
    setFilters({ 
      babiesClothing: [], 
      babiesFootwear: [],
      babiesAccessories: [], 
      babiesToys: [], 
      sizes: [], 
      brands: [] 
    });
    setMaxPrice(5000);
  };

  // Filter products
  const filteredProducts = products
    .filter((product) => {
      if (product.offerPrice > maxPrice) return false;

      const activeCategoryFilters = [
        ...filters.babiesClothing, 
        ...filters.babiesFootwear,
        ...filters.babiesAccessories, 
        ...filters.babiesToys
      ];
      
      if (activeCategoryFilters.length > 0 && !activeCategoryFilters.includes(product.subCategory)) return false;
      if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) return false;
      if (filters.sizes.length > 0 && !product.sizes?.some((s) => filters.sizes.includes(s))) return false;

      return true;
    })
    .sort((a, b) => {
      if (sortBy === "price_low") return a.offerPrice - b.offerPrice;
      if (sortBy === "price_high") return b.offerPrice - a.offerPrice;
      return 0;
    });

  // Accordion Section Component
  const AccordionSection = ({ title, sectionKey, items }) => (
    <div className="mb-4 border-b border-gray-100 pb-3">
      <button 
        onClick={() => toggleSection(sectionKey)} 
        className="flex justify-between items-center w-full font-bold text-gray-800 text-sm mb-2 hover:text-orange-600 transition"
      >
        <span>{title}</span>
        {openSections[sectionKey] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      
      {openSections[sectionKey] && (
        <div className="grid grid-cols-1 gap-1.5 max-h-60 overflow-y-auto pr-1">
          {items.map((item, index) => (
            <label key={index} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
              <input 
                type="checkbox" 
                checked={filters[sectionKey]?.includes(item) || false}
                onChange={() => handleFilterToggle(sectionKey, item)} 
                className="w-3.5 h-3.5 !mr-2 rounded border-gray-300 text-orange-600 focus:ring-orange-500" 
              />
              <span className="text-gray-600 !text-sm">{item}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );

  // Filter Sidebar
  const FilterSidebar = () => (
    <div className="bg-white p-4 rounded-xl shadow-sm space-y-4">
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="font-bold text-base text-gray-800">Filters</h2>
        <button onClick={clearAllFilters} className="text-orange-600 text-xs font-semibold hover:underline">Clear All</button>
      </div>
      
      {SIDEBAR_SECTIONS.map((sec) => (
        <AccordionSection 
          key={sec.key}
          title={sec.title} 
          sectionKey={sec.key} 
          items={FILTER_CONFIG[sec.key]} 
        />
      ))}

      {/* Size Selector */}
      <div className="mb-4 border-b border-gray-100 pb-3">
        <button 
          onClick={() => toggleSection('sizes')} 
          className="flex justify-between items-center w-full font-bold text-gray-800 text-sm mb-2"
        >
          <span>📏 Size</span>
          {openSections.sizes ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {openSections.sizes && (
          <div className="flex gap-1.5 flex-wrap pt-1">
            {FILTER_CONFIG.sizes.map((size, index) => (
              <button
                key={index}
                onClick={() => handleSizeToggle(size)}
                className={`border px-2 py-1 rounded-md text-[11px] font-semibold transition ${
                  filters.sizes.includes(size)
                    ? 'bg-orange-600 text-white border-orange-600'
                    : 'border-gray-200 hover:border-orange-500 text-gray-600 bg-white'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="mb-4 border-b border-gray-100 pb-3">
        <h2 className="font-bold text-gray-800 text-sm mb-1">Max Price: ₹{maxPrice.toLocaleString()}</h2>
        <Slider 
          value={maxPrice} 
          onChange={(e, val) => setMaxPrice(val)} 
          min={0} 
          max={5000} 
          step={50} 
          sx={{
            color: "#ea580c",
            height: 4,
            '& .MuiSlider-thumb': { width: 16, height: 16, backgroundColor: '#ea580c' }
          }} 
        />
        <div className="flex justify-between text-[10px] text-gray-400 mt-1 font-medium">
          <span>₹0</span><span>₹2.5k</span><span>₹5k</span>
        </div>
      </div>
    </div>
  );

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-3"></div>
        <p className="text-gray-500 text-sm font-medium">Loading Babies Collection...</p>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      
      {/* Header Hero Banner */}
      <div className="mx-4 my-4 !shadow-3xl shadow-red-900/30 bg-[#1E2D42] bg-gradient-to-br from-[#EE971D] to-[#1E2D42] rounded-xl text-white text-center py-12 ">
        <h1 className="text-3xl md:text-4xl font-black tracking-wide"> Babies Collection</h1>
        <p className="mt-2 text-yellow-100 text-lg">Gentle & safe for your little ones</p>
      </div>
        <nav className="flex items-center gap-2 text-sm text-gray-500 mt-3 !pl-7">
          <Link to="/" className="!text-lg !no-underline !font-semibold !text-[#1E2D42] transition-colors">Home</Link>
          <span className="text-lg !font-medium">/</span>
          <span className="text-lg !font-medium text-[#E4921A]">Babies</span>
        </nav>
        <h2 className="text-2xl !font-bold !mt-3 !mb-3 !pl-7">Babies</h2>

      {/* Mobile Filter Trigger */}
      <div className="md:hidden px-4 pt-4 sticky top-16 z-20 bg-gray-50 pb-2">
        <button 
          onClick={() => setMobileFiltersOpen(true)} 
          className="flex items-center bg-white px-4 py-3 rounded-xl shadow-sm w-full justify-between border border-gray-200"
        >
          <div className="flex items-center gap-2">
            <Menu size={18} className="text-gray-700" />
            <span className="font-bold text-sm text-gray-700">Refine Products</span>
            {Object.values(filters).flat().length > 0 && (
              <span className="bg-orange-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                {Object.values(filters).flat().length}
              </span>
            )}
          </div>
          <span className="text-[10px] text-gray-400">▼</span>
        </button>
      </div>

      {/* Mobile Popup Side Drawer */}
      {mobileFiltersOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={() => setMobileFiltersOpen(false)}>
          <div className="absolute top-0 left-0 w-80 h-full bg-white overflow-y-auto p-4 flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center border-b pb-3 mb-2">
              <h2 className="font-black text-gray-800">Filter Menu</h2>
              <button onClick={() => setMobileFiltersOpen(false)} className="text-gray-500 p-1"><X size={20} /></button>
            </div>
            <FilterSidebar />
          </div>
        </div>
      )}

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto p-4 md:pt-8">
        <div className="flex gap-6 items-start">
          
          {/* Desktop Sidebar */}
          <aside className="w-72 hidden md:block sticky top-24 h-[calc(100vh-7rem)] overflow-y-auto pr-1">
            <FilterSidebar />
          </aside>

          {/* Product Grid */}
          <main className="flex-1">
            <div className="bg-white rounded-xl p-3 mb-4 border border-gray-100 flex justify-between items-center shadow-sm">
              <span className="text-xs text-gray-500 font-medium">Showing {filteredProducts.length} babies items</span>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border border-gray-200 outline-none rounded-lg px-3 py-1.5 text-xs text-gray-700 font-medium bg-gray-50 cursor-pointer">
                <option value="default">Sort by: Default</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
              </select>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-xl border p-12 text-center shadow-sm text-gray-400 font-medium text-sm">
                <div className="text-5xl mb-3"></div>
                No babies products found matching your criteria.
                <button onClick={clearAllFilters} className="text-orange-600 block text-xs font-bold mt-2 mx-auto underline">Clear Filters</button>
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

export default Babies;