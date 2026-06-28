// src/component/Neckband.jsx
import { useEffect, useState, useMemo } from "react";
import ProductCard from "../ProductCard";
import { loadAllElectronicsProducts } from "../ProductsData";
import { Slider } from "@mui/material";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from 'react-router-dom';
// Config data for rendering filters dynamically
const FILTER_CONFIG = {
  brand: ["boAt", "Noise", "OnePlus", "Realme", "Sony", "JBL", "Samsung", "Apple", "Mi", "Boult", "Mivi", "pTron"],
  color: ["Black", "White", "Blue", "Red", "Green", "Gray", "Silver", "Gold"],
  batteryLife: ["Up to 10hrs", "10-20hrs", "20-30hrs", "30-40hrs", "40+ hrs"],
  connectivity: ["Bluetooth 5.0", "Bluetooth 5.1", "Bluetooth 5.2", "Bluetooth 5.3"],
};

function NeckbandBluetooth() {
  // Main Products and UI states
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maxPrice, setMaxPrice] = useState(3000);
  const [sortBy, setSortBy] = useState("default");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  // Combined active filters state
  const [filters, setFilters] = useState({ brand: [], color: [], batteryLife: [], connectivity: [] });
  // Accordion open/close toggle management state
  const [openSections, setOpenSections] = useState({ brand: true, color: true, batteryLife: false, connectivity: false });

  // Component mount par data fetch karne ke liye
  useEffect(() => {
    loadAllElectronicsProducts()
      .then(data => setProducts(data || []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  // Filter selection toggle handler (Add/Remove array items)
  const handleFilterToggle = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value) ? prev[key].filter(v => v !== value) : [...prev[key], value]
    }));
  };

  // Saare active filters ko reset karne ke liye
  const clearAllFilters = () => {
    setFilters({ brand: [], color: [], batteryLife: [], connectivity: [] });
    setMaxPrice(3000);
    setSortBy("default");
  };

  // useMemo loop filters data inside optimized single loop structure 
  const filteredProducts = useMemo(() => {
    let result = products.filter(p => {
      const name = p.name?.toLowerCase() || "";
      const cat = p.category?.toLowerCase() || "";
      const subCat = p.subCategory?.toLowerCase() || "";

      // 1. Check matching category type criteria
      const isNeckband = cat === "neckband" || subCat === "neckband" || name.includes("neckband");
      if (!isNeckband) return false;

      // 2. Control slider price threshold check
      if (p.offerPrice > maxPrice) return false;

      // 3. Dynamic multi-checkbox logic selection verification
      if (filters.brand.length && !filters.brand.includes(p.brand)) return false;
      if (filters.color.length && !filters.color.includes(p.color)) return false;

      return true;
    });

    // Handle price sorting selections arrays options
    if (sortBy === "price_low") result.sort((a, b) => a.offerPrice - b.offerPrice);
    if (sortBy === "price_high") result.sort((a, b) => b.offerPrice - a.offerPrice);

    return result;
  }, [products, maxPrice, filters, sortBy]);

  // Reusable sub-component inside file for individual accordion items row rendering
  const AccordionSection = ({ title, sectionKey, items }) => {
    const isOpen = openSections[sectionKey];
    return (
      <div className="mb-4 border-b border-gray-100 pb-3">
        <button 
          onClick={() => setOpenSections(p => ({ ...p, [sectionKey]: !isOpen }))} 
          className="flex justify-between w-full font-bold text-gray-800 text-sm mb-2 hover:text-blue-600 transition"
        >
          <span>{title}</span>
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {isOpen && (
        <div className="grid grid-cols-1 gap-1.5 max-h-60 overflow-y-auto pr-1">
            {items.map((item, idx) => (
              <label key={idx} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                <input 
                  type="checkbox" 
                  checked={filters[sectionKey]?.includes(item) || false} 
                  onChange={() => handleFilterToggle(sectionKey, item)} 
                  className="w-3.5 h-3.5 !mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                />
                <span className="text-gray-600 !text-sm">{item}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Primary shared Sidebar structure layout for parameters selections handling block 
  const FilterSidebarContent = () => (
    <div className="bg-white p-4 rounded-xl shadow-sm md:sticky md:top-20">
      <div className="flex justify-between items-center mb-4 border-b pb-3">
        <h2 className="font-bold text-lg">Filters</h2>
        <button onClick={clearAllFilters} className="text-blue-600 text-xs hover:underline font-semibold">Clear All</button>
      </div>
      
      {/* Dynamic Mapping over Config Keys */}
      {Object.keys(FILTER_CONFIG).map(key => (
        <AccordionSection 
          key={key} 
          title={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')} 
          sectionKey={key} 
          items={FILTER_CONFIG[key]} 
        />
      ))}

      {/* Price Slider Section block controls range settings parameters */}
      <div className="mb-4 pt-2">
        <h2 className="font-bold text-sm mb-2">Price Range</h2>
        <Slider 
          value={maxPrice} 
          onChange={(_, val) => setMaxPrice(val)} 
          min={0} 
          max={10000} 
          step={200}
          sx={{ color: "#2563eb", height: 4, '& .MuiSlider-thumb': { width: 16, height: 16, backgroundColor: '#2563eb' } }} 
        />
        <div className="flex justify-between mt-2 text-xs text-gray-500 font-medium">
          <span>₹0</span><span>Max: ₹{maxPrice}</span><span>₹10K+</span>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      {/* Top Main Jumbotron Hero Banner Strip Section header panel details */}
      <div className="mx-4 my-4 !shadow-3xl shadow-red-900/30 bg-[#1E2D42] bg-gradient-to-br from-[#EE971D] to-[#1E2D42] rounded-xl text-white text-center py-12 ">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Neckband Collection</h1>
        <p className="mt-1.5 text-sm text-white/80">Premium wireless neckbands engineered for immersive acoustics</p>
      </div>
<nav className="flex items-center gap-2 text-sm text-gray-500 mt-3 !pl-7">
          <Link to="/" className="!text-lg !no-underline !font-semibold !text-[#1E2D42] transition-colors">Home</Link>
          <span className="text-lg !font-medium">/</span>
          <span className="text-lg !font-medium text-[#E4921A]">Neckband Bluetooth</span>
        </nav>
        <h2 className="text-2xl !font-bold !mt-3 !mb-3 !pl-7">Neckband Bluetooth</h2>
      {/* Mobile Screen Trigger filters action drawer layout button togglers panel links setup element */}
      <div className="md:hidden px-4 pt-4">
        <button onClick={() => setMobileFiltersOpen(true)} className="flex items-center bg-white px-4 py-2.5 rounded-lg shadow-sm w-full justify-between border active:bg-gray-50 transition">
          <span className="font-semibold text-sm text-gray-700">Adjust Filters</span>
          <Menu size={18} className="text-gray-500" />
        </button>
      </div>

      {/* Slideout Responsive Drawer Block elements layer layout view for handling layout parameters configurations screen checks */}
      {mobileFiltersOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" onClick={() => setMobileFiltersOpen(false)}>
          <div className="absolute top-0 left-0 w-80 h-full bg-white overflow-y-auto p-4 flex flex-col gap-2 shadow-2xl animate-in slide-in-from-left duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center pb-2 border-b">
              <h2 className="font-bold text-lg text-gray-800">Refine Products</h2>
              <button className="p-1 rounded-full hover:bg-gray-100 transition" onClick={() => setMobileFiltersOpen(false)}><X size={20} /></button>
            </div>
            <FilterSidebarContent />
          </div>
        </div>
      )}

      {/* Main App Content Body Blocks elements rendering layout architecture structure wraps mapping display logic items grids lists boxes */}
      <div className="max-w-7xl mx-auto p-4 md:py-6">
        <div className="flex gap-6 items-start">
          
          {/* Static Sidebar Grid Columns Block display items panels filters settings views check desktop responsive displays grids frames rules */}
          <div className="w-64 shrink-0 hidden md:block">
            <FilterSidebarContent />
          </div>

          {/* Main List Layout Products Container cards views grid structures element frameworks block controls tracking grids wraps rows lists maps logic execution layout layer settings */}
          <div className="flex-1">
            <div className="bg-white rounded-xl px-4 py-3 mb-4 flex justify-between items-center shadow-sm border border-gray-50">
              <span className="text-gray-500 text-xs font-medium">Showing {filteredProducts.length} items available</span>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border border-gray-200 bg-gray-50 font-medium rounded-lg px-3 py-1.5 text-xs text-gray-700 outline-none focus:border-blue-500 transition">
                <option value="default">Featured / Default</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
              </select>
            </div>

            {/* Grid listings cards rows matching items data validation lists sets conditions blocks views check frame items rendering blocks details setup layers */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-xl py-16 px-4 text-center text-sm font-medium text-gray-500 border shadow-sm">
                No active matching neckband items configurations matched your current options criteria settings setup filters selection.
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map(p => <ProductCard key={p.id || p._id} product={p} />)}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default NeckbandBluetooth;