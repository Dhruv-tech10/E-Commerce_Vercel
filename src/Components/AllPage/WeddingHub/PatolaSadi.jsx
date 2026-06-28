// src/component/PatolaSadi.jsx
import { useEffect, useState, useMemo } from "react";
import ProductCard from "../ProductCard";
import { loadAllProducts } from "../ProductsData";
import { Slider } from "@mui/material";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from 'react-router-dom';
// Filter Configuration Schema: Heritage Patola sarees and double ikat weaves sidebar panel elements datasets mapping
const FILTER_CONFIG = {
  color: ["Red", "Maroon", "Burgundy", "Pink", "Orange", "Yellow", "Gold", "Green", "Teal", "Blue", "Navy Blue", "Purple", "Brown", "Black", "White", "Cream", "Beige", "Multicolor"],
  fabric: ["Patola Silk", "Pure Patola", "Banarasi Silk", "Kanjeevaram Silk", "Raw Silk", "Georgette", "Art Silk", "Satin Silk", "Tussar Silk", "Muga Silk", "Paithani Silk"],
  type: ["Patola Saree", "Pure Patola", "Designer Patola", "Wedding Saree", "Bridal Saree", "Traditional Patola", "Gujarati Patola", "Rajkot Patola", "Patan Patola", "Silk Patola", "Printed Patola"],
  size: ["Free Size", "Standard", "Custom Size", "Unstitched", "Pre-Stitched"],
  workType: ["Double Ikat", "Single Ikat", "Zari Work", "Embroidery", "Woven Design", "Traditional Motifs", "Elephant Motif", "Flower Motif", "Geometric Pattern", "Bandhani Work", "Tie & Dye"],
  occasion: ["Wedding", "Engagement", "Reception", "Sangeet", "Mehendi", "Haldi", "Party Wear", "Festival", "Diwali", "Navratri", "Family Function", "Pooja"],
  sareeLength: ["5.5 Meters", "6 Meters", "6.5 Meters", "7 Meters", "8 Meters", "9 Meters"],
  blouseType: ["Ready Made Blouse", "Unstitched Blouse", "Designer Blouse", "Contrast Blouse", "Zari Blouse", "Embroidered Blouse", "Plain Blouse"],
  brand: ["Kalki Fashion", "Utsav Fashion", "Cbazaar", "Indo Era", "Sabyasachi", "Manish Malhotra", "Ritu Kumar", "Anita Dongre", "Raw Mango", "Jaypore", "Tarinika", "House of Patola", "Nalli Silks"]
};

