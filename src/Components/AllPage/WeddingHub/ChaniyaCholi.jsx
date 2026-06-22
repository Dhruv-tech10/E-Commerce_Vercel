// src/component/ChaniyaCholi.jsx
import { useEffect, useState, useMemo } from "react";
import ProductCard from "../ProductCard";
import { loadAllProducts } from "../ProductsData";
import { Slider } from "@mui/material";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from 'react-router-dom';
// Filter Configuration Schema: Lehenga aur traditional Chaniya Choli sidebar list render karne ki setup catalog maps
const FILTER_CONFIG = {
  color: ["Red", "Maroon", "Burgundy", "Pink", "Peach", "Orange", "Yellow", "Gold", "Green", "Teal", "Blue", "Navy Blue", "Purple", "Brown", "Black", "White", "Cream", "Beige", "Multicolor"],
  fabric: ["Silk", "Raw Silk", "Georgette", "Velvet", "Cotton Silk", "Chiffon", "Net", "Organza", "Kanjeevaram", "Banarasi Silk", "Broken Silk", "Art Silk", "Polyester", "Linen"],
  type: ["Chaniya Choli", "Lehenga Choli", "Designer Lehenga", "Wedding Lehenga", "Bridal Lehenga", "Reception Lehenga", "Engagement Lehenga", "Sangeet Lehenga", "Traditional Chaniya", "Pre-Stitched Lehenga", "Unstitched Lehenga"],
  size: ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL", "Custom Size"],
  workType: ["Embroidery", "Zari Work", "Sequin Work", "Stone Work", "Thread Work", "Kundan Work", "Mirror Work", "Resham Work", "Beads Work", "Patch Work", "Printed", "Plain"],
  occasion: ["Wedding", "Engagement", "Reception", "Sangeet", "Mehendi", "Haldi", "Party Wear", "Festival", "Navratri", "Garba", "Diwali"],
  blouseType: ["Sleeveless", "Short Sleeves", "Elbow Sleeves", "Full Sleeves", "Cape Style", "Jacket Style", "High Neck", "Deep Neck", "Backless", "Boat Neck"],
  brand: ["Manyavar", "Kalki Fashion", "Utsav Fashion", "Cbazaar", "Indo Era", "Sabyasachi", "Manish Malhotra", "Ritu Kumar", "Anita Dongre", "Sangria", "Varanga", "Fabi", "W for Women"]
};

