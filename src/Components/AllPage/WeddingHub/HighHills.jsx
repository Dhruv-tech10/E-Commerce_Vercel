// src/component/HighHeels.jsx
import { useEffect, useState, useMemo } from "react";
import ProductCard from "../ProductCard";
import { loadAllProducts } from "../ProductsData";
import { Slider } from "@mui/material";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from 'react-router-dom';
// Filter Configuration Schema: Premium stilettos, pumps, block heels aur designer straps ke parameters map catalogs
const FILTER_CONFIG = {
  color: ["Red", "Maroon", "Burgundy", "Gold", "Rose Gold", "Silver", "Black", "White", "Cream", "Beige", "Nude", "Pink", "Blue", "Green", "Purple", "Multicolor"],
  material: ["Leather", "Patent Leather", "Suede", "Velvet", "Satin", "Fabric", "PVC", "PU Leather", "Rubber Sole", "Cushioned Footbed", "Memory Foam"],
  type: ["Stiletto Heels", "Block Heels", "Kitten Heels", "Wedges", "Platform Heels", "Cone Heels", "Chunky Heels", "Pencil Heels", "Designer Heels", "Party Heels", "Bridal Heels", "Evening Heels"],
  heelHeight: ["2-3 inch", "3-4 inch", "4-5 inch", "5-6 inch", "6-7 inch", "7+ inch"],
  size: ["4", "5", "6", "7", "8", "9", "10", "11", "12", "Custom Size"],
  workType: ["Embroidery", "Zari Work", "Sequin Work", "Stone Work", "Beads Work", "Mirror Work", "Kundan Work", "Pearl Work", "Plain", "Glitter", "Metallic", "Patent"],
  occasion: ["Wedding", "Engagement", "Reception", "Sangeet", "Party Wear", "Cocktail", "Formal", "Date Night", "Festival", "Gala Event"],
  toeType: ["Open Toe", "Closed Toe", "Peep Toe", "Pointed Toe", "Round Toe", "Square Toe", "T-Strap", "Ankle Strap"],
  strapType: ["Ankle Strap", "T-Strap", "Slingback", "Mary Jane", "No Strap (Slip On)", "Lace Up", "Buckle Strap"],
  brand: ["Miraggio", "Lavie", "Caprese", "Bata", "Metro", "Red Tape", "Clarks", "Mochi", "Khadims", "Catwalk", "Zara", "H&M", "Nykaa Fashion", "Myntra", "Steve Madden", "Aldo"]
};