function PatolaSadi() {
  // --- APPLICATION STATE HOOKS LIFECYCLE ---
  const [products, setProducts] = useState([]);               // Raw ethnic sarees database storage array instances track
  const [loading, setLoading] = useState(true);                 // Loading layout rendering toggle boolean switch control flag
  const [maxPrice, setMaxPrice] = useState(150000);            // Max price cap controller limits value sync parameters 
  const [sortBy, setSortBy] = useState("default");             // Sorting sequencing options indexes string selector state
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false); // Mobile sidebar context menu display state toggle trigger

  // Central active dynamic selections filtering parameter state manager mapping object
  const [filters, setFilters] = useState({ color: [], fabric: [], type: [], size: [], workType: [], occasion: [], sareeLength: [], blouseType: [], brand: [] });
  // Dynamic accordion group visibility indicators mapped dataset records indicators dictionary
  const [openSections, setOpenSections] = useState({ color: true, fabric: true, type: true, size: false, workType: false, occasion: false, sareeLength: false, blouseType: false, brand: false });

  // --- ASYNC API LIFECYCLE DISPATCH MOUNT (useEffect) ---
  useEffect(() => {
    loadAllProducts()
      .then(data => setProducts(data || [])) // Safely ensuring array dataset properties binding constraints
      .catch(() => setProducts([]))          // Network API fail safe response structure crash backup routing
      .finally(() => setLoading(false));     // Kill initial progress tracking placeholder animation screen
  }, []);

  // --- ACTION BUTTON CLICK SYSTEM EVENT METHODS ---
  
  // Controls expanding and shrinking functionality of various filter segments rows
  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };
  
  // Toggles the state values inside filter arrays for accurate query item matching
  const handleFilterToggle = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value) ? prev[key].filter(v => v !== value) : [...prev[key], value]
    }));
  };
  
  // Reverts active selectors properties configuration states back to standard layout designs
  const clearAllFilters = () => {
    setFilters({ color: [], fabric: [], type: [], size: [], workType: [], occasion: [], sareeLength: [], blouseType: [], brand: [] });
    setMaxPrice(150000);
    setSortBy("default");
  };

  // --- PERFORMANCE COMPUTATION CACHE PIPELINE ENGINE (useMemo Architecture) ---
  // Memoizing filtered collections arrays calculations to protect against rendering speed lag drops
  const filteredProducts = useMemo(() => {
    
    // Step 1: Matching and grouping products by core keyword filters tags values indicators
    let result = products.filter(p => {
      const category = p.category?.toLowerCase() || "";
      const subCategory = p.subCategory?.toLowerCase() || "";
      const name = p.name?.toLowerCase() || "";

      return category === "patola sadi" || category === "patola saree" || category === "saree" || 
             subCategory === "patola-sadi" || 
             name.includes("patola") || 
             (name.includes("saree") && name.includes("wedding"));
    });

    // Step 2: Strict properties array evaluations checks validation loop pipeline
    result = result.filter(product => {
      if (product.offerPrice > maxPrice) return false;
      if (filters.color.length > 0 && !filters.color.includes(product.color)) return false;
      if (filters.fabric.length > 0 && !filters.fabric.includes(product.fabric)) return false;
      if (filters.type.length > 0 && !filters.type.includes(product.type)) return false;
      if (filters.size.length > 0 && !filters.size.includes(product.size)) return false;
      if (filters.workType.length > 0 && !filters.workType.includes(product.workType)) return false;
      if (filters.occasion.length > 0 && !filters.occasion.includes(product.occasion)) return false;
      if (filters.sareeLength.length > 0 && !filters.sareeLength.includes(product.sareeLength)) return false;
      if (filters.blouseType.length > 0 && !filters.blouseType.includes(product.blouseType)) return false;
      if (filters.brand.length > 0 && !filters.brand.includes(product.brand)) return false;
      return true;
    });

    // Step 3: Array elements index sequence reallocation reordering processes
    if (sortBy === "price_low") result.sort((a, b) => a.offerPrice - b.offerPrice);
    if (sortBy === "price_high") result.sort((a, b) => b.offerPrice - a.offerPrice);
    if (sortBy === "name_asc") result.sort((a, b) => a.name?.localeCompare(b.name));
    if (sortBy === "name_desc") result.sort((a, b) => b.name?.localeCompare(a.name));

    return result;
  }, [products, maxPrice, filters, sortBy]);

  // --- 🧱 ISOLATED DESIGN TEMPLATE SUB-COMPONENTS ROUTINES ---

  // 1. Structural Accordion Row layouts rendering engine system design allocations block
  const AccordionSection = ({ title, sectionKey, items }) => {
    const isOpen = openSections[sectionKey];
    return (
      <div className="mb-4 border-b border-gray-100 pb-3">
        <button onClick={() => toggleSection(sectionKey)} className="flex justify-between items-center w-full font-bold text-gray-800 text-sm mb-2 hover:text-red-600 transition-colors">
          <span className="capitalize">
            {sectionKey === "workType" ? "Work Type" : sectionKey === "sareeLength" ? "Saree Length" : sectionKey === "blouseType" ? "Blouse Type" : title}
          </span>
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

  // 2. Main Filters Container Sidebar master canvas interface presentation template dashboard
  const FilterSidebarContent = () => (
    <div className="bg-white p-4 rounded-xl shadow-sm space-y-4">
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="font-bold text-base text-gray-800">Filters</h2>
        <button onClick={clearAllFilters} className="text-red-600 text-xs font-semibold hover:underline">Clear All</button>
      </div>

      {/* Programmatic rendering loop tracking over configuration schema objects catalog */}
      {Object.keys(FILTER_CONFIG).map(key => (
        <AccordionSection 
          key={key} 
          title={key} 
          sectionKey={key} 
          items={FILTER_CONFIG[key]} 
        />
      ))}

      {/* Dynamic price scale sliding controller interface track element layout design */}
      <div className="pt-2">
        <h2 className="font-bold text-gray-800 text-sm mb-2">Max Price: ₹{maxPrice.toLocaleString()}</h2>
        <Slider 
          value={maxPrice} 
          onChange={(_, val) => setMaxPrice(val)} 
          min={0} 
          max={150000} 
          step={2000}
          sx={{ 
            color: "#dc2626", 
            height: 4, 
            '& .MuiSlider-thumb': { width: 16, height: 16, backgroundColor: '#dc2626' },
            '& .MuiSlider-track': { backgroundColor: '#dc2626' },
            '& .MuiSlider-rail': { backgroundColor: '#e5e7eb' }
          }} 
        />
        <div className="flex justify-between text-[10px] text-gray-400 mt-1 font-medium">
          <span>₹0</span><span>₹35k</span><span>₹70k</span><span>₹105k</span><span>₹150k+</span>
        </div>
      </div>
    </div>
  );

  // Buffer progress loader display validation rule interception
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-600"></div>
      </div>
    );
  }

  // --- CORE VIEW LAYOUT GRID DISPLAY INTERFACE INTERACTIVE MODULE ---
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      
      {/* 🌟 HERITAGE ROYAL GUJARATI PATOLA SAREE GRAND JUMBOTRON HEADER PANEL BRAND VIEW ROW */}
      <div className="mx-4 my-4 !shadow-3xl shadow-red-900/30 bg-[#1E2D42] bg-gradient-to-br from-[#EE971D] to-[#1E2D42] rounded-xl text-white text-center py-12 ">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Patan & Rajkot Patola Silks</h1>
        <p className="mt-1.5 text-sm text-white/80">Discover authentic double ikat handwoven masterpieces, pure silk sarees and traditional motifs</p>
      </div>
       <nav className="flex items-center gap-2 text-sm text-gray-500 mt-3 !pl-7">
          <Link to="/" className="!text-lg !no-underline !font-semibold !text-[#1E2D42] transition-colors">Home</Link>
          <span className="text-lg !font-medium">/</span>
          <span className="text-lg !font-medium text-[#E4921A]">Patola Sadi</span>
        </nav>
        <h2 className="text-2xl !font-bold !mt-3 !mb-3 !pl-7">Patola Sadi</h2>


      {/* 📱 PORTABLE DISPLAY ADAPTIVE TRIGGER MODULE TO EXPAND ON-SCREEN INTERACTIVE DRAWER MAPS */}
      <div className="md:hidden px-4 pt-4">
        <button 
          onClick={() => setMobileFiltersOpen(true)} 
          className="flex items-center bg-white px-4 py-2.5 rounded-lg shadow-sm w-full justify-between border active:bg-gray-50 transition border-gray-200"
        >
          <span className="font-semibold text-sm text-gray-700">Refine Weaves</span>
          <span className="text-xs font-bold text-white bg-red-600 px-2 py-0.5 rounded-full">
            {Object.values(filters).flat().length} active
          </span>
        </button>
      </div>

      {/* 📱 MOBILE DRAWERS DIALOG VIEWS CONFIGURATIONS INTERFACES OVERLAYS SCREEN SYSTEM NODES */}
      {mobileFiltersOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" onClick={() => setMobileFiltersOpen(false)}>
          <div className="absolute top-0 left-0 w-80 h-full bg-white overflow-y-auto p-4 flex flex-col gap-2 shadow-2xl animate-in slide-in-from-left duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="font-bold text-lg text-gray-800">Filter Sarees</h2>
              <button onClick={() => setMobileFiltersOpen(false)} className="p-1 rounded-full hover:bg-gray-100 transition"><X size={20} /></button>
            </div>
            <FilterSidebarContent />
            <div className="sticky bottom-0 bg-white pt-4 pb-2 mt-auto border-t">
              <button onClick={() => setMobileFiltersOpen(false)} className="w-full bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg font-semibold shadow transition-colors">
                Apply Patola Filters
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
            
            {/* Dynamic array size context validation tracker and sorting bar components tools */}
            <div className="bg-white rounded-xl px-4 py-3 mb-4 border border-gray-100 flex justify-between items-center shadow-sm flex-wrap gap-2">
              <span className="text-gray-500 text-xs font-medium">
                Showing <span className="font-semibold text-gray-700">{filteredProducts.length}</span> imperial pure handloom silk weaves
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
            
            {/* Conditional alternative rendering component template triggered on zero matches validation outputs */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-100 py-16 px-4 text-center shadow-sm text-gray-400 font-medium text-sm">
                <div className="text-4xl mb-2">🏮</div>
                <h3 className="text-lg font-bold text-gray-700 mb-1">No Patola Sarees Found</h3>
                <p className="text-gray-500 text-xs mb-3">Try checking some alternative combination paths variables values settings options.</p>
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

export default PatolaSadi;