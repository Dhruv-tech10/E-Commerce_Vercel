import  { useEffect, useState, useMemo } from "react";
import ProductCard from "../ProductCard";
import { loadAllElectronicsProducts } from "../ProductsData";
import { Slider } from "@mui/material";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from 'react-router-dom';
// Config data for rendering filters dynamically
const FILTER_CONFIG = {
  brand: ["boAt", "Noise", "OnePlus", "Realme", "Sony", "JBL", "Samsung", "Apple", "Mi", "Boult", "Mivi", "Oppo", "Nothing"],
  color: ["Black", "White", "Blue", "Red", "Green", "Gray", "Silver", "Gold"],
  batteryLife: ["Up to 20hrs", "20-30hrs", "30-40hrs", "40-50hrs", "50+ hrs"],
  connectivity: ["Bluetooth 5.0", "Bluetooth 5.1", "Bluetooth 5.2", "Bluetooth 5.3"],
  features: ["ANC", "ENC", "Fast Charging", "Water Resistant", "Low Latency", "Touch Control"]
};

function AirpodBluetooth() {
  // Main Products and UI states
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [sortBy, setSortBy] = useState("default");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  // Combined active filters state
  const [filters, setFilters] = useState({ brand: [], color: [], batteryLife: [], connectivity: [], features: [] });
  // Accordion open/close toggle management state
  const [openSections, setOpenSections] = useState({ brand: true, color: true, batteryLife: false, connectivity: false, features: false });

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

  // Saare active filters ko ek click me clear/reset karne ke liye
  const clearAllFilters = () => {
    setFilters({ brand: [], color: [], batteryLife: [], connectivity: [], features: [] });
    setMaxPrice(5000);
    setSortBy("default");
  };

  // useMemo loop filters data inside optimized single loop structure 
  const filteredProducts = useMemo(() => {
    let result = products.filter(p => {
      const name = p.name?.toLowerCase() || "";
      const cat = p.category?.toLowerCase() || "";
      const subCat = p.subCategory?.toLowerCase() || "";

      // 1. Check matching category type criteria (Earbuds or TWS)
      const isEarbud = cat === "earbuds" || subCat === "bluetooth-earbuds" || name.includes("earbud") || name.includes("tws");
      if (!isEarbud) return false;

      // 2. Control slider price threshold check
      if (p.offerPrice > maxPrice) return false;

      // 3. Dynamic multi-checkbox selection verification
      if (filters.brand.length && !filters.brand.includes(p.brand)) return false;
      if (filters.color.length && !filters.color.includes(p.color)) return false;

      return true;
    });

    // Handle price sorting selections options
    if (sortBy === "price_low") result.sort((a, b) => a.offerPrice - b.offerPrice);
    if (sortBy === "price_high") result.sort((a, b) => b.offerPrice - a.offerPrice);

    return result;
  }, [products, maxPrice, filters, sortBy]);

  // Reusable sub-component individual accordion rows ke liye
  const AccordionSection = ({ title, sectionKey, items }) => {
    const isOpen = openSections[sectionKey];
    return (
      <div className="mb-4 border-b border-gray-100 pb-3">
        <button 
          onClick={() => setOpenSections(p => ({ ...p, [sectionKey]: !isOpen }))} 
          className="flex justify-between w-full font-bold text-gray-800 text-sm mb-2 hover:text-indigo-600 transition"
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
                  className="w-3.5 h-3.5 !mr-2 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" 
                />
                <span className="text-gray-600 !text-sm">{item}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Primary shared Sidebar structure layout (Desktop + Mobile drawer dono ke liye reusable)
  const FilterSidebarContent = () => (
    <div className="bg-white p-4 rounded-xl shadow-sm md:sticky md:top-20">
      <div className="flex justify-between items-center mb-4 border-b pb-3">
        <h2 className="font-bold text-lg">Filters</h2>
        <button onClick={clearAllFilters} className="text-indigo-600 text-xs hover:underline font-semibold">Clear All</button>
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

      {/* Price Slider Section block */}
      <div className="mb-4 pt-2">
        <h2 className="font-bold text-sm mb-2">Price Range</h2>
        <Slider 
          value={maxPrice} 
          onChange={(_, val) => setMaxPrice(val)} 
          min={0} 
          max={20000} 
          step={500}
          sx={{ color: "#4f46e5", height: 4, '& .MuiSlider-thumb': { width: 16, height: 16, backgroundColor: '#4f46e5' } }} 
        />
        <div className="flex justify-between mt-2 text-xs text-gray-500 font-medium">
          <span>₹0</span><span>Max: ₹{maxPrice}</span><span>₹20K+</span>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      {/* Top Main Jumbotron Hero Banner Section */}
      <div className="mx-4 my-4 !shadow-3xl shadow-red-900/30 bg-[#1E2D42] bg-gradient-to-br from-[#EE971D] to-[#1E2D42] rounded-xl text-white text-center py-12 ">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Earbuds Collection</h1>
        <p className="mt-1.5 text-sm text-white/80">True wireless earbuds for premium sound and immersive bass</p>
      </div>
<nav className="flex items-center gap-2 text-sm text-gray-500 mt-3 !pl-7">
          <Link to="/" className="!text-lg !no-underline !font-semibold !text-[#1E2D42] transition-colors">Home</Link>
          <span className="text-lg !font-medium">/</span>
          <span className="text-lg !font-medium text-[#E4921A]">Airpod Bluetooth</span>
        </nav>
        <h2 className="text-2xl !font-bold !mt-3 !mb-3 !pl-7">Airpod Bluetooth</h2>
      {/* Mobile Screen Trigger Filter Button */}
      <div className="md:hidden px-4 pt-4">
        <button onClick={() => setMobileFiltersOpen(true)} className="flex items-center bg-white px-4 py-2.5 rounded-lg shadow-sm w-full justify-between border active:bg-gray-50 transition">
          <span className="font-semibold text-sm text-gray-700">Adjust Filters</span>
          <Menu size={18} className="text-gray-500" />
        </button>
      </div>

      {/* Slideout Responsive Drawer for Mobile Screens */}
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

      {/* Main Grid Content Layout Wrapper */}
      <div className="max-w-7xl mx-auto p-4 md:py-6">
        <div className="flex gap-6 items-start">
          
          {/* Static Sidebar panel for Desktop Screens */}
          <div className="w-64 shrink-0 hidden md:block">
            <FilterSidebarContent />
          </div>

          {/* Right Side Products Panel */}
          <div className="flex-1">
            <div className="bg-white rounded-xl px-4 py-3 mb-4 flex justify-between items-center shadow-sm border border-gray-50">
              <span className="text-gray-500 text-xs font-medium">Showing {filteredProducts.length} earbuds available</span>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border border-gray-200 bg-gray-50 font-medium rounded-lg px-3 py-1.5 text-xs text-gray-700 outline-none focus:border-indigo-500 transition">
                <option value="default">Featured / Default</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
              </select>
            </div>

            {/* Grid layout for displaying Product Cards */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-xl py-16 px-4 text-center text-sm font-medium text-gray-500 border shadow-sm">
                No active matching earbuds found for the selected filters criteria.
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

export default AirpodBluetooth;