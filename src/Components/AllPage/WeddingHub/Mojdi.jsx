// src/component/Mojdi.jsx
import  { useEffect, useState, useMemo } from "react";
import ProductCard from "../ProductCard";
import { loadAllProducts } from "../ProductsData";
import { Slider } from "@mui/material";
import {  X, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from 'react-router-dom';
// Filter Configuration Schema: Sidebar filters lists ko dynamically paint karne ke liye data state
const FILTER_CONFIG = {
  color: ["Maroon", "Red", "Gold", "Brown", "Black", "Beige", "Cream", "White", "Navy Blue", "Green", "Burgundy", "Multicolor"],
  material: ["Leather", "Fabric", "Silk", "Velvet", "Suede", "Artificial Leather", "Jute", "Cotton", "Broken Silk", "Raw Silk"],
  type: ["Mojdi", "Jutti", "Khussa", "Punjabi Jutti", "Mojari", "Wedding Mojdi", "Designer Mojdi", "Handcrafted Mojdi", "Embroidered Mojdi", "Plain Mojdi"],
  size: ["5", "6", "7", "8", "9", "10", "11", "12", "13", "Custom Size"],
  workType: ["Embroidery", "Zari Work", "Resham Work", "Sequin Work", "Stone Work", "Mirror Work", "Kundan Work", "Beads Work", "Plain", "Printed"],
  occasion: ["Wedding", "Engagement", "Reception", "Sangeet", "Haldi", "Mehendi", "Party Wear", "Festival", "Casual"],
  brand: ["Kashmir Box", "Neerja Exports", "Fizzy Goblet", "Swadeshi Click", "Craft Maestros", "Indian Utopia", "Khaadi", "Mirraw", "Manyavar", "Raymond"]
};

function Mojdi() {
  // --- STATES LIFE CYCLE MANAGEMENT ---
  const [products, setProducts] = useState([]);               // API se fetch kiya hua primary product data inventory store
  const [loading, setLoading] = useState(true);                 // Loading layer spinner active/inactive state handler
  const [maxPrice, setMaxPrice] = useState(15000);             // Max slider capacity default limit filter cap
  const [sortBy, setSortBy] = useState("default");             // Sorting logic routing status configurations
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false); // Mobile response view drawer navigation visibility switcher

  // Multiple parameters multi-select checking indicators mapping storage setup
  const [filters, setFilters] = useState({ color: [], material: [], type: [], size: [], workType: [], occasion: [], brand: [] });
  // Accordion parameters group collapse details pointers tracking configurations state
  const [openSections, setOpenSections] = useState({ color: true, material: true, type: true, size: false, workType: false, occasion: false, brand: false });

  // --- INITIAL DATA ASYNC FETCH TRIGGER (useEffect) ---
  useEffect(() => {
    loadAllProducts()
      .then(data => setProducts(data || [])) // Successfully processed arrays matrix allocation target
      .catch(() => setProducts([]))          // Error tracking fallbacks mechanism rules layer
      .finally(() => setLoading(false));     // Component structural rendering processing loader status reset
  }, []);

  // --- COMPONENT EVENT LIFECYCLE HANDLERS FUNCTION CONTROLS ---
  
  // Collapse system menus tracking controller layout lists variables updates runtime execution
  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };
  
  // Dynamic item checkbox configurations value tracking controller parameters block elements routing
  const handleFilterToggle = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value) ? prev[key].filter(v => v !== value) : [...prev[key], value]
    }));
  };
  
  // Filter variables engine values clean resetting tracking parameters trigger methods control
  const clearAllFilters = () => {
    setFilters({ color: [], material: [], type: [], size: [], workType: [], occasion: [], brand: [] });
    setMaxPrice(15000);
    setSortBy("default");
  };

  // --- ENGINE COMPUTATION CACHING ARCHITECTURE PIPELINE (useMemo Optimization) ---
  // Unwanted code recalculations and render delays control metrics parameter blocks dependencies updates validation checking
  const filteredProducts = useMemo(() => {
    
    // Step 1: Matching criteria verification category mapping targets pipeline strings extraction
    let result = products.filter(p => {
      const category = p.category?.toLowerCase() || "";
      const subCategory = p.subCategory?.toLowerCase() || "";
      const name = p.name?.toLowerCase() || "";

      return category === "mojdi" || category === "jutti" || category === "khussa" || 
             subCategory === "mojdi" || name.includes("mojdi") || name.includes("jutti") || 
             name.includes("khussa") || name.includes("mojari");
    });

    // Step 2: Selected configuration constraints checking elements logic loop evaluations validation
    result = result.filter(product => {
      if (product.offerPrice > maxPrice) return false;
      if (filters.color.length > 0 && !filters.color.includes(product.color)) return false;
      if (filters.material.length > 0 && !filters.material.includes(product.material)) return false;
      if (filters.type.length > 0 && !filters.type.includes(product.type)) return false;
      if (filters.size.length > 0 && !filters.size.includes(product.size)) return false;
      if (filters.workType.length > 0 && !filters.workType.includes(product.workType)) return false;
      if (filters.occasion.length > 0 && !filters.occasion.includes(product.occasion)) return false;
      if (filters.brand.length > 0 && !filters.brand.includes(product.brand)) return false;
      return true;
    });

    // Step 3: Array structural order routing sequences transformations operations execution methods parameters
    if (sortBy === "price_low") result.sort((a, b) => a.offerPrice - b.offerPrice);
    if (sortBy === "price_high") result.sort((a, b) => b.offerPrice - a.offerPrice);
    if (sortBy === "name_asc") result.sort((a, b) => a.name?.localeCompare(b.name));
    if (sortBy === "name_desc") result.sort((a, b) => b.name?.localeCompare(a.name));

    return result;
  }, [products, maxPrice, filters, sortBy]);

  // --- 🧱 STRUCTURAL ISOLATED UI SUB-MODULES SYSTEMS ---

  // 1. Dynamic Accordion Panel Drawer Element layouts execution row views parameters allocation
  const AccordionSection = ({ title, sectionKey, items }) => {
    const isOpen = openSections[sectionKey];
    return (
      <div className="mb-4 border-b border-gray-100 pb-3">
        <button onClick={() => toggleSection(sectionKey)} className="flex justify-between items-center w-full font-bold text-gray-800 text-sm mb-2 hover:text-red-600 transition-colors">
          <span className="capitalize">{title === "workType" ? "Work Type" : title}</span>
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
                  className="w-3.5 h-3.5 !mr-2 rounded border-gray-300 text-red-600 focus:ring-red-500" 
                />
                <span className="text-gray-600 !text-sm">{item}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    );
  };

  // 2. Multi-tier Dashboard filters layout panel interface structure housing container configuration blocks mapping
  const FilterSidebarContent = () => (
    <div className="bg-white p-4 rounded-xl shadow-sm space-y-4">
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="font-bold text-base text-gray-800">Filters</h2>
        <button onClick={clearAllFilters} className="text-red-600 text-xs font-semibold hover:underline">Clear All</button>
      </div>

      {/* Programmatic rendering loop across variables configurations index schema map */}
      {Object.keys(FILTER_CONFIG).map(key => (
        <AccordionSection 
          key={key} 
          title={key} 
          sectionKey={key} 
          items={FILTER_CONFIG[key]} 
        />
      ))}

      {/* Numerical ranges pricing parameters configuration tracker interface slider layout structure */}
      <div className="pt-2">
        <h2 className="font-bold text-gray-800 text-sm mb-2">Max Price: ₹{maxPrice.toLocaleString()}</h2>
        <Slider 
          value={maxPrice} 
          onChange={(_, val) => setMaxPrice(val)} 
          min={0} 
          max={15000} 
          step={200}
          sx={{ 
            color: "#dc2626", 
            height: 4, 
            '& .MuiSlider-thumb': { width: 16, height: 16, backgroundColor: '#dc2626' },
            '& .MuiSlider-track': { backgroundColor: '#dc2626' },
            '& .MuiSlider-rail': { backgroundColor: '#e5e7eb' }
          }} 
        />
        <div className="flex justify-between text-[10px] text-gray-400 mt-1 font-medium">
          <span>₹0</span><span>₹3.5k</span><span>₹7k</span><span>₹11k</span><span>₹15k+</span>
        </div>
      </div>
    </div>
  );

  // Buffer dynamic layout runtime engine trigger execution fallback interceptor
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-600"></div>
      </div>
    );
  }

  // --- CORE VIEW LAYOUT RENDERING COMPONENT INTERFACE SYSTEM HOUSING FRAME ---
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      
      {/* 🔴 ETHNIC DESIGN HOUSING JUMBOTRON GRAPHICS BANNER DETAILS STRUCTURE */}
      <div className="mx-4 my-4 !shadow-3xl shadow-red-900/30 bg-[#1E2D42] bg-gradient-to-br from-[#EE971D] to-[#1E2D42] rounded-xl text-white text-center py-12 ">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Royal Mojdi & Jutti Collection</h1>
        <p className="mt-1.5 text-sm text-white/80">Premium handcrafted wedding footwears, Punjabi Juttis and traditional sherwani shoes for grooms</p>
      </div>

        <nav className="flex items-center gap-2 text-sm text-gray-500 mt-3 !pl-7">
          <Link to="/" className="!text-lg !no-underline !font-semibold !text-[#1E2D42] transition-colors">Home</Link>
          <span className="text-lg !font-medium">/</span>
          <span className="text-lg !font-medium text-[#E4921A]">Mojdi</span>
        </nav>
        <h2 className="text-2xl !font-bold !mt-3 !mb-3 !pl-7">Mojdi</h2>

      {/* 📱 ADAPTIVE MOBILE SCREEN CONTROLS ACTION MENU BUTTON LAYOUT ELEMENT RIGID */}
      <div className="md:hidden px-4 pt-4">
        <button 
          onClick={() => setMobileFiltersOpen(true)} 
          className="flex items-center bg-white px-4 py-2.5 rounded-lg shadow-sm w-full justify-between border active:bg-gray-50 transition border-gray-200"
        >
          <span className="font-semibold text-sm text-gray-700">Refine Footwear</span>
          <span className="text-xs font-bold text-white bg-red-600 px-2 py-0.5 rounded-full">
            {Object.values(filters).flat().length} active
          </span>
        </button>
      </div>

      {/* 📱 PORTABLE DEVICE LAYOUT OVERLAYS CONTROLLER ACTION BLOCKS ELEMENT SELECTION DRAWER */}
      {mobileFiltersOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" onClick={() => setMobileFiltersOpen(false)}>
          <div className="absolute top-0 left-0 w-80 h-full bg-white overflow-y-auto p-4 flex flex-col gap-2 shadow-2xl animate-in slide-in-from-left duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="font-bold text-lg text-gray-800">Filter Menu</h2>
              <button onClick={() => setMobileFiltersOpen(false)} className="p-1 rounded-full hover:bg-gray-100 transition"><X size={20} /></button>
            </div>
            <FilterSidebarContent />
            <div className="sticky bottom-0 bg-white pt-4 pb-2 mt-auto border-t">
              <button onClick={() => setMobileFiltersOpen(false)} className="w-full bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg font-semibold shadow transition-colors">
                Apply Shoe Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 💻 CENTRAL COLUMNS DISTRIBUTION WRAP HOUSING CONTAINER PANELS SCHEMES GRIDS FRAMES */}
      <div className="max-w-7xl mx-auto p-4 md:py-6">
        <div className="flex gap-6 items-start">
          
          {/* PERMANENT SIDEBAR CONTAINER MATRIX PANEL COMPONENT BLOCK DISPLAY - DESKTOP VIEW */}
          <aside className="w-64 shrink-0 hidden md:block md:sticky md:top-20">
            <FilterSidebarContent />
          </aside>
          
          {/* DISPLAY FEEDS COMPONENT LAYER ENGINE DESIGN GRID COLUMN EXECUTION SYSTEMS */}
          <main className="flex-1">
            
            {/* Context control parameters status reporting element summary toolbar container panel layouts */}
            <div className="bg-white rounded-xl px-4 py-3 mb-4 border border-gray-100 flex justify-between items-center shadow-sm flex-wrap gap-2">
              <span className="text-gray-500 text-xs font-medium">
                Showing <span className="font-semibold text-gray-700">{filteredProducts.length}</span> curated traditional footwears
              </span>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)} 
                className="border border-gray-200 bg-gray-50 font-medium rounded-lg px-3 py-1.5 text-xs text-gray-700 outline-none focus:border-red-500 cursor-pointer transition-colors"
              >
                <option value="default">Sort by: Default</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="name_asc">Name: A to Z</option>
                <option value="name_desc">Name: Z to A</option>
              </select>
            </div>
            
            {/* Dynamic content checker validation fallback arrays looping matching conditional matrix frames */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-100 py-16 px-4 text-center shadow-sm text-gray-400 font-medium text-sm">
                <div className="text-4xl mb-2"></div>
                <h3 className="text-lg font-bold text-gray-700 mb-1">No Footwear Found</h3>
                <p className="text-gray-500 text-xs mb-3">Try altering some checked parameter combinations configuration options variables setup.</p>
                <button onClick={clearAllFilters} className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 text-xs font-semibold rounded-lg shadow transition-colors">
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

export default Mojdi;