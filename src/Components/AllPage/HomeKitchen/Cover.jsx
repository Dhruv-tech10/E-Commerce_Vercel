// src/component/Cover.jsx
import { useEffect, useState, useMemo } from "react";
import ProductCard from "../ProductCard";
import { loadAllProducts } from "../ProductsData";
import { Slider } from "@mui/material";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from 'react-router-dom';
// Filter Configuration Schema
const FILTER_CONFIG = {
  material: ["Cotton", "Polyester", "Linen", "Velvet", "Silk", "Jute", "Bamboo", "Microfiber", "Leather", "Suede"],
  color: ["Black", "White", "Brown", "Gray", "Beige", "Blue", "Green", "Red", "Pink", "Multicolor", "Navy", "Maroon"],
  sizes: ["Small", "Medium", "Large", "Extra Large", "3 Seater", "4 Seater", "L Shape", "Universal"],
  brands: ["Urban Ladder", "Home Centre", "IKEA", "Wakefit", "Pepperfry", "Amazon Basics", "Solimo", "Bagnam"]
};

function Cover() {
  // Main state lifecycle managers
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [sortBy, setSortBy] = useState("default");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  // Aggregate multi-checkbox criteria tracking states
  const [filters, setFilters] = useState({ material: [], color: [], sizes: [], brands: [] });
  const [openSections, setOpenSections] = useState({ material: true, color: true, sizes: false, brands: true });

  // Async inventory initialization effect load on mount
  useEffect(() => {
    loadAllProducts()
      .then(data => setProducts(data || []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  // Structural push/pull selection handler values updates
  const handleFilterToggle = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value) ? prev[key].filter((v) => v !== value) : [...prev[key], value]
    }));
  };

  // Reset controls back to systemic app environment presets
  const clearAllFilters = () => {
    setFilters({ material: [], color: [], sizes: [], brands: [] });
    setMaxPrice(5000);
    setSortBy("default");
  };

  // useMemo hook wrapper structure ensuring clean standalone rendering processes
  const filteredProducts = useMemo(() => {
    // 1. Initial category mapping classification phase matching
    let result = products.filter(p => {
      const cat = p.category?.toLowerCase() || "";
      const subCat = p.subCategory?.toLowerCase() || "";
      const name = p.name?.toLowerCase() || "";
      
      return cat === "covers" || subCat === "covers" || name.includes("cover");
    });

    // 2. Strict properties conditional checking filters verification
    result = result.filter(product => {
      if (product.offerPrice > maxPrice) return false;
      if (filters.material.length > 0 && !filters.material.includes(product.material)) return false;
      if (filters.color.length > 0 && !filters.color.includes(product.color)) return false;
      if (filters.sizes.length > 0 && !product.sizes?.some((s) => filters.sizes.includes(s))) return false;
      if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) return false;
      return true;
    });

    // 3. Sequential sorting configuration updates
    if (sortBy === "price_low") result.sort((a, b) => a.offerPrice - b.offerPrice);
    if (sortBy === "price_high") result.sort((a, b) => b.offerPrice - a.offerPrice);

    return result;
  }, [products, maxPrice, filters, sortBy]);

  // 🧱 SUB-COMPONENT: SIDEBAR COMPONENT ACCORDION ELEMENT ROW
  const AccordionSection = ({ title, sectionKey, items }) => {
    const isOpen = openSections[sectionKey];
    return (
      <div className="mb-4 border-b border-gray-100 pb-3">
        <button 
          onClick={() => setOpenSections(p => ({ ...p, [sectionKey]: !isOpen }))} 
          className="flex justify-between items-center w-full font-bold text-gray-800 text-sm mb-2 hover:text-purple-600 transition"
        >
          <span className="capitalize">{title}</span>
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        
        {isOpen && (
          <div className="grid grid-cols-1 gap-1.5 max-h-60 overflow-y-auto pr-1">
            {items.map((item, index) => (
              <label key={index} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                <input 
                  type="checkbox" 
                  checked={filters[sectionKey]?.includes(item) || false}
                  onChange={() => handleFilterToggle(sectionKey, item)} 
                  className="w-3.5 h-3.5 !mr-2 rounded border-gray-300 text-purple-600 focus:ring-purple-500" 
                />
                <span className="text-gray-600 !text-sm">{item}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    );
  };

  // 🗂️ SHARED VIEW TEMPLATE: CORE SIDEBAR PANEL ENGINE (Desktop + Mobile drawer re-use)
  const FilterSidebarContent = () => (
    <div className="bg-white p-4 rounded-xl shadow-sm space-y-4 md:sticky md:top-20">
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="font-bold text-base text-gray-800">Filters</h2>
        <button onClick={clearAllFilters} className="text-purple-600 text-xs font-semibold hover:underline">Clear All</button>
      </div>
      
      {/* Dynamic structural dictionary fields generation loop execution mapping */}
      {Object.keys(FILTER_CONFIG).map(key => (
        <AccordionSection 
          key={key} 
          title={key === "sizes" ? "Sizes" : key} 
          sectionKey={key} 
          items={FILTER_CONFIG[key]} 
        />
      ))}

      {/* Numerical price threshold processing matrix container bar slider block */}
      <div className="pt-2">
        <h2 className="font-bold text-gray-800 text-sm mb-2">Max Price: ₹{maxPrice.toLocaleString()}</h2>
        <Slider
          value={maxPrice}
          onChange={(_, val) => setMaxPrice(val)}
          min={0}
          max={10000}
          step={200}
          sx={{
            color: "#a855f7",
            height: 4,
            '& .MuiSlider-thumb': { width: 16, height: 16, backgroundColor: '#a855f7' },
            '& .MuiSlider-track': { backgroundColor: '#a855f7' },
            '& .MuiSlider-rail': { backgroundColor: '#e5e7eb' },
          }}
        />
        <div className="flex justify-between text-[10px] text-gray-400 mt-1 font-medium">
          <span>₹0</span><span>₹2.5k</span><span>₹5k</span><span>₹7.5k</span><span>₹10k+</span>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      
      {/* Jumbotron Hero Header Banner System Panel display */}
      <div className="mx-4 my-4 !shadow-3xl shadow-red-900/30 bg-[#1E2D42] bg-gradient-to-br from-[#EE971D] to-[#1E2D42] rounded-xl text-white text-center py-12 ">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Covers Collection</h1>
        <p className="mt-1.5 text-sm text-white/80">Beautiful, reliable and durable covers crafted for your home furniture and smart utilities</p>
      </div>
       <nav className="flex items-center gap-2 text-sm text-gray-500 mt-3 !pl-7">
            <Link to="/" className="!text-lg !no-underline !font-semibold !text-[#1E2D42] transition-colors">Home</Link>
            <span className="text-lg !font-medium">/</span>
            <span className="text-lg !font-medium text-[#E4921A]">Covers</span>
          </nav>
          <h2 className="text-2xl !font-bold !mt-3 !mb-3 !pl-7">Covers</h2>

      {/* Mobile Screen Trigger Responsive Filter Options Action Button */}
      <div className="md:hidden px-4 pt-4">
        <button 
          onClick={() => setMobileFiltersOpen(true)} 
          className="flex items-center bg-white px-4 py-2.5 rounded-lg shadow-sm w-full justify-between border active:bg-gray-50 transition"
        >
          <span className="font-semibold text-sm text-gray-700">Refine Products</span>
          <Menu size={18} className="text-gray-500" />
        </button>
      </div>

      {/* Slideout Mobile Responsive Overlay Drawers layout components frame */}
      {mobileFiltersOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" onClick={() => setMobileFiltersOpen(false)}>
          <div className="absolute top-0 left-0 w-80 h-full bg-white overflow-y-auto p-4 flex flex-col gap-2 shadow-2xl animate-in slide-in-from-left duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="font-bold text-lg text-gray-800">Filter Menu</h2>
              <button onClick={() => setMobileFiltersOpen(false)} className="p-1 rounded-full hover:bg-gray-100 transition"><X size={20} /></button>
            </div>
           <FilterSidebarContent />
          </div>
        </div>
      )}

      {/* Grid distribution framework framework core master display wrap engine container */}
      <div className="max-w-7xl mx-auto p-4 md:py-6">
        <div className="flex gap-6 items-start">
          
          {/* Static Desktop sidebar container panel layout display structure block */}
          <aside className="w-64 shrink-0 hidden md:block">
            <FilterSidebarContent />
          </aside>

          {/* Right Side Products Grid output processing feed */}
          <main className="flex-1">
            <div className="bg-white rounded-xl px-4 py-3 mb-4 border border-gray-100 flex justify-between items-center shadow-sm">
              <span className="text-gray-500 text-xs font-medium">
                Showing <span className="font-semibold text-gray-700">{filteredProducts.length}</span> verified premium covers
              </span>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)} 
                className="border border-gray-200 bg-gray-50 font-medium rounded-lg px-3 py-1.5 text-xs text-gray-700 outline-none focus:border-purple-500 cursor-pointer transition"
              >
                <option value="default">Sort by: Default</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
              </select>
            </div>

            {/* Render loop calculation matrix cards output display blocks elements execution mapping wrapper */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-xl border py-16 px-4 text-center shadow-sm text-gray-400 font-medium text-sm">
                <div className="text-4xl mb-2">🛋️</div>
                No products found matching your active checked preferences filter configurations.
                <button onClick={clearAllFilters} className="text-purple-600 block text-xs font-bold mt-2 mx-auto underline">Clear all active filters</button>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id || product._id} product={product} />
                ))}
              </div>
            )}
          </main>

        </div>
      </div>

    </div>
  );
}

export default Cover;