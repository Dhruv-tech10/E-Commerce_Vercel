// src/component/KurtaSet.jsx
import { useEffect, useState, useMemo } from "react";
import ProductCard from "../ProductCard";
import { loadAllProducts } from "../ProductsData";
import { Slider } from "@mui/material";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from 'react-router-dom';
// Filter Configuration Schema: Sidebar items arrays ko mapping loop ke throw dynamic paint karne ka configuration map
const FILTER_CONFIG = {
  color: ["Maroon", "Burgundy", "Red", "Gold", "Black", "Navy Blue", "Royal Blue", "Green", "Teal", "Beige", "Cream", "White", "Pink", "Brown", "Grey", "Purple", "Orange"],
  fabric: ["Silk", "Raw Silk", "Georgette", "Cotton Silk", "Linen", "Polyester", "Velvet", "Jacquard", "Broken Silk", "Kanjeevaram", "Art Silk", "Chanderi", "Mysore Silk"],
  type: ["Kurta Set", "Wedding Kurta", "Designer Kurta", "Pathani Kurta", "Churidar Set", "Dhoti Kurta", "Indo Western Kurta", "Party Wear Kurta", "Embroidered Kurta", "Plain Kurta", "Printed Kurta", "Bandhgala Kurta"],
  size: ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL", "Custom Size"],
  kurtaLength: ["Short (Above Knee)", "Medium (Below Knee)", "Long (Ankle Length)", "Regular"],
  workType: ["Embroidery", "Zari Work", "Sequin Work", "Stone Work", "Thread Work", "Kundan Work", "Mirror Work", "Resham Work", "Plain", "Printed", "Patch Work"],
  occasion: ["Wedding", "Engagement", "Reception", "Sangeet", "Haldi", "Mehendi", "Party Wear", "Festival", "Pooja", "Casual"],
  brand: ["Manyavar", "Kalki Fashion", "Utsav Fashion", "Cbazaar", "Indo Era", "Fabindia", "Raymond", "Peter England", "Allen Solly", "Van Heusen", "Louis Philippe", "Park Avenue"]
};