function ChaniyaCholi() {
  // --- APPLICATION STATE HOOKS LIFECYCLE ---
  const [products, setProducts] = useState([]);               // Raw heavy ethnic apparel lists buffer storage arrays states
  const [loading, setLoading] = useState(true);                 // Circular progress loading controller element trigger 
  const [maxPrice, setMaxPrice] = useState(150000);            // Price range boundaries maximum indicator numerical state
  const [sortBy, setSortBy] = useState("default");             // Sort orders state dynamic navigation paths control
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false); // Mobile sheet canvas expansion overlay toggle indicator

  // Central active active configuration filters states controller maps object
  const [filters, setFilters] = useState({ color: [], fabric: [], type: [], size: [], workType: [], occasion: [], blouseType: [], brand: [] });
  // Accordion drawer columns collapsed layout dynamic status index mapping flags dictionary
  const [openSections, setOpenSections] = useState({ color: true, fabric: true, type: true, size: false, workType: false, occasion: false, blouseType: false, brand: false });

  // --- ASYNC API LIFECYCLE DISPATCH MOUNT (useEffect) ---
  useEffect(() => {
    loadAllProducts()
      .then(data => setProducts(data || [])) // Safely handling storage structures array bindings distribution mapping
      .catch(() => setProducts([]))          // Network crash response error handling system recoveries protocols
      .finally(() => setLoading(false));     // Turn down circular visibility spinner components lifecycle indicator
  }, []);

  // --- ACTION BUTTON CLICK SYSTEM EVENT METHODS ---
  
  // Sidebar navigation group accordions expansion states tracking handler
  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };
  
  // Central runtime filters storage items pushes and removals synchronization toggler routines
  const handleFilterToggle = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value) ? prev[key].filter(v => v !== value) : [...prev[key], value]
    }));
  };
  
  // Resets central system variables states pointers memory maps back to generic values blueprints
  const clearAllFilters = () => {
    setFilters({ color: [], fabric: [], type: [], size: [], workType: [], occasion: [], blouseType: [], brand: [] });
    setMaxPrice(150000);
    setSortBy("default");
  };

  // --- PERFORMANCE COMPUTATION CACHE PIPELINE ENGINE (useMemo Architecture) ---
  // Ensuring expensive arrays filtering loops do not run on independent states ticks mutations
  const filteredProducts = useMemo(() => {
    
    // Step 1: Broad multi-keyword token matching rules filter evaluation layer logic
    let result = products.filter(p => {
      const category = p.category?.toLowerCase() || "";
      const subCategory = p.subCategory?.toLowerCase() || "";
      const name = p.name?.toLowerCase() || "";

      return category === "chaniya choli" || category === "lehenga choli" || category === "chaniyacholi" || 
             subCategory === "chaniya-choli" || 
             name.includes("chaniya") || name.includes("lehenga") || name.includes("choli");
    });

    // Step 2: Fine-grain configuration parameter specifications filters checking routines bounds
    result = result.filter(product => {
      if (product.offerPrice > maxPrice) return false;
      if (filters.color.length > 0 && !filters.color.includes(product.color)) return false;
      if (filters.fabric.length > 0 && !filters.fabric.includes(product.fabric)) return false;
      if (filters.type.length > 0 && !filters.type.includes(product.type)) return false;
      if (filters.size.length > 0 && !filters.size.includes(product.size)) return false;
      if (filters.workType.length > 0 && !filters.workType.includes(product.workType)) return false;
      if (filters.occasion.length > 0 && !filters.occasion.includes(product.occasion)) return false;
      if (filters.blouseType.length > 0 && !filters.blouseType.includes(product.blouseType)) return false;
      if (filters.brand.length > 0 && !filters.brand.includes(product.brand)) return false;
      return true;
    });

    // Step 3: Array structural order sorting orientation displacement tracks metrics configurations
    if (sortBy === "price_low") result.sort((a, b) => a.offerPrice - b.offerPrice);
    if (sortBy === "price_high") result.sort((a, b) => b.offerPrice - a.offerPrice);
    if (sortBy === "name_asc") result.sort((a, b) => a.name?.localeCompare(b.name));
    if (sortBy === "name_desc") result.sort((a, b) => b.name?.localeCompare(a.name));

    return result;
  }, [products, maxPrice, filters, sortBy]);

  // --- 🧱 ISOLATED DESIGN TEMPLATE SUB-COMPONENTS ROUTINES ---

  // 1. Structural Accordion Row layouts logic process design rendering allocation segments
  const AccordionSection = ({ title, sectionKey, items }) => {
    const isOpen = openSections[sectionKey];
    return (
      <div className="mb-4 border-b border-gray-100 pb-3">
        <button onClick={() => toggleSection(sectionKey)} className="flex justify-between items-center w-full font-bold text-gray-800 text-sm mb-2 hover:text-pink-600 transition-colors">
          <span className="capitalize">{title === "workType" ? "Work Type" : title === "blouseType" ? "Blouse Type" : title}</span>
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
                  className="w-3.5 h-3.5 rounded border-gray-300 text-pink-600 focus:ring-pink-500" 
                />
                <span className="text-gray-600 text-xs">{item}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    );
  };

  // 2. Main Filters Container Sidebar layout graphics layout container board blueprints
  const FilterSidebarContent = () => (
    <div className="bg-white p-4 rounded-xl shadow-sm space-y-4">
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="font-bold text-base text-gray-800">Filters</h2>
        <button onClick={clearAllFilters} className="text-pink-600 text-xs font-semibold hover:underline">Clear All</button>
      </div>

      {/* Programmatic rendering iterations mapping values over central schema configuration keys */}
      {Object.keys(FILTER_CONFIG).map(key => (
        <AccordionSection 
          key={key} 
          title={key} 
          sectionKey={key} 
          items={FILTER_CONFIG[key]} 
        />
      ))}

      {/* Numerical dynamic slider scales control modules layouts interfaces block */}
      <div className="pt-2">
        <h2 className="font-bold text-gray-800 text-sm mb-2">Max Price: ₹{maxPrice.toLocaleString()}</h2>
        <Slider 
          value={maxPrice} 
          onChange={(_, val) => setMaxPrice(val)} 
          min={0} 
          max={150000} 
          step={2000}
          sx={{ 
            color: "#db2777", 
            height: 4, 
            '& .MuiSlider-thumb': { width: 16, height: 16, backgroundColor: '#db2777' },
            '& .MuiSlider-track': { backgroundColor: '#db2777' },
            '& .MuiSlider-rail': { backgroundColor: '#e5e7eb' }
          }} 
        />
        <div className="flex justify-between text-[10px] text-gray-400 mt-1 font-medium">
          <span>₹0</span><span>₹35k</span><span>₹70k</span><span>₹105k</span><span>₹150k+</span>
        </div>
      </div>
    </div>
  );

  // Runtime initial page loading layout blocking intercept interceptor rendering unit
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
      
      {/* 🌸 LUXURY DESI ETHNIC NAVRATRI & BRIDAL LEHENGA JUMBOTRON TITLE DISPLAY HEADER ROW SECTION */}
      <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white text-center py-10 shadow-inner">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Royal Lehenga & Chaniya Choli</h1>
        <p className="mt-1.5 text-sm text-white/80">Premium collection of Garba Chaniyacholis, designer bridal outfits and reception lehengas</p>
      </div>

  <nav className="flex items-center gap-2 text-sm text-gray-500 mt-3 !pl-7">
          <Link to="/" className="!text-lg !no-underline !font-semibold !text-[#1E2D42] transition-colors">Home</Link>
          <span className="text-lg !font-medium">/</span>
          <span className="text-lg !font-medium text-[#E4921A]">Chaniya Choli</span>
        </nav>
        <h2 className="text-2xl !font-bold !mt-3 !mb-3 !pl-7">Chaniya Choli</h2>
      {/* 📱 PORTABLE SCREEN ADAPTIVE DROPDOWN DRAWER EXPANSION MANAGER SYSTEMS TRIGGER BUTTON */}
      <div className="md:hidden px-4 pt-4">
        <button 
          onClick={() => setMobileFiltersOpen(true)} 
          className="flex items-center bg-white px-4 py-2.5 rounded-lg shadow-sm w-full justify-between border active:bg-gray-50 transition border-gray-200"
        >
          <span className="font-semibold text-sm text-gray-700">Refine Garments</span>
          <span className="text-xs font-bold text-white bg-pink-600 px-2 py-0.5 rounded-full">
            {Object.values(filters).flat().length} active
          </span>
        </button>
      </div>

      {/* 📱 MOBILE VIEW COMPACT DIALOG VIEW DRAWER INTERFACES CODE BLOCKS NODES */}
      {mobileFiltersOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" onClick={() => setMobileFiltersOpen(false)}>
          <div className="absolute top-0 left-0 w-80 h-full bg-white overflow-y-auto p-4 flex flex-col gap-2 shadow-2xl animate-in slide-in-from-left duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="font-bold text-lg text-gray-800">Filter Collections</h2>
              <button onClick={() => setMobileFiltersOpen(false)} className="p-1 rounded-full hover:bg-gray-100 transition"><X size={20} /></button>
            </div>
            <FilterSidebarContent />
            <div className="sticky bottom-0 bg-white pt-4 pb-2 mt-auto border-t">
              <button onClick={() => setMobileFiltersOpen(false)} className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2.5 rounded-lg font-semibold shadow transition-colors">
                Apply Lehenga Filters
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
            
            {/* Dynamic context calculation monitoring reports status control panels toolbars */}
            <div className="bg-white rounded-xl px-4 py-3 mb-4 border border-gray-100 flex justify-between items-center shadow-sm flex-wrap gap-2">
              <span className="text-gray-500 text-xs font-medium">
                Showing <span className="font-semibold text-gray-700">{filteredProducts.length}</span> luxury premium bridal & festival wears
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
            
            {/* Fallback conditional validation display layout intercept mechanisms on missing search elements */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-100 py-16 px-4 text-center shadow-sm text-gray-400 font-medium text-sm">
                <div className="text-4xl mb-2">💃</div>
                <h3 className="text-lg font-bold text-gray-700 mb-1">No Outfits Found</h3>
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

export default ChaniyaCholi;