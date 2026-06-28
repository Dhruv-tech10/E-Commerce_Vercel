// src/component/HandBag.jsx
import { useEffect, useState, useMemo } from "react";
import ProductCard from "../ProductCard";
import { loadAllProducts } from "../ProductsData";
import { Slider } from "@mui/material";
import {  X, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from 'react-router-dom';
// Filter Configuration Schema: Bags and clutches sidebar UI items arrays render karne ki mapping configuration catalog
const FILTER_CONFIG = {
  color: ["Red", "Maroon", "Gold", "Rose Gold", "Pink", "Peach", "Burgundy", "Brown", "Black", "White", "Cream", "Beige", "Blue", "Green", "Purple", "Multicolor"],
  material: ["Leather", "Suede", "Velvet", "Silk", "Satin", "Fabric", "Jute", "Beaded", "Embroidered", "Canvas", "Patent Leather", "Faux Leather"],
  type: ["Potta", "Clutch", "Handbag", "Sling Bag", "Tote Bag", "Wedding Purse", "Bridal Bag", "Evening Bag", "Shoulder Bag", "Box Clutch", "Envelope Clutch", "Potli Bag", "Beaded Bag"],
  closureType: ["Magnetic", "Zipper", "Drawstring", "Flap", "Push Lock", "Turn Lock", "Button", "Hook & Eye"],
  size: ["Small", "Medium", "Large", "Mini", "Extra Large"],
  occasion: ["Wedding", "Engagement", "Reception", "Sangeet", "Mehendi", "Haldi", "Party Wear", "Cocktail", "Formal", "Casual"],
  workType: ["Embroidery", "Zari Work", "Sequin Work", "Stone Work", "Beads Work", "Mirror Work", "Kundan Work", "Pearl Work", "Plain", "Printed", "Patch Work", "Thread Work"],
  brand: ["Lavie", "Caprese", "Baggit", "Hidesign", "Allen Solly", "Da Milano", "Miraggio", "Zouk", "DressBerry", "Safari", "Wildcraft", "Nykaa Fashion"]
};

function HandBag() {
  // --- APPLICATION STATE HOOKS LIFECYCLE ---
  const [products, setProducts] = useState([]);               // Raw accessories items list buffer storage state tracking
  const [loading, setLoading] = useState(true);                 // Loading spinner component layout control tracking visibility
  const [maxPrice, setMaxPrice] = useState(15000);             // Price boundaries limits indicator cap track state sliders
  const [sortBy, setSortBy] = useState("default");             // Sort orders configuration routing index trackers string
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false); // Mobile sidebar drawer canvas toggle indicator trigger

  // Central active active selections map hooks filters state manager
  const [filters, setFilters] = useState({ color: [], material: [], type: [], closureType: [], size: [], occasion: [], workType: [], brand: [] });
  // Dynamic structural dropdown panel collapsed flag mapping configurations index dictionary
  const [openSections, setOpenSections] = useState({ color: true, material: true, type: true, closureType: false, size: false, occasion: false, workType: false, brand: false });

  // --- ASYNC API LIFECYCLE DISPATCH MOUNT (useEffect) ---
  useEffect(() => {
    loadAllProducts()
      .then(data => setProducts(data || [])) // Safely matching data response structures array distributions checking
      .catch(() => setProducts([]))          // Network fault execution crash control fallback error handler
      .finally(() => setLoading(false));     // Terminate viewport progress spinner visible flag indices tracking
  }, []);

  // --- ACTION BUTTON CLICK SYSTEM EVENT METHODS ---
  
  // Dynamic sidebar accordion groups open/close visibility control tracking
  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };
  
  // Multi-tier push and pull check values array selection updates controller routing system
  const handleFilterToggle = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value) ? prev[key].filter(v => v !== value) : [...prev[key], value]
    }));
  };
  
  // Resets central parameters variables memory mapping states back to standard layout settings
  const clearAllFilters = () => {
    setFilters({ color: [], material: [], type: [], closureType: [], size: [], occasion: [], workType: [], brand: [] });
    setMaxPrice(15000);
    setSortBy("default");
  };

  // --- PERFORMANCE COMPUTATION CACHE PIPELINE ENGINE (useMemo Architecture) ---
  // Preventing unnecessary calculations and lists reconstructions on unrelated inputs updates mutations
  const filteredProducts = useMemo(() => {
    
    // Step 1: Initial filtering by keywords match parameters metrics analysis logic matching layers
    let result = products.filter(p => {
      const category = p.category?.toLowerCase() || "";
      const subCategory = p.subCategory?.toLowerCase() || "";
      const name = p.name?.toLowerCase() || "";

      return category === "handbag" || category === "hand bag" || category === "potli" || category === "clutch" || 
             subCategory === "hand-bag" || 
             name.includes("handbag") || name.includes("potli") || name.includes("clutch") || 
             (name.includes("bridal") && name.includes("bag"));
    });

    // Step 2: Loop evaluate conditions configurations parameter matching checking arrays routine layers
    result = result.filter(product => {
      if (product.offerPrice > maxPrice) return false;
      if (filters.color.length > 0 && !filters.color.includes(product.color)) return false;
      if (filters.material.length > 0 && !filters.material.includes(product.material)) return false;
      if (filters.type.length > 0 && !filters.type.includes(product.type)) return false;
      if (filters.closureType.length > 0 && !filters.closureType.includes(product.closureType)) return false;
      if (filters.size.length > 0 && !filters.size.includes(product.size)) return false;
      if (filters.occasion.length > 0 && !filters.occasion.includes(product.occasion)) return false;
      if (filters.workType.length > 0 && !filters.workType.includes(product.workType)) return false;
      if (filters.brand.length > 0 && !filters.brand.includes(product.brand)) return false;
      return true;
    });

    // Step 3: Arrays items sorting layout index orders adjustments sequences redirection maps
    if (sortBy === "price_low") result.sort((a, b) => a.offerPrice - b.offerPrice);
    if (sortBy === "price_high") result.sort((a, b) => b.offerPrice - a.offerPrice);
    if (sortBy === "name_asc") result.sort((a, b) => a.name?.localeCompare(b.name));
    if (sortBy === "name_desc") result.sort((a, b) => b.name?.localeCompare(a.name));

    return result;
  }, [products, maxPrice, filters, sortBy]);

  // --- 🧱 ISOLATED DESIGN TEMPLATE SUB-COMPONENTS ROUTINES ---

  // 1. Structural Accordion Row layouts rendering logic process design allocations slots
  const AccordionSection = ({ title, sectionKey, items }) => {
    const isOpen = openSections[sectionKey];
    return (
      <div className="mb-4 border-b border-gray-100 pb-3">
        <button onClick={() => toggleSection(sectionKey)} className="flex justify-between items-center w-full font-bold text-gray-800 text-sm mb-2 hover:text-pink-600 transition-colors">
          <span className="capitalize">{title === "closureType" ? "Closure Type" : title === "workType" ? "Work Type" : title}</span>
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {isOpen && (
        <div className="grid grid-cols-1 gap-1.5 max-h-60 overflow-y-auto pr-1">
            {items.map((item, index) => (
              <label key={index} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded transition-colors">
                <input 
                  type="checkbox" 
                  checked={filters[sectionKey]?.includes(item) || false} 
                  onChange={() => handleFilterToggle(sectionKey, item)} 
                  className="w-3.5 h-3.5 !mr-2 rounded border-gray-300 text-pink-600 focus:ring-pink-500" 
                />
                <span className="text-gray-600 !text-sm">{item}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    );
  };

  // 2. Main Filters Container Sidebar layout configuration interface design view dashboards
  const FilterSidebarContent = () => (
    <div className="bg-white p-4 rounded-xl shadow-sm space-y-4">
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="font-bold text-base text-gray-800">Filters</h2>
        <button onClick={clearAllFilters} className="text-pink-600 text-xs font-semibold hover:underline">Clear All</button>
      </div>

      {/* Programmatic loop across schema properties fields mapping items collections */}
      {Object.keys(FILTER_CONFIG).map(key => (
        <AccordionSection 
          key={key} 
          title={key} 
          sectionKey={key} 
          items={FILTER_CONFIG[key]} 
        />
      ))}

      {/* Currency price slider numerical value track selection interface scales */}
      <div className="pt-2">
        <h2 className="font-bold text-gray-800 text-sm mb-2">Max Price: ₹{maxPrice.toLocaleString()}</h2>
        <Slider 
          value={maxPrice} 
          onChange={(_, val) => setMaxPrice(val)} 
          min={0} 
          max={15000} 
          step={200}
          sx={{ 
            color: "#db2777", 
            height: 4, 
            '& .MuiSlider-thumb': { width: 16, height: 16, backgroundColor: '#db2777' },
            '& .MuiSlider-track': { backgroundColor: '#db2777' },
            '& .MuiSlider-rail': { backgroundColor: '#e5e7eb' }
          }} 
        />
        <div className="flex justify-between text-[10px] text-gray-400 mt-1 font-medium">
          <span>₹0</span><span>₹3.5k</span><span>₹7k</span><span>₹11k</span><span>₹15k+</span>
        </div>
      </div>
    </div>
  );

  // Runtime structural lifecycle buffering block intercept component screen
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  // --- CORE VIEW LAYOUT GRID DISPLAY INTERFACE INTERACTIVE MODULE ---
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      
      {/* 🌸 LUXURY WEDDING ETHNIC BRIDAL CLUTCHES BAGS GRAPHICS HEADER JUMBOTRON PANEL SECTION */}
      <div className="mx-4 my-4 !shadow-3xl shadow-red-900/30 bg-[#1E2D42] bg-gradient-to-br from-[#EE971D] to-[#1E2D42] rounded-xl text-white text-center py-12 ">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Bridal Bags & Potli Boutique</h1>
        <p className="mt-1.5 text-sm text-white/80">Explore luxury wedding purses, designer box clutches, embroidered potlis and evening slings</p>
      </div>
  <nav className="flex items-center gap-2 text-sm text-gray-500 mt-3 !pl-7">
          <Link to="/" className="!text-lg !no-underline !font-semibold !text-[#1E2D42] transition-colors">Home</Link>
          <span className="text-lg !font-medium">/</span>
          <span className="text-lg !font-medium text-[#E4921A]">Handbags</span>
        </nav>
        <h2 className="text-2xl !font-bold !mt-3 !mb-3 !pl-7">Handbags</h2>
      {/* 📱 PORTABLE SMARTPHONE ADAPTIVE EXPANSION FILTER ACCORDION POPUP TOGGLE OVERLAYS */}
      <div className="md:hidden px-4 pt-4">
        <button 
          onClick={() => setMobileFiltersOpen(true)} 
          className="flex items-center bg-white px-4 py-2.5 rounded-lg shadow-sm w-full justify-between border active:bg-gray-50 transition border-gray-200"
        >
          <span className="font-semibold text-sm text-gray-700">Refine Handbags</span>
          <span className="text-xs font-bold text-white bg-pink-600 px-2 py-0.5 rounded-full">
            {Object.values(filters).flat().length} active
          </span>
        </button>
      </div>

      {/* 📱 MOBILE SCREEN CONTROL CANVAS SLIDING VIEW SIDEBAR ROUTINE IMPLEMENTATION */}
      {mobileFiltersOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" onClick={() => setMobileFiltersOpen(false)}>
          <div className="absolute top-0 left-0 w-80 h-full bg-white overflow-y-auto p-4 flex flex-col gap-2 shadow-2xl animate-in slide-in-from-left duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="font-bold text-lg text-gray-800">Filter Accessories</h2>
              <button onClick={() => setMobileFiltersOpen(false)} className="p-1 rounded-full hover:bg-gray-100 transition"><X size={20} /></button>
            </div>
            <FilterSidebarContent />
            <div className="sticky bottom-0 bg-white pt-4 pb-2 mt-auto border-t">
              <button onClick={() => setMobileFiltersOpen(false)} className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2.5 rounded-lg font-semibold shadow transition-colors">
                Apply Bags Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 💻 MAIN APPARATUS TWO COLUMN ARCHITECTURE WRAPPER FRAME FOR RUNTIME ITEMS DISPLAY */}
      <div className="max-w-7xl mx-auto p-4 md:py-6">
        <div className="flex gap-6 items-start">
          
          {/* STATIC SIDEBAR MATRIX HOUSING BOX VIEW FOR LAPTOP/DESKTOP SCREENS VIEWPORTS */}
          <aside className="w-64 shrink-0 hidden md:block md:sticky md:top-20">
            <FilterSidebarContent />
          </aside>
          
          {/* CORE PRODUCT RENDERING ENGINE SYSTEM - Renders matching items database loop nodes */}
          <main className="flex-1">
            
            {/* Context metrics report configurations bars interface design blocks */}
            <div className="bg-white rounded-xl px-4 py-3 mb-4 border border-gray-100 flex justify-between items-center shadow-sm flex-wrap gap-2">
              <span className="text-gray-500 text-xs font-medium">
                Showing <span className="font-semibold text-gray-700">{filteredProducts.length}</span> luxury premium bags and purses
              </span>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)} 
                className="border border-gray-200 bg-gray-50 font-medium rounded-lg px-3 py-1.5 text-xs text-gray-700 outline-none focus:border-pink-500 cursor-pointer transition-colors"
              >
                <option value="default">Sort by: Default</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="name_asc">Name: A to Z</option>
                <option value="name_desc">Name: Z to A</option>
              </select>
            </div>
            
            {/* Fallback conditional validation component logic blocks handling empty sets collections */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-100 py-16 px-4 text-center shadow-sm text-gray-400 font-medium text-sm">
                <div className="text-4xl mb-2">👛</div>
                <h3 className="text-lg font-bold text-gray-700 mb-1">No Handbags Found</h3>
                <p className="text-gray-500 text-xs mb-3">Try checking some alternative combination paths variables values settings options.</p>
                <button onClick={clearAllFilters} className="bg-pink-600 hover:bg-pink-700 text-white px-5 py-2 text-xs font-semibold rounded-lg shadow transition-colors">
                  Reset Current Filters
                </button>
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

export default HandBag;