function KurtaSet() {
  // --- APPLICATION STATE HOOKS LIFECYCLE ---
  const [products, setProducts] = useState([]);               // Raw database response storage buffer listing tracking
  const [loading, setLoading] = useState(true);                 // Center spinning page component loading visibility controller
  const [maxPrice, setMaxPrice] = useState(50000);             // Price limit indicator cap target value tracking range
  const [sortBy, setSortBy] = useState("default");             // Sort selections state routing string handlers mapping
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false); // Mobile response drawer canvas sliding toggle indicator

  // Central active configurations selection map hooks management state
  const [filters, setFilters] = useState({ color: [], fabric: [], type: [], size: [], kurtaLength: [], workType: [], occasion: [], brand: [] });
  // Dropdown list accordion group structural panel collapsed flag maps dictionary index tracks
  const [openSections, setOpenSections] = useState({ color: true, fabric: true, type: true, size: false, kurtaLength: false, workType: false, occasion: false, brand: false });

  // --- ASYNC API LIFECYCLE DISPATCH MOUNT (useEffect) ---
  useEffect(() => {
    loadAllProducts()
      .then(data => setProducts(data || [])) // Safely matching response payload mapping objects allocations checks
      .catch(() => setProducts([]))          // Network fault execution fallback recovery handling policies
      .finally(() => setLoading(false));     // Turn down viewport processing spinner tracking signals engine
  }, []);

  // --- ACTION BUTTON CLICK SYSTEM EVENT METHODS ---
  
  // Dynamic drawer menus open/close tracking parameters modifier assignments
  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };
  
  // Multi-tier push/pull arrays array selections toggle routing systems values controller
  const handleFilterToggle = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value) ? prev[key].filter(v => v !== value) : [...prev[key], value]
    }));
  };
  
  // Resets central memory tracking variables variables values back to standard blueprint settings
  const clearAllFilters = () => {
    setFilters({ color: [], fabric: [], type: [], size: [], kurtaLength: [], workType: [], occasion: [], brand: [] });
    setMaxPrice(50000);
    setSortBy("default");
  };

  // --- PERFORMANCE COMPUTATION CACHE PIPELINE ENGINE (useMemo Architecture) ---
  // Ensuring search lists data structures don't reconstruct during unrelated input changes tracking mutations
  const filteredProducts = useMemo(() => {
    
    // Step 1: Initial filtering by keywords match parameters metrics analysis variables rules layer
    let result = products.filter(p => {
      const category = p.category?.toLowerCase() || "";
      const subCategory = p.subCategory?.toLowerCase() || "";
      const name = p.name?.toLowerCase() || "";

      return category === "kurta set" || category === "kurta" || subCategory === "kurta-set" || 
             name.includes("kurta") || name.includes("kurti") || 
             (name.includes("wedding") && name.includes("kurta"));
    });

    // Step 2: Loop parameters evaluation conditions arrays checking routines structural rules targets
    result = result.filter(product => {
      if (product.offerPrice > maxPrice) return false;
      if (filters.color.length > 0 && !filters.color.includes(product.color)) return false;
      if (filters.fabric.length > 0 && !filters.fabric.includes(product.fabric)) return false;
      if (filters.type.length > 0 && !filters.type.includes(product.type)) return false;
      if (filters.size.length > 0 && !filters.size.includes(product.size)) return false;
      if (filters.kurtaLength.length > 0 && !filters.kurtaLength.includes(product.kurtaLength)) return false;
      if (filters.workType.length > 0 && !filters.workType.includes(product.workType)) return false;
      if (filters.occasion.length > 0 && !filters.occasion.includes(product.occasion)) return false;
      if (filters.brand.length > 0 && !filters.brand.includes(product.brand)) return false;
      return true;
    });

    // Step 3: Array sorting orders direction indexing mapping re-assignment operations pipelines
    if (sortBy === "price_low") result.sort((a, b) => a.offerPrice - b.offerPrice);
    if (sortBy === "price_high") result.sort((a, b) => b.offerPrice - a.offerPrice);
    if (sortBy === "name_asc") result.sort((a, b) => a.name?.localeCompare(b.name));
    if (sortBy === "name_desc") result.sort((a, b) => b.name?.localeCompare(a.name));

    return result;
  }, [products, maxPrice, filters, sortBy]);

  // --- 🧱 ISOLATED DESIGN TEMPLATE SUB-COMPONENTS ROUTINES ---

  // 1. Structural Accordion Row layouts logic processing design rendering allocation view blocks
  const AccordionSection = ({ title, sectionKey, items }) => {
    const isOpen = openSections[sectionKey];
    return (
      <div className="mb-4 border-b border-gray-100 pb-3">
        <button onClick={() => toggleSection(sectionKey)} className="flex justify-between items-center w-full font-bold text-gray-800 text-sm mb-2 hover:text-blue-600 transition-colors">
          <span className="capitalize">{title === "kurtaLength" ? "Kurta Length" : title === "workType" ? "Work Type" : title}</span>
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {isOpen && (
          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {items.map((item, index) => (
              <label key={index} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded transition-colors">
                <input 
                  type="checkbox" 
                  checked={filters[sectionKey]?.includes(item) || false} 
                  onChange={() => handleFilterToggle(sectionKey, item)} 
                  className="w-3.5 h-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                />
                <span className="text-gray-600 text-xs">{item}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    );
  };

  // 2. Main Filters Container Dashboard control blueprint mapping interface graphics display systems
  const FilterSidebarContent = () => (
    <div className="bg-white p-4 rounded-xl shadow-sm space-y-4">
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="font-bold text-base text-gray-800">Filters</h2>
        <button onClick={clearAllFilters} className="text-blue-600 text-xs font-semibold hover:underline">Clear All</button>
      </div>

      {/* Programmatic automation loop across properties dictionary map layout objects schema keys */}
      {Object.keys(FILTER_CONFIG).map(key => (
        <AccordionSection 
          key={key} 
          title={key} 
          sectionKey={key} 
          items={FILTER_CONFIG[key]} 
        />
      ))}

      {/* Currency metrics numerical slider evaluation interfaces frame elements */}
      <div className="pt-2">
        <h2 className="font-bold text-gray-800 text-sm mb-2">Max Price: ₹{maxPrice.toLocaleString()}</h2>
        <Slider 
          value={maxPrice} 
          onChange={(_, val) => setMaxPrice(val)} 
          min={0} 
          max={50000} 
          step={500}
          sx={{ 
            color: "#2563eb", 
            height: 4, 
            '& .MuiSlider-thumb': { width: 16, height: 16, backgroundColor: '#2563eb' },
            '& .MuiSlider-track': { backgroundColor: '#2563eb' },
            '& .MuiSlider-rail': { backgroundColor: '#e5e7eb' }
          }} 
        />
        <div className="flex justify-between text-[10px] text-gray-400 mt-1 font-medium">
          <span>₹0</span><span>₹12.5k</span><span>₹25k</span><span>₹37.5k</span><span>₹50k+</span>
        </div>
      </div>
    </div>
  );

  // Runtime conditional initialization buffering block interceptor element template layout
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // --- CORE VIEW LAYOUT GRID DISPLAY INTERFACE INTERACTIVE MODULE ---
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      
      {/* 🔷 ROYAL TRADITIONAL HERO JUMBOTRON DESIGN TITLE GRAPHICS BANNER HOUSING PANEL */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white text-center py-10 shadow-inner">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Groom Kurta Set Hub</h1>
        <p className="mt-1.5 text-sm text-white/80">Discover wedding Kurtas, Pathani suits, royal Dhoti setups and designer Indo-Western ethnic wears</p>
      </div>
  <nav className="flex items-center gap-2 text-sm text-gray-500 mt-3 !pl-7">
          <Link to="/" className="!text-lg !no-underline !font-semibold !text-[#1E2D42] transition-colors">Home</Link>
          <span className="text-lg !font-medium">/</span>
          <span className="text-lg !font-medium text-[#E4921A]">Kurta Set</span>
        </nav>
        <h2 className="text-2xl !font-bold !mt-3 !mb-3 !pl-7">Kurta Set</h2>
      {/* 📱 PORTABLE SCREEN ADAPTIVE DROPDOWN CONTROLLER BUTTON STRUCTURE ELEMENT */}
      <div className="md:hidden px-4 pt-4">
        <button 
          onClick={() => setMobileFiltersOpen(true)} 
          className="flex items-center bg-white px-4 py-2.5 rounded-lg shadow-sm w-full justify-between border active:bg-gray-50 transition border-gray-200"
        >
          <span className="font-semibold text-sm text-gray-700">Refine Outfits</span>
          <span className="text-xs font-bold text-white bg-blue-600 px-2 py-0.5 rounded-full">
            {Object.values(filters).flat().length} active
          </span>
        </button>
      </div>

      {/* 📱 MOBILE VIEW SLIDING DRAWER DIALOG POPUP CONTROLLER ELEMENTS LAYER BLOCKS */}
      {mobileFiltersOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" onClick={() => setMobileFiltersOpen(false)}>
          <div className="absolute top-0 left-0 w-80 h-full bg-white overflow-y-auto p-4 flex flex-col gap-2 shadow-2xl animate-in slide-in-from-left duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="font-bold text-lg text-gray-800">Filter Menu</h2>
              <button onClick={() => setMobileFiltersOpen(false)} className="p-1 rounded-full hover:bg-gray-100 transition"><X size={20} /></button>
            </div>
            <FilterSidebarContent />
            <div className="sticky bottom-0 bg-white pt-4 pb-2 mt-auto border-t">
              <button onClick={() => setMobileFiltersOpen(false)} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-semibold shadow transition-colors">
                Apply Apparel Filters
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
          
          {/* CORE PRODUCT RENDERING ENGINE SYSTEM - Renders matching item database loop nodes */}
          <main className="flex-1">
            
            {/* Context meta status configurations reports tracking toolbar grid container display layouts */}
            <div className="bg-white rounded-xl px-4 py-3 mb-4 border border-gray-100 flex justify-between items-center shadow-sm flex-wrap gap-2">
              <span className="text-gray-500 text-xs font-medium">
                Showing <span className="font-semibold text-gray-700">{filteredProducts.length}</span> curated premium wedding garments
              </span>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)} 
                className="border border-gray-200 bg-gray-50 font-medium rounded-lg px-3 py-1.5 text-xs text-gray-700 outline-none focus:border-blue-500 cursor-pointer transition-colors"
              >
                <option value="default">Sort by: Default</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="name_asc">Name: A to Z</option>
                <option value="name_desc">Name: Z to A</option>
              </select>
            </div>
            
            {/* Fallback conditional checks block evaluation for blank searches mapping lists arrays elements */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-100 py-16 px-4 text-center shadow-sm text-gray-400 font-medium text-sm">
                <div className="text-4xl mb-2">👔</div>
                <h3 className="text-lg font-bold text-gray-700 mb-1">No Outfits Found</h3>
                <p className="text-gray-500 text-xs mb-3">Try checking some alternative combination paths variables values settings options.</p>
                <button onClick={clearAllFilters} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 text-xs font-semibold rounded-lg shadow transition-colors">
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

export default KurtaSet;