function HighHills() {
  // --- APPLICATION STATE HOOKS LIFECYCLE ---
  const [products, setProducts] = useState([]);               // Raw footwear database arrays memory pool
  const [loading, setLoading] = useState(true);                 // Activity loading indicator view handler state
  const [maxPrice, setMaxPrice] = useState(20000);             // Fixed range sync discrepancies dynamically across all instances to 20k
  const [sortBy, setSortBy] = useState("default");             // List ordering sequence state alignment configuration
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false); // Mobile toggle layout visibility status canvas flags

  // Centralized selected filters tracking structures object array schemas
  const [filters, setFilters] = useState({ color: [], material: [], type: [], heelHeight: [], size: [], workType: [], occasion: [], toeType: [], strapType: [], brand: [] });
  // Dynamic layout sections breakdown configuration collapse dictionary indexes
  const [openSections, setOpenSections] = useState({ color: true, material: true, type: true, heelHeight: false, size: false, workType: false, occasion: false, toeType: false, strapType: false, brand: false });

  // --- ASYNC API LIFECYCLE DISPATCH MOUNT (useEffect) ---
  useEffect(() => {
    loadAllProducts()
      .then(data => setProducts(data || [])) // Safety arrays configurations structure data mapping values
      .catch(() => setProducts([]))          // Network API fail safe runtime logs operations backups routing
      .finally(() => setLoading(false));     // Turn off circular component loading layer switcher indicators
  }, []);

  // --- ACTION BUTTON CLICK SYSTEM EVENT METHODS ---
  
  // Controls side bar single accordion tab layout metrics switches
  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };
  
  // Handles multi-select selection matrix nodes arrays push inside filters memory map
  const handleFilterToggle = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value) ? prev[key].filter(v => v !== value) : [...prev[key], value]
    }));
  };
  
  // Resets tracking arrays properties blocks variables down to default layout schemas
  const clearAllFilters = () => {
    setFilters({ color: [], material: [], type: [], heelHeight: [], size: [], workType: [], occasion: [], toeType: [], strapType: [], brand: [] });
    setMaxPrice(20000); // Maintained uniform boundary parameters with the slider max values definitions
    setSortBy("default");
  };

  // --- PERFORMANCE COMPUTATION CACHE PIPELINE ENGINE (useMemo Architecture) ---
  // Memoized process algorithms logic structure tracking to eliminate unnecessary recalculations delays
  const filteredProducts = useMemo(() => {
    
    // Step 1: Evaluating initial items elements structure matching matching filters arrays strings
    let result = products.filter(p => {
      const category = p.category?.toLowerCase() || "";
      const subCategory = p.subCategory?.toLowerCase() || "";
      const name = p.name?.toLowerCase() || "";

      return category === "high heels" || category === "heels" || category === "party heels" || 
             subCategory === "high-heels" || 
             name.includes("high heels") || name.includes("stiletto") || name.includes("pumps") || 
             (name.includes("heels") && name.includes("wedding"));
    });

    // Step 2: Complex multiple query validation checks execution parameters parsing looping
    result = result.filter(product => {
      if (product.offerPrice > maxPrice) return false;
      if (filters.color.length > 0 && !filters.color.includes(product.color)) return false;
      if (filters.material.length > 0 && !filters.material.includes(product.material)) return false;
      if (filters.type.length > 0 && !filters.type.includes(product.type)) return false;
      if (filters.heelHeight.length > 0 && !filters.heelHeight.includes(product.heelHeight)) return false;
      if (filters.size.length > 0 && !filters.size.includes(product.size)) return false;
      if (filters.workType.length > 0 && !filters.workType.includes(product.workType)) return false;
      if (filters.occasion.length > 0 && !filters.occasion.includes(product.occasion)) return false;
      if (filters.toeType.length > 0 && !filters.toeType.includes(product.toeType)) return false;
      if (filters.strapType.length > 0 && !filters.strapType.includes(product.strapType)) return false;
      if (filters.brand.length > 0 && !filters.brand.includes(product.brand)) return false;
      return true;
    });

    // Step 3: Array structural order mapping alignment sequencing transformations patterns
    if (sortBy === "price_low") result.sort((a, b) => a.offerPrice - b.offerPrice);
    if (sortBy === "price_high") result.sort((a, b) => b.offerPrice - a.offerPrice);
    if (sortBy === "name_asc") result.sort((a, b) => a.name?.localeCompare(b.name));
    if (sortBy === "name_desc") result.sort((a, b) => b.name?.localeCompare(a.name));

    return result;
  }, [products, maxPrice, filters, sortBy]);

  // --- 🧱 ISOLATED DESIGN TEMPLATE SUB-COMPONENTS ROUTINES ---

  // 1. Structural Accordion Row layouts interface dynamic block processing execution component
  const AccordionSection = ({ title, sectionKey, items }) => {
    const isOpen = openSections[sectionKey];
    return (
      <div className="mb-4 border-b border-gray-100 pb-3">
        <button onClick={() => toggleSection(sectionKey)} className="flex justify-between items-center w-full font-bold text-gray-800 text-sm mb-2 hover:text-pink-600 transition-colors">
          <span className="capitalize">
            {sectionKey === "heelHeight" ? "Heel Height" : sectionKey === "workType" ? "Work Type" : sectionKey === "toeType" ? "Toe Type" : sectionKey === "strapType" ? "Strap Type" : title}
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

  // 2. Main Sidebar Filter board controls parameters layout rendering frame logic blueprints
  const FilterSidebarContent = () => (
    <div className="bg-white p-4 rounded-xl shadow-sm space-y-4">
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="font-bold text-base text-gray-800">Filters</h2>
        <button onClick={clearAllFilters} className="text-pink-600 text-xs font-semibold hover:underline">Clear All</button>
      </div>

      {/* Programmatic loop layout tracking parsing properties sets metrics blueprints definitions mapping over filters metadata configuration schema */}
      {Object.keys(FILTER_CONFIG).map(key => (
        <AccordionSection 
          key={key} 
          title={key} 
          sectionKey={key} 
          items={FILTER_CONFIG[key]} 
        />
      ))}

      {/* Monetary value scaling operations slider engine layout blocks nodes modules */}
      <div className="pt-2">
        <h2 className="font-bold text-gray-800 text-sm mb-2">Max Price: ₹{maxPrice.toLocaleString()}</h2>
        <Slider 
          value={maxPrice} 
          onChange={(_, val) => setMaxPrice(val)} 
          min={0} 
          max={20000} 
          step={500}
          sx={{ 
            color: "#db2777", 
            height: 4, 
            '& .MuiSlider-thumb': { width: 16, height: 16, backgroundColor: '#db2777' },
            '& .MuiSlider-track': { backgroundColor: '#db2777' },
            '& .MuiSlider-rail': { backgroundColor: '#e5e7eb' }
          }} 
        />
        <div className="flex justify-between text-[10px] text-gray-400 mt-1 font-medium">
          <span>₹0</span><span>₹5k</span><span>₹10k</span><span>₹15k</span><span>₹20k</span>
        </div>
      </div>
    </div>
  );

  // Fallback structural placeholder window triggered on data loading cycles
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
      {/* 🌸 MODERN GLAM LUXURY DESIGNER HIGH HEELS STILETTOS & PLATFORMS GRAND HERO PANEL HERO BANNER AREA ROW */}
      <div className="mx-4 my-4 !shadow-3xl shadow-red-900/30 bg-[#1E2D42] bg-gradient-to-br from-[#EE971D] to-[#1E2D42] rounded-xl text-white text-center py-12 ">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">High Heels & Luxury Pumps</h1>
        <p className="mt-1.5 text-sm text-white/80">Premium luxury party stilettos, bridal statement block heels, and elegant evening footwear couture</p>
      </div>
<nav className="flex items-center gap-2 text-sm text-gray-500 mt-3 !pl-7">
          <Link to="/" className="!text-lg !no-underline !font-semibold !text-[#1E2D42] transition-colors">Home</Link>
          <span className="text-lg !font-medium">/</span>
          <span className="text-lg !font-medium text-[#E4921A]">High Hills</span>
        </nav>
        <h2 className="text-2xl !font-bold !mt-3 !mb-3 !pl-7">High Hills</h2>
      {/* 📱 MINI DEVICE COMPACT TOGGLER SHORTCUT BUTTON STRIPS LAYOUT CONFIG MODULE TRACK ROW */}
      <div className="md:hidden px-4 pt-4">
        <button 
          onClick={() => setMobileFiltersOpen(true)} 
          className="flex items-center bg-white px-4 py-2.5 rounded-lg shadow-sm w-full justify-between border active:bg-gray-50 transition border-gray-200"
        >
          <span className="font-semibold text-sm text-gray-700">Refine Footwear</span>
          <span className="text-xs font-bold text-white bg-pink-600 px-2 py-0.5 rounded-full">
            {Object.values(filters).flat().length} active
          </span>
        </button>
      </div>

      {/* 📱 MOBILE DRAWERS CONTEXT DIALOG OVERLAY CANVAS CONTROL SYSTEM MODAL PANEL SEGMENTS */}
      {mobileFiltersOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" onClick={() => setMobileFiltersOpen(false)}>
          <div className="absolute top-0 left-0 w-80 h-full bg-white overflow-y-auto p-4 flex flex-col gap-2 shadow-2xl animate-in slide-in-from-left duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="font-bold text-lg text-gray-800">Filter Luxury Heels</h2>
              <button onClick={() => setMobileFiltersOpen(false)} className="p-1 rounded-full hover:bg-gray-100 transition"><X size={20} /></button>
            </div>
            <FilterSidebarContent />
            <div className="sticky bottom-0 bg-white pt-4 pb-2 mt-auto border-t">
              <button onClick={() => setMobileFiltersOpen(false)} className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2.5 rounded-lg font-semibold shadow transition-colors">
                Apply Heels Filters
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
            
            {/* Array indexing limits reports values counters and active layout configurations toolbar panel boxes */}
            <div className="bg-white rounded-xl px-4 py-3 mb-4 border border-gray-100 flex justify-between items-center shadow-sm flex-wrap gap-2">
              <span className="text-gray-500 text-xs font-medium">
                Showing <span className="font-semibold text-gray-700">{filteredProducts.length}</span> signature premier stilettos & premium heels collections
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
            
            {/* Alternate runtime missing outputs error layout handler panel block display structural configurations triggers */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-100 py-16 px-4 text-center shadow-sm text-gray-400 font-medium text-sm">
              
                <h3 className="text-lg font-bold text-gray-700 mb-1">No Heels Found</h3>
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

export default HighHills;