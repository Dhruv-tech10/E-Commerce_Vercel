// src/component/MarriageSandal.jsx
import { useEffect, useState, useMemo } from "react";
import ProductCard from "../ProductCard";
import { loadAllProducts } from "../ProductsData";
import { Slider } from "@mui/material";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from 'react-router-dom';
// Filter Configuration Schema: Wedding sandals, bridal juttis aur heels ki sidebar menu properties list catalog maps
const FILTER_CONFIG = {
  color: ["Red", "Maroon", "Gold", "Rose Gold", "Pink", "Burgundy", "White", "Cream", "Beige", "Silver", "Brown", "Black", "Blue", "Green", "Multicolor"],
  material: ["Leather", "Suede", "Velvet", "Satin", "Silk", "Fabric", "Artificial Leather", "PU Leather", "Rubber Sole", "Wooden Heel", "Cushioned Footbed"],
  type: ["Wedding Sandals", "Bridal Sandals", "Khussa", "Jutti", "Heeled Sandals", "Flat Sandals", "Embroidered Sandals", "Designer Sandals", "Traditional Sandals", "Party Wear Sandals", "Open Toe Sandals", "Closed Toe Sandals"],
  heelHeight: ["Flat (0-1 inch)", "Kitten Heel (1-2 inch)", "Medium Heel (2-3 inch)", "High Heel (3-4 inch)", "Very High (4-5 inch)", "Platform Heel"],
  size: ["4", "5", "6", "7", "8", "9", "10", "11", "12", "Custom Size"],
  workType: ["Embroidery", "Zari Work", "Sequin Work", "Stone Work", "Beads Work", "Mirror Work", "Kundan Work", "Pearl Work", "Thread Work", "Plain", "Printed", "Resham Work"],
  occasion: ["Wedding", "Engagement", "Reception", "Sangeet", "Mehendi", "Haldi", "Party Wear", "Cocktail", "Festival", "Casual"],
  toeType: ["Open Toe", "Closed Toe", "Peep Toe", "Slingback", "Round Toe", "Pointed Toe", "Square Toe"],
  brand: ["Miraggio", "Lavie", "Caprese", "Bata", "Metro", "Red Tape", "Clarks", "Mochi", "Khadims", "Catwalk", "Zara", "H&M", "Nykaa Fashion", "Myntra"]
};

function MarriageSandal() {
  // --- APPLICATION STATE HOOKS LIFECYCLE ---
  const [products, setProducts] = useState([]);               // Footwear raw database storage container arrays
  const [loading, setLoading] = useState(true);                 // Loading layout screen visible state toggle flag switcher
  const [maxPrice, setMaxPrice] = useState(15000);             // Max slider boundaries limits scale controller numerical points
  const [sortBy, setSortBy] = useState("default");             // Dynamic array sequencing alignment filter string identifiers
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false); // Portable screen overlay slider menu trigger visibility state

  // Central active dynamic attribute criteria object states map arrays
  const [filters, setFilters] = useState({ color: [], material: [], type: [], heelHeight: [], size: [], workType: [], occasion: [], toeType: [], brand: [] });
  // Accordion drawer segments grouping collapse status trackers dictionary data mapping
  const [openSections, setOpenSections] = useState({ color: true, material: true, type: true, heelHeight: false, size: false, workType: false, occasion: false, toeType: false, brand: false });

  // --- ASYNC API LIFECYCLE DISPATCH MOUNT (useEffect) ---
  useEffect(() => {
    loadAllProducts()
      .then(data => setProducts(data || [])) // Safety validations rules inside apparel structures assignments maps
      .catch(() => setProducts([]))          // Error logging response recovery paths operations fallback
      .finally(() => setLoading(false));     // Turn off screen buffering layout spinners indicator triggers
  }, []);

  // --- ACTION BUTTON CLICK SYSTEM EVENT METHODS ---
  
  // Custom sidebar panel accordions list toggling collapse dynamic indexes tracker handler
  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };
  
  // Appends or filters out criteria properties within central selectors tracking arrays map
  const handleFilterToggle = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value) ? prev[key].filter(v => v !== value) : [...prev[key], value]
    }));
  };
  
  // Reverts active filtration maps variables data models down to initial configurations properties
  const clearAllFilters = () => {
    setFilters({ color: [], material: [], type: [], heelHeight: [], size: [], workType: [], occasion: [], toeType: [], brand: [] });
    setMaxPrice(15000); // Fixed the previous value mismatch discrepancy with the actual slider max limit
    setSortBy("default");
  };

  // --- PERFORMANCE COMPUTATION CACHE PIPELINE ENGINE (useMemo Architecture) ---
  // Memoized process data loop blocks to secure flawless response performance execution
  const filteredProducts = useMemo(() => {
    
    // Step 1: Matching dataset catalog array inputs by standard string matching parameter filters rules
    let result = products.filter(p => {
      const category = p.category?.toLowerCase() || "";
      const subCategory = p.subCategory?.toLowerCase() || "";
      const name = p.name?.toLowerCase() || "";

      return category === "marriage sandal" || category === "wedding sandal" || category === "bridal sandal" || 
             subCategory === "marriage-sandal" || 
             name.includes("wedding sandal") || name.includes("bridal sandal") || 
             (name.includes("sandal") && name.includes("wedding"));
    });

    // Step 2: Running nested strict verification loops matching over user-selected criteria properties
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
      if (filters.brand.length > 0 && !filters.brand.includes(product.brand)) return false;
      return true;
    });

    // Step 3: Mutating element indexing tracking patterns sequences array variables orders
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
        <button onClick={() => toggleSection(sectionKey)} className="flex justify-between items-center w-full font-bold text-gray-800 text-sm mb-2 hover:text-red-600 transition-colors">
          <span className="capitalize">
            {sectionKey === "heelHeight" ? "Heel Height" : sectionKey === "workType" ? "Work Type" : sectionKey === "toeType" ? "Toe Type" : title}
          </span>
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
                  className="w-3.5 h-3.5 rounded border-gray-300 text-red-600 focus:ring-red-500" 
                />
                <span className="text-gray-600 text-xs">{item}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    );
  };

  // 2. Main Filters Sidebar content master panel layouts components frame boards definitions
  const FilterSidebarContent = () => (
    <div className="bg-white p-4 rounded-xl shadow-sm space-y-4">
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="font-bold text-base text-gray-800">Filters</h2>
        <button onClick={clearAllFilters} className="text-red-600 text-xs font-semibold hover:underline">Clear All</button>
      </div>

      {/* Programmatic loop layout tracking mapping elements items loops over FILTER_CONFIG schema definitions maps */}
      {Object.keys(FILTER_CONFIG).map(key => (
        <AccordionSection 
          key={key} 
          title={key} 
          sectionKey={key} 
          items={FILTER_CONFIG[key]} 
        />
      ))}

      {/* Footwear monetary numerical boundaries tracking dynamic slider scale interfaces wrapper block */}
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
          <span>₹0</span><span>₹3.5k</span><span>₹7k</span><span>₹10.5k</span><span>₹15k</span>
        </div>
      </div>
    </div>
  );

  // Initial runtime buffer screening visibility validation check rule interceptor
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
      
      {/* 🌸 LUXURY DESIGNER WEDDING FOOTWEAR BRIDAL HEELS & JUTTI COLLECTION HERO HEADER BLOCK PANEL */}
      <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white text-center py-10 shadow-inner">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Royal Marriage Footwear</h1>
        <p className="mt-1.5 text-sm text-white/80">Explore premium embroidered bridal sandals, artisan ethnic juttis, and designer wedding heels</p>
      </div>

        <nav className="flex items-center gap-2 text-sm text-gray-500 mt-3 !pl-7">
          <Link to="/" className="!text-lg !no-underline !font-semibold !text-[#1E2D42] transition-colors">Home</Link>
          <span className="text-lg !font-medium">/</span>
          <span className="text-lg !font-medium text-[#E4921A]">Merriage Sandal</span>
        </nav>
        <h2 className="text-2xl !font-bold !mt-3 !mb-3 !pl-7">Merriage Sandal</h2>

      {/* 📱 SCREEN OVERLAY ADAPTIVE BUTTON FOR MOBILE SHEET PANEL EXTENSIONS CONTROLLERS GRAPHICS ROW */}
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

      {/* 📱 PORTABLE VIEWS SYSTEM CANVAS DIALOG PANELS CONTROLLERS SHEET VIEWS SEGMENTS BLOCKS */}
      {mobileFiltersOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" onClick={() => setMobileFiltersOpen(false)}>
          <div className="absolute top-0 left-0 w-80 h-full bg-white overflow-y-auto p-4 flex flex-col gap-2 shadow-2xl animate-in slide-in-from-left duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="font-bold text-lg text-gray-800">Filter Sandals</h2>
              <button onClick={() => setMobileFiltersOpen(false)} className="p-1 rounded-full hover:bg-gray-100 transition"><X size={20} /></button>
            </div>
            <FilterSidebarContent />
            <div className="sticky bottom-0 bg-white pt-4 pb-2 mt-auto border-t">
              <button onClick={() => setMobileFiltersOpen(false)} className="w-full bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg font-semibold shadow transition-colors">
                Apply Sandal Filters
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
            
            {/* Context metrics layout counters tracking system monitor header toolbars units */}
            <div className="bg-white rounded-xl px-4 py-3 mb-4 border border-gray-100 flex justify-between items-center shadow-sm flex-wrap gap-2">
              <span className="text-gray-500 text-xs font-medium">
                Showing <span className="font-semibold text-gray-700">{filteredProducts.length}</span> elegant marriage & ceremonial footwear styles
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
            
            {/* Alternative missing data structural panel template fallback rules validation processes */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-100 py-16 px-4 text-center shadow-sm text-gray-400 font-medium text-sm">
                <div className="text-4xl mb-2">👡</div>
                <h3 className="text-lg font-bold text-gray-700 mb-1">No Sandals Found</h3>
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

export default MarriageSandal;